function bindFlightTrail(renderer) {
    var prop = renderer.bindProperty("fiskheroes:trail");
    prop.setTrail(renderer.createResource("TRAIL", "dhhp:superman_trail"));
    prop.setCondition(entity => (((Math.abs(entity.motionX())) >= 6.28) ||
        ((Math.abs(entity.motionY())) >= 6.28) ||
        ((Math.abs(entity.motionZ())) >= 6.28)));
    return prop;
}

function bindFlightParticle(renderer) {
    var prop = renderer.bindProperty("fiskheroes:particles");
    prop.setParticles(renderer.createResource("PARTICLE_EMITTER", "dhhp:sonic_boom"));
    prop.setCondition(entity => (((Math.abs(entity.motionX())) >= 6.0) && ((Math.abs(entity.motionX())) <= 6.38)) ||
        (((Math.abs(entity.motionY())) >= 6.0) && ((Math.abs(entity.motionY())) <= 6.38)) ||
        (((Math.abs(entity.motionZ())) >= 6.00) && ((Math.abs(entity.motionZ())) <= 6.38)));
    return prop;
}