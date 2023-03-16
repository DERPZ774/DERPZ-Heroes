var utils = implement("dhhp:external/utils");
function init(hero) {
    hero.setName("Omniman");
    hero.setVersion("Invincible");
    hero.setTier(8);

    hero.setChestplate("item.superhero_armor.piece.chestpiece");
    hero.setLeggings("item.superhero_armor.piece.pants");
    hero.setBoots("item.superhero_armor.piece.boots");

    hero.addPowers("dhhp:viltrumite_physiology");

    hero.addAttribute("BASE_SPEED_LEVELS", 2.0, 0);
    hero.addAttribute("MAX_HEALTH", 5.0, 0);
    hero.addAttribute("PUNCH_DAMAGE", 10.5, 0);
    hero.addAttribute("SPRINT_SPEED", 0.45, 1);
    hero.addAttribute("KNOCKBACK", 2.0, 0);
    hero.addAttribute("IMPACT_DAMAGE", 0.25, 1);

    hero.addKeyBind("SUPER_SPEED", "key.superSpeed", 1);
    hero.addKeyBind("SLOW_MOTION", "key.slowMotion", 2);
    hero.addKeyBind("GROUND_SMASH", "key.groundSmash", 3);


    hero.setModifierEnabled(isModifierEnabled);
    hero.setHasProperty(hasProperty);
    hero.setKeyBindEnabled(isKeyBindEnabled);
    hero.addSoundEvent("MASK_OPEN", "dhhp:think_mark");

    hero.setTickHandler((entity, manager) => {
        utils.flight_booster(entity, manager)
        utils.moon_teleport(entity, manager, 3000)
    });
}

function hasProperty(entity, property) {
    return property == "BREATHE_SPACE" || property == "MASK_TOGGLE";
}

function isKeyBindEnabled(entity, keyBind) {
    switch (keyBind) {
        case "HOVER":
            return !entity.getData("fiskheroes:gliding");
        default:
            return true
    }
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