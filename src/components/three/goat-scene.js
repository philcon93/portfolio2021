import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Stage } from "@react-three/drei";
import Model from "./goat";

export default function Scene() {
  return (
    <Canvas
      style={{ position: "relative", height: "40vh", width: "100%" }}
      dpr={[1, 2]}
      shadows
      camera={{ fov: 45, position: [0, 1.5, 4.5] }}
    >
      <Suspense fallback={null}>
        <Stage adjustCamera={false} intensity={0.8}>
          <Model scale={0.25} />
        </Stage>
      </Suspense>
    </Canvas>
  );
}
