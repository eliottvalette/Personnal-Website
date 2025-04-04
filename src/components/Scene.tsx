import { useRef, useState, useEffect, Suspense } from 'react';
import { Canvas, useFrame, useThree, useLoader } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';
import UI from './UI';

// Background component using the living_room.jpeg image
const Background = () => {
  const texture = useLoader(THREE.TextureLoader, '/living_room.jpeg');
  
  // Apply some optimizations to the texture
  useEffect(() => {
    if (texture) {
      texture.minFilter = THREE.LinearFilter;
      texture.generateMipmaps = false;
      texture.needsUpdate = true;
    }
    return () => {
      // Clean up texture when component unmounts
      if (texture) texture.dispose();
    };
  }, [texture]);

  // Calculate proper sizing to cover the viewport
  const { viewport } = useThree();
  const { width, height } = viewport;
  const aspectRatio = width / height;
  
  return (
    <mesh position={[-0.4, 1, -6]}>
      <planeGeometry args={[aspectRatio * 15, 15]} />
      <meshBasicMaterial map={texture} side={THREE.FrontSide} transparent={true} />
    </mesh>
  );
};

// Fallback component to show while texture is loading
const BackgroundFallback = () => (
  <mesh position={[0, 0, -5]}>
    <planeGeometry args={[15, 15]} />
    <meshBasicMaterial color="#111111" />
  </mesh>
);

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
      gl={{ 
        antialias: true, 
        alpha: true,
        powerPreference: 'high-performance', 
        preserveDrawingBuffer: true,
        failIfMajorPerformanceCaveat: true
      }}
      dpr={window.devicePixelRatio > 2 ? 2 : window.devicePixelRatio} // Limit DPR for performance
    >
      {/* Removing the solid color background */}
      {/* <color attach="background" args={['#000000']} /> */}
      <PerspectiveCamera makeDefault position={[0, 1, 2]} fov={75} near={0.1} far={1000} />
      <CameraController />
      
      <Suspense fallback={<BackgroundFallback />}>
        <Background />
      </Suspense>
      
      <UI />
      
      {/* Simple ambient light for UI visibility */}
      <ambientLight intensity={0.5} />
    </Canvas>
  );
};

export default Scene; 