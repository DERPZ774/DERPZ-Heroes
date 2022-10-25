function init(hero) {
    hero.setName("Galactus");
    hero.setVersion("Comics");
    hero.setTier(10);
    hero.hide();

    hero.setHelmet("Helmet");
    hero.setChestplate("item.superhero_armor.piece.chestpiece");
    hero.setLeggings("item.superhero_armor.piece.pants");
    hero.setBoots("item.superhero_armor.piece.boots");

    hero.addPowers("dhhp:cosmic_devourer");

    hero.addKeyBind("ENERGY_PROJECTION", "Energy Projection", 1);
    hero.addKeyBind("TELEPORT", "key.teleport", 2);
    hero.addKeyBind("SIZE_MANIPULATION", "key.sizeManipulation", 3);
    hero.addKeyBind("HOVER", "key.hover", 3)
    hero.addKeyBind("GROUND_SMASH", "Devour", 4);
    hero.addKeyBind("EARTHQUAKE", "key.earthquake", 5);

    hero.addAttribute("PUNCH_DAMAGE", 14.0, 0);
    hero.addAttribute("JUMP_HEIGHT", 1.5, 0);
    hero.addAttribute("FALL_RESISTANCE", 1.0, 1);
    hero.addAttribute("WEAPON_DAMAGE", -2.5, 0);

    hero.setDefaultScale(1.5);

    hero.setKeyBindEnabled(isKeyBindEnabled);
    hero.setRuleValueModifier(ruleModifier);
    hero.setModifierEnabled(isModifierEnabled);
    hero.setHasProperty(hasProperty);

    hero.setTickHandler((entity, manager) => {});
}

function hasProperty(entity, property) {
    return property == "BREATHE_SPACE";
}

function ruleModifier(entity, rule) {
    if (rule.name() == "fiskheroes:range_energyproj") {
        return 40.0;
    } else if (rule.name() == "fiskheroes:dmg_energyproj") {
        return 6.0;
    } else if (rule.name() == "fiskheroes:dmg_groundsmash") {
        return 17.0;
    } else if (rule.name() == "fiskheroes:radius_groundsmash") {
        return 6.0;
    } else if (rule.name() == "fiskheroes:radius_groundsmash_expl") {
        return 4.0;
    } else if (rule.name() == "fiskheroes:cooldown_groundsmash") {
        return 60.0;
    } else if (rule.name() == "fiskheroes:dmg_earthquake") {
        return 2.0;
    } else if (rule.name() == "fiskheroes:dmg_earthquake") {
        return 2.0;
    }
    return null;
}

function isKeyBindEnabled(entity, keyBind) {
    switch (keyBind) {
    case "ENERGY_PROJECTION":
        return entity.getData("fiskheroes:scale") >= 10.0;
    case "TELEPORT":
        return entity.getData("fiskheroes:scale") >= 10.1;
    case "GROUND_SMASH":
        return entity.getData("fiskheroes:scale") >= 10.0;
    case "EARTHQUAKE":
        return entity.getData("fiskheroes:scale") >= 10.0;
    case "SIZE_MANIPULATION":
        return !entity.getData("fiskheroes:aiming") && (((entity.isSneaking() || entity.isOnGround()) && entity.getData("fiskheroes:scale") < 2.0) || entity.getData("fiskheroes:scale") >= 2.0);
    case "HOVER":
        return !entity.isSneaking() && !entity.isOnGround() && entity.getData("fiskheroes:scale") < 2.0;
    default:
        return entity.getData("fiskheroes:scale") >= 1.30;
    }
}

function isModifierEnabled(entity, modifier) {
    if (modifier.name() == "fiskheroes:earthquake") {
        return entity.getData("fiskheroes:scale") >= 10.0;
    } else if (modifier.name() == "fiskheroes:flight" || modifier.name() == "fiskheroes:hover") {
        return entity.getData("fiskheroes:scale") < 2.0;
    }
    return true;
}
