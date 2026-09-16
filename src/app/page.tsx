
"use client"

import React from 'react';
import Link from 'next/link';
import { 
  Code2, 
  Cpu, 
  Layers, 
  ChevronRight, 
  Zap,
  Plus
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { INITIAL_PROJECTS } from '@/lib/mock-data';
import { VexaSidebar } from '@/components/layout/sidebar';
import { NewProjectDialog } from '@/components/projects/new-project-dialog';
import { cn } from '@/lib/utils';

export default function VexaDashboard() {
  return (
    <div className="flex min-h-screen bg-background">
      <VexaSidebar />

      <main className="flex-1 lg:ml-64 flex flex-col">
        <header className="px-8 pt-12 pb-8 flex items-start justify-between max-w-7xl mx-auto w-full">
          <div>
            <p className="text-[10px] font-bold tracking-[0.2em] text-zinc-500 uppercase mb-2">Systems Overview</p>
            <h1 className="text-4xl font-bold tracking-tight mb-2">Dashboard</h1>
            <p className="text-zinc-500 text-sm">VEXA core systems are active and ready for instructions.</p>
          </div>
          <NewProjectDialog />
        </header>

        <div className="px-8 space-y-10 max-w-7xl mx-auto w-full pb-20">
          {/* Stats */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCard icon={<Cpu className="text-emerald-500 w-4 h-4" />} label="Active Agents" value="5/5" sub="Ready for tasks" />
            <StatCard icon={<Code2 className="text-white w-4 h-4" />} label="Code Changes" value="1,284" sub="+12% this week" />
            <StatCard icon={<Zap className="text-amber-500 w-4 h-4" />} label="Intelligence" value="Gemini 2.5" sub="Flash model active" />
          </section>

          {/* Recent Projects */}
          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold">Active Projects</h2>
              <Link href="/projects" className="text-[10px] font-bold text-zinc-500 hover:text-white transition-colors flex items-center gap-1 uppercase tracking-widest">
                View All <ChevronRight className="w-3 h-3" />
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {INITIAL_PROJECTS.slice(0, 3).map(project => (
                <Link key={project.id} href={`/workspace/${project.id}`}>
                  <Card className="bg-card border-border hover:border-zinc-700 transition-all group cursor-pointer h-full">
                    <CardHeader className="p-8">
                      <div className="flex items-center justify-between mb-6">
                        <div className="w-10 h-10 rounded-lg bg-zinc-900 border border-border flex items-center justify-center font-bold text-zinc-400 group-hover:text-white transition-colors">
                          {project.name.charAt(0)}
                        </div>
                        <Badge variant="outline" className="text-[9px] px-2 py-0.5 border-emerald-500/50 text-emerald-500 uppercase tracking-widest bg-emerald-500/5">
                          {project.status}
                        </Badge>
                      </div>
                      <CardTitle className="text-lg group-hover:text-white transition-colors mb-2">{project.name}</CardTitle>
                      <CardDescription className="line-clamp-2 text-zinc-500 text-sm leading-relaxed">{project.description}</CardDescription>
                    </CardHeader>
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

function StatCard({ icon, label, value, sub }: { icon: React.ReactNode, label: string, value: string, sub: string }) {
  return (
    <Card className="bg-card border-border hover:border-zinc-700 transition-colors group">
      <CardContent className="p-8">
        <div className="flex items-center justify-between mb-6">
          <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">{label}</span>
          <div className="p-2 bg-zinc-900 rounded-lg border border-border group-hover:text-white transition-colors">{icon}</div>
        </div>
        <div className="space-y-1">
          <h3 className="text-3xl font-bold tracking-tight">{value}</h3>
          <p className="text-xs text-zinc-600 font-medium">{sub}</p>
        </div>
      </CardContent>
    </Card>
  );
}
