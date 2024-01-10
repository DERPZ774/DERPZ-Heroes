extend("fiskheroes:hero_basic");
loadTextures({
    "base": "dhhp:other/gojo",
});

function init(renderer) {
    parent.init(renderer);
    renderer.setTexture((entity, renderLayer) => {
        return "base";
    });
}