import * as THREE from "three"
import {GLTFLoader } from "three/addons/loaders/GLTFLoader.js"


console.log(THREE);
console.log(GLTFLoader);

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

var createRenderEngine3d = function (canvasTarget) {
    var self = {};
    var posInit =100;
    var posY =200;
    var state = undefined;
    var isJumping =false;
    var isFalling =false;
    var speed =1
    var speed3d = 0.1
    var jumpSpeed =5
    var jumpSpeed3d =0.3
    var img = new Image()
    img.src ="./img/pc.png"
    console.log(img);
    //VARIABLE GLOBAL THREEJS
    var scene = undefined;
    var camera = undefined;
    var lamp= undefined;
    var mesh = undefined;
    var cube = undefined;
    var renderer = undefined;

    //VARIABLE GLOBAL PC
    var mapRight = undefined;
    var mapLeft = undefined;

    var createEnv = function(){
        
        scene = new THREE.Scene()
        camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000 )
        renderer = new THREE.WebGLRenderer({alpha:true})
        renderer.setSize(window.innerWidth, window.innerHeight)
        renderer.shadowMap.enabled = true;
        document.body.appendChild(renderer.domElement)
        renderer.render(scene, camera)

        //create the cube
        var geometry = new THREE.BoxGeometry(1,1,1)
        var material = new THREE.MeshBasicMaterial(
            {color:0x00ff00}
        )
        
        cube = new THREE.Mesh(geometry,material)


        /// Change cube to sprite
        mapRight = new THREE.TextureLoader().load( './img/pc.png' );
        mapLeft = new THREE.TextureLoader().load( './img/pc2.png' );
        const materialSprite = new THREE.SpriteMaterial( { map: mapRight } );

        cube = new THREE.Sprite( materialSprite );

        cube.material.map = mapLeft


        scene.add(cube)
        
        // cube.rotation.x =0.5
        // cube.rotation.y =0.8
        var light = new THREE.AmbientLight(0x404040)
        scene.add(light)

        const directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 );
        directionalLight.castShadow = true;
        directionalLight.position.x = 3
        directionalLight.position.y = 3

        directionalLight.shadow.mapSize.width = 1024; // default
        directionalLight.shadow.mapSize.height = 1024; // default
        directionalLight.shadow.camera.near = 0.05; // default
        directionalLight.shadow.camera.far = 50; // default
        directionalLight.shadow.camera.right = 1; // default
        directionalLight.shadow.camera.top = 40;
        directionalLight.shadow.camera.bottom = - 40;
        directionalLight.shadow.camera.left = - 40;
        directionalLight.shadow.camera.right = 40;
        directionalLight.shadow.camera.near = 0.1;
        directionalLight.shadow.camera.far = 80;
        // directionalLight.shadow.camera.left = 5; // default
        directionalLight.shadow.bias =-0.01

        scene.add( directionalLight );
        
        camera.position.z =5 
        importScene()
        //renderer.render(scene, camera)

    }

    var importScene = function () {
        var loader = new GLTFLoader()
        var addShadows = function (node) {
            if (node.isMesh) {
                node.castShadow = true;
                node.receiveShadow = true;
            }
        }
        var onImport = function (gltf) {
            gltf.scene.position.y = -0.5
            gltf.scene.rotation.y = (3.1416/2)
            gltf.scene.traverse(addShadows)
            // gltf.scene.traverse(addShadows)
            // gltf.scene.scale.set(0.5,0.5,0.5)
            console.log(gltf);
            scene.add(gltf.scene)
        }
        loader.load("./img/tjs.gltf", onImport)
    }



    var init = function () {
        var canvas = document.querySelector(canvasTarget)
        var ctx = canvas.getContext("2d");
        createEnv();
        // ctx.fillStyle ="red"
        // ctx.fillRect(25,5,100,10);
        // ctx.fillStyle ="blue"
        // ctx.fillRect(2,5,5,10);
        console.log(canvas);

        var onKeydown = function (event) {
            console.log(event);
            if (event.key =="d") {
                state ="right" 
                //cube.rotation.x = cube.rotation.x+0.1
            }
            if (event.key =="q") {
                state ="left"
            }
            if (event.key =="z" && isJumping == false && isFalling == false) {
                isJumping = true
            }
        }
        var onKeyup = function (event) { //trigger when the keyboard key is up
            console.log(event);
            if (event.key =="d") {
                state =undefined
            }
            if (event.key =="q") {
                state =undefined
            }
        }

        var render=function () {
            ctx.clearRect(0,0,canvas.width, canvas.height)
            //posInit = posInit+1 
            ctx.fillStyle ="green"
            ctx.drawImage(img, posInit,posY)
            //ctx.fillRect(posInit,posY,-50,50);

            //update three render
            renderer.render(scene, camera)
        }

        var process = function() {
            if (state == "right") {
                posInit = posInit+speed
                cube.position.x = cube.position.x + speed3d
                camera.position.x = cube.position.x

                if (cube.material.map != mapRight) {
                    cube.material.map = mapRight
                }
                
                
            }
            if (state == "left") {
                posInit = posInit-speed
                cube.position.x = cube.position.x - speed3d
                camera.position.x = cube.position.x
                if (cube.material.map != mapLeft) {
                    cube.material.map = mapLeft
                }
            }
            if (isJumping) {
                posY = posY-jumpSpeed
                cube.position.y = cube.position.y + jumpSpeed3d
                if (cube.position.y > 2) {
                    isJumping = false;
                    isFalling = true;
                }
            }
            if (isFalling) {
                posY = posY+jumpSpeed
                cube.position.y = cube.position.y - jumpSpeed3d
                if (cube.position.y <0) {
                    isJumping = false;
                    isFalling = false;
                }
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
        document.addEventListener("keyup", onKeyup)
        document.addEventListener("mousedown", onKeyup)
    }

    init()


    
    return self
}

export {createRenderEngine3d}
//export {createCharac,createRenderEngine}