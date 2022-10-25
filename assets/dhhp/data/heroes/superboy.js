function init(hero) {
    hero.setName("Superboy");
    hero.setVersion("Young Justice");
    hero.setAliases("SB");
    hero.setTier(8);
    
    hero.setChestplate("Shirt");
    hero.setLeggings("Pants");
    hero.setBoots("item.superhero_armor.piece.boots");
    
    hero.addPowers("dhhp:superboy");
    hero.addAttribute("PUNCH_DAMAGE", 9.5, 0);
    hero.addAttribute("SPRINT_SPEED", 0.1, 1);
    hero.addAttribute("BASE_SPEED_LEVELS", 1.0, 0);
    hero.addAttribute("FALL_RESISTANCE", 10.0, 0);
    
    hero.addKeyBind("DNA_SHIELD", "Activate DNA Shield", 1);
    hero.addKeyBind("SUPER_SPEED", "key.superSpeed", 2);
    hero.addKeyBind("HEAT_VISION", "key.heatVision", 3);
    hero.addKeyBind("GROUND_SMASH", "key.groundSmash", 4);   

    hero.setModifierEnabled(isModifierEnabled);
    hero.setKeyBindEnabled(isKeyBindEnabled);
    hero.setTierOverride(getTierOverride);
    hero.addAttributeProfile("ACTIVE", activeProfile);
    hero.setAttributeProfile(getAttributeProfile);
    hero.addSoundEvent("PUNCH", "dhhp:vine_boom");
}

function getTierOverride(entity) {
    return entity.getData("dhhp:dyn/dna_shield") ? 9 : 8;
}


function activeProfile(profile) {
    profile.addAttribute("PUNCH_DAMAGE", 11.0, 0);
    profile.addAttribute("SPRINT_SPEED", 0.3, 1);
    profile.addAttribute("BASE_SPEED_LEVELS", 2.0, 0);
}

function getAttributeProfile(entity) {
    if (entity.getData("dhhp:dyn/dna_shield")) {
        return "ACTIVE";
    }
    return true;
}

function isModifierEnabled(entity, modifier) {
    if (modifier.name() == "fiskheroes:regeneration") {
        return (entity.getData("dhhp:dyn/dna_shield"));
    }
    else if (modifier.name() == "fiskheroes:flight") {
        return (entity.getData("dhhp:dyn/dna_shield"));
    }
    if (modifier.name() == "fiskheroes:heat_vison") {
        return (entity.getData("dhhp:dyn/dna_shield"));
    }
    return true;
}

function isKeyBindEnabled(entity, keyBind) {
    switch (keyBind) {
        case "HEAT_VISION":
            return (entity.getData("dhhp:dyn/dna_shield"));
        default:
        return true;
    }
}