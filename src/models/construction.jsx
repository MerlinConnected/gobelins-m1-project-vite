import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function Construction(props) {
  const { nodes, materials } = useGLTF('./models/construction.glb')
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes['Red-Panel004'].geometry}
        material={materials.BAKED_CONSTRUCTION}
      />
    </group>
  )
}

useGLTF.preload('./models/construction.glb')
