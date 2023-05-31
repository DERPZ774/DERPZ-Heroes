function init(hero) {
    hero.setName("Rick Sanchez");
    hero.setTier(2);

    hero.setHelmet("item.superhero_armor.piece.hair");
    hero.setChestplate("item.superhero_armor.piece.chestpiece");
    hero.setLeggings("item.superhero_armor.piece.pants");
    hero.setBoots("item.superhero_armor.piece.boots");

    hero.addPowers("dhhp:rick");

    hero.addKeyBindFunc("func_GEN_PORTAL", genPortalKey, "Generate Portal", 1);

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

        if (entity.getData("dhhp:dyn/gen_portal") == true) {
            var nbt = entity.getWornChestplate().nbt();
            var line1 = "The data var is " + entity.posX() + "!";

            var display = manager.newCompoundTag('{Lore:["' + line1 + '"]}');
            manager.setCompoundTag(nbt, "display", display);
        }

        //  var currentPos =  manager.newCompoundTag(entity.posX(), entity.posY(), entity.posZ());
        //    manager.setCompoundTag(nbt, "display", currentPos);

    });


}

function genPortalKey(entity, manager) {
    //var portal = player.getData("dhhp:dyn/gen_portal");
    manager.setData(entity, "dhhp:dyn/gen_portal", true);
    return true;
}