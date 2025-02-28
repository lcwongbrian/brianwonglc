import { useEffect, useState, useRef, useMemo } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Row } from "react-bootstrap";
import * as THREE from "three";
import { useControls, Leva, button } from "leva";

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
    const posOffset = 63.5;
    const k = 0.2;
    const initialTemp = 298;

    const intervalId = useRef(null);
    const vertexRef = useRef();
    const colorRef = useRef();
    const isInitialized = useRef(false);
    const verticesMatrix = useRef(new Float32Array(frameSize * frameSize * 3));
    const colorMatrix = useRef(new Float32Array(frameSize * frameSize * 3));

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

    const calcColor = (t) => {
        const color = new THREE.Color();
        const r = t <= 373 ? 0 : (t > 1273 ? 1 : (t - 373) / 900);
        const g = t <= 23 ? 0 : (
            t <= 323 ? (t - 23) / 300 : (
                t <= 373 ? 1 : (
                    t > 1273 ? 0 : (1273 - t) / 900
                )
            )
        );
        const b = t > 323 ? 0 : (t < 273 ? 1 : (323 - t) / 50);
        color.setRGB(r, g, b, THREE.SRGBColorSpace);
        return color;
    };

    useEffect(() => {
        const verticesBuffer = verticesMatrix.current;
        const colorBuffer = colorMatrix.current;

        for (let i = 0; i < frameSize; i++) {
            for (let j = 0; j < frameSize; j++) {
                const idx = i * frameSize + j;
                const vertexIdx = 3 * idx;
                
                if (!isInitialized.current) {
                    verticesBuffer[vertexIdx] = i - posOffset;
                    verticesBuffer[vertexIdx + 1] = j - posOffset;
                }
                verticesBuffer[vertexIdx + 2] = (temp[idx] - 273) / 10;

                const color = calcColor(temp[idx]);
                colorBuffer[vertexIdx] = color.r;
                colorBuffer[vertexIdx + 1] = color.g;
                colorBuffer[vertexIdx + 2] = color.b;
            }
        }

        isInitialized.current = true;        

        if (vertexRef.current && colorRef.current) {
            vertexRef.current.needsUpdate = true;
            colorRef.current.needsUpdate = true;
        }
    }, [temp]);

    const indexMatrix = useMemo(() => {
        let indexCnt = 0;
        const indexMatrix = new Uint16Array((frameSize - 1) * (frameSize - 1) * 6);

        for (let i = 0; i < frameSize - 1; i++) {
            for (let j = 0; j < frameSize - 1; j++) {
                const idx = i * frameSize + j;
                
                const v1 = idx;
                const v2 = idx + 1;
                const v3 = idx + 1 + frameSize;
                const v4 = idx + frameSize;
                indexMatrix[indexCnt] = v1;
                indexMatrix[indexCnt + 1] = v2;
                indexMatrix[indexCnt + 2] = v3;
                indexMatrix[indexCnt + 3] = v3;
                indexMatrix[indexCnt + 4] = v4;
                indexMatrix[indexCnt + 5] = v1;
                indexCnt += 6;
            }
        }

        return indexMatrix;
    }, []);

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
            }), 200);
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
                    <bufferGeometry onUpdate={self => self.computeVertexNormals()}>
                        <bufferAttribute
                            ref={vertexRef}
                            attach='attributes-position'
                            array={verticesMatrix.current}
                            count={verticesMatrix.current.length / 3}
                            itemSize={3}
                        />
                        <bufferAttribute
                            ref={colorRef}
                            attach='attributes-color'
                            array={colorMatrix.current}
                            count={colorMatrix.current.length / 3}
                            itemSize={3}
                        />
                        <bufferAttribute
                            attach='index'
                            array={indexMatrix}
                            count={indexMatrix.length}
                            itemSize={1}
                        />                
                    </bufferGeometry>
                    <meshLambertMaterial
                        vertexColors
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