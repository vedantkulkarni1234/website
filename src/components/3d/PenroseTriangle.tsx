"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface PenroseTriangleProps {
    position?: [number, number, number];
    scale?: number;
    color?: string;
}

// Creates a Penrose (impossible) triangle geometry
function createPenroseGeometry() {
    const shape = new THREE.Shape();
    const size = 1;
    const thickness = 0.2;

    // Outer triangle
    shape.moveTo(0, size);
    shape.lineTo(-size * 0.866, -size * 0.5);
    shape.lineTo(size * 0.866, -size * 0.5);
    shape.closePath();

    // Inner triangle (hole)
    const hole = new THREE.Path();
    const innerSize = size - thickness * 2;
    hole.moveTo(0, innerSize);
    hole.lineTo(-innerSize * 0.866, -innerSize * 0.5);
    hole.lineTo(innerSize * 0.866, -innerSize * 0.5);
    hole.closePath();

    shape.holes.push(hole);

    const extrudeSettings = {
        depth: thickness,
        bevelEnabled: true,
        bevelThickness: 0.02,
        bevelSize: 0.02,
        bevelSegments: 3,
    };

    return new THREE.ExtrudeGeometry(shape, extrudeSettings);
}

export function PenroseTriangle({
    position = [0, 0, 0],
    scale = 1,
    color = "#00ffff",
}: PenroseTriangleProps) {
    const meshRef = useRef<THREE.Group>(null);
    const edgeRef = useRef<THREE.LineSegments>(null);

    // Generate impossible triangle segments
    const segments = useMemo(() => {
        const segmentData = [];
        const count = 3;
        const radius = 1.5;
        const barWidth = 0.25;

        for (let i = 0; i < count; i++) {
            const angle = (i * Math.PI * 2) / count - Math.PI / 2;
            const nextAngle = ((i + 1) * Math.PI * 2) / count - Math.PI / 2;

            const x1 = Math.cos(angle) * radius;
            const y1 = Math.sin(angle) * radius;
            const x2 = Math.cos(nextAngle) * radius;
            const y2 = Math.sin(nextAngle) * radius;

            // Create bar geometry
            const length = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
            const barGeometry = new THREE.BoxGeometry(length * 0.9, barWidth, barWidth);

            const midX = (x1 + x2) / 2;
            const midY = (y1 + y2) / 2;
            const rotation = Math.atan2(y2 - y1, x2 - x1);

            // Depth offset to create impossible effect
            const zOffset = i * 0.1;

            segmentData.push({
                geometry: barGeometry,
                position: [midX, midY, zOffset] as [number, number, number],
                rotation: [0, 0, rotation] as [number, number, number],
            });
        }

        return segmentData;
    }, []);

    useFrame(({ clock }) => {
        if (meshRef.current) {
            meshRef.current.rotation.x = Math.sin(clock.elapsedTime * 0.5) * 0.2;
            meshRef.current.rotation.y += 0.005;
            meshRef.current.rotation.z = Math.cos(clock.elapsedTime * 0.3) * 0.1;
        }
    });

    return (
        <group ref={meshRef} position={position} scale={scale}>
            {segments.map((segment, index) => (
                <mesh
                    key={index}
                    geometry={segment.geometry}
                    position={segment.position}
                    rotation={segment.rotation}
                >
                    <meshStandardMaterial
                        color={color}
                        emissive={color}
                        emissiveIntensity={0.3}
                        metalness={0.8}
                        roughness={0.2}
                    />
                </mesh>
            ))}

            {/* Corner connectors for impossible effect */}
            {[0, 1, 2].map((i) => {
                const angle = (i * Math.PI * 2) / 3 - Math.PI / 2;
                const radius = 1.5;
                const x = Math.cos(angle) * radius;
                const y = Math.sin(angle) * radius;

                return (
                    <mesh key={`corner-${i}`} position={[x, y, i * 0.1]}>
                        <boxGeometry args={[0.35, 0.35, 0.35]} />
                        <meshStandardMaterial
                            color={color}
                            emissive={color}
                            emissiveIntensity={0.5}
                            metalness={0.9}
                            roughness={0.1}
                        />
                    </mesh>
                );
            })}

            {/* Glow effect */}
            <pointLight color={color} intensity={0.5} distance={3} />
        </group>
    );
}

export default PenroseTriangle;
