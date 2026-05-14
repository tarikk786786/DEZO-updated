import React, { useState, useEffect, useRef, useMemo, Suspense } from 'react';
import { Globe, Target, TrendingUp } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { Sparkles, OrbitControls, Float, Stars, Text } from '@react-three/drei';
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

const RealNightEarth = () => {
    const groupRef = useRef<THREE.Group>(null);
    const globeRef = useRef<THREE.Mesh>(null);
    const cloudsRef = useRef<THREE.Mesh>(null);
    const codeRingsRef = useRef<THREE.Group>(null);

    // Reliable public CDNs for earth maps
    const [colorMap, cloudsMap] = useLoader(THREE.TextureLoader, [
        'https://unpkg.com/three-globe/example/img/earth-night.jpg',
        'https://cdn.jsdelivr.net/gh/mrdoob/three.js@r128/examples/textures/planets/earth_clouds_1024.png'
    ]);

    const targetScroll = useRef(0);
    const currentScroll = useRef(0);

    React.useEffect(() => {
        const handleScroll = () => {
            targetScroll.current = window.scrollY;
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const techStack = useMemo(() => [
        { text: 'React', color: '#61dafb' },
        { text: 'Node.js', color: '#339933' },
        { text: 'TypeScript', color: '#3178c6' },
        { text: 'Tailwind', color: '#38bdf8' },
        { text: 'Next.js', color: '#ffffff' },
        { text: 'AWS', color: '#ff9900' },
        { text: 'Docker', color: '#2496ed' },
        { text: 'GraphQL', color: '#e10098' },
        { text: 'AI', color: '#10b981' },
    ], []);
    
    const techNodes = useMemo(() => {
        return techStack.map((tech, i) => {
            const angle = (i / techStack.length) * Math.PI * 2;
            const radius = 3.6;
            const x = Math.cos(angle) * radius;
            const z = Math.sin(angle) * radius;
            const y = Math.sin(angle * 3) * 1.5;
            return { ...tech, position: new THREE.Vector3(x, y, z) };
        });
    }, [techStack]);

    useFrame((state, delta) => {
        currentScroll.current = THREE.MathUtils.lerp(currentScroll.current, targetScroll.current, 0.05);

        if(groupRef.current) {
            groupRef.current.rotation.y += delta * 0.05;
            groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.02 + currentScroll.current * 0.001;
            groupRef.current.position.y = currentScroll.current * -0.003;
        }
        if(globeRef.current) {
            globeRef.current.rotation.y += delta * 0.1 + (currentScroll.current - targetScroll.current) * 0.0001;
        }
        if(cloudsRef.current) {
            cloudsRef.current.rotation.y += delta * 0.12 + (currentScroll.current - targetScroll.current) * 0.0001;
        }
        if(codeRingsRef.current) {
            codeRingsRef.current.rotation.x -= delta * 0.1 + (currentScroll.current - targetScroll.current) * 0.0001;
            codeRingsRef.current.rotation.y -= delta * 0.1;
            codeRingsRef.current.rotation.z += delta * 0.05;
        }
    });

    return (
        <group ref={groupRef} rotation={[0, -Math.PI / 2, 0]}>
            {/* Ambient Outer Glow / Atmosphere */}
            <mesh>
                <sphereGeometry args={[2.5, 32, 32]} />
                <meshBasicMaterial 
                    color="#4338ca" 
                    transparent 
                    opacity={0.08} 
                    blending={THREE.AdditiveBlending}
                    side={THREE.BackSide}
                />
            </mesh>
            <mesh>
                <sphereGeometry args={[2.7, 32, 32]} />
                <meshBasicMaterial 
                    color="#10b981" 
                    transparent 
                    opacity={0.03} 
                    blending={THREE.AdditiveBlending}
                    side={THREE.BackSide}
                />
            </mesh>
            
            {/* Inner green wireframe for hacker feel overlay on earth */}
            <mesh>
                <icosahedronGeometry args={[2.25, 3]} />
                <meshBasicMaterial color="#10b981" wireframe transparent opacity={0.05} />
            </mesh>

            {/* Core Dark Energy Sphere / Night Earth */}
            <mesh ref={globeRef}>
                <sphereGeometry args={[2.2, 48, 48]} />
                <meshStandardMaterial 
                    map={colorMap}
                    roughness={0.6}
                    metalness={0.1}
                    emissiveMap={colorMap}
                    emissive={new THREE.Color(0xffffff)}
                    emissiveIntensity={0.6}
                />
            </mesh>

            {/* Clouds Layer */}
            <mesh ref={cloudsRef}>
                <sphereGeometry args={[2.22, 48, 48]} />
                <meshStandardMaterial 
                    map={cloudsMap}
                    transparent
                    opacity={0.4}
                    blending={THREE.AdditiveBlending}
                    side={THREE.DoubleSide}
                />
            </mesh>
            
            {/* Orbital Code Rings - Saturn ring style */}
            <group ref={codeRingsRef}>
               <mesh rotation={[Math.PI/2, 0, 0]}>
                   <torusGeometry args={[3.2, 0.005, 64, 100]} />
                   <meshBasicMaterial color="#38bdf8" transparent opacity={0.4} />
               </mesh>
               <mesh rotation={[Math.PI/2, Math.PI/6, 0]}>
                   <torusGeometry args={[3.6, 0.005, 64, 100]} />
                   <meshBasicMaterial color="#8b5cf6" transparent opacity={0.3} />
               </mesh>
               <mesh rotation={[0, Math.PI/2, Math.PI/4]}>
                   <torusGeometry args={[4, 0.005, 64, 100]} />
                   <meshBasicMaterial color="#10b981" transparent opacity={0.2} />
               </mesh>
               
               {/* Decorative Code fragments on rings */}
               {['<div/>', '{}', 'const', '=>', 'npm', 'git'].map((str, i) => {
                  const angle = (i / 6) * Math.PI * 2;
                  return (
                      <Text 
                        key={i} 
                        position={[Math.cos(angle) * 3.2, Math.sin(angle) * 3.2, 0]} 
                        rotation={[0, 0, angle]}
                        fontSize={0.2} 
                        color="#10b981" 
                        fillOpacity={0.8}
                        anchorX="center"
                        anchorY="middle"
                      >
                        {str}
                      </Text>
                  )
               })}
            </group>

            {/* Orbiting Tech Stack Words (Satellites) */}
            {techNodes.map((node, i) => (
                <Float key={i} speed={2} rotationIntensity={1} floatIntensity={2}>
                    <Text
                        position={node.position}
                        fontSize={0.25}
                        color={node.color}
                        anchorX="center"
                        anchorY="middle"
                        fillOpacity={1}
                        outlineWidth={0.02}
                        outlineColor="#000"
                    >
                        {node.text}
                    </Text>
                </Float>
            ))}
        </group>
    );
};

export const HeroVisual = ({ nightMode }: any) => {
  return (
    <div className="w-full h-full relative cursor-grab active:cursor-grabbing overflow-visible touch-none z-[20]">
      <div className="absolute inset-0 z-[0]">
        <Suspense fallback={
          <div className="w-full h-full flex flex-col items-center justify-center text-white/50 backdrop-blur-md">
            <Globe className="w-8 h-8 animate-spin mb-4 opacity-50" />
            <span className="text-xs uppercase tracking-widest font-bold">Initializing Environment</span>
          </div>
        }>
          <Canvas camera={{ position: [0, 0, 8.5], fov: 50 }} dpr={[1, 1.5]} performance={{ min: 0.5 }}>
            <ambientLight intensity={1.5} />
            <pointLight position={[10, 10, 5]} intensity={2.5} color="#06b6d4" />
            <pointLight position={[-10, -10, -5]} intensity={2.5} color="#8b5cf6" />
            <RealNightEarth />
            <Sparkles count={250} scale={10} size={1.5} speed={0.4} color="#8b5cf6" opacity={0.5} />
            <Stars radius={10} depth={50} count={1000} factor={3} saturation={0} fade speed={1} />
            <OrbitControls 
              enableZoom={false} 
              enablePan={false}
              autoRotate 
              autoRotateSpeed={1.0} 
              minPolarAngle={Math.PI / 2.5} 
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
               <span className="text-white font-black text-lg sm:text-xl tracking-tight leading-none mb-1">High-Performance</span>
               <span className="text-white/60 text-[10px] sm:text-xs font-bold uppercase tracking-widest leading-none">Scalable Ecosystems</span>
            </div>
         </div>
      </div>
    </div>
  );
};
