extend("dhhp:powerpuff_base");
loadTextures({
    "texture": "dhhp:ppg/buttercup"
});

function initEffects(renderer) {
    parent.initEffects(renderer);
    var trail = renderer.bindProperty("fiskheroes:trail");
    trail.setTrail(renderer.createResource("TRAIL", "dhhp:trail_buttercup"));
    trail.setCondition(entity => entity.getData("fiskheroes:speeding") || entity.getData("fiskheroes:flying") && entity.isSprinting());
}