extend("fiskheroes:hero_basic");
loadTextures({
    "base": "dhhp:dc/doctorfate/doctor_fate_suit",
    "suit": "dhhp:dc/doctorfate/doctor_fate_suit.tx.json",
    "helm": "dhhp:dc/doctorfate/doctorfate_helmet",
    "lights_helmet": "dhhp:dc/doctorfate/doctorfate_helmet_lights",
    "lights": "dhhp:dc/doctorfate/dr_fate_body_lights",
    "cape": "dhhp:dc/doctorfate/doctor_fate_cape",
    "helmet": "dhhp:dc/doctorfate/doctorfate_helmet",
});

var utils = implement("fiskheroes:external/utils");
var capes = implement("fiskheroes:external/capes");

var cape;
var physics;
var helmet;
var glow;

function init(renderer) {
    parent.init(renderer);
    renderer.setTexture((entity, renderLayer) => {
        var timer = entity.getInterpolatedData("dhhp:dyn/helmet_timer");

        if (!entity.is("DISPLAY") || entity.as("DISPLAY").getDisplayType() === "BOOK_PREVIEW") {
            return timer < 1 ? "suit" : "base";
        }

        if (entity.as("DISPLAY").getDisplayType() == "HOLOGRAM") {
            return timer == 1 ? "base" : "suit";
        }

        return "base";

    });
    renderer.setLights((entity, renderLayer) => {
        var timer = entity.getInterpolatedData("dhhp:dyn/helmet_timer");

        if (entity.as("DISPLAY").getDisplayType() == "HOLOGRAM") {
            return timer == 1 ? "lights" : timer == 1 ? "lights_helmet" : null;
        }

        return (timer >= 1 || entity.is("DISPLAY") || entity.as("DISPLAY").getDisplayType() === "BOOK_PREVIEW") ? "lights" : (timer == 1 ? "lights_helmet" : null);
    });

    renderer.showModel("HELMET", "head", "headwear", "body", "rightArm", "leftArm", "rightLeg", "leftLeg");
}

function initEffects(renderer) {
    physics = renderer.createResource("CAPE_PHYSICS", null);
    physics.weight = 1.2;
    physics.maxFlare = 0.65;
    physics.flareDegree = 0.5;
    physics.flareFactor = 0.5;
    physics.flareElasticity = 4;
    physics.setTickHandler(entity => {
        var f = 1 - entity.getData("fiskheroes:flight_timer");
        f = 1 - f * f * f;
        physics.headingAngle = 90 - f * 20;
        physics.restAngle = f * 40;
        physics.restFlare = f * 0.7;
        physics.idleFlutter = 0.15 + 0.25 * f;
        physics.flutterSpeed = f * 0.3;
    });

    cape = capes.create(renderer, 24, "fiskheroes:cape_default.mesh.json");
    cape.effect.texture.set("cape");

    var magic = renderer.bindProperty("fiskheroes:spellcasting");
    magic.colorGeneric.set(0x1f75d5);
    magic.colorEarthCrack.set(0x1f75d5);
    magic.colorAtmosphere.set(0x1f75d5);
    magic.colorWhip.set(0x1f75d5);

    var model = renderer.createResource("MODEL", "dhhp:helmet_model");
    model.texture.set("helmet");
    model.bindAnimation("dhhp:remove_helmet").setData((entity, data) => {
        var f = 1 - entity.getInterpolatedData("dhhp:dyn/helmet_timer");
        data.load(f < 1 ? f : 0);
    });

    helmet = renderer.createEffect("fiskheroes:model").setModel(model);
    helmet.anchor.set("head");

    glow = renderer.createEffect("fiskheroes:glowerlay");
    glow.includeEffects(cape.effect);
    glow.color.set(0xF9DA15);
}

function initAnimations(renderer) {
    parent.initAnimations(renderer);
    renderer.removeCustomAnimation("basic.BLOCKING");
    renderer.removeCustomAnimation("basic.CHARGED_BEAM");
    renderer.removeCustomAnimation("basic.AIMING");

    addAnimationWithData(renderer, "basic.BLOCKING", "dhhp:dr_block", "fiskheroes:shield_blocking_timer");

    addAnimation(renderer, "basic.AIMING", "fiskheroes:dual_aiming").setData((entity, data) => {
        var charge = entity.getInterpolatedData("fiskheroes:beam_charge");
        data.load(Math.max(entity.getInterpolatedData("fiskheroes:aiming_timer"), entity.getData("fiskheroes:beam_charging") ? Math.min(charge * 3, 1) : Math.max(charge * 5 - 4, 0)));
    });

    addAnimation(renderer, "red_hood.HELMET", "dhhp:remove_helmet")
        .setData((entity, data) => {
            var f = 1 - entity.getInterpolatedData("dhhp:dyn/helmet_timer");
            data.load(f < 1 ? f : 0);
        });

    utils.addFlightAnimation(renderer, "fate.FLIGHT", "fiskheroes:flight/levitate.anim.json", (entity, data) => {
        data.load(entity.getInterpolatedData("fiskheroes:flight_timer"));
    })
}

function render(entity, renderLayer, isFirstPersonArm) {
    if (!isFirstPersonArm && renderLayer == "HELMET") {
        var f = entity.getInterpolatedData("fiskheroes:flight_timer");
        var timer = entity.getInterpolatedData("dhhp:dyn/helmet_timer");

        glow.opacity = 1 - timer;
        glow.render();

        if (1 - timer) {
            helmet.render();
        }

        cape.effect.length = entity.is("DISPLAY") ? 24 : entity.getInterpolatedData("dhhp:dyn/helmet_timer") * 24;
        cape.render({
            "wind": timer < 1 ? timer : 1 + 0.3 * f,
            "windFactor": 1 - 0.7 * f,
            "flutter": physics.getFlutter(entity),
            "flare": physics.getFlare(entity)
        });
    }
}