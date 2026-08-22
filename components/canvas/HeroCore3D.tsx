"use client";

import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, Box, RoundedBox, Cylinder } from "@react-three/drei";
import * as THREE from "three";

export default function HeroCore3D() {
  const groupRef = useRef<THREE.Group>(null);
  const serverNode1Ref = useRef<THREE.Mesh>(null);
  const serverNode2Ref = useRef<THREE.Mesh>(null);
  const serverNode3Ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    // Smooth Mouse Interaction
    if (groupRef.current) {
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        (state.pointer.x * Math.PI) / 8,
        0.05
      );
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        (-state.pointer.y * Math.PI) / 8,
        0.05
      );
    }

    if (serverNode1Ref.current) {
      serverNode1Ref.current.rotation.y = t * 0.4;
    }
    if (serverNode2Ref.current) {
      serverNode2Ref.current.rotation.y = -t * 0.5;
    }
    if (serverNode3Ref.current) {
      serverNode3Ref.current.rotation.y = t * 0.3;
    }
  });

  return (
    <group ref={groupRef}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.8}>
        {/* Central System Server Blade Matrix */}
        <group position={[0, 0, 0]}>
          {/* Main Central Server Hub */}
          <RoundedBox
            ref={serverNode1Ref}
            args={[2.2, 1.4, 0.4]}
            radius={0.08}
            smoothness={4}
          >
            <meshStandardMaterial
              color="#0D1527"
              emissive="#0070F3"
              emissiveIntensity={0.4}
              roughness={0.2}
              metalness={0.8}
            />
          </RoundedBox>

          {/* Floating Glass Dashboard Window */}
          <RoundedBox
            ref={serverNode2Ref}
            args={[2.8, 1.8, 0.1]}
            radius={0.05}
            smoothness={4}
            position={[0, 0, 0.4]}
          >
            <meshPhysicalMaterial
              color="#00F0FF"
              transmission={0.85}
              opacity={0.9}
              transparent
              roughness={0.1}
              ior={1.5}
              thickness={0.2}
            />
          </RoundedBox>

          {/* Subsystem Microservice Nodes */}
          <RoundedBox
            ref={serverNode3Ref}
            args={[1.8, 1.0, 0.3]}
            radius={0.06}
            position={[0, 0, -0.4]}
          >
            <meshStandardMaterial
              color="#0F172A"
              emissive="#7000FF"
              emissiveIntensity={0.5}
              roughness={0.3}
              metalness={0.7}
            />
          </RoundedBox>

          {/* Data Laser Pipelines Connecting System Nodes */}
          <Cylinder args={[0.02, 0.02, 3.5]} position={[0, 0, 0]} rotation={[0, 0, Math.PI / 4]}>
            <meshBasicMaterial color="#00F0FF" wireframe />
          </Cylinder>
          <Cylinder args={[0.02, 0.02, 3.5]} position={[0, 0, 0]} rotation={[0, 0, -Math.PI / 4]}>
            <meshBasicMaterial color="#7000FF" wireframe />
          </Cylinder>
        </group>
      </Float>
    </group>
  );
}
