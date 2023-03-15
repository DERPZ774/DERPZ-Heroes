function init(hero) {
    hero.setName("Red X");
    hero.setTier(5);

    hero.setHelmet("Mask");
    hero.setChestplate("item.superhero_armor.piece.chestpiece");
    hero.setLeggings("item.superhero_armor.piece.pants");
    hero.setBoots("item.superhero_armor.piece.boots");
    hero.addPrimaryEquipment("fiskheroes:grappling_gun", true);

    hero.addPowers("dhhp:red_x");

    hero.addAttribute("PUNCH_DAMAGE", 4.5, 0);
    hero.addAttribute("WEAPON_DAMAGE", 2.5, 0);
    hero.addAttribute("FALL_RESISTANCE", 6.0, 0);
    hero.addAttribute("JUMP_HEIGHT", 1.0, 0);
    hero.addAttribute("SPRINT_SPEED", 0.45, 1);

    hero.addKeyBind("UTILITY_BELT", "key.utilityBelt", 1);

    hero.setHasPermission(hasPermission);
}

function hasPermission(entity, permission) {
    return permission == "USE_GRAPPLING_GUN";
}