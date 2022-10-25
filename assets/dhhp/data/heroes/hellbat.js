function init(hero) {
    hero.setName("HellBat");
    hero.setTier(5);
    hero.hide();
    
    hero.setHelmet("Mask");
    hero.setChestplate("item.superhero_armor.piece.chestpiece");
    hero.setLeggings("item.superhero_armor.piece.pants");
    hero.setBoots("item.superhero_armor.piece.boots");
    hero.addEquipment("fiskheroes:grappling_gun");
    
    hero.addPowers("dhhp:hellbat");

    hero.addAttribute("PUNCH_DAMAGE", 12.0, 0);
    hero.addAttribute("JUMP_HEIGHT", 2.5, 0);
    hero.addAttribute("FALL_RESISTANCE", 12.0, 0);
    hero.addAttribute("SPRINT_SPEED", 0.45, 1);
    
    hero.addKeyBind("UTILITY_BELT", "key.utilityBelt", 1);
    hero.addKeyBind("AIM", "Aim", 2);
    hero.addKeyBind("CHARGED_BEAM", "Hell Beam", 3);
    hero.addKeyBind("INVISIBILITY", "Stealth Mode", 4);

    hero.setHasPermission(hasPermission);
    hero.setModifierEnabled(isModifierEnabled);
    hero.setHasProperty(hasProperty);
    hero.supplyFunction("canAim", canAim);

    hero.setDefaultScale(1.6);
}

function hasPermission(entity, permission) {
    return permission == "USE_GRAPPLING_GUN";
}

function isModifierEnabled(entity, modifier) {
    if (modifier.name() == "fiskheroes:invisibility") {
        return !entity.isPunching();
    }
    else if (modifier.name() == "fiskheroes:equipment") {
        return (!entity.getData("fiskheroes:aiming"));
    }
    else if (modifier.name() == "fiskheroes:charged_beam") {
        return (!entity.getData("fiskheroes:invisible"));
    }
    return true;
}

function hasProperty(entity, property) {
    return property == "BREATHE_SPACE";
}

function canAim(entity) {
    return entity.getHeldItem().isEmpty();
}