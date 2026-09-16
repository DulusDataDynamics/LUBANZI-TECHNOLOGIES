"use client"

import React from 'react';
import Link from 'next/link';
import { 
  Terminal, 
  Code2, 
  Cpu, 
  Layers, 
  GitBranch, 
  Activity, 
  Plus, 
  ChevronRight, 
  Search,
  Zap,
  Box,
  Rocket
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { INITIAL_PROJECTS } from '@/lib/mock-data';
import { VexaSidebar } from '@/components/layout/sidebar';
import { cn } from '@/lib/utils';

export default function VexaDashboard() {
  return (
    <div className="flex min-h-screen bg-[#09090b]">
      <VexaSidebar />

      <main className="flex-1 lg:ml-64 flex flex-col">
        <header className="h-16 border-b border-zinc-800/50 flex items-center justify-between px-8 bg-[#09090b]/80 backdrop-blur-md sticky top-0 z-40">
          <div className="flex items-center gap-4 text-zinc-500 max-w-md w-full">
            <Search className="w-4 h-4" />
            <input 
              type="text" 
              placeholder="Search projects, files, or agents..." 
              className="bg-transparent border-none outline-none text-sm w-full focus:text-zinc-200"
            />
          </div>
          <div className="flex items-center gap-4">
            <Button size="sm" className="rounded-full gap-2 shadow-lg shadow-primary/20">
              <Plus className="w-4 h-4" /> New Project
            </Button>
          </div>
        </header>

        <div className="p-8 space-y-10 max-w-7xl mx-auto w-full">
          {/* Header */}
          <section>
            <h2 className="text-3xl font-bold tracking-tight mb-2">Welcome back, Engineer</h2>
            <p className="text-zinc-500">VEXA core systems are active and ready for instructions.</p>
          </section>

          {/* Stats */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCard icon={<Cpu className="text-primary w-5 h-5" />} label="Active Agents" value="5/5" sub="Ready for task" />
            <StatCard icon={<Code2 className="text-accent w-5 h-5" />} label="Code Changes" value="1,284" sub="+12% this week" />
            <StatCard icon={<Zap className="text-amber-500 w-5 h-5" />} label="Intelligence" value="Gemini 2.5" sub="Flash model active" />
          </section>

          {/* Recent Projects */}
          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold flex items-center gap-3">
                <Layers className="w-5 h-5 text-primary" /> Active Projects
              </h2>
              <Link href="/projects" className="text-xs font-semibold text-zinc-500 hover:text-primary transition-colors flex items-center gap-1 uppercase tracking-widest">
                View All Projects <ChevronRight className="w-3 h-3" />
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {INITIAL_PROJECTS.map(project => (
                <Link key={project.id} href={`/workspace/${project.id}`}>
                  <Card className="glass-panel group hover:border-primary/40 transition-all duration-500 cursor-pointer h-full">
                    <CardHeader>
                      <div className="flex items-center justify-between mb-3">
                        <Badge variant="outline" className={cn(
                          "bg-zinc-800/50 text-[10px] px-2 py-0 border-zinc-700 uppercase tracking-tighter",
                          project.status !== 'Idle' && "border-primary/50 text-primary"
                        )}>
                          {project.status}
                        </Badge>
                        <span className="text-[10px] text-zinc-500 font-mono">{project.deployments[0]?.version || 'v0.0.1'}</span>
                      </div>
                      <CardTitle className="text-lg group-hover:text-primary transition-colors mb-2">{project.name}</CardTitle>
                      <CardDescription className="line-clamp-2 text-zinc-400 text-xs leading-relaxed">{project.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-4 text-[10px] text-zinc-500 font-bold uppercase tracking-widest">
                        <div className="flex items-center gap-1.5">
                          <Activity className="w-3.5 h-3.5" /> {project.changes.length} Changes
                        </div>
                        <div className="flex items-center gap-1.5">
                          <GitBranch className="w-3.5 h-3.5" /> {project.deployments.length} Deploys
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </section>

          {/* Activity Timeline */}
          <section className="space-y-6">
            <h2 className="text-xl font-bold flex items-center gap-3">
              <Terminal className="w-5 h-5 text-accent" /> System activity
            </h2>
            <Card className="glass-panel overflow-hidden border-none">
              <CardContent className="p-0">
                <div className="divide-y divide-zinc-800/30">
                  {INITIAL_PROJECTS[0].activities.map(activity => (
                    <div key={activity.id} className="p-5 flex items-center justify-between group hover:bg-zinc-800/20 transition-all">
                      <div className="flex items-center gap-5">
                        <div className={cn(
                          "p-2.5 rounded-xl",
                          activity.type === 'deploy' ? 'bg-emerald-500/10 text-emerald-500' :
                          activity.type === 'fix' ? 'bg-rose-500/10 text-rose-500' :
                          activity.type === 'task' ? 'bg-primary/10 text-primary' :
                          'bg-zinc-800 text-zinc-400'
                        )}>
                          {activity.type === 'deploy' ? <Rocket className="w-4 h-4" /> : 
                           activity.type === 'fix' ? <Zap className="w-4 h-4" /> :
                           <Code2 className="w-4 h-4" />}
                        </div>
                        <div>
                          <p className="text-sm font-semibold">{activity.title}</p>
                          <p className="text-xs text-zinc-500 mt-0.5">{activity.description}</p>
                        </div>
                      </div>
                      <div className="text-right flex flex-col items-end gap-1.5">
                        <p className="text-[10px] font-mono text-zinc-500">{activity.timestamp}</p>
                        {activity.agent && (
                          <Badge variant="secondary" className="text-[9px] h-4 px-1.5 bg-zinc-800 text-zinc-400 uppercase tracking-widest border-none">
                            {activity.agent}
                          </Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </section>
        </div>
      </main>
    </div>
  );
}

function StatCard({ icon, label, value, sub }: { icon: React.ReactNode, label: string, value: string, sub: string }) {
  return (
    <Card className="glass-panel hover:bg-zinc-800/30 transition-colors border-none group">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-bold uppercase tracking-widest text-zinc-500">{label}</span>
          <div className="group-hover:scale-110 transition-transform">{icon}</div>
        </div>
        <div className="space-y-1">
          <h3 className="text-3xl font-bold tracking-tight">{value}</h3>
          <p className="text-xs text-zinc-500 font-medium">{sub}</p>
        </div>
      </CardContent>
    </Card>
  );
}
