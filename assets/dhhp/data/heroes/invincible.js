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
    hero.addAttribute("PUNCH_DAMAGE", 10.0, 0);
    hero.addAttribute("SPRINT_SPEED", 0.40, 1);
    hero.addAttribute("KNOCKBACK", 2.0, 0);
    hero.addAttribute("IMPACT_DAMAGE", 0.25, 1);
    hero.addAttribute("FALL_RESISTANCE", 1, 1);

    hero.addKeyBind("SUPER_SPEED", "key.superSpeed", 1);
    hero.addKeyBind("SLOW_MOTION", "key.slowMotion", 2);
    hero.addKeyBind("GROUND_SMASH", "key.groundSmash", 3);

    hero.setModifierEnabled(isModifierEnabled);
    hero.setHasProperty((entity, property) => property == "BREATHE_SPACE");
    hero.setKeyBindEnabled(isKeyBindEnabled);

    hero.setTickHandler((entity, manager) => {
        utils.all_tick(entity, manager, "dhhp:hero.landing", 1000);
        //add stat changes

        if (!entity.getData("dhhp:dyn/adrenaline") && entity.getHealth() < 4 && entity.getData("dhhp:dyn/adrenaline_cooldown") == 0) {
            manager.setData(entity, "dhhp:dyn/adrenaline", true);
        } 
         if (entity.getData("dhhp:dyn/adrenaline_cooldown") == 1) {
            manager.setData(entity, "dhhp:dyn/adrenaline", false);
        }

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
