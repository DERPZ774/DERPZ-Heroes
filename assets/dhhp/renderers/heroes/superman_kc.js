extend("fiskheroes:hero_basic");
loadTextures({
    "layer1": "dhhp:dc/superman_layer1",
    "layer2": "dhhp:dc/superman_layer2",
    "cape": "dhhp:dc/superman_cape"
});

var cape;
var physics;
var boom_trail;
var utils = implement("fiskheroes:external/utils");
var flight = implement("dhhp:external/flight");
var capes = implement("fiskheroes:external/capes");

function init(renderer) {
    parent.init(renderer);
    renderer.showModel("CHESTPLATE", "head", "headwear", "body", "rightArm", "leftArm");
    renderer.fixHatLayer("CHESTPLATE");
}

function initEffects(renderer) {
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

    cape = capes.create(renderer, 24, "fiskheroes:cape_default.mesh.json");
    cape.effect.texture.set("cape");

    utils.bindParticles(renderer, "dhhp:superman_dceu_eyes")
        .setCondition(entity => (entity.getData('dhhp:dyn/power_timer') > 0));

    flight.bindFlightTrail(renderer);
    flight.bindFlightParticle(renderer);
    utils.addCameraShake(renderer, 0.015, 1.5, "fiskheroes:flight_boost_timer");
    utils.addCameraShake(renderer, 0.25, 4.5, "fiskheroes:dyn/superhero_landing_timer");

    utils.bindBeam(renderer, "fiskheroes:heat_vision", "dhhp:superman_heat_vision", "head", 0xff2200, [
        { "firstPerson": [2.2, 0.0, 2.0], "offset": [1.4, -3.3, -4.0], "size": [1.0, 0.5] },
        { "firstPerson": [-2.2, 0.0, 2.0], "offset": [-1.4, -3.3, -4.0], "size": [1.0, 0.5] }
    ]).setParticles(renderer.createResource("PARTICLE_EMITTER", "fiskheroes:impact_heat_vision"));

    utils.bindBeam(renderer, "fiskheroes:charged_beam", "dhhp:superman_heat_vision_2", "head", 0xff2200, [
        { "firstPerson": [2.2, 0.0, 2.0], "offset": [1.4, -3.3, -4.0], "size": [1.0, 0.5] },
        { "firstPerson": [-2.2, 0.0, 2.0], "offset": [-1.4, -3.3, -4.0], "size": [1.0, 0.5] }
    ]).setParticles(renderer.createResource("PARTICLE_EMITTER", "fiskheroes:impact_charged_beam"));

    utils.bindBeam(renderer, "fiskheroes:energy_projection", "dhhp:freeze_breath", "head", 0x90ffff, [
        { "firstPerson": [0.0, 2.5, 0.0], "offset": [0.0, -1.5, -4.0], "size": [4.0, 4.0] }
    ]).setParticles(renderer.createResource("PARTICLE_EMITTER", "dhhp:freeze_impact"));

}

function initAnimations(renderer) {
    parent.initAnimations(renderer);
    renderer.removeCustomAnimation("basic.ENERGY_PROJ");
    renderer.removeCustomAnimation("basic.PROP_FLIGHT");
    addAnimation(renderer, "superman.FLIGHT", "dhhp:flight/superman_flight.anim.json")
        .setData((entity, data) => {
            data.load(0, entity.getInterpolatedData("fiskheroes:flight_timer") * (1 - entity.getInterpolatedData("fiskheroes:dyn/superhero_landing_timer")));
            data.load(1, entity.getInterpolatedData("fiskheroes:flight_boost_timer"));
        })
        .priority = -10;

    addAnimationWithData(renderer, "iron_man.LAND", "fiskheroes:superhero_landing", "fiskheroes:dyn/superhero_landing_timer")
        .priority = -8;

    addAnimation(renderer, "superman.charge", "dhhp:solarcharge")
        .setData((entity, data) => {
            data.load(0, entity.getInterpolatedData("dhhp:dyn/power_timer"));
        })
        .priority = 10;

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