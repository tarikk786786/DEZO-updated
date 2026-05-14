import React, { useState, useEffect, useRef, useMemo, Suspense } from 'react';
import { Globe, Target, TrendingUp } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sparkles, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

export const RotatingText = () => {
  const phrases = [
    "If We Commit, We Deliver.",
    "Clean Website. Clear Communication.",
    "If You Don't Like the First Design, We Improve It.",
    "Your Website Should Look Professional.",
    "We Build Until It Feels Right.",
    "No Confusing Process. No Hidden Drama.",
    "We Focus on Quality, Speed, and Trust.",
    "If Something Needs Fixing, We Help.",
    "Your Business Deserves a Serious Digital Presence.",
    "We Don't Just Build Pages — We Build Trust."
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % phrases.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [phrases.length]);

  return (
    <div className="min-h-[60px] md:min-h-[80px] flex items-center justify-center lg:justify-start pt-2 mb-4 relative overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.h3 
          key={index}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="text-xl sm:text-2xl md:text-3xl font-black leading-tight tracking-tight text-main-light absolute"
        >
          <span className="text-brand-gold border-b-2 border-white/20 pb-1 inline-block">
            {phrases[index]}
          </span>
        </motion.h3>
      </AnimatePresence>
    </div>
  );
};

export const FallbackImage = ({ src, alt, className, fallbackInitials }: any) => {
  const [error, setError] = useState(false);
  if (error) {
    return (
      <div className={`${className} bg-main-dark border border-main-light flex flex-col items-center justify-center text-main-light font-black tracking-widest relative overflow-hidden`}>
        <span className="relative z-10">{fallbackInitials}</span>
      </div>
    );
  }
  return <img loading="lazy" decoding="async" src={src} alt={alt} className={className} onError={() => setError(true)} />;
};

const ParticleGlobe = () => {
  const pointsRef = useRef<THREE.Points>(null);
  const particlesCount = 2000;

  const positions = useMemo(() => {
    const pos = new Float32Array(particlesCount * 3);
    const goldenRatio = (1 + Math.sqrt(5)) / 2;
    for (let i = 0; i < particlesCount; i++) {
        // Fibonacci sphere distribution for even spread
        const theta = 2 * Math.PI * i / goldenRatio;
        const phi = Math.acos(1 - 2 * (i + 0.5) / particlesCount);
        
        pos[i * 3] = 2.5 * Math.cos(theta) * Math.sin(phi); // x
        pos[i * 3 + 1] = 2.5 * Math.sin(theta) * Math.sin(phi); // y
        pos[i * 3 + 2] = 2.5 * Math.cos(phi); // z
    }
    return pos;
  }, [particlesCount]);

  useFrame((state, delta) => {
    if (pointsRef.current) {
        pointsRef.current.rotation.y += delta * 0.1;
        // Float effect
        pointsRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#06b6d4"
        transparent
        opacity={0.8}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

export const HeroVisual = ({ nightMode }: any) => {
  return (
    <div className="w-full h-full relative cursor-grab active:cursor-grabbing overflow-hidden touch-none z-[20] rounded-3xl lg:border lg:border-white/5 lg:bg-white/[0.02]">
      <div className="absolute inset-0 z-[0] bg-gradient-to-b from-transparent to-[#030712]/50">
        <Suspense fallback={
          <div className="w-full h-full flex flex-col items-center justify-center text-white/50 backdrop-blur-md">
            <Globe className="w-8 h-8 animate-spin mb-4 opacity-50" />
            <span className="text-xs uppercase tracking-widest font-bold">Initializing Environment</span>
          </div>
        }>
          <Canvas camera={{ position: [0, 0, 6], fov: 60 }} dpr={[1, 2]}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1} />
            <ParticleGlobe />
            {/* Glowing inner core */}
            <mesh>
              <sphereGeometry args={[2.4, 32, 32]} />
              <meshBasicMaterial color="#0f172a" transparent opacity={0.6} />
            </mesh>
            <Sparkles count={400} scale={8} size={1.5} speed={0.4} color="#8b5cf6" opacity={0.5} />
            <Sparkles count={200} scale={10} size={2.5} speed={0.2} color="#06b6d4" opacity={0.3} />
            <OrbitControls 
              enableZoom={false} 
              enablePan={false}
              autoRotate 
              autoRotateSpeed={0.5} 
              minPolarAngle={Math.PI / 3} 
              maxPolarAngle={Math.PI / 1.5} 
            />
          </Canvas>
        </Suspense>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center justify-center pointer-events-none z-[10] w-[90%]">
         <div className="glass-card bg-[#030712]/70 backdrop-blur-xl rounded-2xl border border-white/10 p-4 shadow-2xl flex items-center gap-4 w-full relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-r from-[var(--primary)]/20 to-[var(--accent)]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
            <TrendingUp className="text-[var(--primary)] relative z-10" size={28} />
            <div className="flex flex-col relative z-10">
               <span className="text-white font-black text-lg sm:text-xl tracking-tight leading-none mb-1">AI & Data-Driven</span>
               <span className="text-white/60 text-[10px] sm:text-xs font-bold uppercase tracking-widest leading-none">Scalable Ecosystems</span>
            </div>
         </div>
      </div>
    </div>
  );
};
