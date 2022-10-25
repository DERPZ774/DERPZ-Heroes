function init(hero) {
    hero.setName("Nightwing");
    hero.setTier(5);
    
    hero.setHelmet("Mask");
    hero.setChestplate("item.superhero_armor.piece.chestpiece");
    hero.setLeggings("item.superhero_armor.piece.pants");
    hero.setBoots("item.superhero_armor.piece.boots");
    hero.addPrimaryEquipment("fiskheroes:grappling_gun", true);
    
    hero.addPowers("dhhp:nightwing_suit");

    hero.addAttribute("PUNCH_DAMAGE", 4.5, 0);
    hero.addAttribute("WEAPON_DAMAGE", 2.5, 0);
    hero.addAttribute("JUMP_HEIGHT", 1.5, 0);
    hero.addAttribute("FALL_RESISTANCE", 6.0, 0);
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
    hero.addDamageProfile("BLUNT", {"types": {"BLUNT": 1.0}});
    hero.addDamageProfile("ELECTRICITY", {"types": {"ELECTRICITY": 1.0}});
    hero.addSoundEvent("PUNCH", "dhhp:punch_escrima");
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
    }
    else if (entity.getData("dhhp:dyn/escrima")) {
        return "ACTIVE";
    }
    return true;
}

function getProfile(entity) {
    if (entity.getData("dhhp:dyn/escrima")) {
        return "BLUNT";
    }
    else if (entity.getData("dhhp:dyn/escrima_lightning")) {
        return "ELECTRICITY" && "BLUNT";
    }
    return true;
}

function isModifierEnabled(entity, modifier) {
    if (modifier.name() == "fiskheroes:lightning_cast") {
        return entity.getHeldItem().isEmpty() && (entity.getData("dhhp:dyn/escrima_lightning"));
    }
    else if (modifier.name() == "fiskheroes:transformation") {
        return entity.getHeldItem().isEmpty();
    }
    else if (modifier.name() == "fiskheroes:cooldown") {
        return entity.getHeldItem().isEmpty();
    }
    else if (modifier.name() == "fiskheroes:equipment") {
        return !entity.getData("dhhp:dyn/escrima");
    }
    return true;
}

function isKeyBindEnabled(entity, keyBind) {
    switch (keyBind) {
        case "ESCRIMA_TOGGLE":
            return ((entity.getHeldItem().isEmpty()) && (!entity.getData("dhhp:dyn/escrima_lightning")));
        case "ESCRIMA_LIGHTNING":
            return (entity.getData("dhhp:dyn/escrima") && (entity.getHeldItem().isEmpty()));
        default:
            return true;
    }
}