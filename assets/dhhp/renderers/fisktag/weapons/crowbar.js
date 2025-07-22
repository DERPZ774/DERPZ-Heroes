loadTextures({
    "base": "dhhp:crowbar",
});

var utils = implement("fisktag:external/utils");
var model, cancelAnimations = false;

function init(renderer) {
    var model = utils.createModel(renderer, "dhhp:crowbar", "base");
    renderer.setModel(model);
}

function render(renderer, entity, glProxy, renderType, scopeTimer, recoil, isLeftSide) {
    cancelAnimations = false;
    if (renderType === "EQUIPPED_FIRST_PERSON") {
    } else if (renderType === "ENTITY") {
        glProxy.rotate(90, 1, 0, 0);
        glProxy.translate(0, -0.15, 0.05)
    } else if (renderType === "INVENTORY") {
        glProxy.translate(0.225, 0.1, 0)
        glProxy.scale(1.25);
    } else if (renderType === "EQUIPPED") {
        glProxy.translate(0, 0, -0.1)
    }
    glProxy.translate(0, -1.65, 0);
    glProxy.scale(1.5);
}
//thanks candy im stealing this