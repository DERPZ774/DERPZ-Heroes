var utils = implement("dhhp:external/utils");

function init(hero) {
    hero.setName("Buttercup");
    hero.setVersion("PowerPuff Girls");
    hero.setTier(7);

    hero.setHelmet("Head");

    hero.addPowers("dhhp:chemical_x", "dhhp:spice");
    hero.addAttribute("BASE_SPEED_LEVELS", 3.0, 0);
    hero.addAttribute("FALL_RESISTANCE", 1.0, 1);
    hero.addAttribute("JUMP_HEIGHT", 2.0, 0);
    hero.addAttribute("PUNCH_DAMAGE", 10.25, 0);
    hero.addAttribute("KNOCKBACK", 1.75, 0);
    hero.addAttribute("IMPACT_DAMAGE", 0.25, 1);

    hero.addKeyBind("HEAT_VISION", "Heat Vision", 1);
    hero.addKeyBind("GROUND_SMASH", "key.groundSmash", 2);
    hero.addKeyBind("EARTHQUAKE", "key.earthquake", 3);
    hero.addKeyBind("SUPER_SPEED", "key.superSpeed", 4);

    hero.setModifierEnabled(isModifierEnabled);
    hero.setHasProperty((entity, property) => property == "BREATHE_SPACE");
    hero.setKeyBindEnabled(isKeyBindEnabled);
    hero.setDefaultScale(0.47);

    hero.setTickHandler((entity, manager) => {
        utils.all_tick(entity, manager, "dhhp:hero.landing", 1000);
    });
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
    var boostflight = entity.isSprinting() && entity.getData("fiskheroes:flying")

    switch (keyBind) {
        case "SUPER_SPEED":
            return !entity.getData("fiskheroes:flying");
        case "HEAT_VISION":
            return !boostflight && !entity.getData("fiskheroes:flying");
        case "EARTHQUAKE":
            return !boostflight && !entity.getData("fiskheroes:flying");
        case "GROUND_SMASH":
            return !boostflight && !entity.getData("fiskheroes:flying");
        default:
            return true;
    }
}