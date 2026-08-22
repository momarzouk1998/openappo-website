"use client";

import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, Icosahedron, Octahedron, Line } from "@react-three/drei";
import * as THREE from "three";

export default function HeroCore3D() {
  const outerGroupRef = useRef<THREE.Group>(null);
  const icoRef = useRef<THREE.Mesh>(null);
  const octaRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    if (outerGroupRef.current) {
      outerGroupRef.current.rotation.y = THREE.MathUtils.lerp(
        outerGroupRef.current.rotation.y,
        (state.pointer.x * Math.PI) / 10,
        0.04
      );
      outerGroupRef.current.rotation.x = THREE.MathUtils.lerp(
        outerGroupRef.current.rotation.x,
        (-state.pointer.y * Math.PI) / 10,
        0.04
      );
    }

    if (icoRef.current) {
      icoRef.current.rotation.y = t * 0.2;
      icoRef.current.rotation.x = t * 0.15;
    }

    if (octaRef.current) {
      octaRef.current.rotation.y = -t * 0.3;
      octaRef.current.rotation.z = t * 0.2;
    }
  });

  return (
    <group ref={outerGroupRef}>
      <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.6}>
        <group scale={1.1}>
          {/* Outer Precision Geometric Wireframe Icosahedron */}
          <Icosahedron ref={icoRef} args={[2.2, 1]}>
            <meshBasicMaterial
              color="#00D2F6"
              wireframe
              transparent
              opacity={0.35}
            />
          </Icosahedron>

          {/* Inner Matte Geometric Core */}
          <Octahedron ref={octaRef} args={[1.3, 0]}>
            <meshStandardMaterial
              color="#0D121D"
              roughness={0.2}
              metalness={0.9}
              flatShading
            />
          </Octahedron>

          {/* Accent Coral Node Dots */}
          <mesh position={[0, 1.8, 0]}>
            <sphereGeometry args={[0.08, 16, 16]} />
            <meshBasicMaterial color="#FF6B8B" />
          </mesh>
          <mesh position={[0, -1.8, 0]}>
            <sphereGeometry args={[0.08, 16, 16]} />
            <meshBasicMaterial color="#FF6B8B" />
          </mesh>
          <mesh position={[1.8, 0, 0]}>
            <sphereGeometry args={[0.08, 16, 16]} />
            <meshBasicMaterial color="#00D2F6" />
          </mesh>
          <mesh position={[-1.8, 0, 0]}>
            <sphereGeometry args={[0.08, 16, 16]} />
            <meshBasicMaterial color="#00D2F6" />
          </mesh>
        </group>
      </Float>
    </group>
  );
}
