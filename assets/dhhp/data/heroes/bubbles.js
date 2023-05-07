function init(hero) {

    hero.setName("Bubbles");
    hero.setVersion("Kid");
    hero.setTier(4);
    hero.hide();

    hero.setChestplate("item.superhero_armor.piece.chestpiece");

    hero.addPowers("dhhp:chemical_x", "dhhp:nice");
    hero.addAttribute("FALL_RESISTANCE", 1.0, 1);
    hero.addAttribute("JUMP_HEIGHT", 2.0, 0);
    hero.addAttribute("PUNCH_DAMAGE", 8.0, 0);
    hero.addAttribute("KNOCKBACK", 1.2, 0);
    hero.addAttribute("SPRINT_SPEED", 0.35, 1);
    hero.addAttribute("BASE_SPEED_LEVELS", 1.0, 0);

    hero.addKeyBind("CHARGED_BEAM", "Heat Vision", 1);
    hero.addKeyBind("SONIC_WAVES", "Ultrasonic scream", 2);
    hero.addKeyBind("SUPER_SPEED", "key.superSpeed", 3);
    hero.addKeyBind("AIM", "Blaster", 4);

    hero.supplyFunction("canAim", canAim);
    hero.setModifierEnabled(isModifierEnabled);
    hero.setRuleValueModifier(ruleModifier);
    hero.setHasProperty(hasProperty);

    hero.setDefaultScale(0.47);
}

function hasProperty(entity, property) {
    return property == "BREATHE_SPACE";
}

function canAim(entity) {
    return true;
}

function isModifierEnabled(entity, modifier) {
    if (modifier.name() == "fiskheroes:sonic_waves") {
        return (!entity.getData("fiskheroes:aiming"));
    }
    return true
}

function ruleModifier(entity, rule) {
    if (rule.name() == "fiskheroes:cooldown_energyblast") {
        return 22.0;
    } else if (rule.name() == "fiskheroes:dmg_laserbolt") {
        return 2.0;
    }
    return null;
}