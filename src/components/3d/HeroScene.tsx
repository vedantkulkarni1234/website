"use client";

import { useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
    Float,
    Stars,
    Environment,
    Preload,
    useTexture,
} from "@react-three/drei";
import {
    EffectComposer,
    Bloom,
    ChromaticAberration,
    Vignette,
    Noise,
} from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import * as THREE from "three";
import { PenroseTriangle } from "./PenroseTriangle";
import { ImpossibleCube } from "./ImpossibleCube";
import { PortalRing } from "./PortalRing";
import { FloatingParticles } from "./FloatingParticles";

// Camera rig that follows mouse
function CameraRig() {
    const { camera, mouse } = useThree();
    const targetPosition = useRef(new THREE.Vector3(0, 0, 8));

    useFrame(() => {
        // Smooth camera movement based on mouse
        targetPosition.current.x = mouse.x * 0.5;
        targetPosition.current.y = mouse.y * 0.3;

        camera.position.lerp(targetPosition.current, 0.05);
        camera.lookAt(0, 0, 0);
    });

    return null;
}

// Main scene content
function SceneContent() {
    const groupRef = useRef<THREE.Group>(null);

    useFrame(({ clock }) => {
        if (groupRef.current) {
            groupRef.current.rotation.y = Math.sin(clock.elapsedTime * 0.1) * 0.1;
        }
    });

    return (
        <group ref={groupRef}>
            {/* Central Portal Ring */}
            <Float speed={1} rotationIntensity={0.2} floatIntensity={0.3}>
                <PortalRing position={[0, 0, 0]} scale={2} />
            </Float>

            {/* Floating Penrose Triangles */}
            <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
                <PenroseTriangle
                    position={[-3, 1.5, -2]}
                    scale={0.4}
                    color="#00ffff"
                />
            </Float>

            <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.4}>
                <PenroseTriangle
                    position={[3.5, -1, -1]}
                    scale={0.3}
                    color="#8b5cf6"
                />
            </Float>

            {/* Impossible Cubes */}
            <Float speed={1.8} rotationIntensity={0.4} floatIntensity={0.3}>
                <ImpossibleCube
                    position={[-4, -1.5, -2]}
                    scale={0.5}
                    color="#00ff41"
                />
            </Float>

            <Float speed={2.2} rotationIntensity={0.6} floatIntensity={0.5}>
                <ImpossibleCube
                    position={[4.5, 2, -3]}
                    scale={0.35}
                    color="#ff6a00"
                />
            </Float>

            {/* Floating Code Particles */}
            <FloatingParticles count={100} />
        </group>
    );
}

// Post-processing effects
function Effects() {
    return (
        <EffectComposer>
            <Bloom
                intensity={0.6}
                luminanceThreshold={0.2}
                luminanceSmoothing={0.9}
                mipmapBlur
            />
            <ChromaticAberration
                blendFunction={BlendFunction.NORMAL}
                offset={new THREE.Vector2(0.001, 0.001)}
            />
            <Vignette
                offset={0.3}
                darkness={0.8}
                blendFunction={BlendFunction.NORMAL}
            />
            <Noise opacity={0.015} blendFunction={BlendFunction.SOFT_LIGHT} />
        </EffectComposer>
    );
}

export function HeroScene() {
    return (
        <div className="absolute inset-0 z-0">
            <Canvas
                camera={{ position: [0, 0, 8], fov: 50 }}
                gl={{
                    antialias: true,
                    alpha: true,
                    powerPreference: "high-performance",
                }}
                dpr={[1, 2]}
            >
                <Suspense fallback={null}>
                    {/* Lighting */}
                    <ambientLight intensity={0.2} />
                    <pointLight position={[10, 10, 10]} intensity={0.6} color="#00ffff" />
                    <pointLight position={[-10, -10, 5]} intensity={0.4} color="#8b5cf6" />
                    <pointLight position={[0, -5, 5]} intensity={0.3} color="#00ff41" />

                    {/* Background */}
                    <Stars
                        radius={100}
                        depth={50}
                        count={3000}
                        factor={3}
                        saturation={0}
                        fade
                        speed={0.5}
                    />
                    <color attach="background" args={["#0a0a0a"]} />
                    <fog attach="fog" args={["#0a0a0a", 5, 30]} />

                    {/* Main Scene */}
                    <SceneContent />

                    {/* Camera Rig */}
                    <CameraRig />

                    {/* Post Processing */}
                    <Effects />

                    <Preload all />
                </Suspense>
            </Canvas>
        </div>
    );
}

export default HeroScene;
