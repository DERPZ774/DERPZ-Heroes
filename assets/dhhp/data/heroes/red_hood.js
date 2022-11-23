function init(hero) {
    hero.setName("Red Hood");
    hero.setTier(6);

    hero.setHelmet("Mask");
    hero.setChestplate("Jacket");
    hero.setLeggings("item.superhero_armor.piece.pants");
    hero.setBoots("item.superhero_armor.piece.boots");
    hero.addEquipment("fiskheroes:grappling_gun");
    hero.addPrimaryEquipment("fiskheroes:grappling_gun", true);
    hero.addPrimaryEquipment("fiskheroes:desert_eagle{Dual:1}", true, item => item.nbt().getBoolean("Dual"));

    hero.addPowers("dhhp:red_hood");
    hero.addAttribute("FALL_RESISTANCE", 6.0, 0);
    hero.addAttribute("WEAPON_DAMAGE", 3.75, 0);
    hero.addAttribute("SPRINT_SPEED", 0.10, 1);
    hero.addAttribute("PUNCH_DAMAGE", 6.5, 0);
    hero.addAttribute("JUMP_HEIGHT", 0.8, 0);

    hero.addKeyBind("AIM", "key.aim", -1);
    hero.addKeyBind("GUN_RELOAD", "key.reload", 1);
    hero.addKeyBind("UTILITY_BELT", "key.utilityBelt", 2);

    hero.setKeyBindEnabled((entity, keyBind) => keyBind != "GUN_RELOAD" || entity.getHeldItem().isGun() && !entity.getData("fiskheroes:aiming"));
    hero.setHasPermission((entity, permission) => permission == "USE_GUN");
    hero.supplyFunction("canAim", entity => entity.getHeldItem().isGun());
}