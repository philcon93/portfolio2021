/* eslint-disable react/no-unknown-property */
import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Effects, OrthographicCamera } from "@react-three/drei";
import { Background } from "./Background";
import { RipplePass } from "./RipplePass";

export function InvisibleExperience() {
  // const [dpr, setDpr] = useState([1, 2]);

  return (
    <Canvas
      style={{ position: "absolute", top: 0 }}
      dpr={1}
      shadows
      camera={{ fov: 45, position: [0, 1.5, 4.5] }}
    >
      {/* <PerformanceMonitor
        onIncline={() => setDpr(2)}
        onDecline={() => setDpr(1)}
      /> */}
      <ambientLight intensity={0.5} />
      <pointLight position={[20, 30, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} color="blue" />
      <OrthographicCamera makeDefault position={[0, 0, 5]} />
      <Suspense fallback={null}>
        <Background />
        <Effects disableGamma>
          <RipplePass />
        </Effects>
      </Suspense>
    </Canvas>
  );
}
