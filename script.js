const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight * 0.8);
document.getElementById('canvas-container').appendChild(renderer.domElement);

const controls = new THREE.OrbitControls(camera, renderer.domElement);
camera.position.z = 10;

// 头部：二十面体
const headGeometry = new THREE.IcosahedronGeometry(2, 0);
const headMaterial = new THREE.MeshPhongMaterial({ color: 0x44aaff, transparent: true, opacity: 0.5 });
const head = new THREE.Mesh(headGeometry, headMaterial);
scene.add(head);

// DNA：双螺旋
const dnaGroup = new THREE.Group();
for (let i = 0; i < 50; i++) {
  const y = (i / 50) * 4 - 2;
  const angle = i * 0.5;
  const x1 = Math.cos(angle) * 0.5;
  const z1 = Math.sin(angle) * 0.5;
  const x2 = Math.cos(angle + Math.PI) * 0.5;
  const z2 = Math.sin(angle + Math.PI) * 0.5;

  const sphere1 = new THREE.Mesh(new THREE.SphereGeometry(0.05), new THREE.MeshBasicMaterial({ color: 0xff0000 }));
  sphere1.position.set(x1, y, z1);
  dnaGroup.add(sphere1);

  const sphere2 = new THREE.Mesh(new THREE.SphereGeometry(0.05), new THREE.MeshBasicMaterial({ color: 0x00ff00 }));
  sphere2.position.set(x2, y, z2);
  dnaGroup.add(sphere2);
}
head.add(dnaGroup); // 将DNA放在头部内部

// 尾部：圆柱体
const tailGeometry = new THREE.CylinderGeometry(0.2, 0.2, 4, 16);
const tailMaterial = new THREE.MeshPhongMaterial({ color: 0x888888 });
const tail = new THREE.Mesh(tailGeometry, tailMaterial);
tail.position.y = -4;
scene.add(tail);

// 尾丝：6根细线
for (let i = 0; i < 6; i++) {
  const angle = (i / 6) * Math.PI * 2;
  const x = Math.cos(angle) * 0.5;
  const z = Math.sin(angle) * 0.5;

  const fiberGeometry = new THREE.CylinderGeometry(0.02, 0.02, 2, 8);
  const fiber = new THREE.Mesh(fiberGeometry, new THREE.MeshPhongMaterial({ color: 0x666666 }));
  fiber.position.set(x, -6, z);
  fiber.rotation.z = Math.PI / 4 * (i % 2 === 0 ? 1 : -1);
  scene.add(fiber);
}

// 光源
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 5, 5);
scene.add(light);
const ambient = new THREE.AmbientLight(0x404040);
scene.add(ambient);

// 动画循环
function animate() {
  requestAnimationFrame(animate);
  head.rotation.y += 0.002;
  renderer.render(scene, camera);
}
animate();
