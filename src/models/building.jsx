import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

function Building(props) {
    const { nodes, materials } = useGLTF('./models/BUILDING.glb')
    return (
        <group {...props} dispose={null}>
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.BUILDING.geometry}
            >
                <meshPhysicalMaterial color={'#B6B8C9'} />
            </mesh>
        </group>
    )
}

useGLTF.preload('./models/BUILDING.glb')

export default React.memo(Building);