import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function Monument(props) {
    const { nodes, materials } = useGLTF('./models/monuments_noalpha.glb')
    return (
        <group {...props} dispose={null}>
            <mesh
                castShadow
                receiveShadow
                geometry={nodes['MONUMENTS-SIDE001'].geometry}
                material={materials.BAKED_MONUMENT}
            />
        </group>
    )
}

useGLTF.preload('./models/monuments_noalpha.glb')