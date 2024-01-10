function landing_tick(entity, manager, sound) {
    if (typeof sound == "string") {
        var t = entity.getData("fiskheroes:dyn/superhero_landing_ticks");

        if (t == 0 && !entity.isSprinting() && !entity.isOnGround() && entity.motionY() < -1.25 && entity.getData("fiskheroes:flight_boost_timer") > 0 && entity.world().blockAt(entity.pos().add(0, -2, 0)).isSolid()) {
            manager.setDataWithNotify(entity, "fiskheroes:dyn/superhero_landing_ticks", t = 12);
            entity.playSound(sound, 1, 0.8 + Math.random() * 0.2);
        } else if (t > 0) {
            manager.setData(entity, "fiskheroes:dyn/superhero_landing_ticks", --t);
        }

        manager.incrementData(entity, "fiskheroes:dyn/superhero_landing_timer", 2, 8, t > 0);
    }
}

function SafeY(entity) {
    var complete = false;
    for (var i = 0; complete == false; i++) {
        if (entity.world().getBlock(entity.pos().add(0, i + 3, 0)) == "minecraft:air" &&
            entity.world().getBlock(entity.pos().add(0, i + 4, 0)) == "minecraft:air") {
            complete = true;
            return entity.posY() + i + 4;
        }

    }
}

function flight_auto_tick(entity, manager) {
    if (entity.getData("fiskheroes:jetpacking") == true && entity.isSprinting()) {
        manager.setData(entity, "fiskheroes:flying", true)
    }
}

function flight_auto_modifier(entity, modifier, pitch) {
    if (modifier.name() == "fiskheroes:propelled_flight") {
        return entity.isSprinting() && !entity.getData("fiskheroes:flying") && entity.rotPitch() < pitch;
    }
    return true
}

function flight_booster_tick(entity, manager) {
    var flying = entity.getData("fiskheroes:flying");
    manager.incrementData(entity, "fiskheroes:dyn/booster_timer", 2, flying);

    var item = entity.getHeldItem();
    flying &= !entity.as("PLAYER").isUsingItem();
    manager.incrementData(entity, "fiskheroes:dyn/booster_r_timer", 2, flying && item.isEmpty() && !entity.isPunching() && entity.getData("fiskheroes:aiming_timer") == 0);
    manager.incrementData(entity, "fiskheroes:dyn/booster_l_timer", 2, flying && !item.doesNeedTwoHands());
}

function moon_teleport_tick(entity, manager, moon) {
    // var DimensionalCoords = Java.type('com.fiskmods.heroes.common.DimensionalCoords');
    var x = entity.posX();
    var y = entity.posY();
    var z = entity.posZ();
    var dim = entity.world().getDimension();
    if (y >= moon) {
        manager.setData(entity, "fiskheroes:teleport_dest", manager.newCoords(x, y, z, dim + 1));
        manager.setData(entity, "fiskheroes:teleport_delay", 1);
        PackLoader.printChat("Space test!")

    }
    if (entity.world().getDimension() == 2595 && !entity.getData("dhhp:dyn/teleport")) {
        manager.setData(entity, "dhhp:dyn/teleport", true);
    }
    if (entity.world().getDimension() == 0 && entity.getData("dhhp:dyn/teleport")) {
        manager.setData(entity, "fiskheroes:teleport_dest", manager.newCoords(Math.floor(entity.posX()), SafeY(entity), Math.floor(entity.posZ()), 0));
        manager.setData(entity, "fiskheroes:teleport_delay", 1);
        manager.setData(entity, "dhhp:dyn/teleport", false);
    }
}

function all_tick(entity, manager, sound, moon) {
    flight_auto_tick(entity, manager)
    flight_booster_tick(entity, manager)
    moon_teleport_tick(entity, manager, moon)
    landing_tick(entity, manager, sound)

}