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
    hero.addAttribute("FALL_RESISTANCE", 7.0, 0);
    hero.addAttribute("JUMP_HEIGHT", 2.0, 0);
    hero.addAttribute("SPRINT_SPEED", 0.45, 1);

    hero.addKeyBind("CHARGE_TELEPORT", "Charge Teleport", 1);
    hero.addKeyBind("TELEPORT", "Teleport", 1);
    hero.addKeyBind("UTILITY_BELT", "key.utilityBelt", 2);
    hero.addKeyBind("SPELL_MENU", "Illusion Tech", 3);

    hero.setKeyBindEnabled(isKeyBindEnabled);
    hero.setHasPermission(hasPermission);

    hero.setTickHandler((entity, manager) => {
        if (entity.getData("dhhp:dyn/charge_teleport_timer") == 0 && entity.getData("dhhp:dyn/charge_teleport_cooldown")) {
            manager.setData(entity, "dhhp:dyn/charge_teleport_cooldown", false)
        }
        if (entity.getData("dhhp:dyn/charge_teleport_timer") == 1 && !entity.getData("dhhp:dyn/charge_teleport_cooldown")) {
            manager.setData(entity, "dhhp:dyn/charge_teleport", true)
            if (entity.getData("fiskheroes:teleport_timer") > 0) {
                manager.setData(entity, "dhhp:dyn/charge_teleport_cooldown", true)
            }
        }
    });
}

function isKeyBindEnabled(entity, keyBind) {
    switch (keyBind) {
        case "CHARGE_TELEPORT":
            return !entity.getData("dhhp:dyn/charge_teleport_cooldown") && entity.getData("dhhp:dyn/charge_teleport_timer") < 1;
        case "TELEPORT":
            return !entity.getData("dhhp:dyn/charge_teleport_cooldown") && entity.getData("dhhp:dyn/charge_teleport_timer") == 1;
        default:
            return true;
    }
}

function hasPermission(entity, permission) {
    return permission == "USE_GRAPPLING_GUN";
}