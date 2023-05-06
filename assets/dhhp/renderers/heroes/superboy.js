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
    renderer.removeCustomAnimation("basic.PROP_FLIGHT");
    addAnimationWithData(renderer, "superboy.SHIELD", "dhhp:superboy", "dhhp:dyn/dna_shield_timer");

    addAnimation(renderer, "superman.FLIGHT", "dhhp:flight/superman_flight.anim.json")
        .setData((entity, data) => {
            data.load(0, entity.getInterpolatedData("fiskheroes:flight_timer") * (1 - entity.getInterpolatedData("fiskheroes:dyn/superhero_landing_timer")));
            data.load(1, entity.getInterpolatedData("fiskheroes:flight_boost_timer"));
        })
        .priority = -10;

    addAnimationWithData(renderer, "iron_man.LAND", "fiskheroes:superhero_landing", "fiskheroes:dyn/superhero_landing_timer")
        .priority = -8;

    utils.addHoverAnimation(renderer, "superman.HOVER", "fiskheroes:flight/idle/default");
    utils.addAnimationEvent(renderer, "FLIGHT_DIVE", "fiskheroes:iron_man_dive");

}

function render(entity, renderLayer, isFirstPersonArm) {
    var active = entity.getInterpolatedData("dhhp:dyn/dna_shield_timer");

    if (!isFirstPersonArm && renderLayer == "CHESTPLATE") {
        if (active) {
            overlay.render();
        }
    }
}