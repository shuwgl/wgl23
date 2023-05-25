var createCharac = function(name, pv, tex){
    var self ={};
    self.name = name;
    var pv = pv;
    var texture = tex;
    var pos = {x:0,y:0};

    var getDamage = function (qt) {
        pv = pv-qt
        if (pv<=0) {
            alert("ARrrgghhhh")
        }
        return pv
    }

    var getPv = function () {
        return pv
    }

    var getTexture= function(){
        return texture
    }

    var setPosition=function (x,y) {
        pos.x = x;
        pos.y = y;
    }
    var translate = function (x) {
        pos.x = pos.x + x;
    }
    var getPosition = function () {
        return pos
    }

    self.getPv = getPv
    self.getDamage = getDamage;
    self.setPosition = setPosition;
    self.getTexture = getTexture;
    self.translate = translate;
    self.getPosition = getPosition;
    return self
}

var createRenderEngine = function (canvasTarget) {
    var self = {};
    var posInit =100;
    var state = "right"
    var speed =1

    var init = function () {
        var canvas = document.querySelector(canvasTarget)
        var ctx = canvas.getContext("2d");
        // ctx.fillStyle ="red"
        // ctx.fillRect(25,5,100,10);
        // ctx.fillStyle ="blue"
        // ctx.fillRect(2,5,5,10);
        console.log(canvas);

        var onKeydown = function (event) {
            console.log(event);

            if (event.key =="d") {
                state ="right"
                
            }
            if (event.key =="q") {
                state ="left"
            }
            //A ajouter ici
        }

        var render=function () {
            ctx.clearRect(0,0,canvas.width, canvas.height)
            //posInit = posInit+1 
            ctx.fillStyle ="green"
            ctx.fillRect(posInit,50,-50,50);
        }

        var process = function() {
            if (state == "right") {
                posInit = posInit+speed
            }
            if (state == "left") {
                posInit = posInit-speed
            }
            // Définir ici une mise à jour de "poseInit" selon que le state du cube soit
            //"right" ou "left"
            // definir une variable state
            //definir un process qui selon le state change posInit vers la droite ou la gauche
            //lier les changement de state a la touche "d" ou "q"
        }

        var renderFrame = function () {
            process()//check if we need to change the cube position
            render()
            console.log("hello");
            window.requestAnimationFrame(renderFrame)
        }
        renderFrame()

        document.addEventListener("keydown", onKeydown)
    }

    init()


    
    return self
}

export {createCharac,createRenderEngine}