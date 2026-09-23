
'use client';

import React, { useEffect, useState } from 'react';
import { Shield } from 'lucide-react';

export const LoadingScreen = () => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShow(false), 2200);
    return () => clearTimeout(timer);
  }, []);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-[#020617] flex flex-col items-center justify-center transition-opacity duration-1000">
      <div className="relative">
        <div className="w-24 h-24 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center animate-pulse">
          <Shield className="w-12 h-12 text-cyan-400 animate-bounce" />
        </div>
        <div className="absolute -inset-4 border-2 border-cyan-500/20 border-t-cyan-500 rounded-full animate-spin" />
      </div>
      
      <div className="mt-8 text-center space-y-2">
        <h2 className="text-xl font-black text-white tracking-widest uppercase">LUBANZI</h2>
        <div className="h-0.5 w-12 bg-cyan-500 mx-auto" />
        <p className="text-[10px] text-cyan-400/60 font-bold tracking-[0.4em] uppercase">Securing your perimeter</p>
      </div>
    </div>
  );
};
