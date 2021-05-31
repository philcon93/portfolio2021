import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { ContactShadows, Environment } from '@react-three/drei';
import Model from './goat';

export default function Scene() {
  
    return (
        <Canvas camera={{ position: [0, 0, 2] }} style={{ position: 'relative', height: '40vh', width: '100%'}}>
            <ambientLight />
            <directionalLight position={[10, 10, 10]} />
            <Suspense fallback={null}>
                <Model />
                <Environment preset="city" />
            </Suspense>
            <ContactShadows rotation-x={Math.PI / 2} position={[0, -3.25, 0]} opacity={0.4} width={20} height={20} blur={2} far={4.5} />
        </Canvas>
    )
}