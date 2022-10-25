extend("fiskheroes:hero_basic");
loadTextures({
    "layer1": "dhhp:dc/raven/raven_layer1",
    "layer2": "dhhp:dc/raven/raven_layer2",
});

function initAnimations(renderer) {
    parent.initAnimations(renderer);
    addAnimation(renderer, "raven.FLIGHT", "dhhp:flight/raven_flight.anim.json")
        .setData((entity, data) => {
            data.load(0, entity.getInterpolatedData("fiskheroes:flight_timer") * (1 - entity.getInterpolatedData("fiskheroes:dyn/superhero_landing_timer")));
            data.load(1, entity.getInterpolatedData("fiskheroes:flight_boost_timer"));
        })
        .priority = -10;
}