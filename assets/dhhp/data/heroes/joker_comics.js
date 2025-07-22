function init(hero) {
    hero.setName("The Joker");
    hero.setVersion("Comics");
    hero.setTier(2);

    hero.setHelmet("item.superhero_armor.piece.head");
    hero.setChestplate("item.superhero_armor.piece.chestpiece");
    hero.setLeggings("item.superhero_armor.piece.pants");
    hero.setBoots("Shoes");

    hero.addPrimaryEquipment("fisktag:weapon{WeaponType:dhhp:crowbar}", true, item => item.nbt().getString("WeaponType") == 'dhhp:crowbar');
    hero.addPowers("dhhp:joker");
    hero.addAttribute("PUNCH_DAMAGE", 4.0, 0);
    hero.addAttribute("WEAPON_DAMAGE", 1.0, 0);
    hero.addAttribute("FALL_RESISTANCE", 2.5, 0);

    hero.addKeyBind("CHARGED_BEAM", "Acid Flower", 1);
}
