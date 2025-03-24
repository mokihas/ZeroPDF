// src/js/main.js

// File upload and tool selection logic
document.getElementById('uploadBtn').addEventListener('click', () => {
  document.getElementById('fileInput').click();
});

document.getElementById('fileInput').addEventListener('change', (event) => {
  const file = event.target.files[0];
  if (file) {
    alert(`File selected: ${file.name}`);
    // Add logic to process the file
  }
});

const toolCards = document.querySelectorAll('.tool-card');
toolCards.forEach(card => {
  card.addEventListener('click', () => {
    const tool = card.getAttribute('data-tool');
    alert(`Selected tool: ${tool}`);
    // Add logic to handle the selected tool
  });
});

// Three.js 3D animation logic
import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

camera.position.z = 5;

function animate() {
  requestAnimationFrame(animate);
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  renderer.render(scene, camera);
}

animate();

// PDF processing logic (API calls, etc.)
async function processPDF(file, tool) {
  const formData = new FormData();
  formData.append('pdf', file);

  const response = await fetch(`/api/${tool}`, {
    method: 'POST',
    body: formData,
  });

  const result = await response.json();
  console.log(result);
}
