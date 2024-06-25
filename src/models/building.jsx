import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

function Building(props) {
    const { nodes, materials } = useGLTF('./models/baked-buildings.glb')
    return (
        <group {...props} dispose={null}>
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.BUILDING.geometry}
                material={materials['Material.004']}
                position={[18.299, 0.386, 11.828]}
                rotation={[Math.PI, -0.744, Math.PI]}
                scale={0.676}
            />
        </group>
    )
}

useGLTF.preload('./models/baked-buildings.glb')

export default React.memo(Building);