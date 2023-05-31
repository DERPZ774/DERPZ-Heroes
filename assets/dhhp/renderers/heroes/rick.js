extend("fiskheroes:hero_basic");
loadTextures({
    "base": "dhhp:other/rick"

});

var utils = implement("fiskheroes:external/utils");
var booster_boots;


function init(renderer) {
    parent.init(renderer);
    renderer.setTexture((entity, renderLayer) => {
        return "base";
    });
}

function initEffects(renderer) {
    var red_fire = renderer.createResource("ICON", "fiskheroes:red_fire_layer_%s");
    booster_boots = renderer.createEffect("fiskheroes:booster");
    booster_boots.setIcon(red_fire).setOffset(0.0, 8.5, 2.0).setSize(1.5, 4.0);
    booster_boots.anchor.set("rightLeg");
    booster_boots.mirror = true;
    booster_boots.opacity = 0.7;

    utils.addCameraShake(renderer, 0.015, 1.5, "fiskheroes:flight_boost_timer");
    utils.bindParticles(renderer, "fiskheroes:black_manta_dceu").setCondition(entity => entity.getData("fiskheroes:flying"));
}


function initAnimations(renderer) {
    parent.initAnimations(renderer);
    utils.addFlightAnimationWithLanding(renderer, "iron_man.FLIGHT", "fiskheroes:flight/iron_man.anim.json");
    utils.addHoverAnimation(renderer, "iron_man.HOVER", "fiskheroes:flight/idle/iron_man");
    utils.addAnimationEvent(renderer, "FLIGHT_DIVE", "fiskheroes:iron_man_dive");

    addAnimationWithData(renderer, "iron_man.LAND", "fiskheroes:superhero_landing", "fiskheroes:dyn/superhero_landing_timer")
        .priority = -8;

    addAnimationWithData(renderer, "iron_man.ROLL", "fiskheroes:flight/barrel_roll", "fiskheroes:barrel_roll_timer")
        .priority = 10;
}

function render(entity, renderLayer, isFirstPersonArm) {
    if (!isFirstPersonArm) {
        if (renderLayer == "BOOTS") {
            var boost = entity.getInterpolatedData("fiskheroes:flight_boost_timer");
            booster_boots.progress = entity.getInterpolatedData("fiskheroes:dyn/booster_timer");
            booster_boots.speedScale = 0.5 * boost;
            booster_boots.flutter = 1 + boost;

            booster_boots.setRotation(20 - 10 * boost, 0, 0);
            booster_boots.render();
        }
    }
}