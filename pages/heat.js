import { useEffect, useState, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Row } from "react-bootstrap";
import * as THREE from "three";
import { useControls, Leva, button } from "leva";

export default function Heat() {
    const frameSize = 128;
    const posOffset = 63.5;
    const k = 0.2;
    const initialTemp = 298;
    let indexCnt = 0;
    const verticesMatrix = new Float32Array(frameSize * frameSize * 3);
    const indexMatrix = new Uint16Array((frameSize - 1) * (frameSize - 1) * 6);
    const colorMatrix = new Float32Array(frameSize * frameSize * 3);

    const intervalId = useRef(null);
    const vertexRef = useRef();
    const colorRef = useRef();
    const [isPlay, setIsPlay] = useState(false);
    const [frame, setFrame] = useState(0);
    const [temp, setTemp] = useState(new Array(frameSize).fill(0).map(() => new Array(frameSize).fill(initialTemp)));

    const resetTemp = () => {
        if (isPlay || intervalId.current) {
            setIsPlay(false);
            clearInterval(intervalId.current);
        }

        setInitialCondition();
    };

    const setInitialCondition = () => {
        let result = structuredClone(temp);
        for (let i = 0; i < result.length; i++) {
            for (let j = 0; j < result[i].length; j++) {
                result[i][j] = initialTemp;
            }
        }
        for (let i = 0; i < 40; i++) {
            for (let j = 0; j < 40; j++) {
                result[i + 1][j + 1] = 773;
                result[126 - i][j + 1] = 973;
                result[i + 1][126 - j] = 1273;
                result[126 - i][126 - j] = 1073;
                result[i + 44][j + 44] = 0;
            }
        }

        setTemp(result);
    };

    const calcNewFrame = () => {
        let result = structuredClone(temp);
        for (let i = 1; i < temp.length - 1; i++) {
            for (let j = 1; j < temp[i].length - 1; j++) {
                result[i][j] = k * (temp[i + 1][j] + temp[i - 1][j] + temp[i][j + 1] + temp[i][j - 1]) + (1 - 4 * k) * temp[i][j];
            }
        }

        setTemp(result);
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

    const renderFrame = () => {        
        let positionAttr = vertexRef.current.array;
        let colorAttr = colorRef.current.array;

        for (let i = 0; i < temp.length; i++) {
            for (let j = 0; j < temp[i].length; j++) {
                const idx = i * frameSize + j;
                const vertexIdx = 3 * idx;
                const color = calcColor(temp[i][j]);

                positionAttr[vertexIdx + 2] = (temp[i][j] - 273) / 10;
                colorAttr[vertexIdx] = color.r;
                colorAttr[vertexIdx + 1] = color.g;
                colorAttr[vertexIdx + 2] = color.b;
            }
        }

        vertexRef.current.needsUpdate = true;
        colorRef.current.needsUpdate = true;
    };

    // const [verticesMatrix, indexMatrix, colorMatrix] = useMemo(() => {

    //     const verticesMatrix = new Float32Array(frameSize * frameSize * 3);
    //     const indexMatrix = new Uint16Array((frameSize - 1) * (frameSize - 1) * 6);
    //     const colorMatrix = new Float32Array(frameSize * frameSize * 3);

    //     for (let i = 0; i < frameSize; i++) {
    //         for (let j = 0; j < frameSize; j++) {
    //             const idx = i * frameSize + j;
    //             const vertexIdx = 3 * idx;
                
    //             verticesMatrix[vertexIdx] = i - posOffset;
    //             verticesMatrix[vertexIdx + 1] = j - posOffset;
    //             verticesMatrix[vertexIdx + 2] = (temp[i][j] - 273) / 10;

    //             const color = calcColor(temp[i][j]);
    //             colorMatrix[vertexIdx] = color.r;
    //             colorMatrix[vertexIdx + 1] = color.g;
    //             colorMatrix[vertexIdx + 2] = color.b;

    //             if (i < frameSize - 1 && j < frameSize - 1) {
    //                 const v1 = idx;
    //                 const v2 = idx + 1;
    //                 const v3 = idx + 1 + frameSize;
    //                 const v4 = idx + frameSize;
    //                 indexMatrix[indexCnt] = v1;
    //                 indexMatrix[indexCnt + 1] = v2;
    //                 indexMatrix[indexCnt + 2] = v3;
    //                 indexMatrix[indexCnt + 3] = v3;
    //                 indexMatrix[indexCnt + 4] = v4;
    //                 indexMatrix[indexCnt + 5] = v1;
    //                 indexCnt += 6;
    //             }
    //         }
    //     }

    //     return [verticesMatrix, indexMatrix, colorMatrix];
    // }, []);

    useControls({
        Play: button(() => {
            setIsPlay((value) => !value);
        }),
        Reset: button(() => {
            resetTemp();
        })
    });

    useEffect(() => {
        resetTemp();
        return () => {
            clearInterval(intervalId.current);
        }
    }, []);

    useEffect(() => {
        if (vertexRef?.current?.array && colorRef?.current?.array) {
            renderFrame();
        }
    }, [temp]);

    useEffect(() => {
        if (frame > 0) {
            calcNewFrame();
        }
    }, [frame]);

    useEffect(() => {
        if (isPlay) {
            intervalId.current = setInterval((() => {
                setFrame(frame => frame + 1);
            }), 150);
        } else {
            setIsPlay(false);
            clearInterval(intervalId.current);
        }     
    }, [isPlay]);

    for (let i = 0; i < frameSize; i++) {
        for (let j = 0; j < frameSize; j++) {
            const idx = i * frameSize + j;
            const vertexIdx = 3 * idx;
            
            verticesMatrix[vertexIdx] = i - posOffset;
            verticesMatrix[vertexIdx + 1] = j - posOffset;
            verticesMatrix[vertexIdx + 2] = (temp[i][j] - 273) / 10;

            const color = calcColor(temp[i][j]);
            colorMatrix[vertexIdx] = color.r;
            colorMatrix[vertexIdx + 1] = color.g;
            colorMatrix[vertexIdx + 2] = color.b;

            if (i < frameSize - 1 && j < frameSize - 1) {
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
    }

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
                <mesh>
                    <bufferGeometry onUpdate={self => self.computeVertexNormals()}>
                        <bufferAttribute
                            ref={vertexRef}
                            attach='attributes-position'
                            array={verticesMatrix}
                            count={verticesMatrix.length / 3}
                            itemSize={3}
                        />
                        <bufferAttribute
                            ref={colorRef}
                            attach='attributes-color'
                            array={colorMatrix}
                            count={colorMatrix.length / 3}
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