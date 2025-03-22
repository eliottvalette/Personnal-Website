import React, { useState, useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import Header from './components/Header';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Background from './components/Background';
import Startup from './components/Startup';
import './App.css';

function App() {
  const [brainRotation, setBrainRotation] = useState(0);
  const lastScrollRef = useRef(0);
  const lastRotationRef = useRef(0);
  const STEP_SIZE = 0.2;

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight - windowHeight;
      
      // Calculate normalized scroll position (0 to 1)
      const normalizedScroll = currentScroll / documentHeight;
      
      // Calculate the scroll delta
      const scrollDelta = normalizedScroll - lastScrollRef.current;
      
      // Handle extreme scroll cases (0% to 100% or vice versa)
      if (Math.abs(scrollDelta) > 0.9) {
        // Determine direction based on scroll delta
        const direction = Math.sign(scrollDelta);
        // Calculate new rotation based on direction
        const newRotation = lastRotationRef.current + (direction * STEP_SIZE * Math.PI * 2);
        setBrainRotation(newRotation);
        lastRotationRef.current = newRotation;
      } else {
        // For normal scrolling, calculate target rotation based on scroll position
        const targetRotation = normalizedScroll * Math.PI * 2;
        
        // Calculate the shortest path to the target rotation
        let rotationDiff = targetRotation - lastRotationRef.current;
        while (rotationDiff > Math.PI) rotationDiff -= 2 * Math.PI;
        while (rotationDiff < -Math.PI) rotationDiff += 2 * Math.PI;
        
        // If the scroll is significant but not extreme, move in steps
        if (Math.abs(scrollDelta) > 0.1) {
          const stepDirection = Math.sign(rotationDiff);
          const newRotation = lastRotationRef.current + (stepDirection * STEP_SIZE * Math.PI * 2);
          setBrainRotation(newRotation);
          lastRotationRef.current = newRotation;
        } else {
          // Normal smooth movement
          setBrainRotation(targetRotation);
          lastRotationRef.current = targetRotation;
        }
      }

      // Update ref
      lastScrollRef.current = normalizedScroll;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  console.log(brainRotation)

  return (
    <div className="App">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 0,
          background: '#0a0a0a'
        }}
      >
        <Background rotation={brainRotation}/>
      </Canvas>
      <Header />
      <main>
        <About />
        <Projects />
        <Startup />
        <Contact />
      </main>
      <footer className="footer">
        <div className="container">
          <p>&copy; {new Date().getFullYear()} Eliott Valette. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
