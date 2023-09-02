//Credit Oliver & Tammy 

var aura_head;
var aura_head2;
var aura_body;
var aura_arms;
var aura_arms2;
var aura_legs;
var aura_legs2;
var helmet;

function create(renderer, utils) {
    //Aura Head
    aura_head = utils.createLines(renderer, "dhhp:aura", 0xD4AF37, [
        { "start": [0.0, 0.0, 0.0], "end": [0.0, -1.1, 0.0], "size": [8.1, 8.1] }
    ]);
    aura_head.anchor.set("head");
    aura_head.setOffset(0.0, 0.0, 0.0).setRotation(0, 0, 0.0).setScale(16.0, 8.0, 16.0);
    aura_head.mirror = false;

    aura_head2 = utils.createLines(renderer, "dhhp:aura", 0xD4AF37, [
        { "start": [0.0, 0.0, 0.0], "end": [0.0, -1.1, 0.0], "size": [8.1, 8.1] }
    ]);
    aura_head2.anchor.set("head");
    aura_head2.setOffset(0.0, -4.0, 4.0).setRotation(90, 0, 0.0).setScale(16.0, 8.0, 16.0);
    aura_head2.mirror = false;

    //Aura Body
    aura_body = utils.createLines(renderer, "dhhp:aura", 0xD4AF37, [
        { "start": [0.0, 0.0, 0.0], "end": [0.0, -1.0, 0.0], "size": [4.0, 8.0] }
    ]);
    aura_body.anchor.set("body");
    aura_body.setOffset(0.0, 12.0, 0.0).setRotation(0, 0, 0.0).setScale(16.0, 12.0, 16.0);
    aura_body.mirror = false;

    //Aura Arms
    aura_arms = utils.createLines(renderer, "dhhp:aura", 0xD4AF37, [
        { "start": [0.0, 0.0, 0.0], "end": [0.0, -1.0, 0.0], "size": [4.0, 4.0] }
    ]);
    aura_arms.anchor.set("rightArm");
    aura_arms.setOffset(1.0, 10.0, 0.0).setRotation(0, 0, 0.0).setScale(16.0, 12.0, 16.0);
    aura_arms.mirror = true;

    aura_arms2 = utils.createLines(renderer, "dhhp:aura", 0xD4AF37, [
        { "start": [0.0, 0.0, 0.0], "end": [0.0, -1.0, 0.0], "size": [12.0, 4.0] }
    ]);
    aura_arms2.anchor.set("rightArm");
    aura_arms2.setOffset(1.0, 4.0, 2.0).setRotation(90, 0, 0.0).setScale(16.0, 4.0, 16.0);
    aura_arms2.mirror = true;

    //Aura Legs
    aura_legs = utils.createLines(renderer, "dhhp:aura", 0xD4AF37, [
        { "start": [0.0, 0.0, 0.0], "end": [0.0, -1.0, 0.0], "size": [4.0, 4.0] }
    ]);
    aura_legs.anchor.set("rightLeg");
    aura_legs.setOffset(0.0, 12.0, 0.0).setRotation(0, 0, 0.0).setScale(16.0, 12.0, 16.0);
    aura_legs.mirror = true;

    aura_legs2 = utils.createLines(renderer, "dhhp:aura", 0xD4AF37, [
        { "start": [0.0, 0.0, 0.0], "end": [0.0, -1.0, 0.0], "size": [12.0, 4.0] }
    ]);
    aura_legs2.anchor.set("rightLeg");
    aura_legs2.setOffset(0.0, 6.0, 2.0).setRotation(90, 0, 0.0).setScale(16.0, 4.0, 16.0);
    aura_legs2.mirror = true;

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

        aura_head.opacity = helm_opac;
        aura_head.render();
        aura_head2.opacity = helm_opac;
        aura_head2.render();

        aura_body.opacity = helm_opac;
        aura_body.render();

        aura_arms.opacity = helm_opac;
        aura_arms.render();
        aura_arms2.opacity = helm_opac;
        aura_arms2.render();

        aura_legs.opacity = helm_opac;
        aura_legs.render();
        aura_legs2.opacity = helm_opac;
        aura_legs2.render();

        if (!isFirstPersonArm) {
            helmet.opacity = 0.5 + timer / 2;
            helmet.render();

        }
    }
}