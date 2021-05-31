import React, { Suspense, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { Stage, OrbitControls } from '@react-three/drei'
import Model from './avatar'

export default function Scene() {
  const ref = useRef();

  return (
    <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 0, 150], fov: 50 }} style={{ height: '100vh'}}>
      <Suspense fallback={null}>
        <Stage controls={ref} preset="portrait" contactShadow shadows>
          <Model />
        </Stage>
      </Suspense>
      <OrbitControls autoRotate />
    </Canvas>
  )
}
