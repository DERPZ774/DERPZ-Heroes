extend("fiskheroes:hero_basic");
loadTextures({
    "blank": "dhhp:other/blank"
});

var utils = implement("fiskheroes:external/utils");
var powerpuff = implement("dhhp:external/powerpuff_girl_models");

function init(renderer) {
    parent.init(renderer);
    renderer.setTexture((entity, renderLayer) => {
        return "blank";
    });

    renderer.showModel("HELMET", "head", "headwear", "body", "rightArm", "leftArm", "rightLeg", "leftLeg");

    utils.addCameraShake(renderer, 0.015, 1.5, "fiskheroes:flight_boost_timer");
    utils.addCameraShake(renderer, 0.25, 4.5, "fiskheroes:dyn/superhero_landing_timer");
}

function initEffects(renderer) {
    parent.initEffects(renderer);
    utils.setOpacity(renderer, 0.99, 1.0);
    powerpuff = powerpuff.create(renderer);

    utils.bindBeam(renderer, "fiskheroes:heat_vision", "dhhp:powerpuff_heat_vision", "head", 16711680, [
        { "firstPerson": [3.0, 0.0, 2.0], "offset": [4.5, -7.5, -4.0], "size": [4.0, 2.0] },
        { "firstPerson": [-3.0, 0.0, 2.0], "offset": [-4.5, -7.5, -4.0], "size": [4.0, 2.0] }
    ]).setParticles(renderer.createResource("PARTICLE_EMITTER", "fiskheroes:impact_heat_vision"));
}

function initAnimations(renderer) {
    parent.initAnimations(renderer);
    renderer.removeCustomAnimation("basic.PROP_FLIGHT");

    addAnimation(renderer, "powerpuff.IDLE", "dhhp:powerpuff").setData((entity, data) => {
        data.load(1);
    }).priority = 0;

    addAnimation(renderer, "powerpuff.FLIGHT", "dhhp:flight/powerpuff_flight.anim.json")
        .setData((entity, data) => {
            data.load(0, entity.getInterpolatedData("fiskheroes:flight_timer") * (1 - entity.getInterpolatedData("fiskheroes:dyn/superhero_landing_timer")));
            data.load(1, entity.getInterpolatedData("fiskheroes:flight_boost_timer"));
        })
        .priority = -10;

    addAnimationWithData(renderer, "iron_man.LAND", "fiskheroes:superhero_landing", "fiskheroes:dyn/superhero_landing_timer")
        .priority = -8;

    utils.addHoverAnimation(renderer, "invincible.HOVER", "fiskheroes:flight/idle/martian_comics");

    renderer.reprioritizeDefaultAnimation("PUNCH", -9);
    renderer.reprioritizeDefaultAnimation("AIM_BOW", -9);
}

function render(entity, renderLayer, isFirstPersonArm) {
    parent.render(entity, renderLayer);
    powerpuff.render(entity, renderLayer, isFirstPersonArm);
}