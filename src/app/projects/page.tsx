
"use client"

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { 
  Plus, 
  Search, 
  Circle,
  Loader2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { VexaSidebar } from '@/components/layout/sidebar';
import { NewProjectDialog } from '@/components/projects/new-project-dialog';
import { cn } from '@/lib/utils';
import { useSidebar } from '@/components/layout/sidebar-context';
import { useCollection, useUser, useFirestore } from '@/firebase';
import { collection, query, where, orderBy } from 'firebase/firestore';

export default function ProjectsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const { isCollapsed } = useSidebar();
  const { user, loading: authLoading } = useUser();
  const db = useFirestore();

  const projectsQuery = useMemo(() => {
    if (!db || !user) return null;
    return query(
      collection(db, 'projects'),
      where('ownerId', '==', user.uid),
      orderBy('createdAt', 'desc')
    );
  }, [db, user]);

  const { data: projects, loading: projectsLoading } = useCollection(projectsQuery);

  const filteredProjects = useMemo(() => {
    if (!projects) return [];
    return projects.filter(project => 
      project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [projects, searchQuery]);

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
            <p className="text-[10px] font-bold tracking-[0.2em] text-zinc-500 uppercase mb-2">Workspace</p>
            <h1 className="text-4xl font-bold tracking-tight mb-2">Projects</h1>
            <p className="text-zinc-500 text-sm">Your development projects, workspaces, and AI engineering environments.</p>
          </div>
          <NewProjectDialog />
        </header>

        <div className="px-8 max-w-7xl mx-auto w-full space-y-8">
          {/* Search and Stats Area */}
          <div className="flex gap-4 items-stretch">
            <div className="relative flex-1">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
              <Input 
                placeholder="Search projects by name or description..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-card border-border focus:ring-0 focus:border-zinc-700 h-14 pl-14 text-sm rounded-lg"
              />
            </div>
            <div className="flex gap-2">
              <StatItem label="Total" value={(projects?.length || 0).toString()} />
              <StatItem label="Matches" value={filteredProjects.length.toString()} />
            </div>
          </div>

          {/* Project Grid */}
          {projectsLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map(i => <div key={i} className="h-56 rounded-lg bg-zinc-900 animate-pulse" />)}
            </div>
          ) : filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-20">
              {filteredProjects.map(project => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          ) : (
            <div className="py-20 text-center border border-zinc-800 border-dashed rounded-xl">
              <p className="text-zinc-500 text-sm">No projects found matching your search.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

function StatItem({ label, value }: { label: string, value: string }) {
  return (
    <div className="bg-card border border-border px-6 py-2 rounded-lg flex flex-col justify-center items-center min-w-[80px]">
      <span className="text-[9px] font-bold uppercase tracking-widest text-zinc-500 mb-1">{label}</span>
      <span className="text-lg font-bold">{value}</span>
    </div>
  );
}

function ProjectCard({ project }: { project: any }) {
  const isActive = project.status !== 'Idle' && project.status;
  
  return (
    <Card className="bg-card border-border hover:border-zinc-700 transition-all group relative overflow-hidden flex flex-col h-full">
      <CardContent className="p-8 flex flex-col h-full">
        <div className="flex items-center justify-between mb-8">
          <div className="w-10 h-10 rounded-lg bg-zinc-900 border border-border flex items-center justify-center font-bold text-zinc-400 group-hover:text-white transition-colors">
            {project.name.charAt(0)}
          </div>
          <div className="flex items-center gap-2">
            <Circle className={cn("w-2 h-2 fill-current", isActive ? "text-emerald-500" : "text-zinc-600")} />
            <span className={cn("text-[10px] font-bold uppercase tracking-widest", isActive ? "text-emerald-500" : "text-zinc-500")}>
              {project.status || 'Idle'}
            </span>
          </div>
        </div>

        <div className="flex-1 space-y-2 mb-10">
          <h3 className="text-xl font-bold">{project.name}</h3>
          <p className="text-zinc-500 text-sm leading-relaxed line-clamp-2">{project.description}</p>
        </div>

        <div className="pt-6 border-t border-zinc-900 flex items-center justify-between mt-auto">
          <div className="space-y-1">
            <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-tighter">Repository</p>
            <p className="text-[9px] text-zinc-600 font-medium">Updated recently</p>
          </div>
          <div className="flex items-center gap-2">
            <Link href={`/workspace/${project.id}`}>
              <Button variant="outline" size="sm" className="bg-zinc-900 border-border text-[10px] font-bold uppercase tracking-widest px-4 h-8 hover:bg-zinc-800">
                Open
              </Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
