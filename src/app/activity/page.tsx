
"use client"

import React, { useState, useMemo } from 'react';
import { 
  Activity, 
  Terminal, 
  Rocket, 
  Zap, 
  Code2, 
  Search,
  Filter
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { INITIAL_PROJECTS } from '@/lib/mock-data';
import { VexaSidebar } from '@/components/layout/sidebar';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { useSidebar } from '@/components/layout/sidebar-context';

export default function ActivityPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const { toast } = useToast();
  const { isCollapsed } = useSidebar();

  const allActivities = useMemo(() => {
    const activities = INITIAL_PROJECTS.flatMap(p => 
      p.activities.map(a => ({ ...a, projectName: p.name }))
    ).sort((a, b) => b.timestamp.localeCompare(a.timestamp));

    if (!searchQuery) return activities;

    return activities.filter(activity => 
      activity.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      activity.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      activity.projectName.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const handleExport = () => {
    toast({
      title: "Logs Exported",
      description: "System activity logs have been exported to your downloads.",
    });
  };

  return (
    <div className="flex min-h-screen bg-[#09090b]">
      <VexaSidebar />

      <main className={cn(
        "flex-1 flex flex-col transition-all duration-300 ease-in-out",
        isCollapsed ? "lg:ml-20" : "lg:ml-64"
      )}>
        <header className="h-16 border-b border-zinc-800/50 flex items-center justify-between px-8 bg-[#09090b]/80 backdrop-blur-md sticky top-0 z-40">
          <h2 className="text-xl font-bold flex items-center gap-3">
            <Activity className="w-5 h-5 text-primary" /> System Activity
          </h2>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" onClick={handleExport} className="border-zinc-800 gap-2 h-9 bg-zinc-900 hover:bg-zinc-800 text-zinc-100">
              <Terminal className="w-4 h-4" /> Export Logs
            </Button>
          </div>
        </header>

        <div className="p-8 max-w-5xl mx-auto w-full space-y-8">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="relative w-full sm:max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
              <Input 
                placeholder="Search activity by title, project or description..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-zinc-900 border-zinc-800 focus:border-primary/50 h-10"
              />
            </div>
            <Button variant="outline" size="sm" className="border-zinc-800 gap-2 h-10 px-4 bg-zinc-900 hover:bg-zinc-800">
              <Filter className="w-4 h-4" /> Filter
            </Button>
          </div>

          <Card className="bg-zinc-900/20 border-zinc-800/50 overflow-hidden">
            <CardContent className="p-0">
              <div className="divide-y divide-zinc-800/30">
                {allActivities.length > 0 ? (
                  allActivities.map(activity => (
                    <div key={activity.id} className="p-6 flex items-start justify-between group hover:bg-zinc-800/20 transition-all">
                      <div className="flex items-start gap-5">
                        <div className={cn(
                          "p-2.5 rounded-xl shrink-0",
                          activity.type === 'deploy' ? 'bg-emerald-500/10 text-emerald-500' :
                          activity.type === 'fix' ? 'bg-rose-500/10 text-rose-500' :
                          activity.type === 'task' ? 'bg-primary/10 text-primary' :
                          'bg-zinc-800 text-zinc-400'
                        )}>
                          {activity.type === 'deploy' ? <Rocket className="w-4 h-4" /> : 
                           activity.type === 'fix' ? <Zap className="w-4 h-4" /> :
                           <Code2 className="w-4 h-4" />}
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center gap-3">
                            <p className="text-sm font-semibold">{activity.title}</p>
                            <span className="text-[10px] text-zinc-600 font-mono tracking-tighter">{activity.projectName}</span>
                          </div>
                          <p className="text-xs text-zinc-500 leading-relaxed">{activity.description}</p>
                          {activity.agent && (
                            <div className="flex items-center gap-2 mt-2">
                              <Badge variant="secondary" className="text-[9px] h-4 px-1.5 bg-zinc-800 text-zinc-400 uppercase tracking-widest border-none">
                                {activity.agent}
                              </Badge>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="text-right whitespace-nowrap pl-4">
                        <p className="text-[10px] font-mono text-zinc-500">{activity.timestamp}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-12 text-center">
                    <p className="text-zinc-500 text-sm">No activity records match your criteria.</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
