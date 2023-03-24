extend("fiskheroes:hero_basic");
loadTextures({
    "base": "dhhp:dc/doctorfate/doctor_fate_suit",
    "suit": "dhhp:dc/doctorfate/doctor_fate_suit.tx.json",
    "helm": "dhhp:dc/doctorfate/doctorfate_helmet",
    "lights_helmet": "dhhp:dc/doctorfate/doctorfate_helmet_lights",
    "lights": "dhhp:dc/doctorfate/dr_fate_body_lights",
    "model1": "dhhp:dc/doctorfate/ankh_texture1",
    "medallion": "dhhp:dc/doctorfate/medallion",
    "cape": "dhhp:dc/doctorfate/doctor_fate_cape"
});

var cape;

var utils = implement("fiskheroes:external/utils");
var capes = implement("fiskheroes:external/capes");

var ankh;
var ankh_beam;
var ankh_beam2;
var ankh_beam3;
var ankh_shield;
var model_ankh;
var physics;

function init(renderer) {
    parent.init(renderer);
    renderer.setTexture((entity, renderLayer) => {
        var timer = entity.getInterpolatedData("dhhp:dyn/helmet_timer");

        if (!entity.isDisplayStand()) {
            return timer == 0 ? "helm" : timer < 1 ? "suit" : "base";
        }
        return "base";
    });
    renderer.setLights((entity, renderLayer) => {
        var timer = entity.getData("dhhp:dyn/helmet_timer");
        return (timer >= 1 || entity.isDisplayStand()) ? "lights" : (timer > 0 ? "lights_helmet" : null);
    });

    renderer.showModel("HELMET", "head", "headwear", "body", "rightArm", "leftArm", "rightLeg", "leftLeg");
    renderer.fixHatLayer("HELMET");
}

function initEffects(renderer) {
    physics = renderer.createResource("CAPE_PHYSICS", null);
    physics.weight = 1.2;
    physics.maxFlare = 0.65;
    physics.flareDegree = 0.5;
    physics.flareFactor = 0.5;
    physics.flareElasticity = 4;
    physics.setTickHandler(entity => {
        var f = 1 - entity.getData("fiskheroes:flight_timer");
        f = 1 - f * f * f;
        physics.headingAngle = 90 - f * 20;
        physics.restAngle = f * 40;
        physics.restFlare = f * 0.7;
        physics.idleFlutter = 0.15 + 0.25 * f;
        physics.flutterSpeed = f * 0.3;
    });

    cape = capes.create(renderer, 24, "fiskheroes:cape_default.mesh.json");
    cape.effect.texture.set("cape");

    var magic = renderer.bindProperty("fiskheroes:spellcasting");
    magic.colorGeneric.set(0x1f75d5);
    magic.colorEarthCrack.set(0x1f75d5);
    magic.colorAtmosphere.set(0x1f75d5);
    magic.colorWhip.set(0x1f75d5);

    //models
    var model_ankh_body = renderer.createResource("MODEL", "dhhp:ankh");
    model_ankh_body.texture.set(null, "medallion");
    ankh = renderer.createEffect("fiskheroes:model").setModel(model_ankh_body);
    ankh.anchor.set("body");

    model_ankh = renderer.createResource("MODEL", "dhhp:ankh")
    model_ankh.bindAnimation("dhhp:dr_ankh").setData((entity, data) => data.load(entity.getData("fiskheroes:beam_charging") ? entity.loop(76) : 0));
    ankh_beam = renderer.createEffect("fiskheroes:model").setModel(model_ankh);
    ankh_beam.anchor.set("head");
    ankh_beam2 = ankh_beam;
    ankh_beam3 = ankh_beam2;

    ankh_shield = renderer.createEffect("fiskheroes:model").setModel(model_ankh);
    ankh_shield.anchor.set("head");


    var forcefield = renderer.bindProperty("fiskheroes:forcefield");
    forcefield.color.set(0x1f75d5);
    forcefield.setShape(36, 18).setOffset(0.0, 6.0, 0.0).setScale(1.75);
    forcefield.setCondition(entity => {
        forcefield.opacity = entity.getInterpolatedData("fiskheroes:shield_blocking_timer") * 0.15;
        return true;
    });

    utils.bindCloud(renderer, "fiskheroes:teleportation", "fiskheroes:breach");

    utils.bindParticles(renderer, "dhhp:doctorfate_ankh")
        .setCondition(entity => (entity.getData("fiskheroes:beam_charging")));

    utils.bindParticles(renderer, "dhhp:doctorfate_ankh_block")
        .setCondition(entity => (entity.getData("fiskheroes:shield_blocking")));

    //Energy Beam
    var beam = renderer.createResource("BEAM_RENDERER", "dhhp:doctorfate_beam");
    var color = 0x1f75d5;

    utils.bindBeam(renderer, "fiskheroes:energy_projection", beam, "body", color, [
        { "firstPerson": [0.0, 6.0, 0.0], "offset": [0.0, 5.0, -4.0], "size": [4.0, 4.0] }
    ]);

    //ankh beam
    utils.bindBeam(renderer, "fiskheroes:charged_beam", beam, "rightArm", color, [
        { "firstPerson": [-3.75, 3.0, -8.0], "offset": [-0.5, 12.0, 0.0], "size": [1.5, 1.5] },
        { "firstPerson": [3.75, 3.0, -8.0], "offset": [-0.5, 12.0, 0.0], "size": [1.5, 1.5], "anchor": "leftArm" }
    ]).setParticles(renderer.createResource("PARTICLE_EMITTER", "fiskheroes:impact_energy_projection"));
}

