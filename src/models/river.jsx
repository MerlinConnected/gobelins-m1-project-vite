import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

function River(props) {
    const { nodes, materials } = useGLTF('./models/RIVER.glb')
    return (
        <group {...props} dispose={null}>
            <mesh castShadow receiveShadow geometry={nodes.RIVERS.geometry}>
                <meshPhysicalMaterial color={'#8977c4'} metalness={0} roughness={0} />
            </mesh>
        </group>
    )
}

useGLTF.preload('./models/RIVER.glb')

export default React.memo(River)