extend("dhhp:powerpuff_base");
loadTextures({
    "texture": "dhhp:other/blossom",
    "cape": "dhhp:other/blossom_hair"
});

var cape;
var physics;

var capes = implement("fiskheroes:external/capes");

function initEffects(renderer) {
    parent.initEffects(renderer);

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

    cape = capes.create(renderer, 16, "fiskheroes:cape_default.mesh.json");
    cape.effect.width = 16;
    cape.effect.setOffset(0.0, 7, 1.0);

    cape.effect.texture.set("cape");

    var trail = renderer.bindProperty("fiskheroes:trail");

    trail.setTrail(renderer.createResource("TRAIL", getTrailType()));
    trail.setCondition(entity => entity.getData("fiskheroes:speeding") || entity.getData("fiskheroes:flying") && entity.isSprinting());

    utils.bindBeam(renderer, "fiskheroes:charged_beam", "dhhp:freeze_breath", "head", 0x90ffff, [
        { "firstPerson": [0.0, 2.5, 0.0], "offset": [0.0, -1.0, -4.0], "size": [4.0, 4.0] }
    ]).setParticles(renderer.createResource("PARTICLE_EMITTER", "dhhp:freeze_impact"));

    utils.bindBeam(renderer, "fiskheroes:energy_projection", "dhhp:heat_breath", "head", 0xF43D07, [
        { "firstPerson": [0.0, 2.5, 0.0], "offset": [0.0, -1.0, -4.0], "size": [1.0, 1.0] }
    ]).setParticles(renderer.createResource("PARTICLE_EMITTER", "dhhp:heat_impact"));
}

function initAnimations(renderer) {
    parent.initAnimations(renderer);
    renderer.removeCustomAnimation("basic.ENERGY_PROJ");
}

function getTrailType() {
    return "dhhp:trail_blossom";
}

function render(entity, renderLayer, isFirstPersonArm) {
    parent.render(entity, renderLayer, isFirstPersonArm);

    if (!isFirstPersonArm) {
        var f = entity.getInterpolatedData("fiskheroes:flight_timer");
        cape.render({
            "wind": 1 + 0.3 * f,
            "windFactor": 1 - 0.7 * f,
            "flutter": physics.getFlutter(entity),
            "flare": physics.getFlare(entity)
        });
    }
}
