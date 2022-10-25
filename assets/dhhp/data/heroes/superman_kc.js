var DimensionalCoords = Java.type('com.fiskmods.heroes.common.DimensionalCoords');
//var landing = implement("fiskheroes:external/superhero_landing");

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

    hero.addKeyBind("HEAT_VISION", "key.heatVision", 1);
    hero.addKeyBind("CHARGED_BEAM", "key.heatVision", 1);
    hero.addKeyBind("SLOW_MOTION", "key.slowMotion", 2);
    hero.addKeyBind("POWER", "Solar Absorption", 3);
    hero.addKeyBind("SUPER_SPEED", "key.superSpeed", 4);

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
        if (y > 3000) {
            manager.setData(entity, "fiskheroes:teleport_dest", new DimensionalCoords(x, y, z, dim + 1));
            manager.setData(entity, "fiskheroes:teleport_delay", 1);
        }

        var flying = entity.getData("fiskheroes:flying");
        manager.incrementData(entity, "fiskheroes:dyn/booster_timer", 2, flying);

        var item = entity.getHeldItem();
        flying &= !entity.as("PLAYER").isUsingItem();
        manager.incrementData(entity, "fiskheroes:dyn/booster_r_timer", 2, flying && item.isEmpty() && !entity.isPunching() && entity.getData("fiskheroes:aiming_timer") == 0);
        manager.incrementData(entity, "fiskheroes:dyn/booster_l_timer", 2, flying && !item.doesNeedTwoHands());

        //landing.tick(entity, manager);
    });
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
    if (entity.getData("dhhp:dyn/powered")) {
        return "ACTIVE";
    }
    return null;
}

function isKeyBindEnabled(entity, keyBind) {
    var y = entity.posY();

    switch (keyBind) {
        case "POWER":
            return (y) >= 350 || entity.getData("dhhp:dyn/powered");
        case "HEAT_VISION":
            return !entity.getData("dhhp:dyn/powered") && !entity.getData("fiskheroes:gliding");
        case "CHARGED_BEAM":
            return entity.getData("dhhp:dyn/powered") && !entity.getData("fiskheroes:gliding");
        case "SUPER_SPEED":
            return (y) <= 3000;
        default:
            return true
    }
}

function isModifierEnabled(entity, modifier) {

    if (modifier.name() == "fiskheroes:gliding") {
        var powered = entity.getData("dhhp:dyn/powered");
        return (modifier.id() == "powered" ? powered : !powered);
    }
    switch (modifier.name()) {
        case "fiskheroes:heat_vision":
            return !entity.getData("dhhp:dyn/powered");
        case "fiskheroes:healing_factor":
            return entity.posY() >= 350;
        case "fiskheroes:charged_beam":
            return entity.getData("dhhp:dyn/powered");
        default:
            return true;
    }
}

function hasProperty(entity, property) {
    return property == "BREATHE_SPACE";
}

//fix landing