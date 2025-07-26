extend("dhhp:superman_kc");
loadTextures({
    "layer1": "dhhp:superman_zod_layer1",
    "boots": "dhhp:superman_zod_boots",
    "pants": "dhhp:superman_zod_pants",
    "cape": "dhhp:other/blank",
    "suit": "dhhp:superman_zod_suit"
});

function init(renderer) {
    parent.init(renderer);
    renderer.setTexture((entity, renderLayer) => {
        if (renderLayer == "LEGGINGS") {
            return entity.getWornChestplate().suitType() == $SUIT_NAME ? "suit" : "pants";
        }
        return renderLayer == "CHESTPLATE" ? "layer1" : renderLayer == "BOOTS" ? "boots" : null;
    });

    renderer.showModel("CHESTPLATE", "body", "rightArm", "leftArm", "rightLeg", "leftLeg");
    renderer.fixHatLayer("CHESTPLATE");
}

function initEffects(renderer) {
    parent.initEffects(renderer);
}