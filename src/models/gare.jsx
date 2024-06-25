import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

function Gare(props) {
  const { nodes, materials } = useGLTF('./models/gare_noalpha.glb')
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

useGLTF.preload('./models/gare_noalpha.glb')

export default React.memo(Gare);