import * as THREE from "/build/three.module.js";
import { OrbitControls } from "/build/OrbitControls.js";
import { GLTFLoader } from "/build/GLTFLoader.js";
import { RGBELoader } from "/build/RGBELoader.js";


const btn4 = document.getElementById("btn4");
const btn5 = document.getElementById("btn5");
const btn6 = document.getElementById("btn6");
const btn7 = document.getElementById("btn7");

const choose = document.getElementById("choose");

btn4.addEventListener("click", function () {
    choose.play();
    loadModel(model4, 9, 9, 9);
    animate()
});

btn5.addEventListener("click", function () {
    choose.play();
    loadModel(model5, 2, 2, 2);
    animate()
});

btn6.addEventListener("click", function () {
    choose.play();
    loadModel(model6, 2, 2, 2);
});

btn7.addEventListener("click", function () {
    choose.play();
    loadModel(model7, 7, 7, 7);
});


const renderer = new THREE.WebGLRenderer({ antialias: true });
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
const scene = new THREE.Scene();
const light = new THREE.PointLight(0xf2e9c8, 2);

let car, base;
const gltf_loader = new GLTFLoader();
const rgbe_loader = new RGBELoader();

const model = "gltf/pagani_zonda_shooting_car/scene.gltf";
const model4 = "gltf/bmw_m3_need_for_speed_most_wanted/scene.gltf";
const model5 = "gltf/srt_perfomance_audi_a7_quattro/scene.gltf";
const model6 = "gltf/lamborghini_gallardo_superleggera/scene.gltf";
const model7 = "gltf/mercedes-benz_amg_cls/scene.gltf";



(function init() {
    const container = document.createElement("div");
    document.body.appendChild(container);
    // ------------------------------------ *** ---------------------------------------

    camera.position.set(40, 10, 30);
    scene.background = new THREE.Color(0xcccccc);

    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.outputEncoding = THREE.sRGBEncoding;

    container.appendChild(renderer.domElement);

    // LOAD MODEL
    gltf_loader.load(model, function (gltf) {
        car = base = gltf.scene;
        gltf.scene.scale.set(0.1, 0.1, 0.1);
        // scene.add(gltf.scene);

        render();
    });

    light.position.set(100, 100, 100);
    scene.add(light);

    // LOAD TEXTURE

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

    // Camera ajust
    controls.minPolarAngle = Math.PI / 4
    controls.maxPolarAngle = Math.PI / 2

    controls.mouseButtons = {
        LEFT: THREE.MOUSE.ROTATE,
        MIDDLE: THREE.MOUSE.DOLLY,
        RIGHT: THREE.MOUSE.ROTATE,
    };
    // controls.minPolarAngle = 0;
    // controls.maxPolarAngle = Math.PI / 2;
    controls.update();

    window.addEventListener("resize", onWindowResize, false);

    const listener = new THREE.AudioListener();
    camera.add(listener);

    // create a global audio source
    const sound = new THREE.Audio(listener);

    // load a sound and set it as the Audio object's buffer
    const audioLoader = new THREE.AudioLoader();
    audioLoader.load('sounds/death-race.mp3', function (buffer) {
        sound.setBuffer(buffer);
        sound.setLoop(true);
        sound.setVolume(0.5);
        // sound.play();
    });
})()

function loadModel(modelPath, x = 0.1, y = 0.1, z = 0.1) {
    gltf_loader.load(modelPath, function (gltf) {
        scene.remove(car);
        car = gltf.scene;
        car.position.y = -15
        gltf.scene.scale.set(x, y, z);
        scene.add(car);
        render();
    });
    gltf_loader.load("/gltf/round_platform/scene.gltf", function (gltf) {
        scene.remove(base);
        base = gltf.scene;
        base.position.y = -17
        gltf.scene.scale.set(9, 9, 9);
        scene.add(base);
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
    car.rotation.y += -0.002;
    base.rotation.y += -0.002;
    renderer.render(scene, camera);
}

function loader(loader) {
    const textDefault = ["Aguarde, estamos enviando seus dados", "Mais um pouco...", "Quase lá..."]
    const loaderEL = document.querySelector(".loader--container") || loader
    const pEl = loaderEL.querySelector("p")
    let interval

    /**
    * @param {array} opcional | recebe um array de objetos para ser mostrado 
    */
    function show(options) {
        loaderEL.dataset.active = "true"
        loaderEL.classList.remove("hidden")
        let atual = 0;

        const obj = {
            textos: textDefault,
            time: 8000,
            ...options
        }
        $(pEl).text(obj.textos[atual]);

        interval = setInterval(function () {
            $(pEl).fadeOut(function () {


                if (atual > obj.textos.length) {
                    atual = 0;
                }


                $(pEl).text(obj.textos[atual]).fadeIn();

                atual = atual + 1

            });
        }, obj.time);

        return this
    }


    function hide() {
        loaderEL.dataset.active = "false"
        loaderEL.classList.add("hidden")
        clearInterval(interval)
        pEl.innerText = ""

        return this
    }

    return {
        show,
        hide
    }
}

loader().show()
setTimeout(function () {
    showContent()
}, 1000)

function showContent() {
    loader().hide()
    document.querySelector("#main").classList.remove("hidden")
}