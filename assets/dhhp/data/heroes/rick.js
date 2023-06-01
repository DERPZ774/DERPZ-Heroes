var DC = Java.type('com.fiskmods.heroes.common.DimensionalCoords');
function extractCoords(input) {
    var sections = input.split(" ");
    if (sections.length === 3) { // Make sure input is formatted correctly
        var x = parseInt(sections[0], 10);
        var y = parseInt(sections[1], 10);
        var z = parseInt(sections[2], 10);
        return {
            x: x,
            y: y,
            z: z,
            isValid: () => {
                return !isNaN(x) && !isNaN(y) && !isNaN(z);
            }
        };
    }
    return {
        isValid: () => false
    };
}

function extractDest(entity) {
    return extractCoords(String(entity.getData("fiskheroes:disguise")));
}

function canUseTeleport(entity) {
    if (entity.getData("fiskheroes:disguise") == entity.getName()) {
        return false;
    }
    return extractDest(entity).isValid();
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
function init(hero) {
    hero.setName("Rick Sanchez");
    hero.setTier(2);

    hero.setHelmet("item.superhero_armor.piece.hair");
    hero.setChestplate("item.superhero_armor.piece.chestpiece");
    hero.setLeggings("item.superhero_armor.piece.pants");
    hero.setBoots("item.superhero_armor.piece.boots");

    hero.addPowers("dhhp:rick");

    hero.addKeyBind("SHAPE_SHIFT", "X(Number) Y(Number) Z(Number)", 4);

    hero.addKeyBindFunc("Func_TELEPORT", functionTeleport, "Teleport", 5);

    hero.setTickHandler((entity, manager) => {
        manager.incrementData(entity, "fiskheroes:dyn/booster_timer", 2, entity.getData("fiskheroes:flying"));


        /* var item = entity.getEquipmentInSlot(3);
         var nbt = item.nbt();
         var playerPos = manager.newTagList();

         if (entity.getData("dhhp:dyn/helmet")) {
             var target = manager.newCompoundTag();

             manager.setTagList(nbt, "PLAYER_POSITION", playerPos);
             manager.setDouble(target, "PlayerPos", entity.posX());


             manager.appendTag(playerPos, target);
         }
         */
         if (entity.getData("dhhp:dyn/boolean")) {
            if (entity.world().getDimension() == 2595) {
                manager.setData(entity, "fiskheroes:teleport_dest", new DC(Math.floor(entity.posX()), Math.floor(entity.posY()), Math.floor(entity.posZ()), 0));
                manager.setData(entity, "fiskheroes:teleport_delay", 1);
            }
            if (entity.world().getDimension() == 0) {
                manager.setData(entity, "fiskheroes:teleport_dest", new DC(Math.floor(entity.posX()), SafeY(entity), Math.floor(entity.posZ()), 0));
                manager.setData(entity, "fiskheroes:teleport_delay", 1);
                manager.setData(entity, "dhhp:dyn/boolean", false);
            }
        }
        //todo Add these coords 

        //  var currentPos =  manager.newCompoundTag(entity.posX(), entity.posY(), entity.posZ());
        //    manager.setCompoundTag(nbt, "display", currentPos);

    });


}

function functionTeleport(player, manager) {
    var dest = extractDest(player);
    var dim = player.world().getDimension();
    manager.setData(player, "fiskheroes:teleport_dest", new DC(dest.x, dest.y + 1, dest.z, dim));
    manager.setData(player, "fiskheroes:teleport_delay", 1);
    manager.setDataWithNotify(player, "fiskheroes:shape_shifting_to", null);
    manager.setDataWithNotify(player, "fiskheroes:shape_shift_timer", 1);
    return true;
}

function isKeyBindEnabled(entity, keyBind) {
    switch (keyBind) {
    case "Func_TELEPORT":
        return extractDest(entity).isValid();
    case "SHAPE_SHIFT_RESET":
        return extractDest(entity).isValid();
    case "SHAPE_SHIFT_RESET":
        return extractDest(entity).isValid();
    default:
        return true;
    }
}