var DimensionalCoords = Java.type('com.fiskmods.heroes.common.DimensionalCoords');
var landing = implement("fiskheroes:external/superhero_landing");

function SafeY(entity) {
    var complete = false;
    for (var i = 0; complete == false; i++) {
        if (entity.world().getBlock(entity.pos().add(0, i + 3, 0)) == "minecraft:air" &&
            entity.world().getBlock(entity.pos().add(0, i + 4, 0)) == "minecraft:air") {
            complete = true;
            return entity.posY() + i + 4;
        }

    }
}

function init(hero) {
    hero.setName("Superman");
    hero.setTier(9);
    hero.setVersion("Kingdom Come");

    hero.setChestplate("item.superhero_armor.piece.chestpiece");
    hero.setLeggings("item.superhero_armor.piece.pants");
    hero.setBoots("item.superhero_armor.piece.boots");

    hero.addPowers("dhhp:kryptonian_physiology");

    hero.addAttribute("FALL_RESISTANCE", 1.0, 1);
    hero.addAttribute("PUNCH_DAMAGE", 12., 0);
    hero.addAttribute("SPRINT_SPEED", 0.45, 1);
    hero.addAttribute("BASE_SPEED_LEVELS", 2.0, 0);
    hero.addAttribute("MAX_HEALTH", 4.0, 0);
    hero.addAttribute("WEAPON_DAMAGE", -0.75, 1);
    hero.addAttribute("IMPACT_DAMAGE", 0.25, 1);

    hero.addKeyBind("HEAT_VISION", "\u00A7lHeat Vision", 1);
    hero.addKeyBind("CHARGED_BEAM", "key.heatVision", 1);
    hero.addKeyBind("ENERGY_PROJECTION", "Freeze Breath", 2);
    hero.addKeyBind("SLOW_MOTION", "key.slowMotion", 3);
    hero.addKeyBind("SUPER_SPEED", "key.superSpeed", 4);
    hero.addKeyBind("CHARGE", "Absorb Solar Energy (Hold)", 5);
    hero.addKeyBindFunc("func_CHARGE", charge, "Absorb Solar Energy", 5);

    hero.setHasProperty(hasProperty);
    hero.addAttributeProfile("ACTIVE", activeProfile);
    hero.setAttributeProfile(getAttributeProfile);
    hero.setKeyBindEnabled(isKeyBindEnabled);
    hero.setModifierEnabled(isModifierEnabled);

    hero.setTickHandler((entity, manager) => {
        var x = entity.posX();
        var y = entity.posY();
        var z = entity.posZ();
        var dim = entity.world().getDimension();
        if (y >= 1000) {
            manager.setData(entity, "fiskheroes:teleport_dest", new DimensionalCoords(x, y, z, dim + 1));
            manager.setData(entity, "fiskheroes:teleport_delay", 1);

        }
        if (entity.world().getDimension() == 2595 && !entity.getData("dhhp:dyn/teleport")) {
            manager.setData(entity, "dhhp:dyn/teleport", true);
        }
        if (entity.world().getDimension() == 0 && entity.getData("dhhp:dyn/teleport")) {
            manager.setData(entity, "fiskheroes:teleport_dest", new DimensionalCoords(Math.floor(entity.posX()), SafeY(entity), Math.floor(entity.posZ()), 0));
            manager.setData(entity, "fiskheroes:teleport_delay", 1);
            manager.setData(entity, "dhhp:dyn/teleport", false);
        }

        var flying = entity.getData("fiskheroes:flying");
        manager.incrementData(entity, "fiskheroes:dyn/booster_timer", 2, flying);

        var item = entity.getHeldItem();
        flying &= !entity.as("PLAYER").isUsingItem();
        manager.incrementData(entity, "fiskheroes:dyn/booster_r_timer", 2, flying && item.isEmpty() && !entity.isPunching() && entity.getData("fiskheroes:aiming_timer") == 0);
        manager.incrementData(entity, "fiskheroes:dyn/booster_l_timer", 2, flying && !item.doesNeedTwoHands());

        if (!entity.isOnGround()) {
            manager.setInteger(entity.getWornChestplate().nbt(), "airTime", entity.getWornChestplate().nbt().getInteger("airTime") + 1)
        }
        if (entity.getData("fiskheroes:jetpacking") == true && entity.isSprinting()) {
            manager.setData(entity, "fiskheroes:flying", true)
        }
        if (entity.getData("fiskheroes:flying") || entity.isOnGround()) {
            manager.setInteger(entity.getWornChestplate().nbt(), "airTime", 0);
        }

        if (entity.getData("dhhp:dyn/power_cooldown") < 0.00005 && entity.getData("dhhp:dyn/powered") == true) {
            manager.setData(entity, "dhhp:dyn/power_cooldown", 0.00008)
        }



        landing.tick(entity, manager);
    });
}

