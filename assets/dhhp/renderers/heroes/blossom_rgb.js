extend("dhhp:blossom");
loadTextures({
    "rgb": "dhhp:ppg/blossom_rgb.tx.json",
    "texture": "dhhp:ppg/blossom"
});


function initEffects(renderer) {
    parent.initEffects(renderer);

    /* var trail = renderer.bindProperty("fiskheroes:trail");

    //trail code stolen (this is a joke i got permission) from max
    var trail_1 = renderer.createResource("TRAIL", "dhhp:rgb_ppg_blue");
    var trail_2 = renderer.createResource("TRAIL", "dhhp:rgb_ppg_cyan");
    var trail_3 = renderer.createResource("TRAIL", "dhhp:rgb_ppg_green");
    var trail_4 = renderer.createResource("TRAIL", "dhhp:rgb_ppg_magenta");
    var trail_5 = renderer.createResource("TRAIL", "dhhp:rgb_ppg_red");
    var trail_6 = renderer.createResource("TRAIL", "dhhp:rgb_ppg_yellow");

    trail.setCondition(entity => {
        var ticks = entity.ticksExisted();
        var mod = 24;
        if (ticks % mod >= 0 && ticks % mod < 4) {
            trail.setTrail(trail_1);
        } else if (ticks % mod >= 2 && ticks % mod < 8) {
            trail.setTrail(trail_2);
        } else if (ticks % mod >= 4 && ticks % mod < 12) {
            trail.setTrail(trail_3);
        } else if (ticks % mod >= 6 && ticks % mod < 16) {
            trail.setTrail(trail_4);
        } else if (ticks % mod >= 8 && ticks % mod < 20) {
            trail.setTrail(trail_5);
        } else if (ticks % mod >= 24) {
            trail.setTrail(trail_6);
        }

        return entity.getData("fiskheroes:speeding") || entity.getData("fiskheroes:flying") && entity.isSprinting();
    });
*/
    /* utils.bindBeam(renderer, "fiskheroes:charged_beam", "dhhp:freeze_breath", "head", 0x90ffff, [
         { "firstPerson": [0.0, 2.5, 0.0], "offset": [0.0, -1.0, -4.0], "size": [4.0, 4.0] }
     ]).setParticles(renderer.createResource("PARTICLE_EMITTER", "dhhp:freeze_impact"));

     utils.bindBeam(renderer, "fiskheroes:energy_projection", "dhhp:heat_breath", "head", 0xF43D07, [
         { "firstPerson": [0.0, 2.5, 0.0], "offset": [0.0, -1.0, -4.0], "size": [1.0, 1.0] }
     ]).setParticles(renderer.createResource("PARTICLE_EMITTER", "dhhp:heat_impact"));
     */
}

// function initAnimations(renderer) {
//     parent.initAnimations(renderer);
//     renderer.removeCustomAnimation("basic.ENERGY_PROJ");
// }