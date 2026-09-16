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
  LayoutDashboard
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { INITIAL_PROJECTS } from '@/lib/mock-data';

export default function VexaDashboard() {
  return (
    <div className="flex min-h-screen bg-[#09090b]">
      {/* Sidebar */}
      <aside className="w-64 border-r border-zinc-800/50 bg-[#09090b] hidden md:flex flex-col">
        <div className="p-6">
          <div className="flex items-center gap-2 mb-8">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Terminal className="text-white w-5 h-5" />
            </div>
            <span className="font-bold text-xl tracking-tight">VEXA</span>
          </div>
          
          <nav className="space-y-1">
            <NavItem href="/" icon={<LayoutDashboard className="w-4 h-4" />} label="Dashboard" active />
            <NavItem href="/projects" icon={<Box className="w-4 h-4" />} label="Projects" />
            <NavItem href="/activity" icon={<Activity className="w-4 h-4" />} label="Activity" />
            <NavItem href="/deployments" icon={<GitBranch className="w-4 h-4" />} label="Deployments" />
          </nav>
        </div>
        
        <div className="mt-auto p-6 space-y-4">
          <div className="bg-zinc-900/50 rounded-xl p-4 border border-zinc-800/50">
            <p className="text-xs text-zinc-500 mb-2 uppercase tracking-widest font-bold">System Status</p>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-sm font-medium">Agents Online</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        <header className="h-16 border-b border-zinc-800/50 flex items-center justify-between px-8 bg-[#09090b]/80 backdrop-blur-md sticky top-0 z-50">
          <div className="flex items-center gap-4 text-zinc-400">
            <Search className="w-4 h-4" />
            <span className="text-sm">Search projects, files, or agents...</span>
          </div>
          <div className="flex items-center gap-4">
            <Button size="sm" className="rounded-full gap-2">
              <Plus className="w-4 h-4" /> New Project
            </Button>
          </div>
        </header>

        <div className="p-8 space-y-8 max-w-7xl mx-auto w-full">
          {/* Hero / Stats */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCard icon={<Cpu className="text-primary" />} label="Active Agents" value="5/5" sub="Ready for task" />
            <StatCard icon={<Code2 className="text-accent" />} label="Code Changes" value="1,284" sub="+12% this week" />
            <StatCard icon={<Zap className="text-amber-500" />} label="Intelligence" value="Gemini 2.5" sub="System core active" />
          </section>

          {/* Recent Projects */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <Layers className="w-5 h-5 text-primary" /> Recent Projects
              </h2>
              <Link href="/projects" className="text-sm text-zinc-500 hover:text-primary transition-colors">View All</Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {INITIAL_PROJECTS.map(project => (
                <Link key={project.id} href={`/workspace/${project.id}`}>
                  <Card className="glass-panel group hover:border-primary/50 transition-all duration-300">
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="secondary" className="bg-zinc-800 text-zinc-300 group-hover:bg-primary/20 group-hover:text-primary transition-colors">
                          {project.status}
                        </Badge>
                        <span className="text-[10px] text-zinc-500 uppercase tracking-widest">{project.deployments[0]?.version}</span>
                      </div>
                      <CardTitle className="text-lg group-hover:text-primary transition-colors">{project.name}</CardTitle>
                      <CardDescription className="line-clamp-2 text-zinc-400 text-xs">{project.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-4 text-xs text-zinc-500">
                        <div className="flex items-center gap-1">
                          <Activity className="w-3 h-3" /> {project.changes.length} changes
                        </div>
                        <div className="flex items-center gap-1">
                          <GitBranch className="w-3 h-3" /> {project.deployments.length} deploys
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </section>

          {/* Agent Activity Timeline */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Terminal className="w-5 h-5 text-accent" /> System Activity
            </h2>
            <Card className="glass-panel">
              <CardContent className="p-0">
                <div className="divide-y divide-zinc-800/50">
                  {INITIAL_PROJECTS[0].activities.map(activity => (
                    <div key={activity.id} className="p-4 flex items-center justify-between group hover:bg-zinc-900/30 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className={`p-2 rounded-lg ${
                          activity.type === 'deploy' ? 'bg-emerald-500/10 text-emerald-500' :
                          activity.type === 'fix' ? 'bg-rose-500/10 text-rose-500' :
                          'bg-zinc-800 text-zinc-400'
                        }`}>
                          {activity.type === 'deploy' ? <GitBranch className="w-4 h-4" /> : <Code2 className="w-4 h-4" />}
                        </div>
                        <div>
                          <p className="text-sm font-medium">{activity.title}</p>
                          <p className="text-xs text-zinc-500">{activity.description}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-zinc-500">{activity.timestamp}</p>
                        {activity.agent && <Badge variant="outline" className="text-[10px] uppercase tracking-tighter mt-1">{activity.agent}</Badge>}
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

function NavItem({ href, icon, label, active = false }: { href: string, icon: React.ReactNode, label: string, active?: boolean }) {
  return (
    <Link 
      href={href} 
      className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
        active 
          ? 'bg-primary/10 text-primary border border-primary/20 shadow-lg shadow-primary/5' 
          : 'text-zinc-500 hover:text-zinc-200 hover:bg-zinc-800/50'
      }`}
    >
      {icon}
      {label}
      {active && <ChevronRight className="w-3 h-3 ml-auto" />}
    </Link>
  );
}

function StatCard({ icon, label, value, sub }: { icon: React.ReactNode, label: string, value: string, sub: string }) {
  return (
    <Card className="glass-panel">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-medium text-zinc-500">{label}</span>
          {icon}
        </div>
        <div className="space-y-1">
          <h3 className="text-3xl font-bold tracking-tight">{value}</h3>
          <p className="text-xs text-zinc-500">{sub}</p>
        </div>
      </CardContent>
    </Card>
  );
}