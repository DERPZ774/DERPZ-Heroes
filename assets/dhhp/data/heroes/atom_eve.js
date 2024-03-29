var utils = implement("dhhp:external/utils");

function init(hero) {
    hero.setName("Atom Eve");
    hero.setVersion("Invincible");
    hero.setTier(6);

    hero.setHelmet("item.superhero_armor.piece.hair");
    hero.setChestplate("Leotard");
    hero.setBoots("item.superhero_armor.piece.boots");

    hero.addPowers("dhhp:atom_eve");
    hero.addAttribute("PUNCH_DAMAGE", 6.5, 0);
    hero.addAttribute("FALL_RESISTANCE", 12.0, 0);
    hero.addAttribute("JUMP_HEIGHT", 2.0, 0);
    hero.addAttribute("SPRINT_SPEED", 0.25, 1);
    hero.addAttribute("IMPACT_DAMAGE", 0.25, 1);

    hero.addKeyBind("AIM", "key.aim", 1);
    hero.addKeyBind("ENERGY_PROJECTION", "Atom Blast", 2);
    hero.addKeyBind("TELEKINESIS", "key.telekinesis", 3);
    hero.addKeyBind("SHIELD", "Shield", 4);
    hero.addKeyBind("TRANSFORM", "Atom Transformation", 5);

    hero.setModifierEnabled(isModifierEnabled);
    hero.setKeyBindEnabled(isKeyBindEnabled);
    hero.setAttributeProfile(getAttributeProfile);
    hero.addAttributeProfile("SHIELD", shieldProfile);
    hero.setHasProperty((entity, property) => property == "BREATHE_SPACE");
    hero.setTierOverride(entity => entity.getData("dhhp:dyn/atom") ? 6 : 2);
    hero.supplyFunction("canAim", entity => entity.getHeldItem().isEmpty() || entity.getData("fiskheroes:telekinesis"));
    hero.setTickHandler((entity, manager) => {
        // utils.all_tick(entity, manager, "dhhp:hero.landing", 1000)
        utils.flight_auto_tick(entity, manager)
        utils.flight_booster_tick(entity, manager)
        utils.moon_teleport_tick(entity, manager, 1000)
    });
}

function shieldProfile(profile) {
    profile.inheritDefaults();
    profile.addAttribute("BASE_SPEED", -0.75, 1);
    profile.addAttribute("JUMP_HEIGHT", -2.0, 1);
}

function getAttributeProfile(entity) {
    return entity.getData("fiskheroes:shield_blocking") ? "SHIELD" : null;
}

function isModifierEnabled(entity, modifier) {
    var atom = entity.getData("dhhp:dyn/atom");
    var boostFlight = entity.isSprinting() && entity.getData("fiskheroes:flying");

    switch (modifier.name()) {
        case "fiskheroes:regeneration":
            return entity.getHealth() < 3 && atom;
        case "fiskheroes:fiskheroes:telekinesis":
            return !entity.getData("fiskheroes:energy_projection") && atom && !entity.getData("fiskheroes:shield") && !boostFlight && entity.getHeldItem().isEmpty();
        case "fiskheroes:shield":
            return !entity.getData("fiskheroes:telekinesis") && !boostFlight && !entity.getData("fiskheroes:energy_projection") && atom && entity.getHeldItem().isEmpty();
        case "fiskheroes:energy_projection":
            return !entity.getData("fiskheroes:telekinesis") && !boostFlight && atom && !entity.getData("fiskheroes:shield") && entity.getHeldItem().isEmpty();
        case "fiskheroes:repulsor_blast":
            return !entity.getData("fiskheroes:telekinesis") && !boostFlight && atom && !entity.getData("fiskheroes:shield") && entity.getHeldItem().isEmpty() && !entity.getData("fiskheroes:energy_projection");
        default:
            return utils.flight_auto_modifier(entity, modifier, -10);
    }
}

function isKeyBindEnabled(entity, keyBind) {
    var atom = entity.getData("dhhp:dyn/atom");
    var boostFlight = entity.isSprinting() && entity.getData("fiskheroes:flying");

    switch (keyBind) {
        case "SHIELD":
            return !entity.getData("fiskheroes:telekinesis") && !boostFlight && !entity.getData("fiskheroes:energy_projection") && atom && entity.getHeldItem().isEmpty() && !entity.getData("fiskheroes:aiming");
        case "ENERGY_PROJECTION":
            return !entity.getData("fiskheroes:telekinesis") && !boostFlight && atom && !entity.getData("fiskheroes:shield") && entity.getHeldItem().isEmpty() && !entity.getData("fiskheroes:aiming");
        case "TELEKINESIS":
            return !entity.getData("fiskheroes:energy_projection") && atom && !entity.getData("fiskheroes:shield") && !boostFlight && entity.getHeldItem().isEmpty() && !entity.getData("fiskheroes:aiming");
        case "TRANSFORM":
            return !entity.getData("fiskheroes:energy_projection") && !entity.getData("fiskheroes:shield") && !boostFlight && !entity.getData("fiskheroes:telekinesis") && !entity.getData("fiskheroes:aiming");
        case "AIM":
            return !entity.getData("fiskheroes:energy_projection") && atom && !entity.getData("fiskheroes:shield") && !boostFlight && entity.getHeldItem().isEmpty() && !entity.getData("fiskheroes:telekinesis");
        default:
            return true;
    }
}