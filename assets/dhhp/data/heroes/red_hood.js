function init(hero) {
    hero.setName("Red Hood");
    hero.setTier(6);

    hero.setHelmet("Mask");
    hero.setChestplate("Jacket");
    hero.setLeggings("item.superhero_armor.piece.pants");
    hero.setBoots("item.superhero_armor.piece.boots");
    hero.addEquipment("fiskheroes:grappling_gun");
    hero.addPrimaryEquipment("fiskheroes:grappling_gun", true);

    hero.addPowers("dhhp:red_hood");
    hero.addAttribute("FALL_RESISTANCE", 6.0, 0);
    hero.addAttribute("WEAPON_DAMAGE", 3.75, 0);
    hero.addAttribute("SPRINT_SPEED", 0.10, 1);
    hero.addAttribute("PUNCH_DAMAGE", 6.5, 0);
    hero.addAttribute("JUMP_HEIGHT", 0.8, 0);

    hero.addKeyBind("AIM", "key.aim", 1);
    hero.addKeyBind("UTILITY_BELT", "key.utilityBelt", 2);

    hero.setHasPermission(hasPermission);
    hero.supplyFunction("canAim", canAim);
    hero.addSoundEvent("AIM_START", "dhhp:gun_reload");
    hero.addSoundEvent("AIM_STOP", "dhhp:gun_holster");
}

function hasPermission(entity, permission) {
    return permission == "USE_GRAPPLING_GUN";
}

function canAim(entity) {
    return entity.getHeldItem().isEmpty();
}