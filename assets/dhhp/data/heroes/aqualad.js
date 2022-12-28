function init(hero) {

    hero.setName("Aquaman");
    hero.setVersion("Young Justice");
    hero.setTier(7);
    hero.hide();

    hero.setChestplate("Chestplate");
    hero.setLeggings("Leggings");

    hero.addPowers("dhhp:atlantean", "dhhp:aqualad");

    hero.addAttribute("PUNCH_DAMAGE", 10.0, 0);
    hero.addAttribute("SPRINT_SPEED", 0.40, 1);
    hero.addAttribute("FALL_RESISTANCE", 10.0, 0);
    hero.addAttribute("WEAPON_DAMAGE", 0.35, 1);

    hero.addKeyBind("WATER", "Toggle Water-Pack", 1);
    hero.addKeyBind("WEAPON", "Toggle Water-Bearer", 2);

    hero.addKeyBindFunc("func_CYCLE_WEAPON", cycleWeaponKey, "Cycle Weapon", 3);
    hero.addKeyBindFunc("func_CYCLE_WEAPON1", cycleWeaponKey1, "Cycle Weapon Swords (1/3)", 3);
    hero.addKeyBindFunc("func_CYCLE_WEAPON2", cycleWeaponKey1, "Cycle Weapon Mace (2/3)", 3);
    hero.addKeyBindFunc("func_CYCLE_WEAPON3", cycleWeaponKey1, "Cycle Weapon Whips (3/3)", 3);

    hero.addKeyBind("ENERGY_PROJECTION", "Water Projection", 4);

    hero.setModifierEnabled(isModifierEnabled);
    hero.addAttributeProfile("WEAPON", weaponProfile);
    hero.addAttributeProfile("WHIP", whipProfile);
    hero.setAttributeProfile(getAttributeProfile);
    hero.setKeyBindEnabled(isKeyBindEnabled);

    hero.setDamageProfile(getDamageProfile);
    hero.addDamageProfile("SWORD", {
        "types": {
            "SHARP": 1.0,
            "MAGIC": 0.5
        }
    });
    hero.addDamageProfile("MACE", {
        "types": {
            "BLUNT": 1.0,
            "MAGIC": 0.5
        }
    });
    hero.addDamageProfile("WHIP", {
        "types": {
            "MAGIC": 0.5
        }
    });
    hero.addDamageProfile("WHIP_PULL_CLOSER", {
        "types": {
            "MAGIC": 0.5
        },
        "properties": {
            "REDUCE_KNOCKBACK": 5
        }
    });
}

function weaponProfile(profile) {
    profile.inheritDefaults();
    profile.addAttribute("SPRINT_SPEED", 0.75, 1);
}

function whipProfile(profile) {
    profile.inheritDefaults();
    profile.addAttribute("SPRINT_SPEED", 0.75, 1);
    profile.addAttribute("REACH_DISTANCE", 3, 0);
}


function getAttributeProfile(entity) {
    var flag = entity.getData('dhhp:dyn/water_weapon');;
    if (entity.getHeldItem().isEmpty()) {
        if (flag == 1) {
            return "WEAPON";
        }
        if (flag == 3) {
            return "WHIP";
        }
    }
    return true;
}

function getDamageProfile(entity) {
    var flag = entity.getData('dhhp:dyn/water_weapon');
    if (entity.getHeldItem().isEmpty()) {
        if (flag == 1) {
            return "SWORD";
        }
        if (flag == 2) {
            return "MACE";
        }
        if (flag == 3) {
            if (Math.floor(Math.random() * 5) == 0) {
                return "WHIP_PULL_CLOSER"
            }
            return "WHIP";
        }
    }
    return true;
}

function isModifierEnabled(entity, modifier) {
    var water = entity.getData("dhhp:dyn/water_timer");
    var hand = entity.getHeldItem().isEmpty();

    switch (modifier.id()) {
        case "300":
            return true;
        case "wet":
            return entity.isWet() && !entity.getData("energy_projection");
        case "50":
            return !entity.isWet() && entity.getData("energy_projection");
        case "weapon":
            return water > 0 && hand;
    }
    switch (modifier.name()) {
        case "fiskheroes:energy_projection":
            return entity.getData('dhhp:dyn/water_weapon_toggle') && (water) > 0.5 || entity.getData('dhhp:dyn/water_weapon_toggle') && entity.isWet();
        case "fiskheroes:gliding":
            return entity.isInWater();
        case "fiskheroes:lightning_cast":
            return (water > 0 || entity.isWet()) && !entity.getData('dhhp:dyn/water_weapon_toggle');
        case "fiskheroes:regeneration":
            return water > 0 || entity.isWet();
    }
    return true;
}

function cycleWeaponKey(player, manager) {
    var weapon = player.getData("dhhp:dyn/water_weapon");
    manager.setData(player, "dhhp:dyn/water_weapon", weapon >= 3 ? 0 : weapon + 1);

    //manager.setData(player, "dhhp:dyn/water_weapon", 1);
    //manager.setData(player, "dhhp:dyn/water_weapon_timer_on", true);
    return true;
}

function cycleWeaponKey1() {
    return true;
}

function isKeyBindEnabled(entity, keyBind) {
    var water = entity.getData("dhhp:dyn/water") || entity.isWet();
    var hand = entity.getHeldItem().isEmpty();
    var weapon = entity.getData('dhhp:dyn/water_weapon');;

    switch (keyBind) {
        case "ENERGY_PROJECTION":
            return water && entity.getData("dhhp:dyn/water_weapon_toggle") && weapon == 0;
        case "WEAPON":
            return hand && water;
        case "func_CYCLE_WEAPON":
            return entity.getData("dhhp:dyn/water_weapon_toggle") && hand && water || weapon == 3;
        case "func_CYCLE_WEAPON1":
            return weapon == 1 && entity.getData("dhhp:dyn/water_weapon_toggle") && hand && water;
        case "func_CYCLE_WEAPON2":
            return weapon == 2 && entity.getData("dhhp:dyn/water_weapon_toggle") && hand && water;
        case "func_CYCLE_WEAPON3":
            return weapon == 3 && entity.getData("dhhp:dyn/water_weapon_toggle") && hand && water;
        case "WATER":
            return !entity.getData("dhhp:dyn/water_weapon_toggle");
        default:
            return true;
    }
}

/*
Have powers be empowered in rain
*/