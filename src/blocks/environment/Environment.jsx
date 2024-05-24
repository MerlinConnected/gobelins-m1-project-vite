import React from "react";
import * as THREE from "three";
import { useHelper } from "@react-three/drei";
import { useRef } from "react";

const Environment = () => {

    const directionalLight = useRef();
    // useHelper(directionalLight, THREE.DirectionalLightHelper, 'cyan')

    return (
        <>
            {/* <directionalLight position={[-10, 10, 10]} intensity={2} ref={directionalLight} /> */}
            <ambientLight />
        </>
    );
}

export default React.memo(Environment);