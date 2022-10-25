function init(hero) {
    hero.setName("Thor");
    hero.setTier(5);
    hero.setVersion("Comics");
    hero.hide();

    hero.setHelmet("Helmet");
    hero.setChestplate("item.superhero_armor.piece.chestpiece");
    hero.setLeggings("item.superhero_armor.piece.pants");
    hero.setBoots("item.superhero_armor.piece.boots");

	hero.addPowers("dhhp:god_of_thunder");

    hero.addAttribute("FALL_RESISTANCE", 1.0, 1);
    hero.addAttribute("PUNCH_DAMAGE", 11.0, 0);
    hero.addAttribute("SPRINT_SPEED", 0.45, 1);

	hero.addKeyBind("SUMMON_MJOLNIR", "Summon Mjolnir", 1);
	hero.addKeyBind("HOVER", "key.hover", 2);
    hero.addKeyBind("CHARGED_BEAM", "Throw Mjolnir", 3);
    hero.addKeyBind("CHARGE_ENERGY", "Charge Lightning", 4);

    hero.setHasProperty(hasProperty);
    hero.setRuleValueModifier(ruleModifier);
    hero.addAttributeProfile("MJONIR", mjonirProfile);
    hero.setAttributeProfile(getAttributeProfile);
    hero.setModifierEnabled(isModifierEnabled);
    hero.setKeyBindEnabled(isKeyBindEnabled);
    hero.supplyFunction("canDischargeEnergy", isHoldingMjonir);
}

function hasProperty(entity, property) {
    return property == "BREATHE_SPACE";
}

function getAttributeProfile(entity) {
    if (entity.getData("dhhp:dyn/mjonir")) {
        return "MJONIR";
    }
    return true;
}

function mjonirProfile(profile) {
    profile.inheritDefaults();
    profile.addAttribute("PUNCH_DAMAGE", 14.0, 0);
    profile.addAttribute("SPRINT_SPEED", 0.75, 1);
}

function ruleModifier(entity, rule) {
    if (rule.name() == "fiskheroes:cooldown_lightningcast") {
        return 40.0;
    }
    else if (rule.name() == "fiskheroes:dmg_lightningcast") {
        return 14.0;
    }
    else if (rule.name() == "fiskheroes:range_lightningcast") {
        return 20.0;
    }
    else if (rule.name() == "fiskheroes:radius_lightningchain") {
        return 6.0;
    }
    else if (rule.name() == "fiskheroes:ticks_energymanipcharge") {
        return 100.0;
    }
    else if (rule.name() == "fiskheroes:range_energydischarge") {
        return 100.0;
    }
    else if (rule.name() == "fiskheroes:dmg_energydischarge") {
        return 25.0;
    }
    else if (rule.name() == "fiskheroes:range_chargedbeam") {
        return 16.0;
    }
    return null;
}

function isModifierEnabled(entity, modifier) {
    var mjonir = (entity.getData("dhhp:dyn/mjonir")) && (entity.getHeldItem().isEmpty());

    if (modifier.name() == "fiskheroes:flight") {
        return mjonir;
    }
    else if (modifier.name() == "fiskheroes:lightning_cast") {
        return mjonir && !entity.getData("fiskheroes:beam_charge");
    }
    else if (modifier.name() == "fiskheroes:energy_manipulation") {
        return mjonir && !entity.getData("fiskheroes:beam_charge");
    }
    else if (modifier.name() == "fiskheroes:hover") {
        return mjonir;
    }
    else if (modifier.name() == "fiskheroes:regeneration") {
        return mjonir;
    }
    return true;
}

function isHoldingMjonir(entity) {
    return entity.getData("dhhp:dyn/mjonir");
}

function isKeyBindEnabled(entity, keyBind) {
    var mjonir = (entity.getData("dhhp:dyn/mjonir"));
    
    switch (keyBind) {
        case "SUMMON_MJOLNIR":
            return (entity.getHeldItem().isEmpty());
        case "CHARGE_ENERGY":
            return mjonir && (entity.getHeldItem().isEmpty());
        case "HOVER":
            return mjonir && (entity.getHeldItem().isEmpty());
        case "CHARGED_BEAM":
            return mjonir && (entity.getHeldItem().isEmpty());
        default:
            return true;
    }
}