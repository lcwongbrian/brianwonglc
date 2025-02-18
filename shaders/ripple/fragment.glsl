uniform vec3 u_colorA;
uniform vec3 u_colorB;
varying float vZ;
varying float amplitude;

void main() {
    vec3 color = mix(u_colorA, u_colorB, vZ / amplitude);
    gl_FragColor = vec4(color, 1.0);
}