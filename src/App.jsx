import React from 'react';
import { Canvas } from '@react-three/fiber';
import Header from './components/Header';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Background from './components/Background';
import './App.css';

function App() {
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
        <Background />
      </Canvas>
      <Header />
      <main>
        <About />
        <Projects />
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
