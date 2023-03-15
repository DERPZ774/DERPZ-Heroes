extend("fiskheroes:hero_basic");
loadTextures({
    "layer1": "dhhp:dc/redx_layer1",
    "layer2": "dhhp:dc/redx_layer2",
});

var utils = implement("fiskheroes:external/utils");

function init(renderer) {
    parent.init(renderer);
}