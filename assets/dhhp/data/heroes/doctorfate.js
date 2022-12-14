function init(hero) {

    hero.setName("Doctor Fate");
    hero.setTier(10);
    hero.setHelmet("Helmet");
    hero.addPowers("dhhp:lord_of_order");
    hero.addAttribute("PUNCH_DAMAGE", 3.0, 0);

    hero.addKeyBind("CHARGED_BEAM", "Order Beam", 1);
    hero.addKeyBind("SPELL_MENU", "Wheel Of Fate", 2);
    hero.addKeyBind("TELEPORT", "key.teleport", 3);
    hero.addKeyBind("ENERGY_PROJECTION", "Nabu's Wrath", 4);
    hero.addKeyBind("HELMET_TRANSFORM", "Transform", 2);
    hero.addKeyBind("SHIELD", "Ankh Shielding", 5);

    hero.addAttributeProfile("INACTIVE", inactiveProfile);
    hero.addAttributeProfile("ACTIVE", activeProfile);
    hero.setAttributeProfile(getAttributeProfile);
    hero.setModifierEnabled(isModifierEnabled);
    hero.setDamageProfile(getProfile);
    hero.setTierOverride(getTierOverride);
    hero.setKeyBindEnabled(isKeyBindEnabled);
    hero.setHasProperty(hasProperty);
}

function hasProperty(entity, property) {
    return property == "BREATHE_SPACE";
}

function getTierOverride(entity) {
    return entity.getData("dhhp:dyn/helmet") ? 10 : 0;
}

function inactiveProfile(profile) {}

function activeProfile(profile) {
    profile.addAttribute("PUNCH_DAMAGE", 11.5, 0);
    profile.addAttribute("SPRINT_SPEED", 0.4, 1);
    profile.addAttribute("WEAPON_DAMAGE", -0.50, 1);
    profile.inheritDefaults();
}

function getAttributeProfile(entity) {
    if (!entity.getData("dhhp:dyn/helmet")) {
        return "INACTIVE";
    } else if (entity.getData("dhhp:dyn/helmet")) {
        return "ACTIVE";
    }
    return true;
}

function getProfile(entity) {
    if (entity.getData("dhhp:dyn/helmet")) {
        return "MAGIC";
    }
    return true;
}

function isModifierEnabled(entity, modifier) {
    if (modifier.name() != "fiskheroes:transformation" && modifier.name() != "fiskheroes:cooldown" && !entity.getData("dhhp:dyn/helmet")) {
        return false;
    }
    switch (modifier.name()) {
        case "fiskheroes:charged_beam":
            return !entity.getData("fiskheroes:shield") && !entity.getData("fiskheroes:energy_projection");
        case "fiskheroes:energy_projection":
            return !entity.getData("fiskheroes:shield");
        case "fiskheroes:teleportation":
            return !entity.getData("fiskheroes:shield");
        case "fiskheroes:spellcasting":
            return !entity.getData("fiskheroes:shield");
        case "fiskheroes:shield":
            return !entity.getData("fiskheroes:flying");
        case "fiskheroes:water_breathing":
            return entity.getData("fiskheroes:shield");
        default:
            return true;
    }
}

function isKeyBindEnabled(entity, keyBind) {
    switch (keyBind) {
        case "HELMET_TRANSFORM":
            return (!entity.getData("dhhp:dyn/helmet"));
        case "SPELL_MENU":
            return (entity.getData("dhhp:dyn/helmet"));
        case "TELEPORT":
            return (entity.getData("dhhp:dyn/helmet"));
        case "ENERGY_PROJECTION":
            return (entity.getData("dhhp:dyn/helmet"));
        case "CHARGED_BEAM":
            return (entity.getData("dhhp:dyn/helmet"));
        case "SHIELD":
            return (entity.getData("dhhp:dyn/helmet") && !entity.getData("fiskheroes:flying"));
        default:
            return true;
    }
}