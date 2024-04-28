import React, { useMemo, forwardRef } from 'react';

import { useGraph } from '@react-three/fiber';
import { SkeletonUtils } from 'three-stdlib';
import { useGLTF } from '@react-three/drei';

export const Model = forwardRef((props, ref) => {
  const { scene, materials } = useGLTF('/models/car_low_poly.glb');

  const clone = useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const { nodes } = useGraph(clone);

  return (
    <group {...props} ref={ref} dispose={null} scale={[0.3, 0.3, -0.3]}>
      <group rotation={[-Math.PI / 2, 0, 0]} scale={[0.01, 0.01, 0.01]}>
        <mesh castShadow receiveShadow geometry={nodes.Object_15.geometry}>
          <meshPhysicalMaterial color={props.color} />
        </mesh>
        <mesh castShadow receiveShadow geometry={nodes.Object_15_1.geometry} material={materials['02_-_Default']} />
        <mesh castShadow receiveShadow geometry={nodes.Object_15_2.geometry} material={materials['09_-_Default']} />
        <mesh castShadow receiveShadow geometry={nodes.Object_15_3.geometry} material={materials.Tyre_black} />
        <mesh castShadow receiveShadow geometry={nodes.Object_15_4.geometry} material={materials['01_-_Default']} />
        <mesh castShadow receiveShadow geometry={nodes.Object_15_5.geometry} material={materials.Brake_red} />
      </group>
    </group>
  );
});

useGLTF.preload('/models/car_low_poly.glb');
