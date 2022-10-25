function init(hero) {

    hero.setName("Buttercup");
    hero.setVersion("Kid");
    hero.setTier(4);
    hero.hide();

    hero.setHelmet("item.superhero_armor.piece.hair");
    hero.setChestplate("item.superhero_armor.piece.chestpiece");
    hero.setLeggings("item.superhero_armor.piece.pants");
    hero.setBoots("item.superhero_armor.piece.boots");

    hero.addPowers("dhhp:chemical_x", "dhhp:spice");

    hero.addAttribute("BASE_SPEED_LEVELS", 2.0, 0);
    hero.addAttribute("FALL_RESISTANCE", 1.0, 1);
    hero.addAttribute("JUMP_HEIGHT", 2.0, 0);
    hero.addAttribute("PUNCH_DAMAGE", 10.25, 0);
    hero.addAttribute("KNOCKBACK", 1.75, 0);

    hero.addKeyBind("CHARGED_BEAM", "Heat Vision", 1);
    hero.addKeyBind("GROUND_SMASH", "key.groundSmash", 2);
    hero.addKeyBind("EARTHQUAKE", "key.earthquake", 3);
    hero.addKeyBind("AIM", "Aim", 4);
    hero.addKeyBind("SUPER_SPEED", "key.superSpeed", 5);

    hero.supplyFunction("canAim", canAim);
    hero.setRuleValueModifier(ruleModifier);
    hero.setHasProperty(hasProperty);
    hero.setDefaultScale(0.75);
}

function hasProperty(entity, property) {
    return property == "BREATHE_SPACE";
}

function canAim(entity) {
    return true;
}

function ruleModifier(entity, rule) {
    if (rule.name() == "fiskheroes:cooldown_energyblast") {
        return 23.5;
    }
    else if (rule.name() == "fiskheroes:dmg_laserbolt") {
        return 2.0;
    }
    return null;
}