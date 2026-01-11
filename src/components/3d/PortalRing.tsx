"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface PortalRingProps {
    position?: [number, number, number];
    scale?: number;
}

export function PortalRing({
    position = [0, 0, 0],
    scale = 1,
}: PortalRingProps) {
    const groupRef = useRef<THREE.Group>(null);
    const ring1Ref = useRef<THREE.Mesh>(null);
    const ring2Ref = useRef<THREE.Mesh>(null);
    const ring3Ref = useRef<THREE.Mesh>(null);
    const coreRef = useRef<THREE.Mesh>(null);

    // Create custom shader material for portal effect
    const portalMaterial = useMemo(() => {
        return new THREE.ShaderMaterial({
            uniforms: {
                time: { value: 0 },
                color1: { value: new THREE.Color("#00ffff") },
                color2: { value: new THREE.Color("#8b5cf6") },
            },
            vertexShader: `
        varying vec2 vUv;
        varying vec3 vPosition;
        void main() {
          vUv = uv;
          vPosition = position;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
            fragmentShader: `
        uniform float time;
        uniform vec3 color1;
        uniform vec3 color2;
        varying vec2 vUv;
        varying vec3 vPosition;
        
        void main() {
          vec2 center = vec2(0.5, 0.5);
          float dist = distance(vUv, center);
          
          // Spiral pattern
          float angle = atan(vUv.y - 0.5, vUv.x - 0.5);
          float spiral = sin(angle * 6.0 + dist * 20.0 - time * 3.0);
          
          // Color mixing
          vec3 finalColor = mix(color1, color2, spiral * 0.5 + 0.5);
          
          // Vortex effect
          float vortex = sin(dist * 30.0 - time * 2.0) * 0.5 + 0.5;
          finalColor *= vortex * 0.5 + 0.5;
          
          // Edge glow
          float edge = smoothstep(0.0, 0.3, dist) * smoothstep(0.5, 0.35, dist);
          
          gl_FragColor = vec4(finalColor, edge);
        }
      `,
            transparent: true,
            side: THREE.DoubleSide,
            blending: THREE.AdditiveBlending,
        });
    }, []);

    useFrame(({ clock }) => {
        const time = clock.elapsedTime;

        // Update shader time
        portalMaterial.uniforms.time.value = time;

        // Rotate rings in opposite directions
        if (ring1Ref.current) {
            ring1Ref.current.rotation.z = time * 0.5;
        }
        if (ring2Ref.current) {
            ring2Ref.current.rotation.z = -time * 0.3;
            ring2Ref.current.rotation.x = Math.sin(time * 0.5) * 0.1;
        }
        if (ring3Ref.current) {
            ring3Ref.current.rotation.z = time * 0.2;
            ring3Ref.current.rotation.y = Math.cos(time * 0.3) * 0.1;
        }

        // Pulse core
        if (coreRef.current) {
            const pulse = Math.sin(time * 2) * 0.1 + 1;
            coreRef.current.scale.setScalar(pulse);
        }
    });

    return (
        <group ref={groupRef} position={position} scale={scale}>
            {/* Outer ring 1 */}
            <mesh ref={ring1Ref}>
                <torusGeometry args={[1.2, 0.03, 16, 100]} />
                <meshStandardMaterial
                    color="#00ffff"
                    emissive="#00ffff"
                    emissiveIntensity={0.5}
                    metalness={0.9}
                    roughness={0.1}
                />
            </mesh>

            {/* Outer ring 2 */}
            <mesh ref={ring2Ref}>
                <torusGeometry args={[1.0, 0.02, 16, 100]} />
                <meshStandardMaterial
                    color="#8b5cf6"
                    emissive="#8b5cf6"
                    emissiveIntensity={0.5}
                    metalness={0.9}
                    roughness={0.1}
                />
            </mesh>

            {/* Inner ring */}
            <mesh ref={ring3Ref}>
                <torusGeometry args={[0.8, 0.015, 16, 100]} />
                <meshStandardMaterial
                    color="#00ff41"
                    emissive="#00ff41"
                    emissiveIntensity={0.4}
                    metalness={0.9}
                    roughness={0.1}
                />
            </mesh>

            {/* Portal core with shader */}
            <mesh ref={coreRef} material={portalMaterial}>
                <circleGeometry args={[0.7, 64]} />
            </mesh>

            {/* Energy particles around the ring */}
            {[...Array(12)].map((_, i) => {
                const angle = (i / 12) * Math.PI * 2;
                const radius = 1.1;
                return (
                    <mesh
                        key={i}
                        position={[
                            Math.cos(angle) * radius,
                            Math.sin(angle) * radius,
                            0,
                        ]}
                    >
                        <sphereGeometry args={[0.03, 8, 8]} />
                        <meshStandardMaterial
                            color={i % 2 === 0 ? "#00ffff" : "#8b5cf6"}
                            emissive={i % 2 === 0 ? "#00ffff" : "#8b5cf6"}
                            emissiveIntensity={1}
                        />
                    </mesh>
                );
            })}

            {/* Central glow */}
            <pointLight color="#00ffff" intensity={1} distance={4} />
            <pointLight color="#8b5cf6" intensity={0.5} distance={3} />
        </group>
    );
}

export default PortalRing;
