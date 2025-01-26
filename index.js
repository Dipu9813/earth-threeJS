import * as THREE from 'three';
import {OrbitControls} from 'jsm/controls/OrbitControls.js';
import getStarField from './src/getStarfield.js';
import {getFresnelMat} from './src/getFresnelMat.js';

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

const lightsMat = new  THREE.MeshBasicMaterial({
    map: loader.load("textures/earthlights1k.jpg"),
    blending: THREE.AdditiveBlending,
    transparent:true,
    opacity: 0.2
})
const lightMesh = new THREE.Mesh(geo, lightsMat);
earthGroup.add(lightMesh);

const glowMat = getFresnelMat();
const glowMesh = new THREE.Mesh(geo, glowMat);
glowMesh.scale.setScalar=1.003;
earthGroup.add(glowMesh);

const stars = getStarField({numStars:2000});
scene.add(stars);

const cloudMat = new THREE.MeshStandardMaterial({
    map: loader.load("textures/earthcloudmaptrans.jpg"),
    transparent: true,
    blending: THREE.AdditiveBlending,
    opacity:0.2,
})
const cloudMesh = new THREE.Mesh(geo, cloudMat);
cloudMesh.scale.setScalar=1.003;
earthGroup.add(cloudMesh);

const sunLight = new THREE.DirectionalLight(0xffffff);
sunLight.position.set(-2,0.5,1.5)
scene.add(sunLight);

function animate(){
    requestAnimationFrame(animate);
    //earthMesh.rotation.x += 0.001;
    earthMesh.rotation.y += 0.002;
    lightMesh.rotation.y += 0.002;
    cloudMesh.rotation.y += 0.002;
    glowMesh.rotation.y += 0.002;
    renderer.render(scene,camera);
}
animate();