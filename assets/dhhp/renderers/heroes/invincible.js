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
}

function initAnimations(renderer) {
    parent.initAnimations(renderer);
    addAnimation(renderer, "invicible.FLIGHT", "dhhp:flight/invincible_flight.anim.json")
        .setData((entity, data) => {
            data.load(0, entity.getInterpolatedData("fiskheroes:flight_timer") * (1 - entity.getInterpolatedData("fiskheroes:dyn/superhero_landing_timer")));
            data.load(1, entity.getInterpolatedData("fiskheroes:flight_boost_timer"));
        })
        .priority = -10;

    addAnimationWithData(renderer, "iron_man.LAND", "fiskheroes:superhero_landing", "fiskheroes:dyn/superhero_landing_timer")
        .priority = -8;

    renderer.reprioritizeDefaultAnimation("PUNCH", -9);
    renderer.reprioritizeDefaultAnimation("AIM_BOW", -9);
}

//todo Add flight anims