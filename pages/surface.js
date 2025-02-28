import { useEffect, useState, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Row } from "react-bootstrap";
import * as THREE from "three";
import { useControls, Leva, button } from "leva";
import SurfaceFrame from "@/components/SurfaceFrame";

export default function Surface() {
    const lastFrame = 2155;
    const intervalId = useRef(null);
    const [frame, setFrame] = useState(1);
    const [isPlay, setIsPlay] = useState(false);

    const [_, set] = useControls(() => ({
        currFrame: {
            value: 1,
            min: 1,
            max: lastFrame,
            step: 1,
            label: "Frame",
            onEditEnd: (value) => {
                setFrame(value);
            }
        },
        Play: button(() => {
            setIsPlay((value) => !value);
        }),
        Previous: button((get) => {
            const currFrame = get("currFrame");
            if (currFrame > 1) {
                set({currFrame: currFrame - 1 });
                setFrame(get("currFrame"));
            }
        }),
        Next: button((get) => {
            const currFrame = get("currFrame");
            if (currFrame < lastFrame) {
                set({currFrame: currFrame + 1 });
                setFrame(get("currFrame"));
            }
        })
    }));

    useEffect(() => {
        set({ currFrame: 1 });        
        return () => {
            clearInterval(intervalId.current);
        }
    }, []);

    useEffect(() => {
        if (frame > 0 && frame < lastFrame && isPlay) {
            intervalId.current = setInterval((() => {
                setFrame((value) => value + 1);
            }), 500);
        } else {
            setIsPlay(false);
            clearInterval(intervalId.current);
        }
        
        return () => clearInterval(intervalId.current);
    }, [isPlay]);

    useEffect(() => {
        set({ currFrame: frame });
        if (frame === 1 || frame === lastFrame) {
            setIsPlay(false);
            clearInterval(intervalId.current);
        }
    }, [frame]);

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
                    position: [ 0, -130, 130 ]
                } }
            >
                <hemisphereLight intensity={2.5} />
                <SurfaceFrame
                    frame={frame}
                />
                <OrbitControls />
            </Canvas>
            <Leva 
                titleBar={{ position: { x: 0, y: 70 } }}
            />
        </Row>
    );
}