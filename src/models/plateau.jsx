import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function Plateau(props) {
    const { nodes, materials } = useGLTF('./models/plateau.glb')
    return (
        <group {...props} dispose={null}>
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.PLATEAU004.geometry}
                material={materials.BAKED_GROUND}
                position={[0, -1.736, 0]}
            />
        </group>
    )
}

useGLTF.preload('./models/plateau.glb')