import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

function Jardin(props) {
    const { nodes, materials } = useGLTF('./models/JARDIN_GREENPART.glb')
    return (
        <group {...props} dispose={null}>
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.GREEN_PART002.geometry}
                material={materials.LIGHT_GREENPART}
            />
        </group>
    )
}

useGLTF.preload('./models/JARDIN_GREENPART.glb')

export default React.memo(Jardin)