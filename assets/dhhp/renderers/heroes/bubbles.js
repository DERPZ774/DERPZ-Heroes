extend("dhhp:powerpuff_base");
loadTextures({
    "texture": "dhhp:other/bubbles"
});

function initEffects(renderer) {
    parent.initEffects(renderer);
    var trail = renderer.bindProperty("fiskheroes:trail");
    trail.setTrail(renderer.createResource("TRAIL", "dhhp:trail_bubbles"));
    trail.setCondition(entity => entity.getData("fiskheroes:speeding") || entity.getData("fiskheroes:flying"));
}