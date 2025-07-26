extend("fiskheroes:hero_basic");
loadTextures({
    "layer1": "dhhp:red_hood_layer1",
    "layer2": "dhhp:red_hood_layer2",
    "lights": "dhhp:red_hood_lights",
    "gun": "dhhp:desert_eagle_red_hood",
    "helmet": "dhhp:red_hood_helmet",
    "mask": "dhhp:red_hood_mask_layer1"
});

var utils = implement("fiskheroes:external/utils");

var night_vision;
var helmet;

function init(renderer) {
    parent.init(renderer);

    renderer.setTexture((entity, renderLayer) => {
        if (renderLayer == "HELMET") {
            if (entity.getInterpolatedData("fiskheroes:mask_open_timer2") > 0) {
                return "mask";
            } else {
                return "layer1";
            }
        }
        return renderLayer == "LEGGINGS" ? "layer2" : "layer1";
    });

    renderer.setLights((entity, renderLayer) => renderLayer == "HELMET" ? "lights" : null);
}

function initEffects(renderer) {
    utils.addLivery(renderer, "DESERT_EAGLE", "gun");

    var model = renderer.createResource("MODEL", "dhhp:helmet_model");
    model.texture.set("helmet");
    model.bindAnimation("dhhp:remove_helmet").setData((entity, data) => {
        var f = entity.getInterpolatedData("fiskheroes:mask_open_timer2");
        data.load(f < 1 ? f : 0);
    });

    helmet = renderer.createEffect("fiskheroes:model").setModel(model);
    helmet.anchor.set("head");

    renderer.bindProperty("fiskheroes:equipped_item").setItems([
        { "anchor": "rightLeg", "scale": 0.7, "offset": [-2.4, 0.5, 1.25], "rotation": [90.0, 0.0, 0.0] },
        { "anchor": "leftLeg", "scale": 0.7, "offset": [2.4, 0.5, 1.25], "rotation": [90.0, 0.0, 0.0] }
    ]).slotIndex = 1;

    night_vision = renderer.bindProperty("fiskheroes:night_vision");
    night_vision.factor = 0.30;
    night_vision.firstPersonOnly = false;
}

function initAnimations(renderer) {
    parent.initAnimations(renderer);
    addAnimation(renderer, "red_hood.HELMET", "dhhp:remove_helmet")
        .setData((entity, data) => {
            var f = entity.getInterpolatedData("fiskheroes:mask_open_timer2");
            data.load(f < 1 ? f : 0);
        });
}

function render(entity, renderLayer, isFirstPersonArm) {
    var mask = entity.getInterpolatedData("fiskheroes:mask_open_timer2") < 0.87;
    if (renderLayer == "HELMET" && mask) {
        helmet.render();
    }
}