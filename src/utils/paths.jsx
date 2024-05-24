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
  new THREE.Vector3(19.35, 0, 0),
  // START MOVING
  new THREE.Vector3(18.35, 0, 0),
  new THREE.Vector3(17.35, 0, 0),
  new THREE.Vector3(16.35, 0, 0),
  new THREE.Vector3(15.85, 0, -0.5),
  new THREE.Vector3(15.85, 0, -1.5),
  new THREE.Vector3(15.35, 0, -2),
  new THREE.Vector3(14.35, 0, -2),
  new THREE.Vector3(13.35, 0, -2),
  new THREE.Vector3(12.85, 0, -1.5),
  new THREE.Vector3(12.85, 0, -0.5),
  new THREE.Vector3(12.35, 0, 0),
  new THREE.Vector3(11.35, 0, 0),
  new THREE.Vector3(10.35, 0, 0),
  new THREE.Vector3(9.35, 0, 0),
  new THREE.Vector3(8.85, 0, 0.5),
  new THREE.Vector3(8.85, 0, 1.5),
  new THREE.Vector3(8.35, 0, 2),
  new THREE.Vector3(7.35, 0, 2),
  new THREE.Vector3(6.85, 0, 1.5),
  new THREE.Vector3(6.85, 0, 0.5),
  new THREE.Vector3(6.35, 0, 0),
  new THREE.Vector3(5.35, 0, 0),
  new THREE.Vector3(4.35, 0, 0),
  new THREE.Vector3(3.35, 0, 0),
];

const Path3 = [
  // DEFAULT POSITION
  new THREE.Vector3(0, 0, -19.35),
  // START MOVING
  new THREE.Vector3(0, 0, -18.35),
  new THREE.Vector3(-0.5, 0, -17.85),
  new THREE.Vector3(-1.5, 0, -17.85),
  new THREE.Vector3(-2, 0, -17.35),
  new THREE.Vector3(-2, 0, -16.35),
  new THREE.Vector3(-2, 0, -15.35),
  new THREE.Vector3(-1.5, 0, -14.85),
  new THREE.Vector3(-0.5, 0, -14.85),
  new THREE.Vector3(0, 0, -14.35),
  new THREE.Vector3(0, 0, -13.35),
  new THREE.Vector3(0.5, 0, -12.85),
  new THREE.Vector3(1.5, 0, -12.85),
  new THREE.Vector3(2, 0, -12.35),
  new THREE.Vector3(2, 0, -11.35),
  new THREE.Vector3(2, 0, -10.35),
  new THREE.Vector3(2, 0, -9.35),
  new THREE.Vector3(1.5, 0, -8.85),
  new THREE.Vector3(0.5, 0, -8.85),
  new THREE.Vector3(0, 0, -8.35),
  new THREE.Vector3(0, 0, -7.35),
  new THREE.Vector3(0, 0, -6.35),
  new THREE.Vector3(0, 0, -5.35),
  new THREE.Vector3(0, 0, -4.35),
  new THREE.Vector3(0, 0, -3.35),
];

const Path4 = [
  // DEFAULT POSITION
  new THREE.Vector3(14.65, 0, 0),
  // START MOVING
  new THREE.Vector3(-18.35, 0, 0),
  new THREE.Vector3(-17.35, 0, 0),
  new THREE.Vector3(-16.35, 0, 0),
  new THREE.Vector3(-15.85, 0, -0.5),
  new THREE.Vector3(-15.85, 0, -1.5),
  new THREE.Vector3(-15.35, 0, -2),
  new THREE.Vector3(-14.35, 0, -2),
  new THREE.Vector3(-13.35, 0, -2),
  new THREE.Vector3(-12.85, 0, -1.5),
  new THREE.Vector3(-12.85, 0, -0.5),
  new THREE.Vector3(-12.35, 0, 0),
  new THREE.Vector3(-11.35, 0, 0),
  new THREE.Vector3(-10.35, 0, 0),
  new THREE.Vector3(-9.35, 0, 0),
  new THREE.Vector3(-8.85, 0, 0.5),
  new THREE.Vector3(-8.85, 0, 1.5),
  new THREE.Vector3(-8.35, 0, 2),
  new THREE.Vector3(-7.35, 0, 2),
  new THREE.Vector3(-6.35, 0, 2),
  new THREE.Vector3(-5.35, 0, 2),
  new THREE.Vector3(-4.85, 0, 1.5),
  new THREE.Vector3(-4.85, 0, 0.5),
  new THREE.Vector3(-4.35, 0, 0),
  new THREE.Vector3(-3.35, 0, 0),
];

const Path = [Path1, Path2, Path3, Path4];

export default Path;
