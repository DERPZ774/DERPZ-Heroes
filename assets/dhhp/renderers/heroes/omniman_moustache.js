extend("dhhp:omniman");
loadTextures({
    "layer1": "dhhp:omniman/omniman_stache_layer1",
});

function init(renderer) {
    parent.init(renderer);

    renderer.setItemIcons("omniman_0", "omniman_1", "omniman_2", "omniman_3");

    renderer.showModel("CHESTPLATE", "head", "body", "rightArm", "leftArm", "rightLeg", "leftLeg");
    renderer.fixHatLayer("CHESTPLATE");
}

function initEffects(renderer) {
    parent.initEffects(renderer);
}