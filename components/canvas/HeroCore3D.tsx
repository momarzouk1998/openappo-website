"use client";

import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, RoundedBox, Torus, Sphere } from "@react-three/drei";
import * as THREE from "three";

export default function HeroCore3D() {
  const groupRef = useRef<THREE.Group>(null);
  const leftBracketRef = useRef<THREE.Mesh>(null);
  const rightBracketRef = useRef<THREE.Mesh>(null);
  const centerNodeRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    if (groupRef.current) {
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        (state.pointer.x * Math.PI) / 6,
        0.05
      );
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        (-state.pointer.y * Math.PI) / 6,
        0.05
      );
    }

    if (leftBracketRef.current) {
      leftBracketRef.current.rotation.z = Math.sin(t * 1.2) * 0.15;
    }
    if (rightBracketRef.current) {
      rightBracketRef.current.rotation.z = -Math.sin(t * 1.2) * 0.15;
    }
    if (centerNodeRef.current) {
      centerNodeRef.current.rotation.y = t * 0.8;
    }
  });

  return (
    <group ref={groupRef}>
      <Float speed={2.5} rotationIntensity={0.6} floatIntensity={1.2}>
        <group position={[0, 0, 0]}>
          {/* Left Coral Pink Bracket '(' */}
          <Torus
            ref={leftBracketRef}
            args={[1.8, 0.22, 32, 64, Math.PI * 0.8]}
            position={[-1.8, 0, 0]}
            rotation={[0, 0, Math.PI * 0.6]}
          >
            <meshPhysicalMaterial
              color="#FF6B8B"
              emissive="#FF6B8B"
              emissiveIntensity={0.8}
              transmission={0.8}
              opacity={0.95}
              transparent
              roughness={0.1}
              metalness={0.2}
              ior={1.5}
            />
          </Torus>

          {/* Right Coral Pink Bracket ')' */}
          <Torus
            ref={rightBracketRef}
            args={[1.8, 0.22, 32, 64, Math.PI * 0.8]}
            position={[1.8, 0, 0]}
            rotation={[0, 0, -Math.PI * 0.4]}
          >
            <meshPhysicalMaterial
              color="#FF6B8B"
              emissive="#FF6B8B"
              emissiveIntensity={0.8}
              transmission={0.8}
              opacity={0.95}
              transparent
              roughness={0.1}
              metalness={0.2}
              ior={1.5}
            />
          </Torus>

          {/* Central Cyan Connected Node Core */}
          <Sphere ref={centerNodeRef} args={[1.1, 64, 64]} position={[0, 0, 0]}>
            <meshPhysicalMaterial
              color="#00D2F6"
              emissive="#00D2F6"
              emissiveIntensity={0.9}
              transmission={0.85}
              opacity={0.9}
              transparent
              roughness={0.05}
              ior={1.6}
            />
          </Sphere>

          {/* Floating Glass Dashboard Display */}
          <RoundedBox
            args={[3.4, 2.2, 0.08]}
            radius={0.08}
            smoothness={4}
            position={[0, 0, -0.6]}
          >
            <meshPhysicalMaterial
              color="#0A0F24"
              transmission={0.9}
              opacity={0.7}
              transparent
              roughness={0.2}
            />
          </RoundedBox>
        </group>
      </Float>
    </group>
  );
}
