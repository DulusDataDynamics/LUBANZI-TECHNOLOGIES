
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
  X,
  ChevronLeft,
  ChevronRight,
  PanelLeft
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useSidebar } from './sidebar-context';

const VLogo = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-black">
    <path d="M3 3L12 21L21 3" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 21L17 11" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" opacity="0.6"/>
  </svg>
);

export function VexaSidebar() {
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { isCollapsed, toggleSidebar } = useSidebar();

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
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="lg:hidden fixed top-4 left-4 z-[60] p-2 bg-black border border-border rounded-lg shadow-xl"
      >
        {isMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Overlay */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      <aside className={cn(
        "border-r border-border bg-background flex flex-col h-screen fixed left-0 top-0 z-50 transition-all duration-300 ease-in-out lg:translate-x-0",
        isMobileOpen ? "translate-x-0 w-64" : "-translate-x-full lg:translate-x-0",
        isCollapsed ? "lg:w-20" : "lg:w-64"
      )}>
        <div className={cn("p-6 flex flex-col h-full", isCollapsed && "items-center px-4")}>
          <div className="flex items-center justify-between mb-12">
            <Link href="/" className="flex items-center gap-3 group" onClick={() => setIsMobileOpen(false)}>
              <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform shrink-0">
                <VLogo />
              </div>
              {!isCollapsed && (
                <div className="transition-opacity duration-200">
                  <h1 className="font-bold text-lg tracking-tight">VEXA</h1>
                  <p className="text-[8px] text-zinc-600 uppercase tracking-[0.3em] font-bold">Workspace</p>
                </div>
              )}
            </Link>
            {!isCollapsed && (
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={toggleSidebar}
                className="hidden lg:flex h-8 w-8 text-zinc-500 hover:text-white"
              >
                <PanelLeft className="w-4 h-4" />
              </Button>
            )}
          </div>
          
          <nav className="space-y-1 w-full">
            {navItems.map((item) => (
              <Link 
                key={item.href}
                href={item.href} 
                onClick={() => setIsMobileOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-md text-xs font-semibold transition-all group tracking-wide",
                  pathname === item.href 
                    ? 'bg-zinc-900 text-white' 
                    : 'text-zinc-500 hover:text-zinc-200 hover:bg-zinc-900/50',
                  isCollapsed && "justify-center px-0"
                )}
              >
                <div className="shrink-0">{item.icon}</div>
                {!isCollapsed && <span className="truncate">{item.label}</span>}
              </Link>
            ))}
          </nav>

          {isCollapsed && (
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleSidebar}
              className="mt-6 hidden lg:flex h-8 w-8 text-zinc-500 hover:text-white"
            >
              <PanelLeft className="w-4 h-4" />
            </Button>
          )}
        </div>
        
        <div className={cn("mt-auto p-6 space-y-4", isCollapsed && "p-4 items-center flex flex-col")}>
          {!isCollapsed ? (
            <div className="bg-zinc-900/40 rounded-lg p-4 border border-border">
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">System Ready</span>
              </div>
            </div>
          ) : (
             <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
          )}

          <Link href="/settings" className="w-full" onClick={() => setIsMobileOpen(false)}>
            <Button 
              variant="ghost" 
              className={cn(
                "w-full justify-start gap-3 text-zinc-500 hover:text-zinc-200 text-xs font-semibold rounded-md px-3 h-9",
                isCollapsed && "justify-center px-0"
              )}
            >
              <Settings className="w-4 h-4 shrink-0" />
              {!isCollapsed && <span>Settings</span>}
            </Button>
          </Link>
        </div>
      </aside>
    </>
  );
}
