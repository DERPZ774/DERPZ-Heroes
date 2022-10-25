function init(hero) {
    hero.setName("DERPZ");
    hero.setTier(10);
    hero.hide();

    hero.setHelmet("item.superhero_armor.piece.hair");
    hero.setChestplate("item.superhero_armor.piece.chestpiece");
    hero.setLeggings("item.superhero_armor.piece.pants");
    hero.setBoots("item.superhero_armor.piece.boots");
    hero.addEquipment("fiskheroes:grappling_gun");

	hero.addPowers("dhhp:god_complex");

    hero.addAttribute("FALL_RESISTANCE", -100.25, 0);
    hero.addAttribute("JUMP_HEIGHT", -1.85, 0);
    hero.addAttribute("PUNCH_DAMAGE", -1000.25, 0);
    hero.addAttribute("SPRINT_SPEED", -0.25, 1);
    hero.addAttribute("BASE_SPEED_LEVELS", -69.0, 0);
    hero.addAttribute("MAX_HEALTH", 1.0, 0);

    hero.addKeyBind("SUPER_SPEED", "key.superSpeed", 1);
	hero.addKeyBind("INTANGIBILITY", "key.intangibility", 2);
	hero.addKeyBind("HOVER", "key.hover", 3);
    hero.addKeyBind("CHARGE_ENERGY", "key.chargeEnergy", 4);

    hero.setHasPermission(hasPermission);
    hero.setHasProperty(hasProperty);
    hero.addAttributeProfile("DERPZ", derpzProfile);
    hero.setAttributeProfile(getAttributeProfile);
    hero.setModifierEnabled(isModifierEnabled);
    hero.supplyFunction("canDischargeEnergy", isHoldingMjonir);
    hero.addSoundEvent("PUNCH", "dhhp:vine_boom");
}

function hasProperty(entity, property) {
    return property == "BREATHE_SPACE";
}

function hasPermission(entity, permission) {
    return permission == "USE_GRAPPLING_GUN";
}

function getAttributeProfile(entity) {
    if (entity.getUUID() == "87db27bb-47d0-4c82-9dec-fa4c6f4bf912") {
        return "DERPZ";
    }
    return true;
}

function derpzProfile(profile) {
    profile.addAttribute("FALL_RESISTANCE", 100.25, 0);
    profile.addAttribute("JUMP_HEIGHT", 1.85, 0);
    profile.addAttribute("PUNCH_DAMAGE", 10000000.25, 0);
    profile.addAttribute("SPRINT_SPEED", 0.25, 1);
    profile.addAttribute("BASE_SPEED_LEVELS", 69.0, 0);
    profile.addAttribute("MAX_HEALTH", 900000.0, 0);
}

function isModifierEnabled(entity, modifier) {
    if (modifier.name() == "fiskheroes:regeneration") {
        return entity.getUUID() == "87db27bb-47d0-4c82-9dec-fa4c6f4bf912";
    }
    else if (modifier.name() == "fiskheroes:lightning_cast") {
        return entity.getUUID() == "87db27bb-47d0-4c82-9dec-fa4c6f4bf912";
    }
    else if (modifier.name() == "fiskheroes:super_speed") {
        return entity.getUUID() == "87db27bb-47d0-4c82-9dec-fa4c6f4bf912";
    }
    return true;
}

function isHoldingMjonir(entity) {
    return entity.getHeldItem().isEmpty();
}