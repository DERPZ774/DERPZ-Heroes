extend("fiskheroes:hero_basic");
loadTextures({
    "layer1": "dhhp:atom_eve/atom_eve_layer1",
    "boots": "dhhp:atom_eve/atom_eve_boots",
    "cape": "dhhp:atom_eve/atom_eve_cape",
    "suit": "dhhp:atom_eve/atom_eve_suit.tx.json",
    "base": "dhhp:atom_eve/atom_eve_base"
});

var flight = implement("dhhp:external/flight");
var utils = implement("fiskheroes:external/utils");
var capes = implement("fiskheroes:external/capes");
var atom = implement("dhhp:external/atom_beams");

var cape;
var physics;
var chest;

function init(renderer) {
    parent.init(renderer);
    renderer.setTexture((entity, renderLayer) => {
        var timer = entity.getInterpolatedData("dhhp:dyn/atom_timer");

        if (!entity.is("DISPLAY") || entity.as("DISPLAY").getDisplayType() === "BOOK_PREVIEW") {
            return timer == 0 ? "mask" : timer < 1 ? "suit" : "base";
        }

        return renderLayer == "BOOTS" ? "boots" : "layer1";
    });

    renderer.showModel("CHESTPLATE", "body", "rightArm", "leftArm", "rightLeg", "leftLeg");
}

function initEffects(renderer) {
    atom = atom.create(renderer, utils);

    physics = renderer.createResource("CAPE_PHYSICS", null);
    physics.weight = 0.8;
    physics.maxFlare = 0.75;
    physics.flareDegree = 1.5;
    physics.flareFactor = 1.5;
    physics.flareElasticity = 8;
    physics.setTickHandler(entity => {
        var f = 1 - entity.getData("fiskheroes:flight_timer");
        f = 1 - f * f * f;
        physics.headingAngle = 90 - f * 20;
        physics.restAngle = f * 40;
        physics.restFlare = f * 0.7;
        physics.idleFlutter = 0.15 + 0.25 * f;
        physics.flutterSpeed = f * 0.4;
    });

    cape = capes.create(renderer, 10, "fiskheroes:cape_default.mesh.json");
    cape.effect.texture.set("cape");

    chest = renderer.createEffect("fiskheroes:chest");
    chest.setExtrude(1).setYOffset(1);

    utils.addCameraShake(renderer, 0.015, 1.5, "fiskheroes:flight_boost_timer");
    utils.addCameraShake(renderer, 0.015, 4.5, "fiskheroes:dyn/superhero_landing_timer");
    utils.bindCloud(renderer, "fiskheroes:telekinesis", "dhhp:atom_eve");
}

function initAnimations(renderer) {
    parent.initAnimations(renderer);
    renderer.removeCustomAnimation("basic.PROP_FLIGHT");
    renderer.removeCustomAnimation("basic.BLOCKING");
    renderer.removeCustomAnimation("basic.ENERGY_PROJ");
    renderer.removeCustomAnimation("basic.CHARGED_BEAM");
    renderer.removeCustomAnimation("basic.AIMING");

    addAnimation(renderer, "invicible.FLIGHT", "dhhp:flight/invincible_flight.anim.json")
        .setData((entity, data) => {
            data.load(0, entity.getInterpolatedData("fiskheroes:flight_timer") * (1 - entity.getInterpolatedData("fiskheroes:dyn/superhero_landing_timer")));
            data.load(1, entity.getInterpolatedData("fiskheroes:flight_boost_timer"));
        })
        .priority = -10;

    utils.addHoverAnimation(renderer, "invincible.HOVER", "fiskheroes:flight/idle/martian_comics");
    utils.addAnimationEvent(renderer, "FLIGHT_DIVE", "fiskheroes:iron_man_dive");

    addAnimationWithData(renderer, "basic.BLOCKING", "dhhp:atom_shield", "fiskheroes:shield_blocking_timer");
    addAnimationWithData(renderer, "atom.TRANSFORM", "dhhp:atom_transform", "dhhp:dyn/atom_timer");
    addAnimationWithData(renderer, "atom.AIMING", "fiskheroes:dual_aiming_fpcorr", "fiskheroes:energy_projection_timer");
    addAnimationWithData(renderer, "atom.SHOOT", "fiskheroes:dual_aiming_fpcorr", "fiskheroes:aiming_timer");
    addAnimationWithData(renderer, "atom.TLE", "fiskheroes:aiming_fpcorr", "dhhp:dyn/telekinesis_timer");

    renderer.reprioritizeDefaultAnimation("PUNCH", -9);
    renderer.reprioritizeDefaultAnimation("AIM_BOW", -9);
}

function render(entity, renderLayer, isFirstPersonArm) {
    atom.render(entity, renderLayer, isFirstPersonArm);

    if (!isFirstPersonArm) {
        if (renderLayer == "CHESTPLATE") {
            var f = entity.getInterpolatedData("fiskheroes:flight_timer");
            cape.effect.length = entity.is("DISPLAY") ? 14 : entity.getInterpolatedData("dhhp:dyn/atom_timer") * 14;
            cape.render({
                "wind": 1 + 0.3 * f,
                "windFactor": 1 - 0.7 * f,
                "flutter": physics.getFlutter(entity),
                "flare": physics.getFlare(entity)
            });
            chest.render();
            if (entity.getEquipmentInSlot(4).nbt().getString('HeroType') == 'dhhp:atom_eve') {
                cape.effect.texture.set("cape_hair");
            } else {
                cape.effect.texture.set("cape");
            }
        }
    }
}