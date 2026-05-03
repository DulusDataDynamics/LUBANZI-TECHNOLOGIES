"use client"

import React, { useEffect, useState } from 'react';

interface TrailItem {
  id: number;
  x: number;
  y: number;
  type: 'heart' | 'star';
}

export const CursorTrail: React.FC = () => {
  const [trails, setTrails] = useState<TrailItem[]>([]);
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    setIsMobile(window.innerWidth < 1024);
    
    if (window.innerWidth < 1024) return;

    let idCounter = 0;
    const handleMouseMove = (e: MouseEvent) => {
      const isOverButton = (e.target as HTMLElement).closest('button, a');
      if (!isOverButton) return;

      const newItem: TrailItem = {
        id: idCounter++,
        x: e.clientX,
        y: e.clientY,
        type: Math.random() > 0.5 ? 'heart' : 'star',
      };

      setTrails(prev => [...prev.slice(-15), newItem]);

      setTimeout(() => {
        setTrails(prev => prev.filter(t => t.id !== newItem.id));
      }, 1000);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  if (isMobile) return null;

  return (
    <>
      {trails.map(trail => (
        <div
          key={trail.id}
          className="cursor-trail animate-out fade-out slide-out-to-top-10 duration-1000"
          style={{
            left: trail.x,
            top: trail.y,
            transform: 'translate(-50%, -50%)',
          }}
        >
          {trail.type === 'heart' ? (
            <span className="text-primary text-xl">♥</span>
          ) : (
            <span className="text-accent text-xl">★</span>
          )}
        </div>
      ))}
    </>
  );
};
