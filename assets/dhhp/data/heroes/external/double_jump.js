/* Note: make sure your suit has power modifer "fiskheroes:propelled_flight"
 dj = implement("dhhp:external/double_jump");
*/

function doubleJumpTickHandler(entity, manager) {
/* Example:
    hero.setTickHandler((entity, manager) => {
        dj.doubleJumpTickHandler(entity, manager)
    });
*/
    if (!entity.isOnGround() && !entity.getData("dhhp:dyn/jump")) {
        manager.setData(entity, "dhhp:dyn/jump", true)
        manager.setData(entity, "dhhp:dyn/choose_jump_animation", Math.floor(Math.random() * 3))

    }
    if (entity.isOnGround() && entity.getData("dhhp:dyn/jump")) {
        manager.setData(entity, "dhhp:dyn/jump", false)
    }

    // jump timer
    if (entity.getData("dhhp:dyn/jump")) {
        manager.setData(entity, "dhhp:dyn/jump_timer", entity.getData("dhhp:dyn/jump_timer") + 0.1)
    } else if (!entity.getData("dhhp:dyn/jump") && entity.getData("dhhp:dyn/jump_timer") != 0.0) {
        manager.setData(entity, "dhhp:dyn/jump_timer", 0.0)
    }

    // jump animation
    if (entity.getData("dhhp:dyn/jump_timer") >= 1.0 && entity.getData("fiskheroes:jetpacking") && !entity.getData("dhhp:dyn/double_jump")) {
        manager.setData(entity, "dhhp:dyn/double_jump", true)
    }
    if (entity.getData("dhhp:dyn/jump_timer") >= 1.0) {
        manager.setData(entity, "dhhp:dyn/jump_animation", entity.getData("dhhp:dyn/jump_animation") + 0.1)
    } else if (entity.getData("dhhp:dyn/jump_timer") == 0.0 && entity.getData("dhhp:dyn/jump_animation") != 0.0) {
        manager.setData(entity, "dhhp:dyn/jump_animation", 0.0)
        manager.setData(entity, "dhhp:dyn/double_jump", false)
    }
}

function doubleJumpModifer(entity, jumpMin, jumpMax, jump) {
/* Example:
    function isModifierEnabled(entity, modifier) {
        if (modifier.name() == "fiskheroes:propelled_flight") {
            return dj.doubleJumpModifer(entity, 0.8, 1.4)
            return;
        }
    }
*/
    return (entity.getData(jump) > jumpMin && entity.getData(jump) < jumpMax);
}
