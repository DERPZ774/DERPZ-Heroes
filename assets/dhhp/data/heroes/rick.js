function init(hero) {
    hero.setName("Rick Sanchez");
    hero.setTier(10);
    hero.hide();

    hero.setHelmet("item.superhero_armor.piece.hair");
    hero.setChestplate("item.superhero_armor.piece.chestpiece");
    hero.setLeggings("item.superhero_armor.piece.pants");
    hero.setBoots("item.superhero_armor.piece.boots");
    hero.addEquipment("fiskheroes:grappling_gun");

    hero.addPowers("dhhp:lord_of_order");

    hero.addKeyBind("HELMET_TRANSFORM", "Transform", 1);

    hero.setTickHandler((entity, manager) => {
        var item = entity.getEquipmentInSlot(3);
        var nbt = item.nbt();
        var playerPos = manager.newTagList();

        if (entity.getData("dhhp:dyn/helmet")) {
            var target = manager.newCompoundTag();

            manager.setTagList(nbt, "PLAYER_POSITION", playerPos);
            manager.setDouble(target, "PlayerPos", entity.posX());


            manager.appendTag(playerPos, target);
        }

    });

}