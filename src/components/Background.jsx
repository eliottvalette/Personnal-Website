import React, { useRef, Suspense, useEffect, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment, Line, Grid } from '@react-three/drei';
import * as THREE from 'three';

const Brain = () => {
  const { scene: solidScene } = useGLTF('/brain-solid.glb');
  const { scene: wireScene } = useGLTF('/brain-wireframe.glb');
  const groupRef = useRef();
  const solidMaterialRef = useRef();
  const wireMaterialRef = useRef();

  useEffect(() => {
    // Handle solid part (gradient side)
    solidScene.traverse((child) => {
      if (child.isMesh) {
        solidMaterialRef.current = new THREE.ShaderMaterial({
          opacity: 0.5,
          uniforms: {
            time: { value: 0 },
          },
          vertexShader: `
            varying vec3 vPosition;
            void main() {
              vPosition = position;
              gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
          `,
          fragmentShader: `
            varying vec3 vPosition;
            void main() {
              vec3 color1 = vec3(0.0, 1.0, 0.533); // #00ff88
              vec3 color2 = vec3(0.0, 0.8, 1.0);   // #00ccff
              float t = (vPosition.y + 1.0) * 0.5;  // Normalize y position to 0-1
              vec3 finalColor = mix(color1, color2, t);
              gl_FragColor = vec4(finalColor, 1.0);
            }
          `
        });
        child.material = solidMaterialRef.current;
      }
    });

    // Handle wireframe part
    wireScene.traverse((child) => {
      if (child.isMesh) {
        wireMaterialRef.current = new THREE.MeshBasicMaterial({
          color: new THREE.Color('#ffffff'),
          wireframe: true,
          transparent: true,
          opacity: 0.5,
        });
        child.material = wireMaterialRef.current;
      }
    });
  }, [solidScene, wireScene]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    groupRef.current.position.y = Math.sin(time * 0.3) * 0.05;
  });

  return (
    <group ref={groupRef} scale={2} position={[0, 0, 0]}>
      <primitive object={solidScene} />
      <primitive object={wireScene} />
    </group>
  );
};

const CameraRig = ({ rotation }) => {
  const { camera } = useThree();
  const [radius] = useState(6);
  const [height] = useState(1);
  const cameraRef = useRef({ x: 0, y: 0, z: 0, currentRotation: 0 });
  const maxRotationSpeed = 3; // Increased from 2 to 3 for smoother transitions

  useFrame((state, delta) => {
    const targetRotation = rotation;
    let currentRotation = cameraRef.current.currentRotation;
    
    // Calculate the distance to the target rotation
    let distanceToTarget = targetRotation - currentRotation;
    
    // Normalize the distance to be between -PI and PI
    while (distanceToTarget > Math.PI) distanceToTarget -= 2 * Math.PI;
    while (distanceToTarget < -Math.PI) distanceToTarget += 2 * Math.PI;
    
    // Limit the rotation speed based on delta time
    const maxDelta = maxRotationSpeed * delta;
    const limitedDiff = Math.sign(distanceToTarget) * Math.min(Math.abs(distanceToTarget), maxDelta);
    
    // Update current rotation
    currentRotation += limitedDiff;
    cameraRef.current.currentRotation = currentRotation;

    // Calculate orbital position using the current rotation
    const targetX = Math.cos(currentRotation) * radius;
    const targetZ = Math.sin(currentRotation) * radius;
    const targetY = height;

    // Smooth camera movement with easing
    const easing = 0.05;
    cameraRef.current.x += (targetX - cameraRef.current.x) * easing;
    cameraRef.current.y += (targetY - cameraRef.current.y) * easing;
    cameraRef.current.z += (targetZ - cameraRef.current.z) * easing;

    // Apply camera position
    camera.position.x = cameraRef.current.x;
    camera.position.y = cameraRef.current.y;
    camera.position.z = cameraRef.current.z;

    // Always look at the center (0, 0, 0)
    camera.lookAt(0, 0, 0);
  });

  return null;
};

const Background = ({ rotation = 0, currentView = 'landing' }) => {
  const groupRef = useRef();

  return (
    <>
      <CameraRig rotation={rotation} currentView={currentView} />
      <group ref={groupRef}>
        <ambientLight intensity={0.3} />
        <directionalLight position={[5, 5, 5]} intensity={1} color="#32CD32" />
        <directionalLight position={[-5, -5, -5]} intensity={0.3} color="#32CD32" />
        
        <Suspense fallback={null}>
          <Brain />
        </Suspense>
                
        <Environment preset="night" />
      </group>
    </>
  );
};

export default Background; 