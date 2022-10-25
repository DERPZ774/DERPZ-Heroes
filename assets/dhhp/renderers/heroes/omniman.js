extend("fiskheroes:hero_basic");
loadTextures({
    "layer1": "dhhp:other/omniman_layer1",
    "layer2": "dhhp:other/omniman_layer2",
    "cape": "dhhp:other/omniman_cape"
});

var cape;

var utils = implement("fiskheroes:external/utils");
var flight = implement("dhhp:external/flight");
var capes = implement("fiskheroes:external/capes");

function init(renderer) {
    parent.init(renderer);

    renderer.showModel("CHESTPLATE", "head", "headwear", "body", "rightArm", "leftArm");
    renderer.fixHatLayer("CHESTPLATE");
}

function initEffects(renderer) {
    var physics = renderer.createResource("CAPE_PHYSICS", null);
    physics.weight = 0.9;
    physics.maxFlare = 0.2;
    cape = capes.createDefault(renderer, 24, "fiskheroes:cape_default.mesh.json", physics);
    cape.effect.texture.set("cape");

    flight.bindFlightTrail(renderer);
    flight.bindFlightParticle(renderer);
    utils.addCameraShake(renderer, 0.015, 1.5, "fiskheroes:flight_boost_timer");

}

function initAnimations(renderer) {
    parent.initAnimations(renderer);
    addAnimation(renderer, "iron_man.FLIGHT", "fiskheroes:flight/iron_man.anim.json")
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

function render(entity, renderLayer, isFirstPersonArm) {
    if (!isFirstPersonArm && renderLayer == "CHESTPLATE") {
        cape.render(entity);
    }
}

//todo flight anims