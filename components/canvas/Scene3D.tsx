"use client";

import React, { Suspense, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import HeroCore3D from "./HeroCore3D";

function CanvasLoader() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-12 h-12 border-2 border-[#00F0FF] border-t-transparent rounded-full animate-spin shadow-[0_0_15px_#00F0FF]" />
    </div>
  );
}

export default function Scene3D() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <CanvasLoader />;
  }

  return (
    <div className="w-full h-full relative">
      <Canvas
        camera={{ position: [0, 0, 7], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        className="w-full h-full"
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} color="#00F0FF" />
        <pointLight position={[-10, -10, -5]} intensity={2} color="#7000FF" />
        <Suspense fallback={null}>
          <HeroCore3D />
        </Suspense>
      </Canvas>
    </div>
  );
}
