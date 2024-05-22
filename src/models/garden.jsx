import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function Garden(props) {
    const { nodes, materials } = useGLTF('./models/garden.glb')
    return (
        <group {...props} dispose={null} scale={0.3}>
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Mesh063.geometry}
                material={materials['BAKED-GARDEN']}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Mesh063_1.geometry}
                material={materials.Grass}
            />
        </group>
    )
}

useGLTF.preload('./models/garden.glb')