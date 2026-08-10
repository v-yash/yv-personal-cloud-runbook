"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars, Float, Icosahedron, MeshDistortMaterial } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

export default function Background3D() {
  return (
    <div style={{ 
      position: "fixed", 
      top: 0, 
      left: 0, 
      width: "100vw", 
      height: "100vh", 
      zIndex: -1, 
      background: "radial-gradient(circle at center, #020617 0%, #000000 100%)" 
    }}>
      <Canvas camera={{ position: [0, 0, 5] }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        
        {/* Floating techy shapes */}
        <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
          <Icosahedron args={[1, 1]} position={[3, 1.5, -2]}>
            <MeshDistortMaterial color="#3b82f6" attach="material" distort={0.4} speed={2} wireframe />
          </Icosahedron>
        </Float>
        
        <Float speed={1.5} rotationIntensity={2} floatIntensity={1.5}>
          <Icosahedron args={[0.8, 1]} position={[-4, -1, -3]}>
            <MeshDistortMaterial color="#8b5cf6" attach="material" distort={0.3} speed={1.5} wireframe />
          </Icosahedron>
        </Float>

        <Float speed={2.5} rotationIntensity={1} floatIntensity={2}>
          <Icosahedron args={[0.5, 0]} position={[2, -2, -1]}>
            <MeshDistortMaterial color="#06b6d4" attach="material" distort={0.5} speed={3} wireframe />
          </Icosahedron>
        </Float>

        {/* Dynamic Starfield */}
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1.5} />
      </Canvas>
    </div>
  );
}
