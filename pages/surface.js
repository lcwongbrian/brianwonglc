import { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Row } from "react-bootstrap";
import * as THREE from "three";
import { useControls, Leva, button } from "leva";
import SurfaceFrame from "@/components/SurfaceFrame";

export default function Surface() {
    const lastFrame = 2155;

    const onEditEnd = (value) => {
        setFrame(value);
    };

    const [_, set] = useControls(() => ({
        currFrame: {
            value: 1,
            min: 1,
            max: lastFrame,
            step: 1,
            label: "Frame",
            onEditEnd
        },
        Previous: button((get) => {
            const frame = get("currFrame");
            if (frame > 1) {
                set({currFrame: frame - 1 })
                setFrame(get("currFrame"));
            }
        }),
        Next: button((get) => {
            const frame = get("currFrame");
            if (frame < lastFrame) {
                set({currFrame: frame + 1 })
                setFrame(get("currFrame"));
            }
        })
    }));

    const [frame, setFrame] = useState(1);

    useEffect(() => {
        set({currFrame: 1 });
    }, []);

    return (
        <Row style={{height: "calc(100vh - 80px)"}}>
            <Canvas
                gl={ {
                    antialias: true,
                    toneMapping: THREE.ACESFilmicToneMapping,
                    outputColorSpace: THREE.SRGBColorSpace
                } }
                camera={ {
                    fov: 50,
                    near: 0.1,
                    far: 1000,
                    position: [ 0, -240, 230 ]
                } }
            >
                <hemisphereLight intensity={2.5} />
                <pointLight position={[10, 10, 10]} />
                <SurfaceFrame
                    frame={frame}
                />
                <OrbitControls />
            </Canvas>
            <Leva 
                titleBar={{ position: { x: 0, y: 50 } }}
            />
        </Row>
    );
}