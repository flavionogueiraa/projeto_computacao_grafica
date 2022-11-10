var btn = document.getElementById("btn");
var btn2 = document.getElementById("btn2");
var btn3 = document.getElementById("btn3");
var audio = document.getElementById("player");
var choose = document.getElementById("choose");

btn.addEventListener("click", function () {
    audio.play();
    choose.play();
    loadModel(model, 9, 9, 9);
    animate()
});

btn2.addEventListener("click", function () {
    audio.play();
    choose.play();
    loadModel(model2);
    animate()
});

btn3.addEventListener("click", function () {
    audio.play();
    choose.play();
    loadModel(model3);
    animate()
});

btn4.addEventListener("click", function () {
    audio.play();
    choose.play();
    loadModel(model4, 9, 9, 9);
    animate()
});

btn5.addEventListener("click", function () {
    audio.play();
    choose.play();
    loadModel(model5, 2, 2, 2);
    animate()
});

btn6.addEventListener("click", function () {
    audio.play();
    choose.play();
    loadModel(model6, 2, 2, 2);
});

import * as THREE from "/build/three.module.js";
import { OrbitControls } from "/build/OrbitControls.js";
import { GLTFLoader } from "/build/GLTFLoader.js";
import { RGBELoader } from "/build/RGBELoader.js";

var camera, scene, renderer;
var car;
var gltf_loader = new GLTFLoader();

var model = "gltf/pagani_zonda_shooting_car/scene.gltf";
var model2 = "gltf/lamborghini_urus/scene.gltf";
var model3 = "gltf/peugeot_3008/scene.gltf";
var model4 = "gltf/bmw_m3_need_for_speed_most_wanted/scene.gltf";
var model5 = "gltf/srt_perfomance_audi_a7_quattro/scene.gltf";
var model6 = "gltf/lamborghini_gallardo_superleggera/scene.gltf";

init();

function init() {
    const container = document.createElement("div");
    document.body.appendChild(container);
    // ------------------------------------ *** ---------------------------------------

    camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );
    camera.position.set(40, 20, 30);

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xcccccc);

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.outputEncoding = THREE.sRGBEncoding;

    container.appendChild(renderer.domElement);

    // LOAD MODEL
    gltf_loader.load(model, function (gltf) {
        car = gltf.scene;
        gltf.scene.scale.set(0.1, 0.1, 0.1);
        // scene.add(gltf.scene);

        render();
    });

    var light = new THREE.PointLight(0xffffff, 2);
    light.position.set(100, 100, 100);
    scene.add(light);

    // LOAD TEXTURE
    const rgbe_loader = new RGBELoader();

    rgbe_loader.setDataType(THREE.UnsignedByteType);
    rgbe_loader.load("hdr/background.hdr", function (texture) {
        const pmremGenerator = new THREE.PMREMGenerator(renderer);
        const envMap = pmremGenerator.fromEquirectangular(texture).texture;

        scene.background = envMap;
        scene.environment = envMap;

        render();
    });

    // VIEW CONTROLS
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.addEventListener("change", render);
    controls.minDistance = 20;
    controls.maxDistance = 70;
    controls.target.set(0, 0.5, 0);
    controls.mouseButtons = {
        LEFT: THREE.MOUSE.ROTATE,
        MIDDLE: THREE.MOUSE.DOLLY,
        RIGHT: THREE.MOUSE.ROTATE,
    };
    // controls.minPolarAngle = 0;
    // controls.maxPolarAngle = Math.PI / 2;
    controls.update();

    window.addEventListener("resize", onWindowResize, false);
}

function loadModel(modelPath, x = 0.1, y = 0.1, z = 0.1) {
    gltf_loader.load(modelPath, function (gltf) {
        scene.remove(car);
        car = gltf.scene;
        gltf.scene.scale.set(x, y, z);
        scene.add(car);
        render();
    });
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    render();
}

function render() {
    renderer.render(scene, camera);
}

function animate() {
    requestAnimationFrame(animate);
    car.rotation.y += -0.003;
    renderer.render(scene, camera);
}