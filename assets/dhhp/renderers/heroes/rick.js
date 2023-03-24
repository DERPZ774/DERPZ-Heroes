extend("fiskheroes:hero_basic");
loadTextures({
    "base": "dhhp:other/rick"

});

function init(renderer) {
    parent.init(renderer);
    renderer.setTexture((entity, renderLayer) => {

        return "base";
    });
}