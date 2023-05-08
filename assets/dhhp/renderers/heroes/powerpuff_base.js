extend("fiskheroes:hero_basic");
loadTextures({
    //"texture": "dhhp:other/blossom",
    "blank": "dhhp:other/blank"
});

var utils = implement("fiskheroes:external/utils");
var powerpuff = implement("dhhp:external/powerpuff_girl_models");

function init(renderer) {
    parent.init(renderer);
    renderer.setTexture((entity, renderLayer) => {
        return "blank";
    });

    renderer.showModel("CHESTPLATE", "head", "headwear", "body", "rightArm", "leftArm", "rightLeg", "leftLeg");
    
    utils.addCameraShake(renderer, 0.015, 1.5, "fiskheroes:flight_boost_timer");
    utils.addCameraShake(renderer, 0.25, 4.5, "fiskheroes:dyn/superhero_landing_timer");
}

function initEffects(renderer) {
    parent.initEffects(renderer);

    utils.setOpacity(renderer, 0.99, 1.0);
    powerpuff.initModels(renderer);
}

function initAnimations(renderer) {
    parent.initAnimations(renderer);
    addAnimation(renderer, "powerpuff.IDLE", "dhhp:powerpuff").setData((entity, data) => {
        data.load(1);
    }).priority = 0;

}

function render(entity, renderLayer, isFirstPersonArm) {
    parent.render(entity, renderLayer);
    powerpuff.render(entity, renderLayer);
}