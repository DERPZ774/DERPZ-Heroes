extend("fiskheroes:hero_basic");
loadTextures({
    "layer1": "dhhp:dc/nightwing_layer1",
    "layer2": "dhhp:dc/nightwing_layer2",
    "lights": "dhhp:dc/nightwing_eyes",
    "escrima": "dhhp:dc/nightwing_escrima",
    "escrima2": "dhhp:dc/nightwing_escrima2",
    "escrima_lights": "dhhp:dc/nightwing_escrima_lights"
});

var utils = implement("fiskheroes:external/utils");

var escrima1;
var escrima2;

var escrima_back1;
var escrima_back2;

// Saved model resources
var model_escrima1;
var model_escrima2;

function init(renderer) {
    parent.init(renderer);
    renderer.setLights((entity, renderLayer) => renderLayer == "HELMET" ? "lights" : null);
}

function initEffects(renderer) {
    //models for escrimas when pulled out
    model_escrima1 = renderer.createResource("MODEL", "dhhp:escrima");
    escrima1 = renderer.createEffect("fiskheroes:model").setModel(model_escrima1);
    escrima1.anchor.set("rightArm");
    escrima2 = renderer.createEffect("fiskheroes:model").setModel(model_escrima1);
    escrima2.anchor.set("leftArm");

    //model for escrima on back
    var model_escrima_back = renderer.createResource("MODEL", "dhhp:escrima");
    model_escrima_back.texture.set("escrima");
    escrima_back1 = renderer.createEffect("fiskheroes:model").setModel(model_escrima_back);
    escrima_back1.anchor.set("body");

    escrima_back2 = renderer.createEffect("fiskheroes:model").setModel(model_escrima_back);
    escrima_back2.anchor.set("body");


    //lightning render
    utils.bindBeam(renderer, "fiskheroes:lightning_cast", "fiskheroes:lightning_cast", "rightArm", 0x0000FF, [
        { "firstPerson": [-8.0, 4.5, -10.0], "offset": [-0.5, 9.0, 0.0], "size": [0.75, 0.75] }
    ]);

}

function initAnimations(renderer) {
    parent.initAnimations(renderer);

    addAnimationWithData(renderer, "nightwing.ESCRIMA", "dhhp:escrima", "dhhp:dyn/escrima_timer");
    addAnimationWithData(renderer, "nightwing.HOLD", "dhhp:fpc_weapon", "dhhp:dyn/escrima_timer");

}


function render(entity, renderLayer, isFirstPersonArm) {
    if (renderLayer == "CHESTPLATE") {
        var active = entity.getHeldItem().isEmpty() && entity.getData("dhhp:dyn/escrima_timer") == 1;
        
        if (active) {
            if (entity.getData("dhhp:dyn/escrima_lightning")) {
                model_escrima1.texture.set("escrima2", "escrima_lights");
            }
            else {
                model_escrima1.texture.set("escrima");
            }
        }
        
        //third person render
        if (!isFirstPersonArm) {
            if (entity.getData("dhhp:dyn/escrima_timer") < 1 || entity.isDisplayStand()) {
                escrima_back1.setRotation(90, 145, 0); 
                escrima_back1.setOffset(5.5, -2, 3.0)
                escrima_back1.setScale(0.75);
                escrima_back1.render();
    
                escrima_back2.setRotation(94, -145, 0); 
                escrima_back2.setOffset(-5.5, -2, 3.0)
                escrima_back2.setScale(0.75);
                escrima_back2.render();
            }
    
            if (active) {
                escrima1.setRotation(180, 0 ,0);
                escrima1.setOffset(0.8, 9.0, 3.0);
                escrima1.render();
    
                escrima2.setRotation(180, 0 ,0);
                escrima2.setOffset(-0.8, 9.0, 3.0);
                escrima2.render();
            }
        }
        else if (active) {
            escrima1.setRotation(180, 0 ,0);
            escrima1.setOffset(0.45, 7.25, 3.0);
            escrima1.render();
        }
    }
}

/*
Possible leaping anim? sprinting for certain time to achieve it?
look at rupture, answers are there
*/