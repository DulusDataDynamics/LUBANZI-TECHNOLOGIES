"use client"

import React, { useEffect, useState } from 'react';
import { Heart } from 'lucide-react';

export const LoadingScreen: React.FC = () => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShow(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-background flex flex-col items-center justify-center transition-opacity duration-1000">
      <div className="relative w-24 h-24 mb-6">
        {/* Animated Knot Line */}
        <svg viewBox="0 0 100 100" className="w-full h-full text-primary fill-none">
          <path
            d="M 10 50 C 10 20 40 20 50 40 C 60 20 90 20 90 50 C 90 80 50 90 50 90 C 50 90 10 80 10 50"
            stroke="currentColor"
            strokeWidth="3"
            strokeDasharray="300"
            strokeDashoffset="300"
            className="animate-[draw_2s_ease-in-out_infinite]"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <Heart className="w-6 h-6 text-primary animate-pulse" />
        </div>
      </div>
      <p className="font-accent text-2xl text-primary animate-pulse">knotting your charms...</p>
      
      <style jsx>{`
        @keyframes draw {
          to {
            stroke-dashoffset: 0;
          }
        }
      `}</style>
    </div>
  );
};