function initAnimations(renderer) {
    parent.initAnimations(renderer);
    renderer.removeCustomAnimation("basic.BLOCKING");
    renderer.removeCustomAnimation("basic.CHARGED_BEAM");
    renderer.removeCustomAnimation("basic.AIMING");

    addAnimationWithData(renderer, "basic.BLOCKING", "dhhp:dr_block", "fiskheroes:shield_blocking_timer");

    addAnimation(renderer, "basic.AIMING", "fiskheroes:dual_aiming").setData((entity, data) => {
        var charge = entity.getInterpolatedData("fiskheroes:beam_charge");
        data.load(Math.max(entity.getInterpolatedData("fiskheroes:aiming_timer"), entity.getData("fiskheroes:beam_charging") ? Math.min(charge * 3, 1) : Math.max(charge * 5 - 4, 0)));
    });

    utils.addFlightAnimation(renderer, "fate.FLIGHT", "fiskheroes:flight/levitate.anim.json", (entity, data) => {
        data.load(entity.getInterpolatedData("fiskheroes:flight_timer"));
    })
}

function render(entity, renderLayer, isFirstPersonArm) {
    if (!isFirstPersonArm && renderLayer == "HELMET") {
        var f = entity.getInterpolatedData("fiskheroes:flight_timer");
        var timer = entity.getInterpolatedData("dhhp:dyn/helmet_timer");

        cape.effect.length = entity.isDisplayStand() ? 24 : entity.getInterpolatedData("dhhp:dyn/helmet_timer") * 24;
        cape.render({
            "wind": timer < 1 ? timer : 1 + 0.3 * f,
            "windFactor": 1 - 0.7 * f,
            "flutter": physics.getFlutter(entity),
            "flare": physics.getFlare(entity)
        });


        if (entity.getInterpolatedData("dhhp:dyn/helmet_timer") || entity.isDisplayStand()) {
            ankh.setScale(0.1);
            ankh.setOffset(0, 2.0, -2.7);
            ankh.render();
        }


        model_ankh.texture.set(null, "model1");
        ankh_beam.opacity = entity.getInterpolatedData("fiskheroes:beam_charge");
        ankh_beam.setOffset(-25, 0, 20.0); //bottom 1
        ankh_beam.render();

        ankh_beam2.opacity = entity.getInterpolatedData("fiskheroes:beam_charge");
        ankh_beam2.setOffset(0, -25, 25.0); //top/middle
        ankh_beam2.render();

        ankh_beam3.opacity = entity.getInterpolatedData("fiskheroes:beam_charge");
        ankh_beam3.setOffset(25, 0, 20.0); //bottom 2
        ankh_beam3.render();


        if (entity.getData("fiskheroes:shield_blocking")) {
            model_ankh.texture.set(null, "model1");
            ankh_shield.opacity = 0.8;
            ankh_shield.setOffset(0, -8.5, -12.0);
            ankh_shield.render();
        }
    }
}

//complete rework