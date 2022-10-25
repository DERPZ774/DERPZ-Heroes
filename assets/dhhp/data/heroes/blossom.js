function init(hero) {

    hero.setName("Blossom");
    hero.setVersion("Kid");
    hero.setTier(4);
    hero.hide();

    hero.setHelmet("item.superhero_armor.piece.hair");
    hero.setChestplate("item.superhero_armor.piece.chestpiece");
    hero.setLeggings("item.superhero_armor.piece.pants");
    hero.setBoots("item.superhero_armor.piece.boots");

    hero.addPowers("dhhp:chemical_x", "dhhp:sugar");

    hero.addAttribute("FALL_RESISTANCE", 1.0, 1);
    hero.addAttribute("JUMP_HEIGHT", 2.0, 0);
    hero.addAttribute("PUNCH_DAMAGE", 9.0, 0);
    hero.addAttribute("KNOCKBACK", 1.5, 0);
    hero.addAttribute("SPRINT_SPEED", 0.25, 1);
    hero.addAttribute("BASE_SPEED_LEVELS", 1.0, 0);

    hero.addKeyBind("CHARGED_BEAM", "Heat Vision", 1);
    hero.addKeyBind("CHARGE_ICE", "key.chargeIce", 2);
    hero.addKeyBind("SUPER_SPEED", "key.superSpeed", 3);
    hero.addKeyBind("AIM", "Blaster", 4);

    hero.setModifierEnabled(isModifierEnabled);
    hero.supplyFunction("canAim", canAim);
    hero.setRuleValueModifier(ruleModifier);
    hero.setHasProperty(hasProperty);

    hero.setDefaultScale(0.75);
}

function hasProperty(entity, property) {
    return property == "BREATHE_SPACE";
}

function isModifierEnabled(entity, modifier) {
    if (modifier.name() == "fiskheroes:regeneration") {
        return (entity.getHealth()) < 3;
    }
    else if (modifier.name() == "fiskheroes:cryo_charge") {
        return (!entity.getData("fiskheroes:aiming"));
    }
    else if (modifier.name() == "fiskheroes:ice_punch") {
        return (!entity.getData("fiskheroes:aiming"));
    }
    else if (modifier.name() == "fiskheroes:icicles") {
        return (!entity.getData("fiskheroes:aiming"));
    }
    return true;
}

function canAim(entity) {
    return true;
}

function ruleModifier(entity, rule) {
    if (rule.name() == "fiskheroes:cooldown_energyblast") {
        return 20.0;
    }
    else if (rule.name() == "fiskheroes:dmg_laserbolt") {
        return 2.0;
    }
    return null;
}