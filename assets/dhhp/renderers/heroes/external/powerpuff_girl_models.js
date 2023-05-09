var head;
var body;
var l_arm;
var r_arm;
var l_leg;
var r_leg;

function initModels(renderer) {
    //IMPORTANT DO NOT TOUCH THE ANCHORING OF THE LEFT AND RIGHT LIMBS


    //Models
    var model_head = renderer.createResource("MODEL", "dhhp:powerpuff/head_powerpuff");

    model_head.texture.set("texture");
    head = renderer.createEffect("fiskheroes:model").setModel(model_head);
    head.anchor.set("head");

    var model_l_arm = renderer.createResource("MODEL", "dhhp:powerpuff/left_arm_powerpuff");

    model_l_arm.texture.set("texture");
    l_arm = renderer.createEffect("fiskheroes:model").setModel(model_l_arm);
    l_arm.anchor.set("rightArm");

    var model_r_arm = renderer.createResource("MODEL", "dhhp:powerpuff/rightarm_powerpuff");

    model_r_arm.texture.set("texture");
    r_arm = renderer.createEffect("fiskheroes:model").setModel(model_r_arm);
    r_arm.anchor.set("leftArm");

    var model_l_leg = renderer.createResource("MODEL", "dhhp:powerpuff/leftleg_powerpuff");

    model_l_leg.texture.set("texture");
    l_leg = renderer.createEffect("fiskheroes:model").setModel(model_l_leg);
    l_leg.anchor.set("rightLeg");

    var model_r_leg = renderer.createResource("MODEL", "dhhp:powerpuff/rightleg_powerpuff");

    model_r_leg.texture.set("texture");
    r_leg = renderer.createEffect("fiskheroes:model").setModel(model_r_leg);
    r_leg.anchor.set("leftLeg");

    var model_body = renderer.createResource("MODEL", "dhhp:powerpuff/body_powerpuff");

    model_body.texture.set("texture");
    body = renderer.createEffect("fiskheroes:model").setModel(model_body);
    body.anchor.set("body");

}

function render(entity, renderLayer, isFirstPersonArm) {

    l_arm.setScale(2.13);
    l_arm.setOffset(-4.8, -28.7, 0);
    l_arm.render();


    if (!isFirstPersonArm && renderLayer == "CHESTPLATE") {
        head.setScale(2.13);
        head.setOffset(0, -27.05, 0);
        head.render();

        body.setScale(2.13);
        body.setOffset(0, -27, 0);
        body.render();

        l_leg.setScale(2.13);
        l_leg.setOffset(-2, -39.0, 0);
        l_leg.render();

        r_leg.setScale(2.13);
        r_leg.setOffset(2, -39.0, 0);
        r_leg.render();

        r_arm.setScale(2.13);
        r_arm.setOffset(4.8, -28.7, 0);
        r_arm.render();
    }
}