/* Note: make sure your suit has power modifer "fiskheroes:propelled_flight" and that the data file is setup first
 Implement example:

  dj = implement("dhhp:external/double_jump");

 Code example:

function initAnimations(renderer) {
        parent.initAnimations(renderer);
        dj.doubleJumpAnimation(renderer, addAnimation, "dhhp:dyn/jump_animation", "dhhp:dyn/double_jump", "dhhp:dyn/choose_jump_animation")
};
*/
function doubleJumpAnimation(renderer, addAnimation, jump, doublejump, random) {

        renderer.removeCustomAnimation("basic.PROP_FLIGHT")

        addAnimation(renderer, "doublejump.SPRINGBOARD", "fiskheroes:swing_springboard")
        .setData((entity, data) => data.load(entity.getData(doublejump) ?
                        Math.min(Math.max(entity.getInterpolatedData(jump) / 1.5, 0), 1) : 0))
        .setCondition(entity => entity.getData(random) == 0);

        addAnimation(renderer, "doublejump.ROLLFIVE", "fiskheroes:swing_roll5")
        .setData((entity, data) => data.load(entity.getData(doublejump) ?
                        Math.min(Math.max(entity.getInterpolatedData(jump) / 1.5, 0), 1) : 0))
        .setCondition(entity => entity.getData(random) == 1);

        addAnimation(renderer, "doublejump.ROLL", "fiskheroes:swing_roll")
        .setData((entity, data) => data.load(entity.getData(doublejump) ?
                        Math.min(Math.max(entity.getInterpolatedData(jump) / 1.5, 0), 1) : 0))
        .setCondition(entity => entity.getData(random) == 2);
}
