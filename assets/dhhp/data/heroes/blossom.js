var domain = "dhhp";
var utils = implement("dhhp:external/utils");
var shadowDome = implement(domain + ":external/ppg_boost");
function init(hero) {
    hero.setName("Blossom");
    hero.setVersion("PowerPuff Girls");
    hero.setTier(7);

    hero.setHelmet("Head");

    hero.addPowers("dhhp:chemical_x", "dhhp:nice");
    hero.addAttribute("FALL_RESISTANCE", 1.0, 1);
    hero.addAttribute("JUMP_HEIGHT", 2.0, 0);
    hero.addAttribute("PUNCH_DAMAGE", 7.0, 0);
    hero.addAttribute("KNOCKBACK", 1.5, 0);
    hero.addAttribute("SPRINT_SPEED", 0.25, 1);
    hero.addAttribute("BASE_SPEED_LEVELS", 2.0, 0);
    hero.addAttribute("IMPACT_DAMAGE", 0.25, 1);

    hero.addKeyBind("HEAT_VISION", "Heat Vision", 1);
    hero.addKeyBind("CHARGED_BEAM", "Freeze Breath", 2);
    hero.addKeyBind("SUPER_SPEED", "key.superSpeed", 3);
    hero.addKeyBind("ENERGY_PROJECTION", "Heat Breath", 4);

    hero.setModifierEnabled(isModifierEnabled);
    hero.setHasProperty((entity, property) => property == "BREATHE_SPACE");
    hero.setKeyBindEnabled(isKeyBindEnabled);
    hero.setDefaultScale(0.47);

    hero.setTickHandler((entity, manager) => {
        if (!entity.getData(domain + ":dyn/boolean")) {
            manager.setData(entity, "fiskheroes:lightsout", true);
            manager.setData(entity, domain + ":dyn/float", 0);
            manager.setData(entity, domain + ":dyn/boolean", true);
        }

        shadowDome.checkBoost(entity, manager, "dhhp:blossom");

        utils.all_tick(entity, manager, "dhhp:hero.landing", 1000);
    });
    hero.setAttributeProfile(getAttributeProfile);
    hero.addAttributeProfile("BOOST", profile => {
        profile.inheritDefaults();
        profile.addAttribute("FALL_RESISTANCE", 1, 1);
        profile.addAttribute("JUMP_HEIGHT", 2, 0);
        profile.addAttribute("PUNCH_DAMAGE", 6, 0);
        profile.addAttribute("SPRINT_SPEED", 1, 0);
    });
}

function isModifierEnabled(entity, modifier) {
    switch (modifier.name()) {
        case "fiskheroes:regeneration":
            return entity.getHealth() < 3;
        case "fiskheroes:super_speed":
            return !entity.getData("fiskheroes:flying");
        case "fiskheroes:energy_projection":
            return !entity.getData("fiskheroes:beam_charging");
        default:
            return utils.flight_auto_modifier(entity, modifier, -10);
    }
}

function isKeyBindEnabled(entity, keyBind) {
    switch (keyBind) {
        case "SUPER_SPEED":
            return !entity.getData("fiskheroes:flying");
        case "CHARGED_BEAM":
            return !entity.getData("fiskheroes:energy_projection");
        case "ENERGY_PROJECTION":
            return !entity.getData("fiskheroes:beam_charging");
        default:
            return true;
    }
}

function getAttributeProfile(entity) {
    if (entity.getData(domain + ":dyn/statboost")) {
        return "BOOST"
    }
}