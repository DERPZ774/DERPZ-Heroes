extend("fiskheroes:hero_basic");
loadTextures({
    "layer1": "dhhp:joker_layer1",
    "layer2": "dhhp:joker_layer2",
    "layer2_chest": "dhhp:joker_layer2_chest",
    "chest": "dhhp:joker_chest",
    "tailcoat": "dhhp:joker_tailcoat"
});

var capes = implement("fiskheroes:external/capes");
var utils = implement("fiskheroes:external/utils");
var tailcoat;

function init(renderer) {
    parent.init(renderer);
    renderer.setTexture((entity, renderLayer) => {
        if (renderLayer == "CHESTPLATE") {
            return entity.getWornLeggings().suitType() == $SUIT_NAME ? "layer1" : "chest";
        }
        if (renderLayer == "LEGGINGS") {
            return entity.getWornChestplate().suitType() == $SUIT_NAME ? "layer2_chest" : "layer2";
        }
        return renderLayer == "LEGGINGS" ? "layer2" : "layer1";
    });
}

function initEffects(renderer) {
    var physics = renderer.createResource("CAPE_PHYSICS", null);
    physics.maxFlare = 0.1;
    physics.weight = 1.8;
    tailcoat = capes.createDefault(renderer, 20, "fiskheroes:cape_default.mesh.json", physics);
    tailcoat.effect.texture.set("tailcoat");
    tailcoat.effect.width = 8;
    tailcoat.effect.setOffset(0.0, 11.0, -0.05);
    utils.bindParticles(renderer, "dhhp:acid_flower").setCondition(entity => entity.getData("fiskheroes:beam_charging") && entity.getData("fiskheroes:beam_charge") < 1 || entity.getData("fiskheroes:beam_shooting") > 0);

    utils.bindBeam(renderer, "fiskheroes:charged_beam", "dhhp:water_beam", "body", 0x38FE03, [
        { "firstPerson": [0, 0.0, 0.0], "offset": [0, 0, 0.0], "size": [0, 0] },
    ]).setParticles(renderer.createResource("PARTICLE_EMITTER", "dhhp:acid_flower_impact"));
}

function initAnimations(renderer) {
    parent.initAnimations(renderer);
    renderer.removeCustomAnimation("basic.CHARGED_BEAM");
}

function render(entity, renderLayer, isFirstPersonArm) {
    if (!isFirstPersonArm && renderLayer == "CHESTPLATE") {
        tailcoat.render(entity);
    }
}