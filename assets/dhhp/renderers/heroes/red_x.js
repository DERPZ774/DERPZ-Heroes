extend("fiskheroes:hero_basic");
loadTextures({
    "layer1": "dhhp:dc/redx_layer1",
    "layer2": "dhhp:dc/redx_layer2",
    "eyes": "dhhp:dc/redx_eyes",
    "cape": "dhhp:dc/redx_cape",
    "x_small": "dhhp:dc/redx_x_small",
    "x_big": "dhhp:dc/redx_x_big",
    "x_shield": "dhhp:dc/redx_x_shield"

});

var utils = implement("fiskheroes:external/utils");
var capes = implement("fiskheroes:external/capes");

var cape;
var shield;
var vibration;

function init(renderer) {
    parent.init(renderer);
    renderer.setLights((entity, renderLayer) => renderLayer == "HELMET" ? "eyes" : null);
}

function initEffects(renderer) {
    //thanks to daddy max <3
    var webs = renderer.bindProperty("fiskheroes:webs");
    webs.textureSmall.set(null, "x_small");
    webs.textureLarge.set(null, "x_big");
    //change names for textures

    shield = renderer.createEffect("fiskheroes:shield");
    shield.texture.set("x_shield");
    shield.anchor.set("rightArm");
    shield.large = true;
    //shield.setCurve(25.0, 35.0);

    var magic = renderer.bindProperty("fiskheroes:spellcasting");
    magic.colorGeneric.set(0x800000);

    //for the secret vibrator alt (owo)
    vibration = renderer.createEffect("fiskheroes:vibration");

    var physics = renderer.createResource("CAPE_PHYSICS", null);
    physics.maxFlare = 0.4;
    physics.flareDegree = 1.5;
    physics.flareFactor = 1.2;
    physics.flareElasticity = 5;

    cape = capes.createDefault(renderer, 24, "fiskheroes:cape_default.mesh.json", physics);
    cape.effect.texture.set("cape");
    cape.effect.width = 12;
}

function initAnimations(renderer) {
    parent.initAnimations(renderer);

    addAnimationWithData(renderer, "redx.AIMING", "fiskheroes:aiming", "fiskheroes:web_aim_right_timer")
        .priority = 2;

    addAnimationWithData(renderer, "redx.AIMING_LEFT", "fiskheroes:aiming_left", "fiskheroes:web_aim_left_timer")
        .priority = 2;



    // utils.addAnimationEvent(renderer, "WEBSHOOTER_SHOOT_RIGHT", "fiskheroes:web_shoot_right");
    //utils.addAnimationEvent(renderer, "WEBSHOOTER_SHOOT_LEFT", "fiskheroes:web_shoot_left");

}

function render(entity, renderLayer, isFirstPersonArm) {
    if (renderLayer == "CHESTPLATE") {
        shield.unfold = entity.getInterpolatedData("fiskheroes:shield_timer");
        shield.setOffset(2.9 + 1.35 * Math.min(shield.unfold * 5, 1), 5.0, 0.0);
        shield.render();
    }
    if (!isFirstPersonArm && renderLayer == "CHESTPLATE") {
        cape.render(entity);
    }
    if (!entity.isDisplayStand() && entity.getData("dhhp:dyn/charge_teleport_timer")) {
        vibration.render();
    }
}