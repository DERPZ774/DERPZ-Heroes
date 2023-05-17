var utils = implement("dhhp:external/utils");

function init(hero) {
    hero.setName("Thragg");
    hero.setVersion("Invincible");
    hero.setTier(8);

    hero.setChestplate("item.superhero_armor.piece.chestpiece");
    hero.setLeggings("item.superhero_armor.piece.pants");
    hero.setBoots("item.superhero_armor.piece.boots");

    hero.addPowers("dhhp:viltrumite_physiology");

    hero.addAttribute("BASE_SPEED_LEVELS", 2.0, 0);
    hero.addAttribute("MAX_HEALTH", 8.0, 0);
    hero.addAttribute("PUNCH_DAMAGE", 12.5, 0);
    hero.addAttribute("SPRINT_SPEED", 0.45, 1);
    hero.addAttribute("KNOCKBACK", 2.0, 0);
    hero.addAttribute("IMPACT_DAMAGE", 0.25, 1);
    hero.addAttribute("FALL_RESISTANCE", 1, 1);

    hero.addKeyBind("SUPER_SPEED", "key.superSpeed", 1);
    hero.addKeyBind("SLOW_MOTION", "key.slowMotion", 2);
    hero.addKeyBind("GROUND_SMASH", "key.groundSmash", 3);

    hero.setModifierEnabled(isModifierEnabled);
    hero.setHasProperty(hasProperty);
    hero.setKeyBindEnabled(isKeyBindEnabled);

    hero.setTickHandler((entity, manager) => {
        utils.all_tick(entity, manager, "dhhp:hero.landing", 1000);
    });
}

function hasProperty(entity, property) {
    return property == "BREATHE_SPACE";
}

function isModifierEnabled(entity, modifier) {
    switch (modifier.name()) {
        case "fiskheroes:regeneration":
            return entity.getHealth() < 3;
        case "fiskheroes:super_speed":
            return !entity.getData("fiskheroes:flying");
        default:
            return utils.flight_auto_modifier(entity, modifier, -10);
    }
}

function isKeyBindEnabled(entity, keyBind) {
    switch (keyBind) {
        case "SUPER_SPEED":
            return !entity.getData("fiskheroes:flying");
        default:
            return true;
    }
}