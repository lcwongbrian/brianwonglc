import * as THREE from "three";
import { Canvas, useLoader } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader";
import { Suspense } from "react";

function Model({ url, type }) {
    const loaded = useLoader(
        type === "stl" ? STLLoader : OBJLoader,
        url
    );

    if (type === "stl") {
        return (
            <mesh geometry={loaded} scale={0.05}>
                <meshStandardMaterial color="orange" side={THREE.DoubleSide} />
            </mesh>
        );
    }

    loaded.traverse((child) => {
        if (child.isMesh) {
            child.material = new THREE.MeshStandardMaterial({
                color: "orange",
                side: THREE.DoubleSide,
            });
        }
    });

    return <primitive object={loaded} scale={0.5} />;
}

export default function ModelViewer({ url, type }) {
    return (
        <Canvas>
            <directionalLight position={[-5, 0, 5]} intensity={1} castShadow />
            <ambientLight intensity={0.5} />
            <OrbitControls />
            <Suspense fallback={null}>
                {url && type && <Model url={url} type={type} />}
            </Suspense>
        </Canvas>
    );
};
