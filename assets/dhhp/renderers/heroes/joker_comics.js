extend("fiskheroes:hero_basic");
loadTextures({
    "layer1": "dhhp:dc/joker_layer1",
    "layer2": "dhhp:dc/joker_layer2",
    "layer2_chest": "dhhp:dc/joker_layer2_chest",
    "chest": "dhhp:dc/joker_chest",
    "blade": "fiskheroes:agent_liberty_blade",
    "tailcoat": "dhhp:dc/joker_tailcoat"
});

var capes = implement("fiskheroes:external/capes");
var utils = implement("fiskheroes:external/utils");
var blade;
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

    blade = renderer.createEffect("fiskheroes:shield");
    blade.texture.set("blade");
    blade.anchor.set("rightArm");


    utils.bindBeam(renderer, "fiskheroes:charged_beam", "dhhp:water_beam", "body", 0x38FE03, [
        { "firstPerson": [2.2, 0.0, 2.0], "offset": [2.9, 1.4, -4.0], "size": [0.2, 0.2] },
    ]).setParticles(renderer.createResource("PARTICLE_EMITTER", "fiskheroes:impact_charged_beam"));
}

function render(entity, renderLayer, isFirstPersonArm) {
    if (renderLayer == "CHESTPLATE") {
        blade.unfold = entity.getInterpolatedData("fiskheroes:blade_timer");

        var f = Math.min(blade.unfold * 5, 1);
        blade.setOffset(2.9 + 0.1 * f, 6.0 + 3.0 * f, 0.0);
        blade.render();
    }
    if (!isFirstPersonArm && renderLayer == "CHESTPLATE") {
        tailcoat.render(entity);
    }
}