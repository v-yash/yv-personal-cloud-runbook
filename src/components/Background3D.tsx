"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars, Float, MeshDistortMaterial, Sparkles } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

function CloudCore() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.1;
      meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef}>
        <sphereGeometry args={[2.5, 64, 64]} />
        <MeshDistortMaterial 
          color="#3b82f6" 
          emissive="#1e40af" 
          emissiveIntensity={0.5}
          distort={0.3} 
          speed={2} 
          wireframe={true}
          transparent
          opacity={0.3}
        />
      </mesh>
      {/* Inner solid sphere to block stars behind the wireframe */}
      <mesh scale={0.98}>
        <sphereGeometry args={[2.5, 32, 32]} />
        <meshBasicMaterial color="#020617" />
      </mesh>
    </Float>
  );
}

export default function Background3D() {
  return (
    <div style={{ 
      position: "fixed", 
      top: 0, 
      left: 0, 
      width: "100vw", 
      height: "100vh", 
      zIndex: -1, 
      background: "radial-gradient(circle at center, #0f172a 0%, #020617 100%)" 
    }}>
      <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
        <fog attach="fog" args={['#020617', 5, 15]} />
        <ambientLight intensity={1} />
        
        {/* Deep background stars */}
        <Stars radius={100} depth={50} count={3000} factor={4} saturation={1} fade speed={1} />
        
        {/* Core Cloud Object */}
        <CloudCore />

        {/* Ambient Tech Sparkles */}
        <Sparkles count={300} scale={15} size={2} speed={0.4} opacity={0.3} color="#60a5fa" />
        
      </Canvas>
    </div>
  );
}
