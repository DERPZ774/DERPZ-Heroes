var utils = implement("dhhp:external/utils");

function init(hero) {
    hero.setName("Invincible");
    hero.setVersion("Invincible");
    hero.setTier(8);

    hero.setHelmet("mask");
    hero.setChestplate("item.superhero_armor.piece.chestpiece");
    hero.setLeggings("item.superhero_armor.piece.pants");
    hero.setBoots("item.superhero_armor.piece.boots");

    hero.addPowers("dhhp:viltrumite_physiology");

    hero.addAttribute("BASE_SPEED_LEVELS", 1.0, 0);
    hero.addAttribute("MAX_HEALTH", 3.0, 0);
    hero.addAttribute("PUNCH_DAMAGE", 10.0, 0);
    hero.addAttribute("SPRINT_SPEED", 0.40, 1);
    hero.addAttribute("KNOCKBACK", 2.0, 0);
    hero.addAttribute("IMPACT_DAMAGE", 0.25, 1);

    hero.addKeyBind("SUPER_SPEED", "key.superSpeed", 1);
    hero.addKeyBind("SLOW_MOTION", "key.slowMotion", 2);
    hero.addKeyBind("GROUND_SMASH", "key.groundSmash", 3);


    hero.setModifierEnabled(isModifierEnabled);
    hero.setHasProperty(hasProperty);

    hero.setTickHandler((entity, manager) => {
        utils.flight_booster(entity, manager)
        utils.moon_teleport(entity, manager, 3000)
    });
}

function hasProperty(entity, property) {
    return property == "BREATHE_SPACE";
}


function isModifierEnabled(entity, modifier) {
    switch (modifier.name()) {
        case "fiskheroes:regeneration":
            return entity.getHealth() < 3;
        case "fiskheroes:flight":
            return !entity.getData("fiskheroes:gliding");
        case "fiskheroes:hover":
            return !entity.getData("fiskheroes:gliding");
        default:
            return true;
    }
}
//todo fix landing