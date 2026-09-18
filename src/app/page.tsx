
"use client"

import React, { useMemo } from 'react';
import Link from 'next/link';
import { 
  Code2, 
  Cpu, 
  Layers, 
  ChevronRight, 
  Zap,
  Plus,
  Loader2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { VexaSidebar } from '@/components/layout/sidebar';
import { NewProjectDialog } from '@/components/projects/new-project-dialog';
import { cn } from '@/lib/utils';
import { useSidebar } from '@/components/layout/sidebar-context';
import { useCollection, useUser, useFirestore } from '@/firebase';
import { collection, query, where, limit, orderBy } from 'firebase/firestore';

export default function VexaDashboard() {
  const { isCollapsed } = useSidebar();
  const { user, loading: authLoading } = useUser();
  const db = useFirestore();

  const projectsQuery = useMemo(() => {
    if (!db || !user) return null;
    return query(
      collection(db, 'projects'),
      where('ownerId', '==', user.uid),
      orderBy('createdAt', 'desc'),
      limit(3)
    );
  }, [db, user]);

  const allProjectsQuery = useMemo(() => {
    if (!db || !user) return null;
    return query(collection(db, 'projects'), where('ownerId', '==', user.uid));
  }, [db, user]);

  const { data: recentProjects, loading: projectsLoading } = useCollection(projectsQuery);
  const { data: allProjects } = useCollection(allProjectsQuery);

  const stats = useMemo(() => {
    const totalProjects = allProjects?.length || 0;
    const activeAgents = totalProjects > 0 ? 5 : 0; // Simulated based on activity
    return {
      activeAgents: `${activeAgents}/5`,
      totalProjects
    };
  }, [allProjects]);

  if (authLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#09090b]">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-background">
      <VexaSidebar />

      <main className={cn(
        "flex-1 flex flex-col transition-all duration-300 ease-in-out",
        isCollapsed ? "lg:ml-20" : "lg:ml-64"
      )}>
        <header className="px-8 pt-12 pb-8 flex items-start justify-between max-w-7xl mx-auto w-full">
          <div>
            <p className="text-[10px] font-bold tracking-[0.2em] text-zinc-500 uppercase mb-2">Systems Overview</p>
            <h1 className="text-4xl font-bold tracking-tight mb-2">Dashboard</h1>
            <p className="text-zinc-500 text-sm">Welcome back, {user?.displayName?.split(' ')[0] || 'Engineer'}. Core systems are active.</p>
          </div>
          <NewProjectDialog />
        </header>

        <div className="px-8 space-y-10 max-w-7xl mx-auto w-full pb-20">
          {/* Stats */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCard icon={<Cpu className="text-emerald-500 w-4 h-4" />} label="Active Agents" value={stats.activeAgents} sub="Ready for tasks" />
            <StatCard icon={<Code2 className="text-white w-4 h-4" />} label="Total Projects" value={stats.totalProjects.toString()} sub="Workspace footprint" />
            <StatCard icon={<Zap className="text-amber-500 w-4 h-4" />} label="Intelligence" value="VEXA V1.4.0" sub="Flash model active" />
          </section>

          {/* Recent Projects */}
          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold">Active Projects</h2>
              <Link href="/projects" className="text-[10px] font-bold text-zinc-500 hover:text-white transition-colors flex items-center gap-1 uppercase tracking-widest">
                View All <ChevronRight className="w-3 h-3" />
              </Link>
            </div>
            
            {projectsLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map(i => <div key={i} className="h-48 rounded-lg bg-zinc-900 animate-pulse" />)}
              </div>
            ) : recentProjects && recentProjects.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recentProjects.map(project => (
                  <Link key={project.id} href={`/workspace/${project.id}`}>
                    <Card className="bg-card border-border hover:border-zinc-700 transition-all group cursor-pointer h-full">
                      <CardHeader className="p-8">
                        <div className="flex items-center justify-between mb-6">
                          <div className="w-10 h-10 rounded-lg bg-zinc-900 border border-border flex items-center justify-center font-bold text-zinc-400 group-hover:text-white transition-colors">
                            {project.name.charAt(0)}
                          </div>
                          <Badge variant="outline" className="text-[9px] px-2 py-0.5 border-emerald-500/50 text-emerald-500 uppercase tracking-widest bg-emerald-500/5">
                            {project.status || 'Idle'}
                          </Badge>
                        </div>
                        <CardTitle className="text-lg group-hover:text-white transition-colors mb-2">{project.name}</CardTitle>
                        <CardDescription className="line-clamp-2 text-zinc-500 text-sm leading-relaxed">{project.description}</CardDescription>
                      </CardHeader>
                    </Card>
                  </Link>
                ))}
              </div>
            ) : (
              <Card className="bg-zinc-900/20 border-zinc-800 border-dashed p-12 text-center">
                <p className="text-zinc-500 mb-4">No projects initialized yet.</p>
                <NewProjectDialog>
                  <Button variant="outline" className="border-zinc-800 hover:bg-zinc-800">Initialize First Project</Button>
                </NewProjectDialog>
              </Card>
            )}
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
