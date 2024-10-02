var utils = implement("dhhp:external/utils");
var team = implement("dhhp:external/ppg_boost");

function init(hero) {
    hero.setName("Buttercup");
    hero.setVersion("PowerPuff Girls");
    hero.setTier(7);

    hero.setHelmet("Head");

    hero.addPowers("dhhp:chemical_x", "dhhp:spice");
    hero.addAttribute("BASE_SPEED_LEVELS", 3.0, 0);
    hero.addAttribute("FALL_RESISTANCE", 1.0, 1);
    hero.addAttribute("JUMP_HEIGHT", 2.0, 0);
    hero.addAttribute("PUNCH_DAMAGE", 7.5, 0);
    hero.addAttribute("KNOCKBACK", 1.75, 0);
    hero.addAttribute("IMPACT_DAMAGE", 0.25, 1);
    hero.addAttribute("SPRINT_SPEED", 0.15, 1);


    hero.addKeyBind("HEAT_VISION", "Heat Vision", 1);
    hero.addKeyBind("GROUND_SMASH", "key.groundSmash", 2);
    hero.addKeyBind("EARTHQUAKE", "key.earthquake", 3);
    hero.addKeyBind("SUPER_SPEED", "key.superSpeed", 4);

    hero.setModifierEnabled(isModifierEnabled);
    hero.setHasProperty((entity, property) => property == "BREATHE_SPACE");
    hero.setKeyBindEnabled(isKeyBindEnabled);
    hero.setDefaultScale(0.47);

    hero.setTickHandler((entity, manager) => {
        team.checkBoost(entity, manager, "dhhp:buttercup");
        utils.all_tick(entity, manager, "dhhp:hero.landing", 1000);
    });
    hero.setAttributeProfile(getAttributeProfile);
    hero.addAttributeProfile("BOOST_HALF", profile => {
        profile.inheritDefaults();
        profile.addAttribute("PUNCH_DAMAGE", 8.5, 0);
        profile.addAttribute("SPRINT_SPEED", 0.30, 1);
        profile.addAttribute("IMPACT_DAMAGE", 0.50, 1);
        profile.addAttribute("KNOCKBACK", 2, 0);
        profile.addAttribute("BASE_SPEED_LEVELS", 4.0, 0);
    });

    hero.addAttributeProfile("BOOST_FULL", profile => {
        profile.inheritDefaults();
        profile.addAttribute("PUNCH_DAMAGE", 9.5, 0);
        profile.addAttribute("SPRINT_SPEED", 0.45, 1);
        profile.addAttribute("IMPACT_DAMAGE", 0.75, 1);
        profile.addAttribute("KNOCKBACK", 2.5, 0);
        profile.addAttribute("BASE_SPEED_LEVELS", 5.0, 0);
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
    switch (keyBind) {
        case "SUPER_SPEED":
            return !entity.getData("fiskheroes:flying");
        default:
            return true;
    }
}

function getAttributeProfile(entity) {
    if (entity.getData("dhhp:dyn/statboost1") && !entity.getData("dhhp:dyn/statboost2") && !entity.getData("dhhp:dyn/statboost") || entity.getData("dhhp:dyn/statboost2") && !entity.getData("dhhp:dyn/statboost1") && !entity.getData("dhhp:dyn/statboost")) {
        return "BOOST_HALF"
    } else if (entity.getData("dhhp:dyn/statboost")) {
        return "BOOST_FULL"
    }
}