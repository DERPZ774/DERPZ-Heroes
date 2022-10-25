extend("fiskheroes:hero_basic");
loadTextures({
    "layer1": "dhhp:dc/superboy_layer1",
    "layer2": "dhhp:dc/superboy_layer2",
    "shield": "dhhp:dc/superboy_patch"
});

var utils = implement("fiskheroes:external/utils");

var overlay;

function init(renderer) {
    parent.init(renderer);
    renderer.fixHatLayer("CHESTPLATE");
}

function initEffects(renderer) {
    overlay = renderer.createEffect("fiskheroes:overlay");
    overlay.texture.set("shield");

    utils.bindBeam(renderer, "fiskheroes:heat_vision", "dhhp:superman_heat_vision_2", "head", 0xff2200, [
    { "firstPerson": [2.2, 0.0, 2.0], "offset": [1.4, -3.3, -4.0], "size": [1.0, 0.5] },
    { "firstPerson": [-2.2, 0.0, 2.0], "offset": [-1.4, -3.3, -4.0], "size": [1.0, 0.5] }
    ]).setParticles(renderer.createResource("PARTICLE_EMITTER", "fiskheroes:impact_heat_vision"));
    
}

function initAnimations(renderer) {
    parent.initAnimations(renderer);

    addAnimationWithData(renderer, "superboy.SHIELD", "dhhp:superboy", "dhhp:dyn/dna_shield_timer"); 

}

function render(entity, renderLayer, isFirstPersonArm) {
    var active = entity.getInterpolatedData("dhhp:dyn/dna_shield_timer");

    if (!isFirstPersonArm && renderLayer == "CHESTPLATE") {
        if (active) {
            overlay.render();
        }
    }
}

