
"use client"

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Box, 
  Activity, 
  GitBranch, 
  Settings, 
  Menu,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const VLogo = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-black">
    <path d="M3 3L12 21L21 3" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 21L17 11" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" opacity="0.6"/>
  </svg>
);

export function VexaSidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { href: '/', icon: <LayoutDashboard className="w-4 h-4" />, label: 'Dashboard' },
    { href: '/projects', icon: <Box className="w-4 h-4" />, label: 'Projects' },
    { href: '/activity', icon: <Activity className="w-4 h-4" />, label: 'Activity' },
    { href: '/deployments', icon: <GitBranch className="w-4 h-4" />, label: 'Deployments' },
  ];

  return (
    <>
      {/* Mobile Trigger */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-[60] p-2 bg-black border border-border rounded-lg shadow-xl"
      >
        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside className={cn(
        "w-64 border-r border-border bg-background flex flex-col h-screen fixed left-0 top-0 z-50 transition-transform duration-300 lg:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="p-6">
          <Link href="/" className="flex items-center gap-3 mb-12 group" onClick={() => setIsOpen(false)}>
            <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
              <VLogo />
            </div>
            <div>
              <h1 className="font-bold text-lg tracking-tight">VEXA</h1>
              <p className="text-[8px] text-zinc-600 uppercase tracking-[0.3em] font-bold">Workspace</p>
            </div>
          </Link>
          
          <nav className="space-y-1">
            {navItems.map((item) => (
              <Link 
                key={item.href}
                href={item.href} 
                onClick={() => setIsOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-md text-xs font-semibold transition-all group tracking-wide",
                  pathname === item.href 
                    ? 'bg-zinc-900 text-white' 
                    : 'text-zinc-500 hover:text-zinc-200 hover:bg-zinc-900/50'
                )}
              >
                {item.icon}
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        
        <div className="mt-auto p-6 space-y-4">
          <div className="bg-zinc-900/40 rounded-lg p-4 border border-border">
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">System Ready</span>
            </div>
          </div>

          <Link href="/settings" onClick={() => setIsOpen(false)}>
            <Button variant="ghost" className="w-full justify-start gap-3 text-zinc-500 hover:text-zinc-200 text-xs font-semibold rounded-md px-3 h-9">
              <Settings className="w-4 h-4" />
              Settings
            </Button>
          </Link>
        </div>
      </aside>
    </>
  );
}
