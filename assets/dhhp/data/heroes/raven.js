function init(hero) {
    hero.setName("Raven");
    hero.setVersion("Teen Titans");
    hero.setTier(3);
    hero.hide();

    hero.setHelmet("item.superhero_armor.piece.hair");
    hero.setChestplate("item.superhero_armor.piece.chestpiece");
    hero.setLeggings("Skirt");
    hero.setBoots("item.superhero_armor.piece.boots");

    hero.addPowers("dhhp:azarath");

    hero.addAttribute("PUNCH_DAMAGE", 8.0, 0);
    hero.addAttribute("WEAPON_DAMAGE", -0.25, 1);
    hero.addAttribute("SPRINT_SPEED", 0.25, 1);

    hero.addKeyBind("AIM", "key.aim", -1);
    hero.addKeyBind("ENERGY_PROJECTION", "Shadow Projection", 1);
    hero.addKeyBind("CHARGED_BEAM", "Shadow Beam", 1);
    hero.addKeyBind("SPELL_MENU", "Spell Book", 2);
    hero.addKeyBind("SHIELD", "Wing Shielding", 3);
    hero.addKeyBind("SHADOWDOME", "Darkness", 4);
    hero.addKeyBind("HOVER", "key.hover", 4);
    hero.addKeyBind("STEEL_TRANSFORM", "Daughter Of Trigon", 5);

    hero.addAttributeProfile("STEEL", duaghter_of_trigon);
    hero.setAttributeProfile(getAttributeProfile);
    hero.setKeyBindEnabled(isKeyBindEnabled);
    hero.setTierOverride(getTierOverride);
    hero.supplyFunction("canAim", canAim);
    hero.setModifierEnabled(isModifierEnabled);
}

function getTierOverride(entity) {
    return entity.getData("fiskheroes:dyn/steeled") ? 5 : 3;
}

function getAttributeProfile(entity) {
    if (entity.getData("fiskheroes:dyn/steeled")) {
        return "STEEL";
    }
    return true;
}

function duaghter_of_trigon(profile) {
    profile.addAttribute("FALL_RESISTANCE", 1.0, 1);
    profile.addAttribute("JUMP_HEIGHT", 1.5, 1);
    profile.addAttribute("PUNCH_DAMAGE", 12.5, 0);
    profile.addAttribute("KNOCKBACK", 4.0, 0);
    profile.addAttribute("SPRINT_SPEED", 0.45, 1);
}

function isKeyBindEnabled(entity, keyBind) {
    switch (keyBind) {
        case "CHARGED_BEAM":
            return (!entity.getData("fiskheroes:dyn/steeled"));
        case "ENERGY_PROJECTION":
            return (entity.getData("fiskheroes:dyn/steeled"));
        case "HOVER":
            return !entity.isOnGround();
        case "SHADOWDOME":
            return entity.isOnGround();
        default:
            return true;
    }
}

function isModifierEnabled(entity, modifier) {
    if (modifier.name() == "fiskheroes:regeneration") {
        return entity.getData("fiskheroes:dyn/steeled");
    }
    else if (modifier.name() == "fiskheroes:potion_immunity") {
        return (entity.getData("fiskheroes:dyn/steeled"));
    }
    else if (modifier.name() == "fiskheroes:charged_beam") {
        return (!entity.getData("fiskheroes:dyn/steeled")) && (!entity.getData("fiskheroes:shield"));
    }
    else if (modifier.name() == "fiskheroes:energy_projection") {
        return (entity.getData("fiskheroes:dyn/steeled")) && (!entity.getData("fiskheroes:shield"));
    }
    else if (modifier.name() == "fiskheroes:lightning_cast") {
        return (entity.getData("fiskheroes:dyn/steeled")) && (!entity.getData("fiskheroes:shield"));
    }
    else if (modifier.name() == "fiskheroes:hover") {
        return !entity.isOnGround();
    }
    else if (modifier.name() == "fiskheroes:shadowdome") {
        return (entity.isOnGround()) && (!entity.getData("fiskheroes:beam_charging"));
    }
    return true;
}

function canAim(entity) {
    return entity.getHeldItem().isEmpty() && !entity.isPunching();
}