extend("fiskheroes:hero_basic");
loadTextures({
    "layer1": "dhhp:dc/redx_layer1",
    "layer2": "dhhp:dc/redx_layer2",
    "eyes": "dhhp:dc/redx_eyes",
    "cape": "dhhp:dc/redx_cape",
    "x_small": "dhhp:dc/redx_x_small",
    "x_big": "dhhp:dc/redx_x_big",

});

var utils = implement("fiskheroes:external/utils");
var capes = implement("fiskheroes:external/capes");

var cape;

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
    if (!isFirstPersonArm && renderLayer == "CHESTPLATE") {
        cape.render(entity);
    }
}