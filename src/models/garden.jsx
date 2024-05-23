import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function Garden(props) {
    const { nodes, materials } = useGLTF('./models/garden.glb')
    return (
        <group {...props} dispose={null}>
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Mesh003.geometry}
                material={materials['BAKED-GARDEN']}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Mesh003_1.geometry}
                material={materials.Grass}
            />
        </group>
    )
}

useGLTF.preload('./models/garden.glb')