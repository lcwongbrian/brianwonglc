import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Row } from "react-bootstrap";
import * as THREE from "three";
import RipplePlane from "../components/RipplePlane";

export default function Ripple() {
    return (
        <Row style={{height: "calc(100vh - 80px)"}}>
            <Canvas
                gl={{
                    antialias: true,
                    toneMapping: THREE.ACESFilmicToneMapping,
                    outputColorSpace: THREE.SRGBColorSpace,
                }}
                camera={{
                    fov: 50,
                    near: 0.1,
                    far: 1000,
                    position: [0, -120, 120],
                }}
            >
                <RipplePlane />
                <OrbitControls />
            </Canvas>
        </Row>
    );
}