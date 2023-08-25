function init(hero) {
    hero.setName("Doctor Fate");
    hero.setTier(10);

    hero.setHelmet("Helmet");

    hero.addPowers("dhhp:lord_of_order");
    hero.addAttribute("PUNCH_DAMAGE", 10.5, 0);
    hero.addAttribute("SPRINT_SPEED", 0.4, 1);
    hero.addAttribute("WEAPON_DAMAGE", -0.50, 1);
    hero.addAttribute("FALL_RESISTANCE", 4, 0);

    hero.addAttributeProfile("INACTIVE", profile => {});
    hero.setAttributeProfile(getAttributeProfile);
    hero.setTierOverride(entity => entity.getData("dhhp:dyn/helmet") ? 10 : 0);
    hero.setHasProperty((entity, property) => property == "BREATHE_SPACE");

    hero.setTickHandler((entity, manager) => {
        if (!entity.getData("dhhp:dyn/helmet")) {
            manager.setData(entity, "dhhp:dyn/helmet", true);
        }
    });
}

function getAttributeProfile(entity) {
    if (entity.getData("dhhp:dyn/helmet")) {
        return null;
    }
    return "INACTIVE";
}

/*
First powerset
Melee
Enhanced melee mode (render two anks on the arms when)
TP
Beams
Ranged spells
Support Powerset
slow spells
Support 
Healing, strength, haste, speed, etc beam
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