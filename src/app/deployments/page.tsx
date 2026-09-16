"use client"

import React from 'react';
import { 
  GitBranch, 
  Rocket, 
  CheckCircle2, 
  Clock, 
  ExternalLink,
  Search
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { INITIAL_PROJECTS } from '@/lib/mock-data';
import { VexaSidebar } from '@/components/layout/sidebar';
import { cn } from '@/lib/utils';

export default function DeploymentsPage() {
  const allDeployments = INITIAL_PROJECTS.flatMap(p => 
    p.deployments.map(d => ({ ...d, projectName: p.name }))
  ).sort((a, b) => b.timestamp.localeCompare(a.timestamp));

  return (
    <div className="flex min-h-screen bg-[#09090b]">
      <VexaSidebar />

      <main className="flex-1 lg:ml-64 flex flex-col">
        <header className="h-16 border-b border-zinc-800/50 flex items-center justify-between px-8 bg-[#09090b]/80 backdrop-blur-md sticky top-0 z-40">
          <h2 className="text-xl font-bold flex items-center gap-3">
            <GitBranch className="w-5 h-5 text-primary" /> Deployments
          </h2>
          <div className="flex items-center gap-4">
            <Button size="sm" className="rounded-full gap-2 bg-primary hover:bg-primary/90 text-white border-none">
              <Rocket className="w-4 h-4" /> Trigger New
            </Button>
          </div>
        </header>

        <div className="p-8 max-w-6xl mx-auto w-full space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <DeployStat label="Production Uptime" value="99.99%" status="healthy" />
            <DeployStat label="Active Previews" value="12" status="neutral" />
            <DeployStat label="Avg Build Time" value="42s" status="healthy" />
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
            <Input 
              placeholder="Filter deployments by project or version..." 
              className="pl-10 bg-zinc-900 border-zinc-800 focus:border-primary/50 h-10"
            />
          </div>

          <div className="space-y-4">
            {allDeployments.map(deploy => (
              <Card key={deploy.id} className="bg-zinc-900/40 border-zinc-800/50 hover:border-primary/20 transition-all">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                    <div className="flex items-start gap-4">
                      <div className={cn(
                        "p-3 rounded-2xl",
                        deploy.status === 'Successful' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-rose-500/10 text-rose-500'
                      )}>
                        {deploy.status === 'Successful' ? <CheckCircle2 className="w-5 h-5" /> : <Clock className="w-5 h-5" />}
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-3">
                          <h4 className="font-bold text-zinc-100">{deploy.commitMessage}</h4>
                          <Badge variant="secondary" className="bg-zinc-800 text-zinc-400 text-[9px] uppercase tracking-widest px-1.5 border-none">
                            {deploy.environment}
                          </Badge>
                        </div>
                        <p className="text-xs text-zinc-500">
                          Deployed <span className="font-mono">{deploy.version}</span> for <span className="text-zinc-400">{deploy.projectName}</span>
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-8">
                      <div className="flex flex-col gap-1 text-right">
                        <span className="text-[10px] text-zinc-600 font-bold uppercase tracking-widest">Time</span>
                        <span className="text-xs text-zinc-400 font-mono">{deploy.timestamp}</span>
                      </div>
                      <div className="flex flex-col gap-1 text-right">
                        <span className="text-[10px] text-zinc-600 font-bold uppercase tracking-widest">Status</span>
                        <span className={cn(
                          "text-xs font-bold",
                          deploy.status === 'Successful' ? 'text-emerald-500' : 'text-rose-500'
                        )}>{deploy.status}</span>
                      </div>
                      <Button variant="ghost" size="sm" className="text-zinc-500 hover:text-primary gap-2">
                        <ExternalLink className="w-3.5 h-3.5" /> <span className="hidden sm:inline">Preview</span>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

function DeployStat({ label, value, status }: { label: string, value: string, status: 'healthy' | 'neutral' }) {
  return (
    <Card className="bg-zinc-900/40 border-zinc-800/50">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">{label}</span>
          <div className={cn(
            "w-2 h-2 rounded-full",
            status === 'healthy' ? 'bg-emerald-500' : 'bg-zinc-600'
          )} />
        </div>
        <p className="text-2xl font-bold">{value}</p>
      </CardContent>
    </Card>
  );
}