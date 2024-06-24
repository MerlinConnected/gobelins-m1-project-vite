import * as THREE from 'three';

// Default camera positions

const CP1 = new THREE.Vector3(100, 82, 100);
const CP2 = new THREE.Vector3(100, 82, -100);
const CP3 = new THREE.Vector3(-100, 82, -100);
const CP4 = new THREE.Vector3(-100, 82, 100);

const CameraPositions = [CP1, CP2, CP3, CP4];

export default CameraPositions;
