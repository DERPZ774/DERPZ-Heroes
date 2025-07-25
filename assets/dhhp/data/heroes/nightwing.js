function init(hero) {
    hero.setName("Nightwing");
    hero.setTier(5);
    hero.setVersion("Comics");

    hero.setHelmet("Mask");
    hero.setChestplate("item.superhero_armor.piece.chestpiece");
    hero.setLeggings("item.superhero_armor.piece.pants");
    hero.setBoots("item.superhero_armor.piece.boots");
    hero.addPrimaryEquipment("fiskheroes:grappling_gun", true);

    hero.addPowers("dhhp:nightwing_suit");
    hero.addAttribute("PUNCH_DAMAGE", 4.5, 0);
    hero.addAttribute("WEAPON_DAMAGE", 2.5, 0);
    hero.addAttribute("FALL_RESISTANCE", 6.0, 0);
    hero.addAttribute("JUMP_HEIGHT", 1.0, 0);
    hero.addAttribute("SPRINT_SPEED", 0.45, 1);

    hero.addKeyBind("ESCRIMA_TOGGLE", "Toggle Escrima Sticks", 1);
    hero.addKeyBind("ESCRIMA_LIGHTNING", "Toggle Lightning", 2);
    hero.addKeyBind("UTILITY_BELT", "key.utilityBelt", 3);

    hero.setHasPermission(hasPermission);
    hero.setModifierEnabled(isModifierEnabled);
    hero.setKeyBindEnabled(isKeyBindEnabled);
    hero.addAttributeProfile("LIGHTNING", lightningProfile);
    hero.addAttributeProfile("ACTIVE", activeProfile);
    hero.setAttributeProfile(getAttributeProfile);
    hero.setDamageProfile(getProfile);
    hero.addDamageProfile("BLUNT", {
        "types": {
            "BLUNT": 1.0
        }
    });
    hero.addDamageProfile("ELECTRICITY", {
        "types": {
            "ELECTRICITY": 1.0
        }
    });
    hero.addSoundEvent("PUNCH", "dhhp:punch_escrima");


    hero.setTickHandler((entity, manager) => {
        if (entity.getData("fiskheroes:flying")) {
            manager.setInterpolatedData(entity, "dhhp:dyn/jump_cooldown", 1);
        }
        manager.incrementData(entity, "dhhp:dyn/jump_cooldown", 35, false);
    });

}


function hasPermission(entity, permission) {
    return permission == "USE_GRAPPLING_GUN";
}

function activeProfile(profile) {
    profile.inheritDefaults();
    profile.addAttribute("PUNCH_DAMAGE", 5.5, 0);
}

function lightningProfile(profile) {
    profile.inheritDefaults();
    profile.addAttribute("PUNCH_DAMAGE", 6.25, 0);
}

function getAttributeProfile(entity) {
    if (entity.getData("dhhp:dyn/escrima_lightning")) {
        return "LIGHTNING";
    } else if (entity.getData("dhhp:dyn/escrima")) {
        return "ACTIVE";
    }
    return true;
}

function getProfile(entity) {
    if (entity.getData("dhhp:dyn/escrima")) {
        return "BLUNT";
    } else if (entity.getData("dhhp:dyn/escrima_lightning")) {
        return "ELECTRICITY" && "BLUNT";
    }
    return true;
}


function isModifierEnabled(entity, modifier) {
    switch (modifier.name()) {
        case "fiskheroes:lightning_cast":
            return entity.getHeldItem().isEmpty() && entity.getData("dhhp:dyn/escrima_lightning");
        case "fiskheroes:transformation":
            return entity.getHeldItem().isEmpty();
        case "fiskheroes:cooldown":
            return entity.getHeldItem().isEmpty();
        case "fiskheroes:equipment":
            return !entity.getData("dhhp:dyn/escrima");
        case "fiskheroes:controlled_flight":
            return entity.isSprinting() && entity.getData("dhhp:dyn/jump_cooldown") == 0;
        default:
            return true;
    }
}

function isKeyBindEnabled(entity, keyBind) {
    switch (keyBind) {
        case "ESCRIMA_TOGGLE":
            return ((entity.getHeldItem().isEmpty()) && (!entity.getData("dhhp:dyn/escrima_lightning")));
        case "ESCRIMA_LIGHTNING":
            return (entity.getData("dhhp:dyn/escrima") && (entity.getHeldItem().isEmpty()));
        case "UTILITY_BELT":
            return !entity.getData("dhhp:dyn/escrima");
        default:
            return true;
    }
}

///ToDo: Change dbl jump with fisks