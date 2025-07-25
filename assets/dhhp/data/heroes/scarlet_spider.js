function init(hero) {
    hero.setName("Scarlet Spider/Kaine");
    hero.setTier(7);
    hero.setVersion("Comics");

    hero.setHelmet("item.superhero_armor.piece.mask");
    hero.setChestplate("item.superhero_armor.piece.chestpiece");
    hero.setLeggings("item.superhero_armor.piece.pants");
    hero.setBoots("item.superhero_armor.piece.boots");
    
    hero.addPowers("fiskheroes:spider_physiology", "fiskheroes:web_shooters_organic", "dhhp:spider_clone");
    hero.addAttribute("FALL_RESISTANCE", 12.0, 0);
    hero.addAttribute("JUMP_HEIGHT", 2.5, 0);
    hero.addAttribute("PUNCH_DAMAGE", 9.0, 0);
    hero.addAttribute("SPRINT_SPEED", 0.45, 1);
    hero.addAttribute("STEP_HEIGHT", 0.5, 0);
    hero.addAttribute("IMPACT_DAMAGE", 0.5, 1);
    
    hero.addKeyBind("UTILITY_BELT", "Cycle Weaponry", 1);
    hero.addKeyBind("WEB_ZIP", "key.webZip", 2);
    hero.addKeyBind("CHARGED_PUNCH", "Toggle Mark", 2);
    hero.addKeyBindFunc("func_WEB_SWINGING", webSwingingKey, "key.webSwinging", 3);
    hero.addKeyBind("INVISIBILITY", "Toggle Invisibility", 3)
    hero.addKeyBind("SLOW_MOTION", "key.slowMotionHold", 4);
    hero.addKeyBind("BLADE", "Bone Blade", 5);
    
    hero.setModifierEnabled(isModifierEnabled);
    hero.setKeyBindEnabled(isKeyBindEnabled);
    hero.addAttributeProfile("BLADE", bladeProfile);
    hero.addAttributeProfile("BOTH", bladeProfile);
    hero.setAttributeProfile(getProfile);
    hero.setDamageProfile(getProfile);
    hero.addDamageProfile("BLADE", {"types": {"SHARP": 1.0}});
    hero.addDamageProfile("BOTH", {"types": {
        "SHARP": 1.0,
        "FIRE": 0.25
    },
    "properties": {
        "HEAT_TRANSFER": 20,
        "IGNITE": 1
    }
    });
    hero.addDamageProfile("FLAME_PUNCH", {
        "types": {
            "BLUNT": 1.0,
            "FIRE": 0.25
        },
        "properties": {
            "HEAT_TRANSFER": 20,
            "IGNITE": 1
        }
    });
}

function bladeProfile(profile) {
    profile.inheritDefaults();
    profile.addAttribute("PUNCH_DAMAGE", 10.5, 0);
}
function bothProfile(profile) {
    profile.inheritDefaults();
    profile.addAttribute("PUNCH_DAMAGE", 10.5, 0);
}

function getProfile(entity) {
    var blade = entity.getData("fiskheroes:blade");
    var punch = entity.getData("fiskheroes:punchmode"); 
    var both = punch && blade;
    
    if ((both)) {
        return "BOTH";
    }
    else if (blade) {
        return "BLADE";
    }
    else if ((punch)) {
        return "FLAME_PUNCH";
    }
    return true;
} //let this comment remind you that it was the order that made you wanna die for 40 mins

function webSwingingKey(player, manager) {
    var flag = player.getData("fiskheroes:web_swinging");
    
    if (!flag) {
        manager.setDataWithNotify(player, "fiskheroes:prev_utility_belt_type", player.getData("fiskheroes:utility_belt_type"));
        manager.setDataWithNotify(player, "fiskheroes:utility_belt_type", -1);
    }
    
    manager.setDataWithNotify(player, "fiskheroes:web_swinging", !flag);
    return true;
}

function isModifierEnabled(entity, modifier) {
    var flag = entity.getData("fiskheroes:web_swinging");
    var combat = entity.getData('fiskheroes:utility_belt_type'); //ty eddie for this <3

    switch (modifier.name()) {
    case "fiskheroes:web_swinging":
        return entity.getHeldItem().isEmpty() && entity.getData("fiskheroes:utility_belt_type") == -1;
    case "fiskheroes:leaping":
        return modifier.id() == "springboard" == (entity.getData("fiskheroes:ticks_since_swinging") < 5);
    case "fiskheroes:blade":
        return entity.getHeldItem().isEmpty() && !flag && combat != -1;
    case "fiskheroes:invisibility":
        return !flag && combat != -1;
    case "fiskheroes:charged_punch":
        return !flag && combat != -1 && !entity.isSneaking();
    case "fiskheroes:cooldown":
        return !flag && combat != -1;           
    default:
        return true;
    }
}

function isKeyBindEnabled(entity, keyBind) {
    var flag = entity.getData("fiskheroes:web_swinging");
    var combat = entity.getData('fiskheroes:utility_belt_type'); //ty eddie for this <3

    switch (keyBind) {
    case "func_WEB_SWINGING":
        return entity.getHeldItem().isEmpty() && combat == -1;
    case "WEB_ZIP":
        return entity.getHeldItem().isEmpty() && combat == -1;
    case "BLADE":
        return entity.getHeldItem().isEmpty() && !flag && combat != -1; //ty eddie for this too <3
    case "INVISIBILITY":
        return !flag && combat != -1;
    case "CHARGED_PUNCH":
        return !flag && combat != -1;
    default:
        return true;
    }
}