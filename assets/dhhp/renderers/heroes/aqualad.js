extend("fiskheroes:hero_basic");
loadTextures({
    "layer1": "dhhp:dc/aqualad/aqualad_layer1",
    "layer2": "dhhp:dc/aqualad/aqualad_layer2",
    "lights": "dhhp:dc/aqualad/aqualad_lights",
    "water_bearer": "dhhp:dc/aqualad/aqua_sword",
    "water_sword": "dhhp:dc/aqualad/aqua_sword_on",
    "whip": "dhhp:dc/aqualad/aqua_whip"
});

var utils = implement("fiskheroes:external/utils");
var water = implement("dhhp:external/aqualad_water");

function init(renderer) {
    parent.init(renderer);

    renderer.showModel("CHESTPLATE", "head", "headwear", "body", "rightArm", "leftArm", "rightLeg", "leftLeg");
    renderer.fixHatLayer("CHESTPLATE");
}

function initEffects(renderer) {
    overlay = renderer.createEffect("fiskheroes:overlay");

    overlay.texture.set(null, "lights");

    water.initModels(renderer);

    var color = 0x12D6ED;
    var beam = renderer.createResource("BEAM_RENDERER", "dhhp:water_beam");

    lines_water = utils.createLines(renderer, beam, color, [
        { "start": [0.5, 0.5, 1], "end": [1.1, 1.1, 1.8], "size": [4.0, 4.0] }, //coords
    ]);

    lines_water.anchor.set("rightArm");
    lines_water.setOffset(0.0, -9, -1).setRotation(-50.0, -20.0, 25.0).setScale(7.0);
    //lines_water.opacity = 0.25;
    lines_water.mirror = true;

    //water beam
    utils.bindBeam(renderer, "fiskheroes:energy_projection", beam, "rightArm", color, [
        { "firstPerson": [-4.5, 3.5, -8.0], "offset": [-0.5, 12.0, 0.0], "size": [1.5, 1.5] },
        { "firstPerson": [4.5, 3.5, -8.0], "offset": [0.8, 10.0, 0.0], "size": [1.5, 1.5], "anchor": "leftArm" }
    ]).setParticles(renderer.createResource("PARTICLE_EMITTER", "dhhp:impact_water"));

}


function initAnimations(renderer) {
    parent.initAnimations(renderer);
    renderer.removeCustomAnimation("basic.ENERGY_PROJ");

    //method to ovveride fpc_weapon 
    var hold = addAnimation(renderer, "aqualad.HOLD", "dhhp:fpc_weapon");

    hold.setData(entity => {
        return entity.getInterpolatedData("dhhp:dyn/water_weapon_timer") * (1 - entity.getInterpolatedData("fiskheroes:energy_projection_timer"));
    });

    addAnimation(renderer, "aqualad.SWIM", "dhhp:flight/aqualad_swim.anim.json")
        .setData((entity, data) => {
            data.load(0, entity.getInterpolatedData("fiskheroes:flight_timer") * (1 - entity.getInterpolatedData("fiskheroes:dyn/superhero_landing_timer")));
            data.load(1, entity.getInterpolatedData("fiskheroes:flight_boost_timer"));
        })
        .priority = -10;

    addAnimationWithData(renderer, "basic.ENERGY_PROJ", "fiskheroes:dual_aiming_fpcorr", "fiskheroes:energy_projection_timer");
    addAnimationWithData(renderer, "aqualad.WEAPON", "dhhp:escrima", "dhhp:dyn/water_weapon_timer");
    // addAnimationWithData(renderer, "aqualad.HOLD", "dhhp:fpc_weapon", "dhhp:dyn/water_weapon_timer");
    //adding this will play both aqualad.HOLD & basic.ENERGY_PROJ resulting in a bad anim
}

function render(entity, renderLayer, isFirstPersonArm) {
    if (renderLayer == "CHESTPLATE") {

        lines_water.progress = lines_water.opacity = entity.getInterpolatedData("dhhp:dyn/water_timer");
        lines_water.render();

        overlay.opacity = entity.getInterpolatedData("dhhp:dyn/water_timer") || entity.isWet();
        overlay.render();

        water.render(entity, renderLayer, isFirstPersonArm);

    }
}
// anims