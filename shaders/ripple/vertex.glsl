uniform float u_time;
varying float vZ;
varying float amplitude;

void main() {
    amplitude = 20.0;
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    float radius = sqrt(modelPosition.x * modelPosition.x + modelPosition.y * modelPosition.y);
    float wave = sin(radius * 0.15 - u_time * 6.0);
    modelPosition.z += wave * wave * amplitude / (radius * 0.05 + 1.0);

    // modelPosition.z += cos(modelPosition.x * 0.15 - u_time * 3.0) * amplitude / 2.0;
    // modelPosition.z += cos(modelPosition.y * 0.15 + u_time * 3.0) * amplitude / 2.0;
    vZ = modelPosition.z;

    gl_Position = projectionMatrix * viewMatrix * modelPosition;
}