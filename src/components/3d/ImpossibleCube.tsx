"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface ImpossibleCubeProps {
    position?: [number, number, number];
    scale?: number;
    color?: string;
}

export function ImpossibleCube({
    position = [0, 0, 0],
    scale = 1,
    color = "#00ff41",
}: ImpossibleCubeProps) {
    const meshRef = useRef<THREE.Group>(null);

    // Create the segments that form the impossible cube (Necker cube illusion)
    const segments = useMemo(() => {
        const bars = [];
        const size = 1.5;
        const barSize = 0.12;

        // Create 12 edges of the cube with depth offsets to create impossible effect
        const edges = [
            // Front face
            { start: [-1, -1, 1], end: [1, -1, 1], z: 0 },
            { start: [1, -1, 1], end: [1, 1, 1], z: 0 },
            { start: [1, 1, 1], end: [-1, 1, 1], z: 0 },
            { start: [-1, 1, 1], end: [-1, -1, 1], z: 0 },
            // Back face
            { start: [-1, -1, -1], end: [1, -1, -1], z: 0.1 },
            { start: [1, -1, -1], end: [1, 1, -1], z: 0.1 },
            { start: [1, 1, -1], end: [-1, 1, -1], z: 0.1 },
            { start: [-1, 1, -1], end: [-1, -1, -1], z: 0.1 },
            // Connecting edges (these create the impossible effect)
            { start: [-1, -1, -1], end: [-1, -1, 1], z: 0.05 },
            { start: [1, -1, -1], end: [1, -1, 1], z: -0.05 },
            { start: [1, 1, -1], end: [1, 1, 1], z: 0.05 },
            { start: [-1, 1, -1], end: [-1, 1, 1], z: -0.05 },
        ];

        edges.forEach((edge, index) => {
            const start = new THREE.Vector3(...edge.start).multiplyScalar(size / 2);
            const end = new THREE.Vector3(...edge.end).multiplyScalar(size / 2);

            const direction = new THREE.Vector3().subVectors(end, start);
            const length = direction.length();
            const middle = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5);

            // Add z offset for impossible effect
            middle.z += edge.z;

            bars.push({
                length,
                position: [middle.x, middle.y, middle.z] as [number, number, number],
                direction: direction.normalize(),
                barSize,
                index,
            });
        });

        return bars;
    }, []);

    useFrame(({ clock }) => {
        if (meshRef.current) {
            meshRef.current.rotation.x = clock.elapsedTime * 0.3;
            meshRef.current.rotation.y = clock.elapsedTime * 0.2;
        }
    });

    return (
        <group ref={meshRef} position={position} scale={scale}>
            {segments.map((bar, index) => {
                // Calculate rotation to align bar with direction
                const quaternion = new THREE.Quaternion();
                quaternion.setFromUnitVectors(
                    new THREE.Vector3(1, 0, 0),
                    bar.direction
                );
                const euler = new THREE.Euler().setFromQuaternion(quaternion);

                return (
                    <mesh
                        key={index}
                        position={bar.position}
                        rotation={[euler.x, euler.y, euler.z]}
                    >
                        <boxGeometry args={[bar.length, bar.barSize, bar.barSize]} />
                        <meshStandardMaterial
                            color={color}
                            emissive={color}
                            emissiveIntensity={0.3}
                            metalness={0.8}
                            roughness={0.2}
                        />
                    </mesh>
                );
            })}

            {/* Corner nodes */}
            {[
                [-1, -1, -1], [1, -1, -1], [1, 1, -1], [-1, 1, -1],
                [-1, -1, 1], [1, -1, 1], [1, 1, 1], [-1, 1, 1],
            ].map((pos, index) => (
                <mesh
                    key={`node-${index}`}
                    position={[pos[0] * 0.75, pos[1] * 0.75, pos[2] * 0.75]}
                >
                    <sphereGeometry args={[0.1, 16, 16]} />
                    <meshStandardMaterial
                        color={color}
                        emissive={color}
                        emissiveIntensity={0.6}
                        metalness={0.9}
                        roughness={0.1}
                    />
                </mesh>
            ))}

            {/* Inner glow */}
            <pointLight color={color} intensity={0.3} distance={2} />
        </group>
    );
}

export default ImpossibleCube;
