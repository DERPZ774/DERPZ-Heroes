extend("dhhp:superman_kc");
loadTextures({
    "layer1": "dhhp:dc/superman_kfc_layer1",
    "boots": "dhhp:dc/superman_kfc_boots",
    "pants": "dhhp:dc/superman_kfc_pants",
    "cape": "dhhp:dc/superman_kfc_cape",
    "suit": "dhhp:dc/superman_kfc_suit"
});

var chicken;

function init(renderer) {
    parent.init(renderer);
    renderer.setTexture((entity, renderLayer) => {
        if (renderLayer == "LEGGINGS") {
            return entity.getWornChestplate().suitType() == $SUIT_NAME ? "suit" : "pants";
        }
        return renderLayer == "CHESTPLATE" ? "layer1" : renderLayer == "BOOTS" ? "boots" : null;
    });

    renderer.showModel("CHESTPLATE", "body", "rightArm", "leftArm", "rightLeg", "leftLeg");
}

function initEffects(renderer) {
    parent.initEffects(renderer);
    chicken = utils.bindTrail(renderer, "dhhp:kfc_trail");
    chicken.setCondition(entity => entity.isAlive());
}