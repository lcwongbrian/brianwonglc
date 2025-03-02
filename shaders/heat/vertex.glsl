precision highp float;

varying vec2 vUv;
varying float vHeight;

uniform sampler2D tempTexture;
uniform float minTemp;
uniform float maxTemp;

void main() {
    vUv = uv;

    float temp = texture2D(tempTexture, uv).r;
    
    vHeight = temp;

    vec3 newPosition = position;
    newPosition.z += (temp * 1273.0 - 273.0) / 10.0;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
}