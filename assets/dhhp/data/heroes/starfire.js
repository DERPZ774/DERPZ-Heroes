function init(hero) {
    hero.setName("Starfire");
    hero.setVersion("Teen Titans");
    hero.setTier(3);
    hero.hide();

    hero.setHelmet("item.superhero_armor.piece.hair");
    hero.setChestplate("item.superhero_armor.piece.chestpiece");
    hero.setLeggings("Skirt");
    hero.setBoots("item.superhero_armor.piece.boots");

    hero.addPowers("dhhp:tamaranean");
	
    hero.addAttribute("FALL_RESISTANCE", 11.0, 0);
    hero.addAttribute("JUMP_HEIGHT", 2.0, 0);
    hero.addAttribute("PUNCH_DAMAGE", 9.75, 0);
    hero.addAttribute("KNOCKBACK", 2, 0);
	hero.addAttribute("SPRINT_SPEED", 0.35, 1);

    hero.addKeyBind("CHARGED_BEAM", "Energy-Beam", 1);
    hero.addKeyBind("ENERGY_PROJECTION", "Energy Projection", 2);
    hero.addKeyBind("AIM", "Blast", 3);
	hero.addKeyBind("STEEL_TRANSFORM", "Tamaranean-Rage", 4);
	
    hero.addAttributeProfile("STEEL", steelProfile);
    hero.setAttributeProfile(getAttributeProfile);
    hero.setHasProperty(hasProperty);
	hero.supplyFunction("canAim", canAim);
    hero.setModifierEnabled(isModifierEnabled);

    hero.setDefaultScale(0.95);
}

function hasProperty(entity, property) {
    return property == "BREATHE_SPACE";
}

function steelProfile(profile) {
    profile.addAttribute("FALL_RESISTANCE", 1.0, 1);
    profile.addAttribute("JUMP_HEIGHT", 4, 0);
    profile.addAttribute("PUNCH_DAMAGE", 12.5, 0);
    profile.addAttribute("SPRINT_SPEED", 0.65, 1);
}

function getAttributeProfile(entity) {
    if (entity.getData("fiskheroes:dyn/steeled")) {
        return "STEEL";
    }
	return null;
} 

function canAim(entity) {
    return !entity.getData("fiskheroes:beam_charge");
}

function isModifierEnabled(entity, modifier) {
    if (modifier.name() == "fiskheroes:regeneration") {
        return (entity.getData("fiskheroes:dyn/steeled"));
    }
    else if (modifier.name() == "fiskheroes:energy_projection") {
        return (!entity.getData("fiskheroes:aiming") && !entity.getData("fiskheroes:beam_charge"));
    }
    else if (modifier.name() == "fiskheroes:charged_beam") {
        return (!entity.getData("fiskheroes:aiming"));
    }
    return true;
}