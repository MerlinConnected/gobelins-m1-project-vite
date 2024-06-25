import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

function Support(props) {
    const { nodes, materials } = useGLTF('./models/LIGHT_SUPPORT.glb')
    return (
        <group {...props} dispose={null}>
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.SUPPORT.geometry}
                material={materials.LIGHT_SUPPORT}
            />
        </group>
    )
}

useGLTF.preload('./models/LIGHT_SUPPORT.glb')

export default React.memo(Support)