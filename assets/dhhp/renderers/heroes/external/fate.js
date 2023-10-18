var helmet;

function create(renderer, utils) {
    //helmet model
    var model = renderer.createResource("MODEL", "dhhp:helmet_model");
    model.texture.set("helmet");
    model.bindAnimation("dhhp:remove_helmet").setData((entity, data) => {
        var f = 1 - entity.getInterpolatedData("dhhp:dyn/helmet_timer");
        data.load(f < 1 ? f : 0);
    });

    helmet = renderer.createEffect("fiskheroes:model").setModel(model);
    helmet.anchor.set("head");
}

function render(entity, renderLayer, isFirstPersonArm) {
    var timer = entity.getInterpolatedData("dhhp:dyn/helmet_timer");

    if (renderLayer == "HELMET" && 1 - timer) {
        var helm_opac = Math.max(timer - 0.4, 0) * 3;

        if (!isFirstPersonArm) {
            helmet.opacity = 0.5 + timer / 2;
            helmet.render();

        }
    }
}