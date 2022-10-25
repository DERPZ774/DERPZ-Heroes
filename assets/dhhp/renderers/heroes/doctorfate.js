extend("fiskheroes:hero_basic");
loadTextures({
    "base": "dhhp:dc/doctorfate/doctor_fate_suit",
    "suit": "dhhp:dc/doctorfate/doctor_fate_suit.tx.json",
    "helm": "dhhp:dc/doctorfate/doctorfate_helmet",
    "lights_helmet": "dhhp:dc/doctorfate/doctorfate_helmet_lights",
    "lights": "dhhp:dc/doctorfate/dr_fate_body_lights",
    "cape": "dhhp:dc/doctorfate/doctor_fate_cape",
    "model1": "dhhp:dc/doctorfate/ankh_texture1",
    "medallion": "dhhp:dc/doctorfate/medallion"
});

var cape;

var utils = implement("fiskheroes:external/utils");

var ankh;
var ankh_beam;
var ankh_shield;
var model_ankh;

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
    cape = renderer.createEffect("fiskheroes:cape");
    cape.texture.set("cape");

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
    model_ankh.bindAnimation("dhhp:dr_ankh").setData((entity, data) => data.load(entity.getData("fiskheroes:beam_charging") ? entity.loop(70) : 0));
    ankh_beam = renderer.createEffect("fiskheroes:model").setModel(model_ankh);
    ankh_beam.anchor.set("head");

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
    utils.bindBeam(renderer, "fiskheroes:energy_projection", "dhhp:doctorfate_beam", "body", 0x1f75d5, [
        { "firstPerson": [0.0, 6.0, 0.0], "offset": [0.0, 5.0, -4.0], "size": [4.0, 4.0] }
    ]);

    //ankh beam
    utils.bindBeam(renderer, "fiskheroes:charged_beam", "dhhp:doctorfate_beam", "body", 0x1f75d5, [
        { "firstPerson": [0.0, 6.0, 0.0], "offset": [0.0, 5.0, -4.0], "size": [1.5, 1.5] }
    ]);
}

function initAnimations(renderer) {
    parent.initAnimations(renderer);
    renderer.removeCustomAnimation("basic.BLOCKING");

    addAnimationWithData(renderer, "basic.BLOCKING", "dhhp:dr_block", "fiskheroes:shield_blocking_timer");

    addAnimation(renderer, "fate.BEAM", "dhhp:dr").setData(entity => {
        var charge = entity.getInterpolatedData("fiskheroes:beam_charge");
        return  entity.getData("fiskheroes:beam_charging") ? Math.min(charge * 3, 1) : Math.max(charge * 5 - 4, 0);
    });
}

function render(entity, renderLayer, isFirstPersonArm) {
    if (!isFirstPersonArm && renderLayer == "HELMET") {
        cape.length = entity.isDisplayStand() ? 24 : entity.getData("dhhp:dyn/helmet_timer") * 24;
        cape.render();

        if (entity.getInterpolatedData("dhhp:dyn/helmet_timer") || entity.isDisplayStand()) {
            ankh.setScale(0.1);
            ankh.setOffset(0, 2.0, -2.7);
            ankh.render();
        }

        if (entity.getData("fiskheroes:beam_charging")) {
            model_ankh.texture.set(null, "model1");
            ankh_beam.opacity = 0.8;
            ankh_beam.setOffset(0, -8.5, -12.0);
            ankh_beam.render();
        }

        if (entity.getData("fiskheroes:shield_blocking")) {
            model_ankh.texture.set(null, "model1");
            ankh_shield.opacity = 0.8;
            ankh_shield.setOffset(0, -8.5, -12.0);
            ankh_shield.render();
        }
    }
}

//complete rework