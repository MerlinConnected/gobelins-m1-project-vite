import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

function Sol(props) {
    const { nodes, materials } = useGLTF('./models/LIGHT_SOL2.glb')
    return (
        <group {...props} dispose={null}>
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.PLATEAU_SOL.geometry}
                material={materials.LIGHT_GROUND}
            />
        </group>
    )
}

useGLTF.preload('./models/LIGHT_SOL2.glb')

export default React.memo(Sol)