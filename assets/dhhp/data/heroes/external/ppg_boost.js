var MATRIX = {
    "dhhp:blossom": [1, 2],
    "dhhp:bubbles": [0, 2],
    "dhhp:buttercup": [0, 1]
};

function checkBoost(entity, manager, suit) {
    var domeId = entity.getData("fiskheroes:lightsout_id");
    var dome = entity.world().getEntityById(domeId);
    var boost1 = false;
    var boost2 = false;
    if (dome.exists()) {
        var contained = dome.as("SHADOWDOME").getContainedEntities();
        var keys = Object.keys(MATRIX);
        var reqs = MATRIX[suit];
        for (var i = 0; i < contained.size(); ++i) {
            var other = contained.get(i).getWornChestplate().nbt().getString("HeroType");
            if (other == keys[reqs[0]]) {
                boost1 = true;
            } else if (other == keys[reqs[1]]) {
                boost2 = true;
            }
        }
        manager.setData(entity, "dhhp:dyn/statboost1", boost1);
        manager.setData(entity, "dhhp:dyn/statboost2", boost2);
        manager.setData(entity, "dhhp:dyn/statboost", boost1 && boost2);
    }


}