function charge(entity, manager) {
    manager.setData(entity, "dhhp:dyn/powered", true);
    manager.setData(entity, "dhhp:dyn/power_cooldown", 1);
    return true;
}

function activeProfile(profile) {
    profile.inheritDefaults();
    profile.addAttribute("KNOCKBACK", 3.0, 0);
    profile.addAttribute("JUMP_HEIGHT", 2.5, 0);
    profile.addAttribute("PUNCH_DAMAGE", 14.0, 0);
    profile.addAttribute("SPRINT_SPEED", 0.85, 1);
    profile.addAttribute("IMPACT_DAMAGE", 0.9, 1);
}

function getAttributeProfile(entity) {
    var powered = entity.getData("dhhp:dyn/powered");
    if (entity.getData("dhhp:dyn/power_cooldown") < 1 && entity.getData("dhhp:dyn/power_cooldown") > 0 && powered) {
        return "ACTIVE";
    }
    return null;
}

function isKeyBindEnabled(entity, keyBind) {
    var powered = entity.getData("dhhp:dyn/powered");
    var y = entity.posY();
    var boostflight = entity.isSprinting() && entity.getData("fiskheroes:flying")

    switch (keyBind) {
        case "CHARGE":
            return !boostflight && (y) >= 200 && entity.world().getDimension() == 2595;
        case "func_CHARGE":
            return !boostflight && (y) >= 200 && entity.getData("dhhp:dyn/powered") == false && entity.world().getDimension() == 2595;
        case "HEAT_VISION":
            return !boostflight && entity.getData("dhhp:dyn/power_cooldown") < 1 && entity.getData("dhhp:dyn/power_cooldown") > 0 && powered;
        case "CHARGED_BEAM":
            return !boostflight && entity.getData("dhhp:dyn/power_cooldown") == 1 || (!boostflight && !powered);
        case "SUPER_SPEED":
            return !boostflight && (y) <= 400 && !entity.getData("fiskheroes:flying");
        case "ENERGY_PROJECTION":
            return !boostflight && entity.world().getDimension() == 0 || entity.world().getDimension() == -1 || entity.world().getDimension() == 1;
        default:
            return true;
    }
}

function isModifierEnabled(entity, modifier) {
    var powered = entity.getData("dhhp:dyn/powered");

    if (modifier.name() == "fiskheroes:gliding") {
        return (modifier.id() == "powered" ? powered : !powered);
    }

    switch (modifier.id()) {
        case "suit_idle":
            return !entity.getData("dhhp:dyn/power") && powered && entity.getData("fiskheroes:heat_vision") == false;
        case "suit_charge":
            return entity.getData("dhhp:dyn/power") && powered;
        case "hv":
            return !entity.getData("dhhp:dyn/power") && powered && entity.getData("fiskheroes:heat_vision") == true;
    }
    switch (modifier.name()) {
        case "fiskheroes:healing_factor":
            return entity.posY() >= 350;
        case "fiskheroes:propelled_flight":
            return entity.isSprinting();
        default:
            return true;
    }
}

function hasProperty(entity, property) {
    return property == "BREATHE_SPACE";
}

//fix landing