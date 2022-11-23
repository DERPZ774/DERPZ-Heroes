extend("fiskheroes:hero_basic");
loadTextures({
    "layer1": "dhhp:dc/red_hood_layer1",
    "layer2": "dhhp:dc/red_hood_layer2",
    "lights": "dhhp:dc/red_hood_lights",
    "gun": "fiskheroes:deadpool_xmen_gun"

});

var utils = implement("fiskheroes:external/utils");

function init(renderer) {
    parent.init(renderer);
    renderer.setLights((entity, renderLayer) => renderLayer == "HELMET" ? "lights" : null);
}

function initEffects(renderer) {
    utils.addLivery(renderer, "DESERT_EAGLE", "gun");

    renderer.bindProperty("fiskheroes:equipped_item").setItems([
        { "anchor": "body", "scale": 0.535, "offset": [-3.05, 0.52, 3.0], "rotation": [-148.0, 90.0, 0.0] },
        { "anchor": "body", "scale": 0.535, "offset": [3.05, 0.52, 3.0], "rotation": [-148.0, -90.0, 0.0] }
    ]).slotIndex = 0;
    renderer.bindProperty("fiskheroes:equipped_item").setItems([
        { "anchor": "rightLeg", "scale": 0.7, "offset": [-2.4, 0.5, 1.25], "rotation": [90.0, 0.0, 0.0] },
        { "anchor": "leftLeg", "scale": 0.7, "offset": [2.4, 0.5, 1.25], "rotation": [90.0, 0.0, 0.0] }
    ]).slotIndex = 1;
}