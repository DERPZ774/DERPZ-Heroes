var water_bearer1;
var water_bearer2;
var proj_bearer1;
var proj_bearer2;

var water_sword1;
var water_sword2;

var water_whip;


function initModels(renderer) {
    //bearer
    var model_water_bearer = renderer.createResource("MODEL", "dhhp:aqua_sword");
    model_water_bearer.texture.set("water_bearer");
    water_bearer1 = renderer.createEffect("fiskheroes:model").setModel(model_water_bearer);
    water_bearer1.anchor.set("rightArm");

    water_bearer2 = renderer.createEffect("fiskheroes:model").setModel(model_water_bearer);
    water_bearer2.anchor.set("leftArm");

    //sword
    var model_water_sword = renderer.createResource("MODEL", "dhhp:aqua_sword_on");

    model_water_sword.texture.set("water_sword");
    water_sword1 = renderer.createEffect("fiskheroes:model").setModel(model_water_sword);
    water_sword1.anchor.set("rightArm");

    water_sword2 = renderer.createEffect("fiskheroes:model").setModel(model_water_sword);
    water_sword2.anchor.set("leftArm");

    //proj aqua_proj
    var model_water_proj = renderer.createResource("MODEL", "dhhp:aqua_proj");
    
    model_water_proj.texture.set("water_bearer");
    proj_bearer1 = renderer.createEffect("fiskheroes:model").setModel(model_water_proj);
    proj_bearer1.anchor.set("rightArm");

    proj_bearer2 = renderer.createEffect("fiskheroes:model").setModel(model_water_proj);
    proj_bearer2.anchor.set("leftArm");

    //whip
    var model_water_whip = renderer.createResource("MODEL", "dhhp:aqua_whip");

    model_water_whip.texture.set("whip");
    water_whip = renderer.createEffect("fiskheroes:model").setModel(model_water_whip);
    water_whip.anchor.set("rightArm");


    return model_water_bearer;
}

function render(entity, renderLayer, isFirstPersonArm) {
    if (renderLayer == "CHESTPLATE") {
        var proj = entity.getData("fiskheroes:energy_projection"); 

        if (proj) {
            
            if (!isFirstPersonArm) {
                proj_bearer1.setOffset(0, -8, -4);

                proj_bearer2.setOffset(-2.3, -8, -4);
                proj_bearer2.render();
            }
            else {
                proj_bearer1.setOffset(0, -4, -4);
            }
            proj_bearer1.render();
            
        }
        if (entity.getData('dhhp:dyn/water_weapon_toggle') && entity.getHeldItem().isEmpty() && !proj) {
            var active1 = entity.getData('dhhp:dyn/water_weapon') == 1;
            var active3 = entity.getData('dhhp:dyn/water_weapon') == 3;
            
            water_bearer1.setOffset(0.0, -1.0, 0.0);
            water_bearer1.render();

            
            if (active1) {
                water_sword1.setOffset(0.0, -1.0, 0.0);
                water_sword1.render();
            }

            if (active3) {
                //water_whip.render();
            }

            if (!isFirstPersonArm) {
                water_bearer1.setOffset(0.0, 0.0, 0.0);
                water_sword1.setOffset(0.0, 0.0, 0.0); 

                water_bearer2.setOffset(-2.3, 0.0, 0.0);
                water_bearer2.render();  

                if (active1) {
                water_sword2.setOffset(-2.3, 0.0, 0.0);
                water_sword2.render();
                }
            }
        }
    }
}