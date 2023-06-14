function init(hero) {
    hero.setName("Red Hood");
    hero.setTier(6);

    hero.setHelmet("Mask");
    hero.setChestplate("Jacket");
    hero.setLeggings("item.superhero_armor.piece.pants");
    hero.setBoots("item.superhero_armor.piece.boots");
    hero.addEquipment("fiskheroes:grappling_gun");
    hero.addPrimaryEquipment("fiskheroes:grappling_gun", true);
    hero.addPrimaryEquipment("fiskheroes:desert_eagle{display:{Name:\u00A7rRed Hood's Dual Pistols}, Dual:1}", true, item => item.nbt().getBoolean("Dual") && item.nbt().getCompoundTag("display").getString("Name") == "\u00A7rRed Hood's Dual Pistols");

    hero.addPowers("dhhp:red_hood");
    hero.addAttribute("FALL_RESISTANCE", 8.0, 0);
    hero.addAttribute("WEAPON_DAMAGE", 4.75, 0);
    hero.addAttribute("SPRINT_SPEED", 0.10, 1);
    hero.addAttribute("PUNCH_DAMAGE", 6.5, 0);
    hero.addAttribute("JUMP_HEIGHT", 0.8, 0);

    hero.addKeyBind("AIM", "key.aim", -1);
    hero.addKeyBind("GUN_RELOAD", "key.reload", 1);
    hero.addKeyBind("UTILITY_BELT", "key.utilityBelt", 2);

    hero.setHasPermission((entity, permission) => permission == "USE_GUN" || permission == "USE_GRAPPLING_GUN");
    hero.setKeyBindEnabled(isKeyBindEnabled);
    hero.supplyFunction("canAim", entity => entity.getHeldItem().isGun());
}

function isKeyBindEnabled(entity, keyBind) {
    switch (keyBind) {
        case "GUN_RELOAD":
            return entity.getHeldItem().isGun();
        case "UTILITY_BELT":
            return !entity.getHeldItem().isGun();
        default:
            return true;
    }
}

function isModifierEnabled(entity, modifier) {
    switch (modifier.name) {
        case "fiskheroes:equipment":
            return entity.getHeldItem().isEmpty() && entity.getData("fiskheroes:utility_belt_type") == -1
        case "fiskheroes:aiming":
            return entity.getData("fiskheroes:utility_belt_type") == -1;
    }
}