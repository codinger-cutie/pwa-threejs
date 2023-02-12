const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(24, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({ antialias: true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const colorYellow = new THREE.Color("hsl(40, 100%, 60%)");
const colorPink = new THREE.Color("hsl(306, 100%, 60%)");
const colorLight = new THREE.Color("hsl(40, 100%, 95%)");

const cubeGeometry = new THREE.BoxGeometry(1, 1.5, 0.9);
const cubeMaterial = new THREE.MeshPhongMaterial({
  color: colorYellow,
});

const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
const light = new THREE.PointLight(colorLight, 2);
const light2 = new THREE.PointLight(colorLight, .5);

light.position.set(-40, -20, 20);
light2.position.set(40, 20, 10);

scene.add(light);
scene.add(light2);
scene.add(cube);

camera.position.z = 15;

cube.rotation.x = 20;
cube.rotation.z = -20;

const animate = () => {
  /*cube.rotation.x += 0.01;*/
  /*cube.rotation.z -= 0.05;*/
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

animate();

function moveleft() {
  camera.position.x += 0.1;
}

function moveright() {
  camera.position.x -= 0.1;
}

function moveforward() {
  camera.position.z -= 0.5;
}

function movebackward() {
  camera.position.z += 0.5;
}

function rotatex() {
  camera.rotation.y += 0.01;
  if (camera.position.y < -9) {
    camera.position.y += 20;
  }
}

document.onkeydown = (e) => {  
  e = e || window.event;  
  if (e.keyCode === 38) {  
    console.log('up arrow pressed')  
  } else if (e.keyCode === 40) {  
    console.log('down arrow pressed')  
  } else if (e.keyCode === 37) {  
    console.log('left arrow pressed')  
  } else if (e.keyCode === 39) {  
    console.log('right arrow pressed')  
  }  
}

window.addEventListener('keydown', logKey);

function logKey(e) {
  console.log(e.keyCode);
  if (e.keyCode == 87) {
    console.log('w');
    moveforward();
  }
  if (e.keyCode == 65) {
    console.log('a');
    moveleft();
  }
  if (e.keyCode == 83) {
    console.log('s');
    movebackward();
  }
  if (e.keyCode == 68) {
    console.log('d');
    moveright();
  }
}



if ("serviceWorker" in navigator) {
  window.addEventListener("load", function() {
    navigator.serviceWorker
      .register("/serviceWorker.js")
      .then(res => console.log("service worker registered"))
      .catch(err => console.log("service worker not registered", err))
  })
}