import { useEffect, useState, useRef, useMemo } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Row } from "react-bootstrap";
import * as THREE from "three";
import { useControls, Leva, button } from "leva";
import vertexShader from "../shaders/heat/vertex.glsl";
import fragmentShader from "../shaders/heat/fragment.glsl";

function CameraReset() {
    const { viewport, camera } = useThree();
    const { width } = viewport;   

    useEffect(() => {
        const distance = (1500 / width) ** 2 + 80;
        camera.position.set(0, -distance - 150, distance);
    }, []);
}

export default function Heat() {
    const frameSize = 128;
    const k = 0.2;
    const initialTemp = 298;

    const intervalId = useRef(null);
    const tempTextureRef = useRef(new THREE.DataTexture(
        new Float32Array(frameSize * frameSize * 4),
        frameSize,
        frameSize,
        THREE.RGBAFormat,
        THREE.FloatType
    ));

    const [isPlay, setIsPlay] = useState(false);
    const [frame, setFrame] = useState(0);
    const [temp, setTemp] = useState(new Float32Array(frameSize * frameSize));

    const resetTemp = () => {
        if (isPlay || intervalId.current) {
            setIsPlay(false);
            setFrame(0);
        }

        setTemp(new Float32Array(getInitialCondition()));
    };

    const getInitialCondition = () => {
        const result = new Float32Array(frameSize * frameSize);
        
        for (let i = 0; i < frameSize; i++) {
            for (let j = 0; j < frameSize; j++) {
                const idx = i * frameSize + j;

                if (i > 0 && i <= 40 && j > 0 && j <= 40) { 
                    result[idx] = 773;
                } else if (i >= 86 && i <= 126 && j > 0 && j <= 40) {
                    result[idx] = 973;
                } else if (i > 0 && i <= 40 && j >= 86 && j <= 126) {
                    result[idx] = 1273;
                } else if (i >= 86 && i <= 126 && j >= 86 && j <= 126) {
                    result[idx] = 1073;
                } else if (i >= 44 && i <= 83 && j >= 44 && j <= 83) {
                    result[idx] = 0;
                } else {
                    result[idx] = initialTemp;
                }
            }
        }

        return result;
    };

    const calcNewFrame = () => {
        setTemp((prevTemp) => {
            const newTemp = new Float32Array(prevTemp);

            for (let i = 1; i < frameSize - 1; i++) {
                for (let j = 1; j < frameSize - 1; j++) {
                    const idx = i * frameSize + j;
                    newTemp[idx] = k * (prevTemp[idx + 1] + prevTemp[idx - 1] + prevTemp[idx + frameSize] + prevTemp[idx - frameSize]) + (1 - 4 * k) * prevTemp[idx];
                }
            }

            return newTemp;
        });
    };

    useEffect(() => {
        for (let i = 0; i < frameSize * frameSize; i++) {
            tempTextureRef.current.image.data[i * 4] = temp[i] / 1273;
        }

        tempTextureRef.current.needsUpdate = true;
    }, [temp]);

    useControls({
        Play: button(() => {
            setIsPlay((value) => !value);
        }),
        Reset: button(() => {
            resetTemp();
        })
    });

    useEffect(() => {
        setTemp(new Float32Array(getInitialCondition()));
        return () => clearInterval(intervalId.current);
    }, []);

    useEffect(() => {
        if (frame > 0) {
            calcNewFrame();
        }
    }, [frame]);

    useEffect(() => {
        if (isPlay && !intervalId.current) {
            intervalId.current = setInterval((() => {
                setFrame(frame => frame + 1);
            }), 150);
        } else {
            clearInterval(intervalId.current);
            intervalId.current = null;
        } 
        
        return () => clearInterval(intervalId.current);
    }, [isPlay]);

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
                <CameraReset />
                <hemisphereLight intensity={2.5} />
                <mesh>
                    <planeGeometry
                        attach="geometry"
                        args={[128, 128, 128, 128]}
                    />
                    <shaderMaterial
                        attach="material"
                        uniforms={{
                            tempTexture: { value: tempTextureRef.current },
                            minTemp: { value: 0 },
                            maxTemp: { value: 1273 }
                        }}
                        vertexShader={vertexShader}
                        fragmentShader={fragmentShader}
                        side={THREE.DoubleSide}
                    />
                </mesh>
                <OrbitControls />
            </Canvas>
            <Leva 
                titleBar={{ position: { x: 0, y: 70 } }}
            />
        </Row>
    );
}