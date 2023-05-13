extend("dhhp:powerpuff_base");
loadTextures({
    "texture": "dhhp:other/blossom"
});



function initEffects(renderer) {
    parent.initEffects(renderer);
    var trail = renderer.bindProperty("fiskheroes:trail");
    trail.setTrail(renderer.createResource("TRAIL", "dhhp:trail_blossom"));
    trail.setCondition(entity => entity.getData("fiskheroes:speeding") || entity.getData("fiskheroes:flying"));

    utils.bindBeam(renderer, "fiskheroes:charged_beam", "dhhp:freeze_breath", "head", 0x90ffff, [
        { "firstPerson": [0.0, 2.5, 0.0], "offset": [0.0, 6.0, -4.0], "size": [4.0, 4.0] }
    ]).setParticles(renderer.createResource("PARTICLE_EMITTER", "dhhp:freeze_impact"));

    utils.bindBeam(renderer, "fiskheroes:energy_projection", "dhhp:heat_breath", "head", 0xF43D07, [
        { "firstPerson": [0.0, 2.5, 0.0], "offset": [0.0, 6.0, -4.0], "size": [1.0, 1.0] }
    ]).setParticles(renderer.createResource("PARTICLE_EMITTER", "dhhp:heat_impact"));
}

function initAnimations(renderer) {
    parent.initAnimations(renderer);
    renderer.removeCustomAnimation("basic.ENERGY_PROJ");
}