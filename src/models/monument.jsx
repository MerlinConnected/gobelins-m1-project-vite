import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function Monument(props) {
    const { nodes, materials } = useGLTF('./models/monument.glb')
    return (
        <group {...props} dispose={null}>
            <mesh
                castShadow
                receiveShadow
                geometry={nodes['MONUMENTS-SIDE'].geometry}
                material={materials.BAKED_MONUMENT}
                scale={0.3}
            />
        </group>
    )
}

useGLTF.preload('./models/monument.glb')