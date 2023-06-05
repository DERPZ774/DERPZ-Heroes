function init(hero) {
    hero.setName("Atom Eve");
    hero.setVersion("Invincible");
    hero.setTier(3);

    hero.setHelmet("item.superhero_armor.piece.hair");
    hero.setChestplate("item.superhero_armor.piece.chestpiece");
    hero.setLeggings("shorts");
    hero.setBoots("item.superhero_armor.piece.boots");

    hero.addPowers("dhhp:atom_eve");
    hero.addAttribute("PUNCH_DAMAGE", 8.0, 0);
}