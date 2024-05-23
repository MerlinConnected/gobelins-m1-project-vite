import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function Floor(props) {
    const { nodes, materials } = useGLTF('./models/floor.glb')
    return (
        <group {...props} dispose={null} rotation={[Math.PI, 0, 0]}>
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.PLATEAU004.geometry}
                material={materials.PLAN}
            />
        </group>
    )
}

useGLTF.preload('./models/floor.glb')