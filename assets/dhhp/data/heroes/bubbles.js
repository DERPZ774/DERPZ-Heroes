var utils = implement("dhhp:external/utils");

function init(hero) {
    hero.setName("Bubbles");
    hero.setVersion("PowerPuff Girls");
    hero.setTier(7);

    hero.setHelmet("Head");

    hero.addPowers("dhhp:chemical_x", "dhhp:nice");
    hero.addAttribute("FALL_RESISTANCE", 1.0, 1);
    hero.addAttribute("JUMP_HEIGHT", 2.0, 0);
    hero.addAttribute("PUNCH_DAMAGE", 8.0, 0);
    hero.addAttribute("KNOCKBACK", 1.2, 0);
    hero.addAttribute("SPRINT_SPEED", 0.35, 1);
    hero.addAttribute("BASE_SPEED_LEVELS", 1.0, 0);
    hero.addAttribute("IMPACT_DAMAGE", 0.25, 1);

    hero.addKeyBind("CHARGED_BEAM", "Heat Vision", 1);
    hero.addKeyBind("SONIC_WAVES", "Ultrasonic scream", 2);
    hero.addKeyBind("SUPER_SPEED", "key.superSpeed", 3);

    hero.setModifierEnabled(isModifierEnabled);
    hero.setHasProperty(hasProperty);
    hero.setKeyBindEnabled(isKeyBindEnabled);
    hero.setDefaultScale(0.47);

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