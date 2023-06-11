var utils = implement("dhhp:external/utils");

function init(hero) {
    hero.setName("Atom Eve");
    hero.setVersion("Invincible");
    hero.setTier(7);
    hero.hide();

    hero.setHelmet("item.superhero_armor.piece.hair");
    hero.setChestplate("item.superhero_armor.piece.chestpiece");
    hero.setLeggings("shorts");
    hero.setBoots("item.superhero_armor.piece.boots");

    hero.addPowers("dhhp:atom_eve");
    hero.addAttribute("PUNCH_DAMAGE", 8.0, 0);
    hero.addAttribute("FALL_RESISTANCE", 1.0, 1);
    hero.addAttribute("JUMP_HEIGHT", 2.0, 0);
    hero.addAttribute("SPRINT_SPEED", 0.25, 1);
    hero.addAttribute("IMPACT_DAMAGE", 0.25, 1);

    hero.addKeyBind("SHIELD", "Shielding", 1);

    hero.setModifierEnabled(isModifierEnabled);
    hero.setTickHandler((entity, manager) => {
        utils.all_tick(entity, manager, "dhhp:hero.landing", 1000)
    });
}

function isModifierEnabled(entity, modifier) {
    switch (modifier.name()) {
        case "fiskheroes:regeneration":
            return entity.getHealth() < 3;
        default:
            return utils.flight_auto_modifier(entity, modifier, -10);
    }
}