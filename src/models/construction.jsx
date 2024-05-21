import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function Construction(props) {
  const { nodes, materials } = useGLTF('./models/construction.glb')
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes['Red-Panel011'].geometry}
        material={materials.BAKED_CONSTRUCTION}
        scale={0.3}
      />
    </group>
  )
}

useGLTF.preload('./models/construction.glb')