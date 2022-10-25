function init(hero) {
    hero.setName("Terra");
    hero.setVersion("Teen Titans");
    hero.setTier(2);
    hero.hide();
    
    hero.setHelmet("item.superhero_armor.piece.hair");
    hero.setChestplate("shirt");
    hero.setLeggings("shorts");
    hero.setBoots("item.superhero_armor.piece.boots");

    hero.addPowers("dhhp:unstable_geokinesis");

    hero.addAttribute("FALL_RESISTANCE", 0.85, 1);
    hero.addAttribute("PUNCH_DAMAGE", 4.0, 0);

    hero.addKeyBind("GROUND_SMASH", "key.groundSmash", 1);
    hero.addKeyBind("HOVER", "Hover", 1);
    hero.addKeyBind("EARTHQUAKE", "key.earthquake", 2);
    hero.addKeyBind("EAT_BACON", "Rage", 3);
    hero.addKeyBind("CHARGED_PUNCH", "key.punchToggle", 4);
    hero.addKeyBind("ROCK_FLY", "Geokinetic flight", 5);

    hero.addAttributeProfile("STEEL", steelProfile);
    hero.addAttributeProfile("PUNCH", punchProfile);
    hero.addAttributeProfile("BLUNT", bluntProfile);
    hero.setAttributeProfile(getAttributeProfile);
    hero.setModifierEnabled(isModifierEnabled);
    hero.setKeyBindEnabled(isKeyBindEnabled);

    hero.setDefaultScale(0.9);
}

function steelProfile(profile) {
    profile.addAttribute("SPRINT_SPEED", 0.10, 1);
    profile.addAttribute("FALL_RESISTANCE", 8.0, 0);
    profile.addAttribute("PUNCH_DAMAGE", 6.75, 0);
}

function punchProfile(profile) {
    profile.addAttribute("BASE_SPEED", -0.25, 1);
    profile.addAttribute("FALL_RESISTANCE", 6.0, 0);
    profile.addAttribute("PUNCH_DAMAGE", 8.0, 0);
    profile.addAttribute("KNOCKBACK", 2.5, 0);
}

function bluntProfile(profile) {
    profile.addAttribute("FALL_RESISTANCE", 6.0, 0);
    profile.addAttribute("KNOCKBACK", 2.5, 0);
    profile.addAttribute("PUNCH_DAMAGE", 8.0, 0);
}

function getAttributeProfile(entity) {
    if (entity.getData("fiskheroes:dyn/steeled")) { return "STEEL"; }

    if (entity.getData("fiskheroes:punchmode")) { return "PUNCH"; }

    if (entity.getData("fiskheroes:punch_charged")) { return "BLUNT"; }
}

function isKeyBindEnabled(entity, keyBind) {
    switch (keyBind) {
        case "EARTHQUAKE":
            return (!entity.getData("dhhp:dyn/rock"));
        case "GROUND_SMASH":
            return (!entity.getData("dhhp:dyn/rock"));
        case "EAT_BACON":
            return (!entity.getData("dhhp:dyn/rock")) && !entity.getData("fiskheroes:punchmode");
        case "CHARGED_PUNCH":
            return (!entity.getData("dhhp:dyn/rock")) && !entity.getData("fiskheroes:dyn/steeled");
        default:
            return true;
    }
}

function isModifierEnabled(entity, modifier) {
    if (modifier.name() == "fiskheroes:earthquake") {
        return (!entity.getData("dhhp:dyn/rock"));
    }
    else if (modifier.name() == "fiskheroes:ground_smash") {
        return (!entity.getData("dhhp:dyn/rock"));
    }
    else if (modifier.name() == "fiskheroes:charged_punch") {
        return (!entity.getData("dhhp:dyn/rock"));
    }
    else if (modifier.name() == "fiskheroes:dyn/steeled") {
        return (!entity.getData("dhhp:dyn/rock")) && (!entity.getData("fiskheroes:hovering"));
    }
    else if (modifier.name() == "fiskheroes:flight") {
        return (!entity.isSneaking()) && entity.getData("dhhp:dyn/rock");
    }
    else if (modifier.name() == "fiskheroes:hover") {
        return (!entity.isSneaking()) && entity.getData("dhhp:dyn/rock");
    }
    return true;
}