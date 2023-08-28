function init(hero) {
    hero.setName("Doctor Fate");
    hero.setTier(10);

    hero.setHelmet("Helmet");

    hero.addPowers("dhhp:lord_of_order");
    hero.addAttribute("PUNCH_DAMAGE", 11, 0);
    hero.addAttribute("SPRINT_SPEED", 0.4, 1);
    hero.addAttribute("WEAPON_DAMAGE", -0.50, 1);
    hero.addAttribute("FALL_RESISTANCE", 12, 0);

    hero.addKeyBind("TELEPORT", "Teleport", 1);
    hero.addKeyBind("ENERGY_PROJECTION", "Nabus Wraith", 2);
    hero.addKeyBind("SPELL_MENU", "Spell Wheel", 3);
    hero.addKeyBind("MELEE_FORM", "Enhance Combat", 4);


    hero.setTierOverride(entity => entity.getData("dhhp:dyn/helmet") ? 10 : 0);
    hero.setAttributeProfile(getAttributeProfile);
    hero.addAttributeProfile("INACTIVE", profile => {});
    hero.addAttributeProfile("MELEE", meleeProfile);
    hero.setKeyBindEnabled(isKeyBindEnabled);
    hero.setHasProperty((entity, property) => property == "BREATHE_SPACE");
    hero.setModifierEnabled(isModifierEnabled);

    hero.setTickHandler((entity, manager) => {
        if (!entity.getData("dhhp:dyn/helmet")) {
            manager.setData(entity, "dhhp:dyn/helmet", true);
        }

        if (!entity.isSneaking() && !entity.isOnGround() && entity.motionY() < -0.8) {
            manager.setData(entity, "fiskheroes:flying", true);
        }
    });
}

function meleeProfile(profile) {
    profile.inheritDefaults();
    profile.addAttribute("BASE_SPEED", 0.2, 1);
    profile.addAttribute("PUNCH_DAMAGE", 2.0, 0);
}

function getAttributeProfile(entity) {
    if (!entity.getData("dhhp:dyn/helmet")) {
        return "INACTIVE";
    }
    return entity.getData("dhhp:dyn/fate_melee") ? "MELEE" : null;
}

function isModifierEnabled(entity, modifier) {
    var fate = entity.getData("dhhp:dyn/helmet_timer") == 1;
    var boostFlight = entity.isSprinting() && entity.getData("fiskheroes:flying");

    switch (modifier.name()) {
        case "fiskheroes:controlled_flight":
            return fate;
    }
    switch (modifier.id()) {
        case "offensive_spells":
            return !entity.isSneaking();
        case "defensive_spells":
            return entity.isSneaking();
    }

    return true;
}

function isKeyBindEnabled(entity, keyBind) {
    switch (keyBind) {
        case "TELEPORT":
            return;
        case "BLADE":
            return;
        case "SPELL_MENU":
            return;
        case "MELEE_FORM":
            return;
        default:
            return true;
    }
}

/*
Global tp in one of the sets idk what yet

fate byte detection

First powerset
Melee
Enhanced melee mode (render two anks on the arms when)
TP
Beams quickcast spell and beams that do little damage
Ranged spells
Support Powerset
slow spells
Support 
Healing, strength, haste, speed, etc beam
when augment support stuff gets
Telekinesis to hold people down
Defense
shield
Knockback spells
lot of immunities with the removal of regen

Nabuu takeover
you could have it so you can merge all 3 modes and start like flying with ankhs spinning around you and shit then all your keybinds become those scrambled letters
then you glow gold and start growing in size
then bam nabu on a timer for a short time
the nabu takeover should happen randomly but only if the suit is max augments
*/