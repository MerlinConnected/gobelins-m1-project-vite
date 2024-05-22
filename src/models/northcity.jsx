import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function NorthCity(props) {
    const { nodes, materials } = useGLTF('./models/northcity.glb')
    return (
        <group {...props} dispose={null}>
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.NORTHCITY.geometry}
                material={materials['BAKED-NORTHCITY']}
                scale={0.3}
            />
        </group>
    )
}

useGLTF.preload('./models/northcity.glb')