import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function Riverside(props) {
    const { nodes, materials } = useGLTF('./models/riverside_noalpha.glb')
    return (
        <group {...props} dispose={null}>
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.RIVERSIDE001.geometry}
                material={materials['BAKED-RIVERSIDE']}
            />
        </group>
    )
}

useGLTF.preload('./models/riverside_noalpha.glb')