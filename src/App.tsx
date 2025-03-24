import './App.css';
import Scene from './components/Scene';
import CursorEffect from './components/CursorEffect';
import { Suspense } from 'react';

function App() {
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
