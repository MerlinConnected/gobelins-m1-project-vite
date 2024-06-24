import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

function Blue(props) {
    const { nodes, materials } = useGLTF('./models/LIGHT_BLUEPART.glb')
    return (
        <group {...props} dispose={null}>
            <mesh
                castShadow
                receiveShadow
                geometry={nodes['BLUE-PART'].geometry}
                material={materials['Material.001']}
            />
        </group>
    )
}

useGLTF.preload('./models/LIGHT_BLUEPART.glb')

export default React.memo(Blue);