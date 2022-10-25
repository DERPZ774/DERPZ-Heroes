extend("fiskheroes:hero_basic");
loadTextures({
    "layer1": "dhhp:dc/superman_layer1",
    "layer2": "dhhp:dc/superman_layer2",
    "cape": "dhhp:dc/superman_cape"
});

var cape;

var cape_fix;

var boom_trail;

var utils = implement("fiskheroes:external/utils");
var flight = implement("dhhp:external/flight");

function init(renderer) {
    parent.init(renderer);

    renderer.showModel("CHESTPLATE", "head", "headwear", "body", "rightArm", "leftArm");
    renderer.fixHatLayer("CHESTPLATE");
}

function initEffects(renderer) {
    cape = renderer.createEffect("fiskheroes:cape");
    cape.texture.set("cape");
    cape.length = 24;

    var model_cape = renderer.createResource("MODEL", "dhhp:cape");
    model_cape.bindAnimation("dhhp:cape").setData((entity, data) => data.load(((Math.abs(entity.motionX())) || (Math.abs(entity.motionY())) || ((Math.abs(entity.motionZ())))) * 1.2));
    model_cape.texture.set("cape");
    cape_fix = renderer.createEffect("fiskheroes:model").setModel(model_cape);
    cape_fix.anchor.set("body");


    utils.bindParticles(renderer, "dhhp:superman_dceu_eyes")
        .setCondition(entity => (entity.getData('dhhp:dyn/power_timer') > 0));

    flight.bindFlightTrail(renderer);
    flight.bindFlightParticle(renderer);
    utils.addCameraShake(renderer, 0.015, 1.5, "fiskheroes:flight_boost_timer");


    utils.bindBeam(renderer, "fiskheroes:heat_vision", "dhhp:superman_heat_vision", "head", 0xff2200, [
        { "firstPerson": [2.2, 0.0, 2.0], "offset": [1.4, -3.3, -4.0], "size": [1.0, 0.5] },
        { "firstPerson": [-2.2, 0.0, 2.0], "offset": [-1.4, -3.3, -4.0], "size": [1.0, 0.5] }
    ]).setParticles(renderer.createResource("PARTICLE_EMITTER", "fiskheroes:impact_heat_vision"));

    utils.bindBeam(renderer, "fiskheroes:charged_beam", "dhhp:superman_heat_vision_2", "head", 0xff2200, [
        { "firstPerson": [2.2, 0.0, 2.0], "offset": [1.4, -3.3, -4.0], "size": [1.0, 0.5] },
        { "firstPerson": [-2.2, 0.0, 2.0], "offset": [-1.4, -3.3, -4.0], "size": [1.0, 0.5] }
    ]).setParticles(renderer.createResource("PARTICLE_EMITTER", "fiskheroes:impact_charged_beam"));

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
        if (entity.getData("fiskheroes:glide_flying")) {
            cape_fix.render();
        } else {
            cape.render();
        }
    }
}

//new anims fix particles