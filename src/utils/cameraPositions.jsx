import * as THREE from 'three';

// Default camera positions

const CP1 = new THREE.Vector3(24, 14, 24);
const CP2 = new THREE.Vector3(24, 14, -24);
const CP3 = new THREE.Vector3(-24, 14, -24);
const CP4 = new THREE.Vector3(-24, 14, 24);

const CameraPositions = [CP1, CP2, CP3, CP4];

export default CameraPositions;
