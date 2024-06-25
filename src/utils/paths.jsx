import * as THREE from 'three';

const Path1 = [
  // DEFAULT POSITION
  new THREE.Vector3(0, 0, 15),
  // START MOVING
  new THREE.Vector3(0, 0, 14),
  new THREE.Vector3(0, 0, 13),
  new THREE.Vector3(1, 0, 13),
  new THREE.Vector3(1, 0, 12),
  new THREE.Vector3(1, 0, 11),
  new THREE.Vector3(1, 0, 10),
  new THREE.Vector3(0, 0, 10),
  new THREE.Vector3(0, 0, 9),
  new THREE.Vector3(0, 0, 8),
  new THREE.Vector3(0, 0, 7),
  new THREE.Vector3(-1, 0, 7),
  new THREE.Vector3(-1, 0, 6),
  new THREE.Vector3(-1, 0, 5),
  new THREE.Vector3(-1, 0, 4),
  new THREE.Vector3(0, 0, 4),
  new THREE.Vector3(0, 0, 3),
];

const Path2 = [
  // DEFAULT POSITION
  new THREE.Vector3(15, 0, 0),
  // START MOVING
  new THREE.Vector3(14, 0, 0),
  new THREE.Vector3(13, 0, 0),
  new THREE.Vector3(13, 0, 1),
  new THREE.Vector3(12, 0, 1),
  new THREE.Vector3(11, 0, 1),
  new THREE.Vector3(10, 0, 1),
  new THREE.Vector3(10, 0, 0),
  new THREE.Vector3(9, 0, 0),
  new THREE.Vector3(8, 0, 0),
  new THREE.Vector3(7, 0, 0),
  new THREE.Vector3(7, 0, -1),
  new THREE.Vector3(6, 0, -1),
  new THREE.Vector3(5, 0, -1),
  new THREE.Vector3(4, 0, -1),
  new THREE.Vector3(4, 0, 0),
  new THREE.Vector3(3, 0, 0),
];

const Path3 = [
  // DEFAULT POSITION
  new THREE.Vector3(0, 0, -15),
  // START MOVING
  new THREE.Vector3(0, 0, -14),
  new THREE.Vector3(0, 0, -13),
  new THREE.Vector3(-1, 0, -13),
  new THREE.Vector3(-1, 0, -12),
  new THREE.Vector3(-1, 0, -11),
  new THREE.Vector3(-1, 0, -10),
  new THREE.Vector3(0, 0, -10),
  new THREE.Vector3(0, 0, -9),
  new THREE.Vector3(0, 0, -8),
  new THREE.Vector3(0, 0, -7),
  new THREE.Vector3(1, 0, -7),
  new THREE.Vector3(1, 0, -6),
  new THREE.Vector3(1, 0, -5),
  new THREE.Vector3(1, 0, -4),
  new THREE.Vector3(0, 0, -4),
  new THREE.Vector3(0, 0, -3),
];

const Path4 = [
  // DEFAULT POSITION
  new THREE.Vector3(-15, 0, 0),
  // START MOVING
  new THREE.Vector3(-14, 0, 0),
  new THREE.Vector3(-13, 0, 0),
  new THREE.Vector3(-13, 0, -1),
  new THREE.Vector3(-12, 0, -1),
  new THREE.Vector3(-11, 0, -1),
  new THREE.Vector3(-10, 0, -1),
  new THREE.Vector3(-10, 0, 0),
  new THREE.Vector3(-9, 0, 0),
  new THREE.Vector3(-8, 0, 0),
  new THREE.Vector3(-7, 0, 0),
  new THREE.Vector3(-7, 0, 1),
  new THREE.Vector3(-6, 0, 1),
  new THREE.Vector3(-5, 0, 1),
  new THREE.Vector3(-4, 0, 1),
  new THREE.Vector3(-4, 0, 0),
  new THREE.Vector3(-3, 0, 0),
];

const Path = [Path1, Path2, Path3, Path4];

export default Path;
