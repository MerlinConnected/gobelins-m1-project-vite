import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function Construction(props) {
  const { nodes, materials } = useGLTF('./models/constructions_noalpha.glb')
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.CONSTRUCTION.geometry}
        material={materials.BAKED_CONSTRUCTION}
      />
    </group>
  )
}

useGLTF.preload('./models/constructions_noalpha.glb')