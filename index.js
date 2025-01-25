import * as THREE from 'three';
import {OrbitControls} from 'jsm/controls/OrbitControls.js';
import getStarField from './src/getStarfield.js';

const w = window.innerWidth;
const h = window.innerHeight;
const renderer = new THREE.WebGLRenderer({antialias:true});
renderer.setSize(w,h);
document.body.appendChild(renderer.domElement);

const fov = 75;
const aspect = w/h;
const near = 0.1;
const far = 1000;
const camera = new THREE.PerspectiveCamera(fov,aspect,near, far);
camera.position.z=2;

const scene = new THREE.Scene();
const controls = new OrbitControls(camera, renderer.domElement);

const earthGroup = new  THREE.Group();
earthGroup.rotation.z = -23.4 * Math.PI / 180;

scene.add(earthGroup);
const loader = new THREE.TextureLoader();
const geo = new THREE.IcosahedronGeometry(1.0,12);
const material = new THREE.MeshStandardMaterial({
   map: loader.load("./textures/earthmap1k.jpg")
});
const earthMesh = new THREE.Mesh(geo, material);
earthGroup.add (earthMesh);

const stars = getStarField({numStars:2000});
scene.add(stars);

const hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff);
scene.add(hemiLight);

function animate(){
    requestAnimationFrame(animate);
    //earthMesh.rotation.x += 0.001;
    earthMesh.rotation.y += 0.002;
    renderer.render(scene,camera);
}
animate();