"use client"

import React from 'react';
import Link from 'next/link';
import { 
  Box, 
  Plus, 
  Search, 
  Filter,
  MoreVertical,
  Activity,
  GitBranch,
  Calendar
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { INITIAL_PROJECTS } from '@/lib/mock-data';
import { VexaSidebar } from '@/components/layout/sidebar';
import { cn } from '@/lib/utils';

export default function ProjectsPage() {
  return (
    <div className="flex min-h-screen bg-[#09090b]">
      <VexaSidebar />

      <main className="flex-1 lg:ml-64 flex flex-col">
        <header className="h-16 border-b border-zinc-800/50 flex items-center justify-between px-8 bg-[#09090b]/80 backdrop-blur-md sticky top-0 z-40">
          <h2 className="text-xl font-bold flex items-center gap-3">
            <Box className="w-5 h-5 text-primary" /> All Projects
          </h2>
          <div className="flex items-center gap-4">
            <Button size="sm" className="rounded-full gap-2 bg-primary hover:bg-primary/90 text-white border-none">
              <Plus className="w-4 h-4" /> New Project
            </Button>
          </div>
        </header>

        <div className="p-8 max-w-7xl mx-auto w-full space-y-8">
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="relative w-full sm:max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
              <Input 
                placeholder="Filter projects..." 
                className="pl-10 bg-zinc-900 border-zinc-800 focus:border-primary/50 h-10"
              />
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Button variant="outline" size="sm" className="border-zinc-800 gap-2 h-10 px-4">
                <Filter className="w-4 h-4" /> Sort
              </Button>
            </div>
          </div>

          {/* Project List */}
          <div className="grid grid-cols-1 gap-4">
            {INITIAL_PROJECTS.map(project => (
              <Link key={project.id} href={`/workspace/${project.id}`}>
                <Card className="bg-zinc-900/40 border-zinc-800/50 hover:border-primary/40 transition-all duration-300 group">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                      <div className="space-y-2 max-w-xl">
                        <div className="flex items-center gap-3">
                          <h3 className="text-lg font-bold group-hover:text-primary transition-colors">{project.name}</h3>
                          <Badge variant="outline" className={cn(
                            "text-[10px] px-2 py-0 border-zinc-700 uppercase tracking-tighter",
                            project.status !== 'Idle' && "border-primary/50 text-primary"
                          )}>
                            {project.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-zinc-500 line-clamp-1">{project.description}</p>
                      </div>

                      <div className="flex items-center gap-8 text-[10px] text-zinc-500 font-bold uppercase tracking-widest">
                        <div className="flex flex-col gap-1.5">
                          <span className="text-zinc-600">Activity</span>
                          <div className="flex items-center gap-1.5 text-zinc-300">
                            <Activity className="w-3.5 h-3.5" /> {project.changes.length} Changes
                          </div>
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <span className="text-zinc-600">Infrastructure</span>
                          <div className="flex items-center gap-1.5 text-zinc-300">
                            <GitBranch className="w-3.5 h-3.5" /> {project.deployments.length} Deploys
                          </div>
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <span className="text-zinc-600">Last Modified</span>
                          <div className="flex items-center gap-1.5 text-zinc-300">
                            <Calendar className="w-3.5 h-3.5" /> 2h ago
                          </div>
                        </div>
                        <Button variant="ghost" size="icon" className="text-zinc-500">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}