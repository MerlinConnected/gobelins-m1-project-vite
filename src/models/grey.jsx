
import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

function Grey(props) {
    const { nodes, materials } = useGLTF('./models/LIGHT_GREYPART.glb')
    return (
        <group {...props} dispose={null}>
            <mesh
                castShadow
                receiveShadow
                geometry={nodes['GREY-PART'].geometry}
                material={materials.LIGHT_GREYPART}
            />
        </group>
    )
}

useGLTF.preload('./models/LIGHT_GREYPART.glb')

export default React.memo(Grey)