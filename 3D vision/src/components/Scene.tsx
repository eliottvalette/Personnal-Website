import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';
import UI from './UI';

// Mouse tracking for camera movement
const CameraController = () => {
  const { camera } = useThree();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const targetRotation = useRef({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Calculate normalized mouse position (-1 to 1)
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      setMousePosition({ x, y });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
  useFrame(() => {
    // Smooth camera rotation based on mouse position
    targetRotation.current.x = THREE.MathUtils.lerp(
      targetRotation.current.x,
      -mousePosition.y * 0.1,
      0.05
    );
    targetRotation.current.y = THREE.MathUtils.lerp(
      targetRotation.current.y,
      -mousePosition.x * 0.1,
      0.05
    );
    
    camera.rotation.x = targetRotation.current.x;
    camera.rotation.y = targetRotation.current.y;
  });
  
  return null;
};

const Scene = () => {
  return (
    <Canvas 
      style={{ 
        position: 'absolute', 
        top: 0, 
        left: 0, 
        width: '100%', 
        height: '100%',
        display: 'block',
        margin: 0,
        padding: 0,
        overflow: 'hidden'
      }}
      shadows
      gl={{ antialias: true, alpha: false }}
      dpr={[1, 2]} // Responsive pixel ratio
    >
      <color attach="background" args={['#000000']} />
      <PerspectiveCamera makeDefault position={[0, 1, 2]} fov={75} near={0.1} far={1000} />
      <CameraController />
      <UI />
      
      {/* Simple ambient light for UI visibility */}
      <ambientLight intensity={0.5} />
    </Canvas>
  );
};

export default Scene; 