extend("fiskheroes:spider_man_base");
loadTextures({
    "layer1": "dhhp:marvel/scarlet_spider_layer1",
    "layer2": "dhhp:marvel/scarlet_spider_layer2",
    "bone": "dhhp:marvel/bone_blade"
});

var blade;

var fire_hand;

function init(renderer) {
    parent.init(renderer);
}

function initEffects(renderer) {
    blade = renderer.createEffect("fiskheroes:shield");
    blade.texture.set("bone");
    blade.anchor.set("rightArm");
    blade.mirror = true;

    var fire = renderer.createResource("ICON", "fiskheroes:fire_layer_%s");

    fire_hand = renderer.createEffect("fiskheroes:booster");
    fire_hand.setIcon(fire).setOffset(1.0, 9.0, 0.0).setRotation(0.0, 0.0, 0.0).setSize(3.9, 1.0);
    fire_hand.anchor.set("rightArm");
    fire_hand.opacity = 0.4;
    fire_hand.flutter = 0.25;
    fire_hand.speedScale = 0.0;
    fire_hand.progress = 0;
}

function render(entity, renderLayer, isFirstPersonArm) {

    if (renderLayer == "CHESTPLATE") {
        blade.unfold = entity.getInterpolatedData("fiskheroes:blade_timer");

        var f = Math.min(blade.unfold * 5, 1);
        blade.setOffset(-1.05 * f, 9.0 * f, 0.0);
        blade.render();

        fire_hand.progress = (1 - entity.getInterpolatedData("fiskheroes:punch_charge")) * entity.getInterpolatedData("fiskheroes:punchmode_timer");
        fire_hand.render();

    }
}

//flame hand,