function init(hero) {
    hero.setName("Cacturas/KupaSuit");
    hero.setTier(5);
    hero.hide();

    hero.setHelmet("item.superhero_armor.piece.mask");
    hero.setChestplate("item.superhero_armor.piece.jacket");
    hero.setLeggings("item.superhero_armor.piece.pants");
    hero.setBoots("item.superhero_armor.piece.shoes");

    hero.addPowers("dhhp:cacturas");

    hero.addAttribute("FALL_RESISTANCE", 15.0, 0);
    hero.addAttribute("JUMP_HEIGHT", 1.0, 0);
    hero.addAttribute("PUNCH_DAMAGE", 15.0, 0);
    hero.addAttribute("SPRINT_SPEED", 0.30, 1);
    hero.addAttribute("BASE_SPEED_LEVELS", 8.0, 0);

    hero.addKeyBind("SUPER_SPEED", "Zappy mf", 1);
    hero.addKeyBind("SLOW_MOTION", "Sexy mf", 2);
    hero.addKeyBind("SIZE_MANIPULATION", "Sub-Catomic", 3);

    hero.supplyFunction("getMinSize", getMinSize);
    hero.supplyFunction("isInstant", true);

    hero.setHasProperty(hasProperty);
}

function hasProperty(entity, property) {
    return property == "BREATHE_SPACE";
}

function getMinSize(entity) {
    return entity.getData("fiskheroes:dyn/giant_mode_timer") > 0 ? 1 : 0.0625;
}