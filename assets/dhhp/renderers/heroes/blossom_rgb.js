extend("dhhp:blossom");
loadTextures({
    "rgb": "dhhp:other/blossom_rgb.tx.json"
});

/*
function initEffects(renderer) {
    parent.initEffects(renderer);

    var trail = renderer.bindProperty("fiskheroes:trail");
    trail.setTrail(renderer.createResource("TRAIL", getTrailType()));
    trail.setCondition(entity => entity.getData("fiskheroes:speeding") || entity.getData("fiskheroes:flying") && entity.isSprinting());
}

function getTrailType() {
    return "dhhp:rgb_ppg_blue", "dhhp:rgb_ppg_cyan", "dhhp:rgb_ppg_green", "dhhp:rgb_ppg_magenta", "dhhp:rgb_ppg_red", "dhhp:rgb_ppg_yellow";
}
*/