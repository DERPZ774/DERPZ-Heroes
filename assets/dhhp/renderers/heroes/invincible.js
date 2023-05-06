extend("fiskheroes:hero_basic");
loadTextures({
    "layer1": "dhhp:other/invincible_layer1",
    "layer2": "dhhp:other/invincible_layer2"
});

var flight = implement("dhhp:external/flight");
var utils = implement("fiskheroes:external/utils");

function initEffects(renderer) {
    flight.bindFlightTrail(renderer);
    flight.bindFlightParticle(renderer);
    utils.addCameraShake(renderer, 0.015, 1.5, "fiskheroes:flight_boost_timer");
    utils.addCameraShake(renderer, 0.25, 4.5, "fiskheroes:dyn/superhero_landing_timer");
}

function initAnimations(renderer) {
    parent.initAnimations(renderer);
    renderer.removeCustomAnimation("basic.PROP_FLIGHT");

    addAnimation(renderer, "invicible.FLIGHT", "dhhp:flight/invincible_flight.anim.json")
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