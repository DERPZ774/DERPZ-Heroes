extend("fiskheroes:hero_basic");
loadTextures({
    "layer1": "dhhp:other/omniman_layer1",
    "layer2": "dhhp:other/omniman_layer2",
    "cape": "dhhp:other/omniman_cape",
    "buns": "dhhp:other/buns_omniman"
});

var cape;
var physics;
var cheeks;

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

    var buns = renderer.createResource("MODEL", "dhhp:buns");
    buns.texture.set("buns");
    cheeks = renderer.createEffect("fiskheroes:model").setModel(buns);
    cheeks.anchor.set("body");


    flight.bindFlightTrail(renderer);
    flight.bindFlightParticle(renderer);
    utils.addCameraShake(renderer, 0.015, 1.5, "fiskheroes:flight_boost_timer");
    utils.addCameraShake(renderer, 0.015, 4.5, "fiskheroes:dyn/superhero_landing_timer");
}

function initAnimations(renderer) {
    parent.initAnimations(renderer);
    renderer.removeCustomAnimation("basic.PROP_FLIGHT");

    // addAnimationWithData(renderer, "omniman.BUNS", "dhhp:omni_buns", "dhhp:dyn/sneak_timer");

    addAnimation(renderer, "omniman.BUNS", "dhhp:omni_buns").setData((entity, data) => {
        data.load(entity.getData("dhhp:dyn/buns") ? 1 : 0);
    }).priority = 1;

    addAnimation(renderer, "omniman.FLIGHT", "dhhp:flight/omniman_flight.anim.json")
        .setData((entity, data) => {
            data.load(0, entity.getInterpolatedData("fiskheroes:flight_timer") * (1 - entity.getInterpolatedData("fiskheroes:dyn/superhero_landing_timer")));
            data.load(1, entity.getInterpolatedData("fiskheroes:flight_boost_timer"));
        })
        .priority = -10;

    addAnimationWithData(renderer, "iron_man.LAND", "fiskheroes:superhero_landing", "fiskheroes:dyn/superhero_landing_timer")
        .priority = -8;

    utils.addHoverAnimation(renderer, "omniman.HOVER", "fiskheroes:flight/idle/manta");
    utils.addAnimationEvent(renderer, "FLIGHT_DIVE", "fiskheroes:iron_man_dive");

    renderer.reprioritizeDefaultAnimation("PUNCH", -11);
    renderer.reprioritizeDefaultAnimation("AIM_BOW", -9);
}

function render(entity, renderLayer, isFirstPersonArm) {
    if (!isFirstPersonArm) {
        if (entity.getData("dhhp:dyn/buns")) {
            cheeks.render();
        }

        if (renderLayer == "CHESTPLATE") {
            var f = entity.getInterpolatedData("fiskheroes:flight_timer");
            cape.render({
                "wind": 1 + 0.3 * f,
                "windFactor": 1 - 0.7 * f,
                "flutter": physics.getFlutter(entity),
                "flare": physics.getFlare(entity)
            });
        }
    }
}