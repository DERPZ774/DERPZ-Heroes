var MATRIX = {
    "dhhp:blossom": [1, 2],
    "dhhp:bubbles": [0, 2],
    "dhhp:buttercup": [0, 1]
};

function checkBoost(entity, manager, suit) {
    var list = entity.world().getEntitiesInRangeOf(entity.pos(), 50);
    var keys = Object.keys(MATRIX);
    var reqs = MATRIX[suit];
    var boost1 = false;
    var boost2 = false;
    list.forEach(other => {
        if (other.getWornHelmet().suitType() == keys[reqs[0]]) {
            boost1 = true;
        } else if (other.getWornHelmet().suitType() == keys[reqs[1]]) {
            boost2 = true;
        }
    });
    manager.setData(entity, "dhhp:dyn/statboost1", boost1);
    manager.setData(entity, "dhhp:dyn/statboost2", boost2);
    manager.setData(entity, "dhhp:dyn/statboost", boost1 && boost2);
}