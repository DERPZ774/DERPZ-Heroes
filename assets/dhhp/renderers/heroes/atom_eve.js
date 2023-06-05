extend("fiskheroes:hero_basic");
loadTextures({
    "layer1": "dhhp:other/atom_eve/atom_eve_layer1",
    "layer2": "dhhp:other/atom_eve/atom_eve_layer2",
    "cape": "dhhp:other/atom_eve/atom_eve_cape"
});

var flight = implement("dhhp:external/flight");
var utils = implement("fiskheroes:external/utils");
var capes = implement("fiskheroes:external/capes");

var cape;
var physics;

function initEffects(renderer) {
    flight.bindFlightTrail(renderer);
    flight.bindFlightParticle(renderer);

    physics = renderer.createResource("CAPE_PHYSICS", null);
    physics.weight = 1.2;
    physics.maxFlare = 0.3;
    physics.flareDegree = 1.5;
    physics.flareFactor = 1.5;
    physics.flareElasticity = 8;
    physics.setTickHandler(entity => {
        var f = 1 - entity.getData("fiskheroes:flight_timer");
        f = 1 - f * f * f;
        physics.headingAngle = 90 - f * 20;
        physics.restAngle = f * 40;
        physics.restFlare = f * 0.7;
        physics.idleFlutter = 0.15 + 0.25 * f;
        physics.flutterSpeed = f * 0.4;
    });

    cape = capes.create(renderer, 12, "fiskheroes:cape_default.mesh.json");
    cape.effect.texture.set("cape");

    utils.addCameraShake(renderer, 0.015, 1.5, "fiskheroes:flight_boost_timer");
    utils.addCameraShake(renderer, 0.015, 4.5, "fiskheroes:dyn/superhero_landing_timer");
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
    utils.addAnimationEvent(renderer, "FLIGHT_DIVE_ROLL", "fiskheroes:falcon_dive_roll");
    utils.addAnimationEvent(renderer, "FLIGHT_DIVE", "fiskheroes:iron_man_dive");

    renderer.reprioritizeDefaultAnimation("PUNCH", -9);
    renderer.reprioritizeDefaultAnimation("AIM_BOW", -9);
}

function render(entity, renderLayer, isFirstPersonArm) {
    if (!isFirstPersonArm && renderLayer == "CHESTPLATE") {
        var f = entity.getInterpolatedData("fiskheroes:flight_timer");
        cape.render({
            "wind": 1 + 0.3 * f,
            "windFactor": 1 - 0.7 * f,
            "flutter": physics.getFlutter(entity),
            "flare": physics.getFlare(entity)
        });
    }
}