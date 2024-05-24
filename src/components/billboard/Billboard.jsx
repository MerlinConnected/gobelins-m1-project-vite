import { useRef } from 'react';

import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';

export default function Billboard({ children, ...props }) {
  const planeRef = useRef(null);
  const direction = new THREE.Vector3();

  useFrame(({ camera }) => {
    if (!planeRef.current) return;

    const cameraPositionXZ = new THREE.Vector3(camera.position.x, 0, camera.position.z);
    const planePositionXZ = new THREE.Vector3(planeRef.current.position.x, 0, planeRef.current.position.z);

    direction.subVectors(cameraPositionXZ, planePositionXZ).normalize();

    const angle = Math.atan2(direction.x, direction.z);

    planeRef.current.rotation.y = angle;
  });

  return (
    <>
      <group ref={planeRef} {...props}>
        {children}
      </group>
    </>
  );
}
