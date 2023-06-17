var shield;
var shield_l;
var shield_r;
var flightRenderHands;
var flightRenderLegs;
var transformation;
var transformHand;

function create(renderer, utils) {
    var shieldRender = "dhhp:atom_eve";
    var flightBeam = "dhhp:atom_eve_flight";
    var color = 0xCA445B;
    var circle = renderer.createResource("SHAPE", "dhhp:atom_eve");
    var beam = renderer.createResource("BEAM_RENDERER", "dhhp:atom_transformation");
    var beamCharged = renderer.createResource("BEAM_RENDERER", "fiskheroes:cold_beam")
        //shield render
    shield = utils.createLines(renderer, shieldRender, color, [
        { "start": [0.0, 0.0, 0.0], "end": [4.6, 0.0, 0.0], "size": [3.0, 60.0] }
    ]);
    shield.anchor.ignoreAnchor(true);;
    shield.setOffset(0, 24, -12.0).setRotation(0.0, 90.0, -90.0).setScale(8.0);
    // shield.setScale(16.0);

    shield_l = utils.createLines(renderer, shieldRender, color, [
        { "start": [0.0, 0.0, 0.0], "end": [4.6, 0.0, 0.0], "size": [3.0, 60.0] }
    ]);
    shield_l.anchor.ignoreAnchor(true);
    shield_l.setOffset(-25.0, 24, -7.0).setRotation(0.0, -115.0, -90.0).setScale(8.0);

    shield_r = utils.createLines(renderer, shieldRender, color, [
        { "start": [0.0, 0.0, 0.0], "end": [4.6, 0.0, 0.0], "size": [3.0, 60.0] }
    ]);
    shield_r.anchor.ignoreAnchor(true);
    shield_r.setOffset(25.0, 24, -7.0).setRotation(0.0, 115.0, -90.0).setScale(8.0);

    flightRenderHands = utils.createLines(renderer, flightBeam, color, [
        { "start": [0.0, 0.0, 0.0], "end": [1.0, 0.0, 0.0], "size": [4.0, 4.0] }
    ]);
    flightRenderHands.anchor.set("leftArm");
    flightRenderHands.setOffset(-1.0, 12.5, 0).setRotation(0.0, 90.0, 90.0).setScale(4.0);
    flightRenderHands.mirror = true;

    flightRenderLegs = utils.createLines(renderer, flightBeam, color, [
        { "start": [0.0, 0.0, 0.0], "end": [0.0, 1.2, 0.0], "size": [7.0, 7.0] }
    ]);
    flightRenderLegs.anchor.set("body");
    flightRenderLegs.setOffset(0.0, 30.0, 2).setRotation(0.0, 0.0, 0.0).setScale(4.5);

    //Transformation circle
    transformation = renderer.createEffect("fiskheroes:lines").setShape(circle).setRenderer(beam);
    transformation.color.set(color);

    transformation.anchor.set("body");

    //Transformation Hand
    transformHand = utils.createLines(renderer, flightBeam, color, [
        { "start": [0.0, 0.0, 0.0], "end": [1.0, 0.0, 0.0], "size": [4.0, 4.0] }
    ]);
    transformHand.anchor.set("rightArm");
    transformHand.setOffset(-1.0, 12.5, 0).setRotation(0.0, 90.0, 180.0).setScale(4.0);

    //Charged Beam
    utils.bindBeam(renderer, "fiskheroes:energy_projection", beamCharged, "rightArm", color, [
        { "firstPerson": [-3.75, 3.0, -8.0], "offset": [-0.5, 12.0, 0.0], "size": [1.5, 1.5] },
        { "firstPerson": [3.75, 3.0, -8.0], "offset": [-0.5, 12.0, 0.0], "size": [1.5, 1.5], "anchor": "leftArm" }
    ]).setParticles(renderer.createResource("PARTICLE_EMITTER", "fiskheroes:impact_energy_projection"));

    //Stolen from oli <3 (not actually stolen he gave me perms)
    var atom_blast = renderer.createResource("BEAM_RENDERER", "dhhp:atom_eve_flight");

    var constln = renderer.createResource("BEAM_CONSTELLATION", null);
    var atom_blast_beam = constln.bindBeam({
        "firstPerson": [-5.5, 3.75, -5.0],
        "offset": [-0.5, 6.0, 0.0],
        "size": [6.0, 6.0, -6.0]
    });

    var repulsor_blast = renderer.bindProperty("fiskheroes:repulsor_blast");
    repulsor_blast.setConstellation(constln);
    repulsor_blast.setRenderer(atom_blast);
    repulsor_blast.color.set(color);

    repulsor_blast.setCondition(entity => {
        if (Math.random() < 0.5) {
            repulsor_blast.setAnchor("rightArm");
            atom_blast_beam.firstPerson.x = -5.5;
            atom_blast_beam.offset.x = -0.5;
        } else {
            repulsor_blast.setAnchor("leftArm");
            atom_blast_beam.firstPerson.x = 5.5;
            atom_blast_beam.offset.x = 0.5;
        }

        return true;
    });


    return {
        render: (entity, renderLayer, isFirstPersonArm) => {
            var timer = entity.getInterpolatedData("fiskheroes:shield_timer");

            shield.progress = timer;
            shield.render();

            shield_l.progress = timer;
            shield_l.render();

            shield_r.progress = timer;
            shield_r.render();


            if (entity.getData("dhhp:dyn/atom_timer") != 0 && entity.getData("dhhp:dyn/atom_timer") != 1) {
                // transformation.progress = entity.getInterpolatedData("dhhp:dyn/atom_timer");
                transformation.setOffset(0, (1 - entity.getInterpolatedData("dhhp:dyn/atom_timer") * 38 + 24), 0).setScale(40);
                transformation.render();

                if (!entity.getData("fiskheroes:flying")) {
                    transformHand.progress = entity.getInterpolatedData("dhhp:dyn/atom_timer");
                    transformHand.render();
                }
            }

            if (!isFirstPersonArm) {
                if (renderLayer == "CHESTPLATE" && !entity.getData("fiskheroes:shield")) {
                    flightRenderHands.progress = entity.getInterpolatedData("fiskheroes:flight_timer");
                    flightRenderHands.render();
                }

                if (renderLayer == "BOOTS") {
                    flightRenderLegs.progress = entity.getInterpolatedData("fiskheroes:flight_timer");
                    flightRenderLegs.render();
                }
            }
        }
    };
}