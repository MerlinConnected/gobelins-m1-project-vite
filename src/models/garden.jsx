import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

function Garden(props) {
    const { nodes, materials } = useGLTF('./models/gardens_noalpha.glb')
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
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Mesh003_2.geometry}
                material={materials['POLE-ELECTRIC_NORTHCITY']}
            />
        </group>
    )
}

useGLTF.preload('./models/gardens_noalpha.glb')

export default React.memo(Garden);