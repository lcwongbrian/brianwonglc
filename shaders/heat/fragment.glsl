precision highp float;

varying vec2 vUv;
varying float vHeight;

void main() {
    vec3 coldColor = vec3(0.0, 0.0, 1.0);
    vec3 roomColor = vec3(0.1, 0.275, 0.25);
    vec3 hotColor = vec3(1.0, 0.0, 0.0);
    vec3 glowColor = vec3(1.0, 1.0, 0.0);

    vec3 color;
    if (vHeight < 0.25) {
        color = mix(coldColor, roomColor, vHeight * 4.0);
    } else if (vHeight >=  0.25 && vHeight < 0.75) {
        color = mix(roomColor, hotColor, (vHeight - 0.25) * 2.0);
    } else {
        color = mix(hotColor, glowColor, (vHeight - 0.75) * 4.0);
    }

    gl_FragColor = vec4(color, 1.0);
}