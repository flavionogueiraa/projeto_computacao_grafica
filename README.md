# Garagem de carros!

Nosso projeto se trata de uma garagem de carros, onde buscamos explorar os conceitos
da biblioteca Three JS, juntamente com os conhecimentos obtidos disciplina de computação gráfica,
na Universidade Federal Rural do Semi Árido ([UFERSA](https://paudosferros.ufersa.edu.br/)).

Para acessar o link do nosso projeto e vê-lo rodando, clique [aqui](https://flaviotech.github.io/projeto_computacao_grafica/)!

## Exploração da biblioteca Three JS
Nosso projeto conta com diversos pacotes interessantes, segue abaixo a listagem dos mesmos:

Obs.: Partimos do pré suposto que você tem os arquivos baixados em seu projeto, em caso de dúvidas,
consulte a [documentação](https://threejs.org/docs/index.html#manual/en/introduction/Creating-a-scene).

Obs. 2: Ao clicar nos links, por favor segure Ctrl, assim você será direcionado para uma nova guia ;).

### [OrbitControls](https://threejs.org/docs/#examples/en/controls/OrbitControls)
O OrbitControls permite que a câmera orbite em torno de um alvo.
Exemplo:
```js
// Realize a importação
import { OrbitControls } from "/build/OrbitControls.js";

// Em algum lugar do código, instancie um objeto do tipo OrbitControls
const controls = new OrbitControls(camera, renderer.domElement);
```


### [GLTFLoader](https://threejs.org/docs/#examples/en/loaders/GLTFLoader)
GLTFLoader é um carregador de texturas que nos permite colocar arquivos
com extensões .gltf na tela, no caso do nosso projeto, carros.
Exemplo:
```js
// Realize a importação
import { GLTFLoader } from "/build/GLTFLoader.js";

// Em algum lugar do código, instancie um objeto do tipo GLTFLoader
const gltf_loader = new GLTFLoader();

// Faça o load do modelo (exemplo do nosso projeto)
gltf_loader.load(modelPath, function (gltf) {
    scene.remove(car);

    car = gltf.scene;
    car.position.y = -15

    gltf.scene.scale.set(x, y, z);
    scene.add(car);
    render();
});
```

### [RGBELoader](https://threejs.org/docs/#api/en/loaders/DataTextureLoader)
RGBELoader é uma classe base abstrata para carregar formatos genéricos de texturas binárias,
usamos ela para renderizar o fundo do nosso cenário.
Exemplo:
```js
// Realize a importação
import { RGBELoader } from "/build/RGBELoader.js";

// Em algum lugar do código, instancie um objeto do tipo RGBELoader
const rgbe_loader = new RGBELoader();

// Faça o load do modelo (exemplo do nosso projeto)
rgbe_loader.setDataType(THREE.UnsignedByteType);
rgbe_loader.load("hdr/background.hdr", function (texture) {
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    const envMap = pmremGenerator.fromEquirectangular(texture).texture;

    scene.background = envMap;
    scene.environment = envMap;

    render();
});
```

### [PointLight](https://threejs.org/docs/#api/en/helpers/PointLightHelper)
PointLight é a classe que usamos para gerar o ponto de luz da nossa cena.
Exemplo:
```js
// Em algum lugar do código, instancie um objeto do tipo PointLight
const light = new THREE.PointLight(0xf2e9c8, 2);

// Informe a posição da luz e a adicione na sua cena
light.position.set(100, 100, 100);
scene.add(light);
```
