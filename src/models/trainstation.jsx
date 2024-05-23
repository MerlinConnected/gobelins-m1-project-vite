import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function TrainStation(props) {
  const { nodes, materials } = useGLTF('./models/trainstation.glb')
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes['GARE-FINAL_BAKED001'].geometry}
        material={materials['GARE-BAKED']}
      />
    </group>
  )
}

useGLTF.preload('./models/trainstation.glb')