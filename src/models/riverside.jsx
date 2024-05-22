import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function Riverside(props) {
    const { nodes, materials } = useGLTF('./models/riverside.glb')
    return (
        <group {...props} dispose={null}>
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.RIVERSIDE.geometry}
                material={materials['BAKED-RIVERSIDE']}
                scale={0.3}
            />
        </group>
    )
}

useGLTF.preload('./models/riverside.glb')