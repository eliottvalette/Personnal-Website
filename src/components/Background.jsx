import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, Cylinder, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

const Nucleobase = ({ position, rotation }) => {
  return (
    <group position={position} rotation={rotation}>
      <Sphere args={[0.15, 8, 8]}>
        <meshStandardMaterial 
          color="#ffffff" 
          emissive="#ffffff" 
          emissiveIntensity={0.2}
          wireframe={true}
        />
      </Sphere>
    </group>
  );
};

const DNAHelix = () => {
  const groupRef = useRef();
  const baseCount = 20;
  const radius = 1;
  const height = 5;
  const twist = 2 * Math.PI;

  const bases = useMemo(() => {
    const positions = [];
    for (let i = 0; i < baseCount; i++) {
      const t = i / (baseCount - 1);
      const angle = t * twist;
      const y = (t - 0.5) * height;
      
      // First strand
      positions.push({
        position: [
          Math.cos(angle) * radius,
          y,
          Math.sin(angle) * radius,
        ],
        rotation: [0, angle, 0],
      });
      
      // Second strand (opposite)
      positions.push({
        position: [
          Math.cos(angle + Math.PI) * radius,
          y,
          Math.sin(angle + Math.PI) * radius,
        ],
        rotation: [0, angle + Math.PI, 0],
      });
    }
    return positions;
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    groupRef.current.rotation.y = time * 0.2;
    groupRef.current.position.y = Math.sin(time * 0.5) * 0.1;
  });

  return (
    <group ref={groupRef}>
      {/* DNA strands */}
      
      {/* Nucleobases */}
      {bases.map((base, i) => (
        <Nucleobase key={i} {...base} />
      ))}
      
      {/* Connecting lines */}
      {bases.map((base, i) => {
        if (i % 2 === 0 && i < bases.length - 2) {
          const nextBase = bases[i + 2];
          return (
            <line key={`line-${i}`}>
              <bufferGeometry>
                <bufferAttribute
                  attach="attributes.position"
                  count={2}
                  array={new Float32Array([
                    ...base.position,
                    ...nextBase.position,
                  ])}
                  itemSize={3}
                />
              </bufferGeometry>
              <lineBasicMaterial color="#ffffff" transparent opacity={0.2} />
            </line>
          );
        }
        return null;
      })}
    </group>
  );
};

const Background = () => {
  const groupRef = useRef();
  
  const helices = useMemo(() => {
    const count = 3;
    const positions = [];
    
    for (let i = 0; i < count; i++) {
      positions.push({
        position: [
          (Math.random() - 0.5) * 10,
          (Math.random() - 0.5) * 10,
          (Math.random() - 0.5) * 10,
        ],
        rotation: [Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI],
        scale: 0.7 + Math.random() * 0.5,
      });
    }
    
    return positions;
  }, []);

  return (
    <>
      <OrbitControls 
        enableZoom={true}
        enablePan={true}
        enableRotate={true}
        minDistance={5}
        maxDistance={20}
        cameraPosition={[10, 10, 10]}
        showXrButton={false}
        showGrid={false}
        showAxes={false}
        target={[0, 0, 0]}
        makeDefault
      />
      <group ref={groupRef}>
        {/* Ambient light */}
        <ambientLight intensity={0.5} />
        
        {/* Point light */}
        <pointLight position={[10, 10, 10]} intensity={1} color="#ffffff" />
        
        {/* DNA helices */}
        {helices.map((helix, i) => (
          <group key={i} position={helix.position} rotation={helix.rotation} scale={helix.scale}>
            <DNAHelix />
          </group>
        ))}
      </group>
    </>
  );
};

export default Background; 