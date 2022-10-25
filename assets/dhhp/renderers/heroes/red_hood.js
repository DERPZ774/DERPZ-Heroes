extend("fiskheroes:hero_basic");
loadTextures({
    "layer1": "dhhp:dc/red_hood_layer1",
    "layer2": "dhhp:dc/red_hood_layer2",
    "lights": "dhhp:dc/red_hood_lights",
    "gun": "dhhp:dc/red_hood_gun"
});

var utils = implement("fiskheroes:external/utils");

var gun1;
var gun2;

function init(renderer) {
    parent.init(renderer);
    renderer.setLights((entity, renderLayer) => renderLayer == "HELMET" ? "lights" : null);
}

function initEffects(renderer) {
    var model_gun1 = renderer.createResource("MODEL", "dhhp:gun");
    model_gun1.texture.set("gun");
    gun1 = renderer.createEffect("fiskheroes:model").setModel(model_gun1);
    gun1.anchor.set("rightArm");

    gun2 = renderer.createEffect("fiskheroes:model").setModel(model_gun1);
    gun2.anchor.set("leftArm");

    renderer.bindProperty("fiskheroes:energy_bolt").color.set(0x404040);
}

function initAnimations(renderer) {
    parent.initAnimations(renderer);
    renderer.removeCustomAnimation("basic.AIMING");
    addAnimationWithData(renderer, "basic.AIMING", "fiskheroes:aiming_fpcorr", "fiskheroes:aiming_timer");
    addAnimationWithData(renderer, "basic.AIMING_LEFT", "dhhp:aim_left", "fiskheroes:aiming_timer");
}

function render(entity, renderLayer, isFirstPersonArm) {
    if (renderLayer == "CHESTPLATE") {
        if (entity.getHeldItem().isEmpty() && entity.getData("fiskheroes:aiming") || entity.isDisplayStand()) {
            if (isFirstPersonArm){
                gun1.setOffset(0, 0.0, -0.5);
                gun1.render();

            }
            else {
            gun2.setOffset(-1.8, 0.0, 0.0);
            gun1.render();
            gun2.render();

            }
        }
    }
}