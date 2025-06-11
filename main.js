import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

// WebGLRenderer の作成
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#myCanvas"),
  alpha: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

// シーンの作成
const scene = new THREE.Scene();

// カメラの作成 (視野角、アスペクト比、描画される範囲の最小と最大)
const camera = new THREE.PerspectiveCamera(
  50,
  window.innerWidth / window.innerHeight,
  1,
  10000
);
camera.position.set(0, 0, 1000);

// ライトの追加
const light = new THREE.DirectionalLight(0xffffff, 2);
light.position.set(1, 1, 1);
scene.add(light);

// モデルの定義
let model = null;

// モデルの読み込み
const loader = new GLTFLoader();
loader.load("./assets/model.glb", (gltf) => {
  model = gltf.scene;
  model.scale.set(30, 30, 30);
  scene.add(model);
});

// アニメーションループ
function animate() {
  requestAnimationFrame(animate);

  if (model) {
    model.rotation.y += 0.01;
    model.rotation.x += 0.01;
    model.rotation.z += 0.01;
  }

  renderer.render(scene, camera);
}
animate();
