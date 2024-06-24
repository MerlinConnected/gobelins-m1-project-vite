import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

function Place(props) {
    const { nodes, materials } = useGLTF('./models/LIGHT_PLACE.glb')
    return (
        <group {...props} dispose={null}>
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.PLACE.geometry}
                material={materials.LIGHT_PLACE}
                position={[0.024, 0.467, -0.045]}
                rotation={[-Math.PI, 1.235, -Math.PI]}
                scale={0.328}
            />
        </group>
    )
}

useGLTF.preload('./models/LIGHT_PLACE.glb')

export default React.memo(Place)