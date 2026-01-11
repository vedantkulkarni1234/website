"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface FloatingParticlesProps {
    count?: number;
}

export function FloatingParticles({ count = 100 }: FloatingParticlesProps) {
    const pointsRef = useRef<THREE.Points>(null);

    // Generate particle positions and data
    const { positions, colors, sizes, velocities } = useMemo(() => {
        const positions = new Float32Array(count * 3);
        const colors = new Float32Array(count * 3);
        const sizes = new Float32Array(count);
        const velocities = new Float32Array(count * 3);

        const colorOptions = [
            new THREE.Color("#00ffff"), // Cyan
            new THREE.Color("#8b5cf6"), // Purple
            new THREE.Color("#00ff41"), // Matrix green
            new THREE.Color("#ff6a00"), // Orange
        ];

        for (let i = 0; i < count; i++) {
            const i3 = i * 3;

            // Random positions in a sphere
            const radius = 8 + Math.random() * 4;
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(Math.random() * 2 - 1);

            positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
            positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
            positions[i3 + 2] = radius * Math.cos(phi);

            // Random color from options
            const color = colorOptions[Math.floor(Math.random() * colorOptions.length)];
            colors[i3] = color.r;
            colors[i3 + 1] = color.g;
            colors[i3 + 2] = color.b;

            // Random sizes
            sizes[i] = Math.random() * 3 + 1;

            // Random velocities for floating motion
            velocities[i3] = (Math.random() - 0.5) * 0.02;
            velocities[i3 + 1] = (Math.random() - 0.5) * 0.02;
            velocities[i3 + 2] = (Math.random() - 0.5) * 0.02;
        }

        return { positions, colors, sizes, velocities };
    }, [count]);

    // Create shader material for glowing particles
    const particleMaterial = useMemo(() => {
        return new THREE.ShaderMaterial({
            uniforms: {
                time: { value: 0 },
                pixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
            },
            vertexShader: `
        attribute float size;
        attribute vec3 customColor;
        uniform float time;
        uniform float pixelRatio;
        varying vec3 vColor;
        varying float vAlpha;
        
        void main() {
          vColor = customColor;
          
          // Floating animation
          vec3 pos = position;
          pos.y += sin(time + position.x * 0.5) * 0.2;
          pos.x += cos(time + position.y * 0.3) * 0.1;
          
          vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
          
          // Size attenuation
          gl_PointSize = size * pixelRatio * (300.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
          
          // Alpha based on distance
          vAlpha = smoothstep(20.0, 5.0, -mvPosition.z);
        }
      `,
            fragmentShader: `
        varying vec3 vColor;
        varying float vAlpha;
        
        void main() {
          // Circular particle with soft edges
          vec2 center = gl_PointCoord - vec2(0.5);
          float dist = length(center);
          
          if (dist > 0.5) discard;
          
          float alpha = smoothstep(0.5, 0.1, dist) * vAlpha;
          
          // Add glow effect
          vec3 glow = vColor * (1.0 - dist * 2.0);
          
          gl_FragColor = vec4(vColor + glow * 0.3, alpha);
        }
      `,
            transparent: true,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
        });
    }, []);

    useFrame(({ clock }) => {
        if (pointsRef.current) {
            particleMaterial.uniforms.time.value = clock.elapsedTime;

            // Slow rotation of entire particle system
            pointsRef.current.rotation.y = clock.elapsedTime * 0.02;
            pointsRef.current.rotation.x = Math.sin(clock.elapsedTime * 0.05) * 0.1;
        }
    });

    return (
        <points ref={pointsRef} material={particleMaterial}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={count}
                    array={positions}
                    itemSize={3}
                />
                <bufferAttribute
                    attach="attributes-customColor"
                    count={count}
                    array={colors}
                    itemSize={3}
                />
                <bufferAttribute
                    attach="attributes-size"
                    count={count}
                    array={sizes}
                    itemSize={1}
                />
            </bufferGeometry>
        </points>
    );
}

export default FloatingParticles;
