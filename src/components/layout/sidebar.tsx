"use client"

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Terminal, 
  LayoutDashboard, 
  Box, 
  Activity, 
  GitBranch, 
  Settings, 
  ChevronRight,
  Plus
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function VexaSidebar() {
  const pathname = usePathname();

  const navItems = [
    { href: '/', icon: <LayoutDashboard className="w-4 h-4" />, label: 'Dashboard' },
    { href: '/projects', icon: <Box className="w-4 h-4" />, label: 'Projects' },
    { href: '/activity', icon: <Activity className="w-4 h-4" />, label: 'Activity' },
    { href: '/deployments', icon: <GitBranch className="w-4 h-4" />, label: 'Deployments' },
  ];

  return (
    <aside className="w-64 border-r border-zinc-800/50 bg-[#09090b] hidden lg:flex flex-col h-screen fixed left-0 top-0 z-50">
      <div className="p-6">
        <div className="flex items-center gap-3 mb-10 group">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20 group-hover:scale-105 transition-transform">
            <Terminal className="text-white w-6 h-6" />
          </div>
          <div>
            <h1 className="font-bold text-xl tracking-tight">VEXA</h1>
            <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-semibold tracking-tighter">AI Engineer</p>
          </div>
        </div>
        
        <nav className="space-y-2">
          {navItems.map((item) => (
            <Link 
              key={item.href}
              href={item.href} 
              className={cn(
                "flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all group",
                pathname === item.href 
                  ? 'bg-primary/10 text-primary border border-primary/20 shadow-inner' 
                  : 'text-zinc-500 hover:text-zinc-200 hover:bg-zinc-800/40'
              )}
            >
              {item.icon}
              {item.label}
              {pathname === item.href && <ChevronRight className="w-3 h-3 ml-auto opacity-50" />}
            </Link>
          ))}
        </nav>
      </div>
      
      <div className="mt-auto p-6 space-y-6">
        <div className="bg-zinc-900/50 rounded-2xl p-5 border border-zinc-800/50 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full -mr-12 -mt-12 blur-2xl group-hover:bg-primary/10 transition-colors" />
          <p className="text-[10px] text-zinc-500 mb-3 uppercase tracking-widest font-bold">System Status</p>
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <div className="absolute inset-0 w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping opacity-75" />
            </div>
            <span className="text-sm font-semibold">Agents Online</span>
          </div>
        </div>

        <Button variant="ghost" className="w-full justify-start gap-3 text-zinc-500 hover:text-zinc-200 rounded-xl">
          <Settings className="w-4 h-4" />
          Settings
        </Button>
      </div>
    </aside>
  );
}
