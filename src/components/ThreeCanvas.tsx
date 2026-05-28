"use client";

import { useEffect, useState, useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

function SceneContent() {
  const { camera, pointer } = useThree();
  const latticeRef = useRef<THREE.Mesh>(null);
  const particlesRef = useRef<THREE.Points>(null);
  const scrollYRef = useRef(0);

  // Sync scroll percentage
  useEffect(() => {
    const handleScroll = () => {
      const docHeight = document.documentElement.scrollHeight;
      const winHeight = window.innerHeight;
      const maxScroll = docHeight - winHeight;
      scrollYRef.current = maxScroll > 0 ? window.scrollY / maxScroll : 0;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Run once to get initial state
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Generate particle geometry positions
  const particleCount = 600;
  const positions = useMemo(() => {
    const temp = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      // Golden spiral distribution on a sphere
      const phi = Math.acos(1 - 2 * (i / particleCount));
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;
      const radius = 2.0 + Math.random() * 2.2;

      temp[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      temp[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      temp[i * 3 + 2] = radius * Math.cos(phi);
    }
    return temp;
  }, [particleCount]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    // 1. Slow rotation on the chemical lattice
    if (latticeRef.current) {
      latticeRef.current.rotation.y = time * 0.05;
      latticeRef.current.rotation.x = time * 0.03;
      
      // Subtle pulsation
      const scale = 1.0 + Math.sin(time * 0.4) * 0.04;
      latticeRef.current.scale.set(scale, scale, scale);
    }

    // 2. Slow counter-rotation on particles
    if (particlesRef.current) {
      particlesRef.current.rotation.y = -time * 0.015;
      particlesRef.current.rotation.z = time * 0.005;
    }

    // 3. Smooth Camera Parallax (Mouse coordinates + scroll progression)
    // Pointer returns [-1, 1] normalized coordinates. Scroll progress maps [0, 1]
    const targetX = pointer.x * 1.5;
    const targetY = pointer.y * 1.0 - scrollYRef.current * 3.5;
    const targetZ = 5.0 + scrollYRef.current * 2.0;

    // Direct camera interpolation
    camera.position.x += (targetX - camera.position.x) * 0.05;
    camera.position.y += (targetY - camera.position.y) * 0.05;
    camera.position.z += (targetZ - camera.position.z) * 0.05;

    camera.lookAt(0, 0, 0);
  });

  return (
    <>
      <ambientLight intensity={1.2} />
      <directionalLight position={[10, 10, 5]} intensity={1.0} />
      <pointLight position={[-10, -10, -5]} intensity={0.6} color="#191c1d" />

      {/* Abstract Molecular/Packaging Grid (Lattice) */}
      <mesh ref={latticeRef} position={[0, 0, 0]}>
        <icosahedronGeometry args={[1.6, 1]} />
        <meshBasicMaterial
          color="#555f70"
          wireframe
          transparent
          opacity={0.16}
        />
      </mesh>

      {/* Inner Core */}
      <mesh position={[0, 0, 0]}>
        <dodecahedronGeometry args={[0.5, 0]} />
        <meshBasicMaterial
          color="#191c1d"
          wireframe
          transparent
          opacity={0.08}
        />
      </mesh>

      {/* Particle Cloud */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
            count={particleCount}
            array={positions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.035}
          color="#191c1d"
          sizeAttenuation
          transparent
          opacity={0.3}
          depthWrite={false}
        />
      </points>
    </>
  );
}

export default function ThreeCanvas() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Static fallback to match background color
    return <div className="fixed inset-0 -z-10 bg-[#f8f9fa]" />;
  }

  return (
    <div className="fixed inset-0 -z-10 h-screen w-screen overflow-hidden bg-[#f8f9fa] pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 1.5]}
      >
        <SceneContent />
      </Canvas>
    </div>
  );
}
