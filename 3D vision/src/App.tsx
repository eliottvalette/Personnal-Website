import './App.css';
import Scene from './components/Scene';
import CursorEffect from './components/CursorEffect';
import { Suspense, useEffect } from 'react';

function App() {
  // Hide cursor
  useEffect(() => {
    document.body.style.cursor = 'none';
    return () => {
      document.body.style.cursor = 'auto';
    };
  }, []);

  return (
    <div className="app-container">
      <Suspense fallback={<div className="loading">Loading 3D experience...</div>}>
        <Scene />
        <CursorEffect />
      </Suspense>
    </div>
  );
}

export default App;
