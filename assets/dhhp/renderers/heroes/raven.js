extend("fiskheroes:hero_basic");
loadTextures({
    "layer1": "dhhp:raven/raven_layer1",
    "layer2": "dhhp:raven/raven_layer2",
    "cape": "dhhp:raven/raven_cape1"
});

var cape;

var utils = implement("fiskheroes:external/utils");
var capes = implement("fiskheroes:external/capes");

function initEffects(renderer) {
    var physics = renderer.createResource("CAPE_PHYSICS", null);
    physics.weight = 0.9;
    physics.maxFlare = 0.2;
    cape = capes.createDefault(renderer, 24, "fiskheroes:cape_default.mesh.json", physics);
    cape.effect.texture.set("cape");
}

function initAnimations(renderer) {
    parent.initAnimations(renderer);
    addAnimation(renderer, "raven.FLIGHT", "dhhp:flight/raven_flight.anim.json")
        .setData((entity, data) => {
            data.load(0, entity.getInterpolatedData("fiskheroes:flight_timer") * (1 - entity.getInterpolatedData("fiskheroes:dyn/superhero_landing_timer")));
            data.load(1, entity.getInterpolatedData("fiskheroes:flight_boost_timer"));
        })
        .priority = -10;
}

function render(entity, renderLayer, isFirstPersonArm) {
    if (!isFirstPersonArm && renderLayer == "CHESTPLATE") {
        cape.render(entity);
    }
}