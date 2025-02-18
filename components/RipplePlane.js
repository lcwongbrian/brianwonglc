import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import vertexShader from "../shaders/ripple/vertex.glsl";
import fragmentShader from "../shaders/ripple/fragment.glsl";

export default function RipplePlane() {
    const mesh = useRef();

    const uniforms = useMemo(
        () => ({
            u_time: { value: 0.0, },
            u_colorA: { value: new THREE.Color("#002566") },
            u_colorB: { value: new THREE.Color("#fff200") },
        }),
        []
    );

    useFrame((state) => {
        const { clock } = state;
        mesh.current.material.uniforms.u_time.value = clock.getElapsedTime();
    });

    return (
        <mesh ref={mesh}>
            <planeGeometry
                attach="geometry"
                args={[100, 100, 100, 100]}
            />
            <shaderMaterial
                attach="material"
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
                uniforms={uniforms}
                side={THREE.DoubleSide}
            />
        </mesh>
    );
}