import React, { useEffect, useState, useRef } from 'react';
import '../styles/CursorEffect.css';

interface CursorParticle {
  x: number;
  y: number;
  size: number;
  life: number;
  maxLife: number;
  color: string;
  id: number;
}

const CursorEffect: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [particles, setParticles] = useState<CursorParticle[]>([]);
  const [isPointer, setIsPointer] = useState(false);
  const nextParticleId = useRef(0);
  const frameRef = useRef<number | null>(null);
  const lastPositionRef = useRef({ x: 0, y: 0 });
  const lastParticleTime = useRef(0);
  
  // Generate a random color from the theme palette
  const getRandomColor = () => {
    const colors = [
      '#00ff88', // primary
      '#00ccff', // secondary
      '#9333ea', // accent-purple
      'rgba(255, 255, 255, 0.8)' // white
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };
  
  // Create particles on mouse movement
  const createParticle = (x: number, y: number) => {
    const now = Date.now();
    const timeSinceLastParticle = now - lastParticleTime.current;
    
    // Limit particle creation rate
    if (timeSinceLastParticle < 20) return;
    
    lastParticleTime.current = now;
    
    const newParticle: CursorParticle = {
      x,
      y,
      size: Math.random() * 8 + 2, // Random size between 2-10px
      life: 0,
      maxLife: Math.random() * 20 + 10, // Random lifespan
      color: getRandomColor(),
      id: nextParticleId.current++
    };
    
    setParticles(prev => [...prev, newParticle]);
  };
  
  // Update particles animation
  const updateParticles = () => {
    setParticles(prev => 
      prev
        .map(p => ({
          ...p,
          life: p.life + 1,
          size: p.size * 0.96 // Gradually shrink
        }))
        .filter(p => p.life < p.maxLife) // Remove dead particles
    );
    
    frameRef.current = requestAnimationFrame(updateParticles);
  };
  
  // Initialize animation loop
  useEffect(() => {
    frameRef.current = requestAnimationFrame(updateParticles);
    
    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);
  
  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      
      // Create particles when moving
      const distance = Math.hypot(e.clientX - lastPositionRef.current.x, e.clientY - lastPositionRef.current.y);
      
      if (distance > 5) {
        createParticle(e.clientX, e.clientY);
        lastPositionRef.current = { x: e.clientX, y: e.clientY };
      }
      
      if (!isVisible) setIsVisible(true);
      
      // Check if cursor is over a clickable element
      const target = e.target as HTMLElement;
      const isClickable = 
        target.tagName === 'BUTTON' || 
        target.tagName === 'A' || 
        target.classList.contains('sidebar') ||
        target.classList.contains('project-card') ||
        target.onclick !== null;
      
      setIsPointer(isClickable);
    };
    
    const handleMouseLeave = () => {
      setIsVisible(false);
    };
    
    const handleMouseEnter = () => {
      setIsVisible(true);
    };
    
    window.addEventListener('mousemove', updatePosition);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    
    return () => {
      window.removeEventListener('mousemove', updatePosition);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isVisible]);
  
  return (
    <>
      {/* Main cursor */}
      <div 
        className={`cursor-effect ${isPointer ? 'is-pointer' : ''}`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          opacity: isVisible ? 1 : 0,
        }}
      >
        <div className="cursor-circle"></div>
      </div>
      
      {/* Trailing particles */}
      {particles.map(particle => (
        <div
          key={particle.id}
          className="cursor-particle"
          style={{
            left: `${particle.x}px`,
            top: `${particle.y}px`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: particle.color,
            opacity: 1 - particle.life / particle.maxLife,
          }}
        />
      ))}
    </>
  );
};

export default CursorEffect;