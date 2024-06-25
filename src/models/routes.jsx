import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

function Routes(props) {
    const { nodes, materials } = useGLTF('./models/route.glb')
    return (
        <group {...props} dispose={null}>
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Straight252.geometry}
                material={materials['Paths.002']}
                position={[-37.566, 0.077, 0.112]}
                rotation={[Math.PI, 1.571, 0]}
                scale={-1}>
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.L_Turn177.geometry}
                    material={materials['Paths.002']}
                    position={[-4, 0, -20]}
                    rotation={[-Math.PI, Math.PI / 2, 0]}
                    scale={-1}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.L_Turn178.geometry}
                    material={materials['Paths.002']}
                    position={[0, 0.002, -20]}
                    rotation={[Math.PI, -Math.PI / 2, 0]}
                    scale={-1}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.L_Turn179.geometry}
                    material={materials['Paths.002']}
                    position={[0, 0, -28]}
                    rotation={[-Math.PI, 0, 0]}
                    scale={-1}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.L_Turn180.geometry}
                    material={materials['Paths.002']}
                    position={[-4, -0.002, -28]}
                    rotation={[0, 0, -Math.PI]}
                    scale={-1}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.L_Turn181.geometry}
                    material={materials['Paths.002']}
                    position={[0, 0, -12]}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.L_Turn182.geometry}
                    material={materials['Paths.002']}
                    position={[0, 0.002, -6]}
                    rotation={[0, -Math.PI / 2, 0]}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.L_Turn183.geometry}
                    material={materials['Paths.002']}
                    position={[4, 0.002, -6]}
                    rotation={[0, Math.PI / 2, 0]}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.L_Turn192.geometry}
                    material={materials['Paths.002']}
                    position={[4, 0.002, -12]}
                    rotation={[Math.PI, 0, Math.PI]}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Straight241.geometry}
                    material={materials['Paths.002']}
                    position={[-4, -0.002, -26]}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Straight242.geometry}
                    material={materials['Paths.002']}
                    position={[-4, -0.002, -22]}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Straight243.geometry}
                    material={materials['Paths.002']}
                    position={[0, -0.002, -30]}
                    rotation={[-Math.PI, 0, 0]}
                    scale={-1}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Straight244.geometry}
                    material={materials['Paths.002']}
                    position={[-4, -0.002, -24]}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Straight245.geometry}
                    material={materials['Paths.002']}
                    position={[-2, 0, -20]}
                    rotation={[-Math.PI, Math.PI / 2, 0]}
                    scale={-1}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Straight246.geometry}
                    material={materials['Paths.002']}
                    position={[-2, -0.002, -28]}
                    rotation={[Math.PI, -Math.PI / 2, 0]}
                    scale={-1}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Straight247.geometry}
                    material={materials['Paths.002']}
                    position={[0, 0, -18]}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Straight248.geometry}
                    material={materials['Paths.002']}
                    position={[0, 0, -14]}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Straight249.geometry}
                    material={materials['Paths.002']}
                    position={[0, 0, -16]}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Straight250.geometry}
                    material={materials['Paths.002']}
                    position={[2, 0, -12]}
                    rotation={[0, Math.PI / 2, 0]}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Straight251.geometry}
                    material={materials['Paths.002']}
                    position={[4, 0, -10]}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Straight253.geometry}
                    material={materials['Paths.002']}
                    position={[0, 0, -2]}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Straight254.geometry}
                    material={materials['Paths.002']}
                    position={[4, 0, -8]}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Straight255.geometry}
                    material={materials['Paths.002']}
                    position={[2, 0, -6]}
                    rotation={[0, -Math.PI / 2, 0]}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Straight272.geometry}
                    material={materials['Paths.002']}
                    position={[0, 0, -4]}
                />
            </mesh>
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Straight292.geometry}
                material={materials['Paths.002']}
                position={[0.091, 0.03, -37.497]}
                rotation={[Math.PI, 0, Math.PI]}>
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.L_Turn193.geometry}
                    material={materials['Paths.002']}
                    position={[0, 0.003, -18.001]}
                    rotation={[0, Math.PI / 2, 0]}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.L_Turn194.geometry}
                    material={materials['Paths.002']}
                    position={[-4, 0.005, -18.001]}
                    rotation={[0, -Math.PI / 2, 0]}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.L_Turn195.geometry}
                    material={materials['Paths.002']}
                    position={[-4, 0.005, -12.001]}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.L_Turn196.geometry}
                    material={materials['Paths.002']}
                    position={[0, 0.003, -12]}
                    rotation={[Math.PI, 0, Math.PI]}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.L_Turn197.geometry}
                    material={materials['Paths.002']}
                    position={[4, 0.003, -2]}
                    rotation={[-Math.PI, 0, 0]}
                    scale={-1}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.L_Turn198.geometry}
                    material={materials['Paths.002']}
                    position={[0, 0.002, -2]}
                    rotation={[0, 0, -Math.PI]}
                    scale={-1}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.L_Turn199.geometry}
                    material={materials['Paths.002']}
                    position={[0, 0.003, -8]}
                    rotation={[Math.PI, Math.PI / 2, 0]}
                    scale={-1}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.L_Turn200.geometry}
                    material={materials['Paths.002']}
                    position={[4, 0.003, -8]}
                    rotation={[Math.PI, -Math.PI / 2, 0]}
                    scale={-1}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Straight273.geometry}
                    material={materials['Paths.002']}
                    position={[0.001, 0.003, -28.001]}
                    rotation={[-Math.PI, 0, 0]}
                    scale={-1}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Straight274.geometry}
                    material={materials['Paths.002']}
                    position={[0.001, 0.003, -30.001]}
                    rotation={[-Math.PI, 0, 0]}
                    scale={-1}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Straight275.geometry}
                    material={materials['Paths.002']}
                    position={[0.001, 0.003, -24.001]}
                    rotation={[-Math.PI, 0, 0]}
                    scale={-1}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Straight276.geometry}
                    material={materials['Paths.002']}
                    position={[0.001, 0.003, -26.001]}
                    rotation={[-Math.PI, 0, 0]}
                    scale={-1}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Straight278.geometry}
                    material={materials['Paths.002']}
                    position={[0.001, 0.003, -20.001]}
                    rotation={[-Math.PI, 0, 0]}
                    scale={-1}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Straight279.geometry}
                    material={materials['Paths.002']}
                    position={[-4, 0.003, -14.001]}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Straight280.geometry}
                    material={materials['Paths.002']}
                    position={[0.001, 0.003, -22.001]}
                    rotation={[-Math.PI, 0, 0]}
                    scale={-1}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Straight281.geometry}
                    material={materials['Paths.002']}
                    position={[-2, 0.003, -18.001]}
                    rotation={[0, Math.PI / 2, 0]}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Straight282.geometry}
                    material={materials['Paths.002']}
                    position={[-4, 0.003, -16.001]}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Straight283.geometry}
                    material={materials['Paths.002']}
                    position={[-2, 0.003, -12.001]}
                    rotation={[0, -Math.PI / 2, 0]}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Straight284.geometry}
                    material={materials['Paths.002']}
                    position={[0, 0.002, -10]}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Straight285.geometry}
                    material={materials['Paths.002']}
                    position={[4, 0.002, -6]}
                    rotation={[-Math.PI, 0, 0]}
                    scale={-1}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Straight286.geometry}
                    material={materials['Paths.002']}
                    position={[4, 0.002, -4]}
                    rotation={[-Math.PI, 0, 0]}
                    scale={-1}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Straight287.geometry}
                    material={materials['Paths.002']}
                    position={[2, 0.002, -2]}
                    rotation={[Math.PI, -Math.PI / 2, 0]}
                    scale={-1}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Straight288.geometry}
                    material={materials['Paths.002']}
                    position={[2, 0.002, -8]}
                    rotation={[Math.PI, Math.PI / 2, 0]}
                    scale={-1}
                />
            </mesh>
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Straight299.geometry}
                material={materials['Paths.002']}
                position={[37.501, 0.03, 0.015]}
                rotation={[Math.PI, -Math.PI / 2, 0]}
                scale={-1}>
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.L_Turn201.geometry}
                    material={materials['Paths.002']}
                    position={[4.001, 0.032, -24]}
                    rotation={[Math.PI, -Math.PI / 2, 0]}
                    scale={-1}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.L_Turn202.geometry}
                    material={materials['Paths.002']}
                    position={[4, 0.032, -20]}
                    rotation={[-Math.PI, 0, 0]}
                    scale={-1}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.L_Turn203.geometry}
                    material={materials['Paths.002']}
                    position={[0, 0.03, -20]}
                    rotation={[0, 0, -Math.PI]}
                    scale={-1}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.L_Turn204.geometry}
                    material={materials['Paths.002']}
                    position={[0, 0.032, -12]}
                    rotation={[0, Math.PI / 2, 0]}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.L_Turn205.geometry}
                    material={materials['Paths.002']}
                    position={[-4, 0.033, -12]}
                    rotation={[0, -Math.PI / 2, 0]}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.L_Turn206.geometry}
                    material={materials['Paths.002']}
                    position={[-4, 0.033, -6]}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.L_Turn207.geometry}
                    material={materials['Paths.002']}
                    position={[0, 0.032, -6]}
                    rotation={[Math.PI, 0, Math.PI]}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.LR_Tram001.geometry}
                    material={materials['Paths.002']}
                    position={[0.021, 0.042, -24.002]}
                    rotation={[-Math.PI, Math.PI / 2, 0]}
                    scale={-1}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.S_Tram001.geometry}
                    material={materials['Paths.002']}
                    position={[2.001, 0.03, -24]}
                    rotation={[-Math.PI, Math.PI / 2, 0]}
                    scale={-1}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Straight277.geometry}
                    material={materials['Paths.002']}
                    position={[0.026, 0.047, -30.005]}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Straight289.geometry}
                    material={materials['Paths.002']}
                    position={[0.026, 0.047, -26.005]}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Straight290.geometry}
                    material={materials['Paths.002']}
                    position={[4.001, 0.032, -22]}
                    rotation={[-Math.PI, 0, 0]}
                    scale={-1}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Straight291.geometry}
                    material={materials['Paths.002']}
                    position={[0.026, 0.047, -28.005]}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Straight293.geometry}
                    material={materials['Paths.002']}
                    position={[2, 0.03, -20]}
                    rotation={[Math.PI, -Math.PI / 2, 0]}
                    scale={-1}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Straight294.geometry}
                    material={materials['Paths.002']}
                    position={[0, 0.03, -18]}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Straight295.geometry}
                    material={materials['Paths.002']}
                    position={[0.001, 0.032, -14]}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Straight296.geometry}
                    material={materials['Paths.002']}
                    position={[0, 0.03, -16]}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Straight297.geometry}
                    material={materials['Paths.002']}
                    position={[-2, 0.032, -12]}
                    rotation={[0, Math.PI / 2, 0]}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Straight298.geometry}
                    material={materials['Paths.002']}
                    position={[-4, 0.032, -10]}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Straight300.geometry}
                    material={materials['Paths.002']}
                    position={[0, 0, -2]}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Straight301.geometry}
                    material={materials['Paths.002']}
                    position={[-4, 0.032, -8]}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Straight302.geometry}
                    material={materials['Paths.002']}
                    position={[-2, 0.032, -6]}
                    rotation={[0, -Math.PI / 2, 0]}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Straight303.geometry}
                    material={materials['Paths.002']}
                    position={[0, 0, -4]}
                />
            </mesh>
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Straight382.geometry}
                material={materials['Paths.002']}
                position={[0.042, 0.03, 37.693]}>
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.L_Turn176.geometry}
                    material={materials['Paths.001']}
                    position={[0, -0.002, -24]}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.L_Turn240.geometry}
                    material={materials['Paths.002']}
                    position={[4, 0, -24]}
                    rotation={[Math.PI, -Math.PI / 2, 0]}
                    scale={-1}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.L_Turn241.geometry}
                    material={materials['Paths.002']}
                    position={[4, 0, -16]}
                    rotation={[-Math.PI, 0, 0]}
                    scale={-1}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.L_Turn242.geometry}
                    material={materials['Paths.002']}
                    position={[0, -0.002, -16]}
                    rotation={[0, 0, -Math.PI]}
                    scale={-1}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.L_Turn243.geometry}
                    material={materials['Paths.002']}
                    position={[0, 0, -10]}
                    rotation={[0, Math.PI / 2, 0]}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.L_Turn244.geometry}
                    material={materials['Paths.002']}
                    position={[-4, 0, -10]}
                    rotation={[0, -Math.PI / 2, 0]}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.L_Turn245.geometry}
                    material={materials['Paths.002']}
                    position={[-4, 0, -4]}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.L_Turn246.geometry}
                    material={materials['Paths.002']}
                    position={[0, 0, -4]}
                    rotation={[Math.PI, 0, Math.PI]}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Straight240.geometry}
                    material={materials.Paths}
                    position={[0, -0.002, -26]}
                    rotation={[-Math.PI, 0, -Math.PI]}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Straight368.geometry}
                    material={materials['Paths.002']}
                    position={[0, -0.003, -30]}
                    rotation={[-Math.PI, 0, 0]}
                    scale={-1}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Straight369.geometry}
                    material={materials['Paths.002']}
                    position={[4, -0.002, -20]}
                    rotation={[-Math.PI, 0, 0]}
                    scale={-1}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Straight370.geometry}
                    material={materials['Paths.002']}
                    position={[0, -0.003, -28]}
                    rotation={[-Math.PI, 0, 0]}
                    scale={-1}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Straight371.geometry}
                    material={materials['Paths.002']}
                    position={[0, -0.002, -12]}
                    rotation={[-Math.PI, 0, 0]}
                    scale={-1}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Straight372.geometry}
                    material={materials['Paths.002']}
                    position={[-4, 0, -6]}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Straight373.geometry}
                    material={materials['Paths.002']}
                    position={[4, -0.002, -18]}
                    rotation={[-Math.PI, 0, 0]}
                    scale={-1}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Straight374.geometry}
                    material={materials['Paths.002']}
                    position={[2, -0.002, -24]}
                    rotation={[Math.PI, Math.PI / 2, 0]}
                    scale={-1}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Straight375.geometry}
                    material={materials['Paths.002']}
                    position={[4, -0.002, -22]}
                    rotation={[-Math.PI, 0, 0]}
                    scale={-1}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Straight376.geometry}
                    material={materials['Paths.002']}
                    position={[2, -0.002, -16]}
                    rotation={[Math.PI, -Math.PI / 2, 0]}
                    scale={-1}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Straight377.geometry}
                    material={materials['Paths.002']}
                    position={[0, -0.002, -14]}
                    rotation={[-Math.PI, 0, 0]}
                    scale={-1}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Straight378.geometry}
                    material={materials['Paths.002']}
                    position={[-2, 0, -10]}
                    rotation={[0, Math.PI / 2, 0]}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Straight379.geometry}
                    material={materials['Paths.002']}
                    position={[-4, 0, -8]}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Straight380.geometry}
                    material={materials['Paths.002']}
                    position={[-2, 0, -4]}
                    rotation={[0, -Math.PI / 2, 0]}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Straight381.geometry}
                    material={materials['Paths.002']}
                    position={[0, 0, -2]}
                />
            </mesh>
        </group>
    )
}

useGLTF.preload('./models/route.glb')

export default React.memo(Routes);