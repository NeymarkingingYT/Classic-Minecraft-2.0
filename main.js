import * as THREE from 'https://cdn.skypack.dev/three@0.160.0';
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.160.0/examples/jsm/controls/OrbitControls.js';

let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
let renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('gameCanvas') });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Lighting
const sun = new THREE.DirectionalLight(0xffffff, 1);
sun.position.set(100, 100, 50);
scene.add(sun);

// Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// Load texture
const loader = new THREE.TextureLoader();
const textures = {
  grass: loader.load('assets/textures/grass.png'),
  dirt: loader.load('assets/textures/dirt.png'),
  stone: loader.load('assets/textures/stone.png'),
};

// Make a block
function createBlock(textureName, x, y, z) {
  const mat = new THREE.MeshLambertMaterial({ map: textures[textureName] });
  const geo = new THREE.BoxGeometry(1, 1, 1);
  const mesh = new THREE.Mesh(geo, mat);
  mesh.position.set(x, y, z);
  scene.add(mesh);
  return mesh;
}

// Generate simple terrain
for (let x = -10; x < 10; x++) {
  for (let z = -10; z < 10; z++) {
    createBlock('grass', x, 0, z);
    createBlock('dirt', x, -1, z);
    createBlock('stone', x, -2, z);
  }
}

camera.position.set(10, 10, 10);
controls.target.set(0, 0, 0);

// Game loop
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
animate();


const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Load images from assets/
const textures = {
  cow: loadTexture("assets/cow.png"),
  wood: loadTexture("assets/wood.png"),
  stone: loadTexture("assets/stone.png"),
  dirt: loadTexture("assets/dirt.png"),
  grass: loadTexture("assets/grass.png")
};

function loadTexture(src) {
  const img = new Image();
  img.src = src;
  return img;
}

// Once cow is loaded, assume all are ready and draw
textures.cow.onload = () => {
  ctx.drawImage(textures.grass, 0, 0);
  ctx.drawImage(textures.dirt, 64, 0);
  ctx.drawImage(textures.stone, 128, 0);
  ctx.drawImage(textures.wood, 192, 0);
  ctx.drawImage(textures.cow, 100, 100);
};
