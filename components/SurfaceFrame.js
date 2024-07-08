import { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { getSurfaceById } from "@/lib/surface";

export default function SurfaceFrame(props) {   
    const { frame } = props;    

    const frameSize = 128;
    const posOffset = 63.5;
    const rOffset = 0.01;
    const gOffset = 0.01;
    const bOffset = 0.15;
    const min = 61;
    const max = 72;
    let indexCnt = 0;

    const verticesMatrix = new Float32Array(frameSize * frameSize * 3);
    const indexMatrix = new Uint16Array((frameSize - 1) * (frameSize - 1) * 6);
    const colorMatrix = new Float32Array(frameSize * frameSize * 3);
    const color = new THREE.Color();

    const vertexRef = useRef();
    const colorRef = useRef();

    const transformFrame = (data) => {        
        let positionAttr = vertexRef.current.array;
        let colorAttr = colorRef.current.array;
        
        for (let i = 0; i < data.length; i++) {
            for (let j = 0; j < data[i].length; j++) {
                const idx = i * frameSize + j;
                const vertexIdx = 3 * idx;
                const hRatio = (data[i][j] - min) / (max - min);
                const r = hRatio * (1 - rOffset) + rOffset;
                const g = hRatio * (1 - gOffset) + gOffset;
                const b = bOffset - hRatio * bOffset;

                positionAttr[vertexIdx + 2] = data[i][j] - min;                
    
                color.setRGB(r, g, b, THREE.SRGBColorSpace);
                colorAttr[vertexIdx] = color.r;
                colorAttr[vertexIdx + 1] = color.g;
                colorAttr[vertexIdx + 2] = color.b;
            }
        }

        vertexRef.current.needsUpdate = true;
        colorRef.current.needsUpdate = true;
    };

    for (let i = 0; i < frameSize; i++) {
        for (let j = 0; j < frameSize; j++) {
            const idx = i * frameSize + j;
            const vertexIdx = 3 * idx;
            
            verticesMatrix[vertexIdx] = i - posOffset;
            verticesMatrix[vertexIdx + 1] = j - posOffset;
            verticesMatrix[vertexIdx + 2] = 0;

            color.setRGB(rOffset, gOffset, bOffset, THREE.SRGBColorSpace);
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

    useEffect(() => {
        const getFrame = async frame => {     
            const data = await getSurfaceById(frame);
            if (data?.surface_id && data?.vertices?.length > 0) {
                transformFrame(data.vertices);
            }
        };
        getFrame(frame);
    }, [frame]);

    return (
        <mesh {...props}>
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
    );
}