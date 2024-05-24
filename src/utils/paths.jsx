import * as THREE from 'three';

const Path1 = [
  // DEFAULT POSITION
  new THREE.Vector3(0, 0, 19.35),
  // START MOVING
  new THREE.Vector3(0, 0, 18.35),
  new THREE.Vector3(0, 0, 17.35),
  new THREE.Vector3(-0.5, 0, 16.85),
  new THREE.Vector3(-1.5, 0, 16.85),
  new THREE.Vector3(-2, 0, 16.35),
  new THREE.Vector3(-2, 0, 15.35),
  new THREE.Vector3(-2, 0, 14.35),
  new THREE.Vector3(-1.5, 0, 13.85),
  new THREE.Vector3(-0.5, 0, 13.85),
  new THREE.Vector3(0, 0, 13.35),
  new THREE.Vector3(0, 0, 12.35),
  new THREE.Vector3(0, 0, 11.35),
  new THREE.Vector3(0.5, 0, 10.85),
  new THREE.Vector3(1.5, 0, 10.85),
  new THREE.Vector3(2, 0, 10.35),
  new THREE.Vector3(2, 0, 9.35),
  new THREE.Vector3(2, 0, 8.35),
  new THREE.Vector3(2, 0, 7.35),
  new THREE.Vector3(1.5, 0, 6.85),
  new THREE.Vector3(0.5, 0, 6.85),
  new THREE.Vector3(0, 0, 6.35),
  new THREE.Vector3(0, 0, 6.35),
  new THREE.Vector3(0, 0, 5.35),
  new THREE.Vector3(0, 0, 4.35),
  new THREE.Vector3(0, 0, 3.35),
];

const Path2 = [
  // DEFAULT POSITION
  new THREE.Vector3(17, 0, 0),
  // START MOVING
  new THREE.Vector3(16, 0, 0),
  new THREE.Vector3(15, 0, 0),
  new THREE.Vector3(14, 0, 0),
  new THREE.Vector3(13.5, 0, -0.5),
  new THREE.Vector3(13.5, 0, -1.5),
  new THREE.Vector3(13, 0, -2),
  new THREE.Vector3(12, 0, -2),
  new THREE.Vector3(11, 0, -2),
  new THREE.Vector3(10.5, 0, -1.5),
  new THREE.Vector3(10.5, 0, -0.5),
  new THREE.Vector3(10, 0, 0),
  new THREE.Vector3(9, 0, 0),
  new THREE.Vector3(8, 0, 0),
  new THREE.Vector3(7, 0, 0),
  new THREE.Vector3(6.5, 0, 0.5),
  new THREE.Vector3(6.5, 0, 1.5),
  new THREE.Vector3(6, 0, 2),
  new THREE.Vector3(5, 0, 2),
  new THREE.Vector3(4.5, 0, 1.5),
  new THREE.Vector3(4.5, 0, 0.5),
  new THREE.Vector3(4, 0, 0),
  new THREE.Vector3(3, 0, 0),
  new THREE.Vector3(2, 0, 0),
  new THREE.Vector3(1, 0, 0),
];

const Path3 = [
  // DEFAULT POSITION
  new THREE.Vector3(0, 0, -17),
  // START MOVING
  new THREE.Vector3(0, 0, -16),
  new THREE.Vector3(-0.5, 0, -15.5),
  new THREE.Vector3(-1.5, 0, -15.5),
  new THREE.Vector3(-2, 0, -15),
  new THREE.Vector3(-2, 0, -14),
  new THREE.Vector3(-2, 0, -13),
  new THREE.Vector3(-1.5, 0, -12.5),
  new THREE.Vector3(-0.5, 0, -12.5),
  new THREE.Vector3(0, 0, -12),
  new THREE.Vector3(0, 0, -11),
  new THREE.Vector3(0.5, 0, -10.5),
  new THREE.Vector3(1.5, 0, -10.5),
  new THREE.Vector3(2, 0, -10),
  new THREE.Vector3(2, 0, -9),
  new THREE.Vector3(2, 0, -8),
  new THREE.Vector3(2, 0, -7),
  new THREE.Vector3(1.5, 0, -6.5),
  new THREE.Vector3(0.5, 0, -6.5),
  new THREE.Vector3(0, 0, -6),
  new THREE.Vector3(0, 0, -5),
  new THREE.Vector3(0, 0, -4),
  new THREE.Vector3(0, 0, -3),
  new THREE.Vector3(0, 0, -2),
  new THREE.Vector3(0, 0, -1),
];

const Path4 = [
  // DEFAULT POSITION
  new THREE.Vector3(17, 0, 0),
  // START MOVING
  new THREE.Vector3(-16, 0, 0),
  new THREE.Vector3(-15, 0, 0),
  new THREE.Vector3(-14, 0, 0),
  new THREE.Vector3(-13.5, 0, -0.5),
  new THREE.Vector3(-13.5, 0, -1.5),
  new THREE.Vector3(-13, 0, -2),
  new THREE.Vector3(-12, 0, -2),
  new THREE.Vector3(-11, 0, -2),
  new THREE.Vector3(-10.5, 0, -1.5),
  new THREE.Vector3(-10.5, 0, -0.5),
  new THREE.Vector3(-10, 0, 0),
  new THREE.Vector3(-9, 0, 0),
  new THREE.Vector3(-8, 0, 0),
  new THREE.Vector3(-7, 0, 0),
  new THREE.Vector3(-6.5, 0, 0.5),
  new THREE.Vector3(-6.5, 0, 1.5),
  new THREE.Vector3(-6, 0, 2),
  new THREE.Vector3(-5, 0, 2),
  new THREE.Vector3(-4, 0, 2),
  new THREE.Vector3(-3, 0, 2),
  new THREE.Vector3(-2.5, 0, 1.5),
  new THREE.Vector3(-2.5, 0, 0.5),
  new THREE.Vector3(-2, 0, 0),
  new THREE.Vector3(-1, 0, 0),
];

const Path = [Path1, Path2, Path3, Path4];

export default Path;
