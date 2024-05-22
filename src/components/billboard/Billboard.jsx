import { useRef } from 'react';

import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';

import classNames from 'classnames';
import styles from './Billboard.module.scss';

export default function Billboard({ player, className, ...props }) {
  const { state } = player;

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
        <Html wrapperClass={classNames(styles.wrapper, className)} center zIndexRange={[0, 0]}>
          <p>{state?.name}</p>
          <p>{state?.points} Points</p>
          <p>{state?.status?.name}</p>
        </Html>
      </group>
    </>
  );
}
