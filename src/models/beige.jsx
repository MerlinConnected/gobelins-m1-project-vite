import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

function Beige(props) {
    const { nodes, materials } = useGLTF('./models/LIGHT_BEIGEPART.glb')
    return (
        <group {...props} dispose={null}>
            <mesh
                castShadow
                receiveShadow
                geometry={nodes['BEIGE-PART'].geometry}
                material={materials.Material}
            />
        </group>
    )
}

useGLTF.preload('./models/LIGHT_BEIGEPART.glb')

export default React.memo(Beige)