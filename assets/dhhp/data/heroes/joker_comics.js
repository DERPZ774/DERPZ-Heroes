function init(hero) {
    hero.setName("The Joker");
    hero.setVersion("Comics");
    hero.setTier(2);

    hero.setHelmet("item.superhero_armor.piece.head");
    hero.setChestplate("item.superhero_armor.piece.chestpiece");
    hero.setLeggings("item.superhero_armor.piece.pants");
    hero.setBoots("Shoes");

    hero.addPowers("fiskheroes:retractable_blade", "dhhp:joker");
    hero.addAttribute("PUNCH_DAMAGE", 4.0, 0);
    hero.addAttribute("WEAPON_DAMAGE", 1.0, 0);
    hero.addAttribute("FALL_RESISTANCE", 2.5, 0);

    hero.addKeyBind("BLADE", "key.blade", 1);
    hero.addKeyBind("CHARGED_BEAM", "Acid Flower", 2);

    hero.addAttributeProfile("BLADE", bladeProfile);
    hero.setAttributeProfile(getProfile);
    hero.setDamageProfile(getProfile);
    hero.addDamageProfile("BLADE", {"types": {"SHARP": 1.0}});
}

function bladeProfile(profile) {
    profile.inheritDefaults();
    profile.addAttribute("PUNCH_DAMAGE", 7.0, 0);
}

function getProfile(entity) {
    return entity.getData("fiskheroes:blade") ? "BLADE" : null;
}
