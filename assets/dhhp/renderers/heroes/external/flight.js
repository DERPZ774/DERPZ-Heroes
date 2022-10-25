setGlobal();

function createAnimNormal(renderer) {
    var anim = renderer.createResource("ANIMATION", "dhhp:flight");
    anim.setCondition(entity => {
        return !entity.getData('fiskheroes:gliding') && !entity.isOnGround();
    }).setData(entity => {
        return 1 - entity.getInterpolatedData("fiskheroes:wing_animation_timer");
    });
    return anim;
}

function createAnimSMClassic(renderer) {
    var anim = renderer.createResource("ANIMATION", "dhhp:glide_superman_classic");
    anim.setData(entity => {
        return entity.getInterpolatedData("fiskheroes:gliding_timer");
    });
    return anim;
}

function createAnimSM(renderer) {
    var anim = renderer.createResource("ANIMATION", "dhhp:glide_superman");
    anim.setCondition(entity => {
        var absX = Math.abs(entity.motionX());
        var absY = Math.abs(entity.motionY());
        var absZ = Math.abs(entity.motionZ());
        return (absX >= 4 && absX <= 6.28) || (absY  >= 4 && absY <= 6.28) || (absZ >= 4 && absZ <= 6.28);
    }).setData(entity => {
        return entity.getInterpolatedData("fiskheroes:gliding_timer");
    });
    return anim;
}

function createAnimSMFast(renderer) {
    var anim = renderer.createResource("ANIMATION", "dhhp:glide_superman_fast");
    anim.setCondition(entity => {
        return (Math.abs(entity.motionX()) >= 6.28 ) || (Math.abs(entity.motionY()) >= 6.28) || (Math.abs(entity.motionZ()) >= 6.28);
    }).setData(entity => {
        return entity.getInterpolatedData("fiskheroes:gliding_timer");
    });
    return anim;
}

function bindFlightTrail (renderer) {
        var prop = renderer.bindProperty("fiskheroes:trail");
        prop.setTrail(renderer.createResource("TRAIL", "dhhp:superman_trail"));
        prop.setCondition(entity => (((Math.abs(entity.motionX())) >=6.28 ) 
        || ((Math.abs(entity.motionY())) >=6.28) 
        || ((Math.abs(entity.motionZ())) >=6.28)));
        return prop;
}

function bindFlightParticle (renderer) {
    var prop = renderer.bindProperty("fiskheroes:particles");
    prop.setParticles(renderer.createResource("PARTICLE_EMITTER", "dhhp:sonic_boom"));
    prop.setCondition(entity => (((Math.abs(entity.motionX())) >= 6.0 ) && ((Math.abs(entity.motionX())) <= 6.38 )) 
    || (((Math.abs(entity.motionY()))  >= 6.0) && ((Math.abs(entity.motionY())) <= 6.38 )) 
    || (((Math.abs(entity.motionZ()))  >= 6.00) && ((Math.abs(entity.motionZ())) <= 6.38 )));
    return prop;
}
