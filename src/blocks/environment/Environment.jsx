import React from "react";
import * as THREE from "three";
import { useHelper } from "@react-three/drei";
import { useRef } from "react";

const Environment = () => {

    const directionalLight = useRef();
    // useHelper(directionalLight, THREE.DirectionalLightHelper, 'cyan')

    return (
        <>
            <directionalLight position={[10, 10, 0]} intensity={0.9} ref={directionalLight} />
            <ambientLight intensity={0.5} />
        </>
    );
}

export default React.memo(Environment);