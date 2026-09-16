
"use client"

import React, { useState } from 'react';
import { 
  Settings, 
  User, 
  Shield, 
  Cpu, 
  CreditCard, 
  Bell,
  ChevronRight,
  Zap,
  Lock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { VexaSidebar } from '@/components/layout/sidebar';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

export default function SettingsPage() {
  const { toast } = useToast();
  const [activeLayer, setActiveLayer] = useState<'vexa' | 'vision'>('vexa');

  const handlePreferenceClick = (label: string) => {
    toast({
      title: `${label} Accessed`,
      description: `VEXA is retrieving your ${label.toLowerCase()} configuration...`,
    });
  };

  const handleEditProfile = () => {
    toast({
      title: "Profile Editor",
      description: "Profile modification is currently in read-only mode for this workspace.",
    });
  };

  const handleLayerSwitch = (layer: 'vexa' | 'vision') => {
    setActiveLayer(layer);
    toast({
      title: "Intelligence Switched",
      description: `Now using ${layer === 'vexa' ? 'VEXA V1.4.0' : 'Vision Analysis'} as the primary reasoning engine.`,
    });
  };

  return (
    <div className="flex min-h-screen bg-[#09090b]">
      <VexaSidebar />

      <main className="flex-1 lg:ml-64 flex flex-col h-screen overflow-y-auto">
        <header className="h-16 border-b border-zinc-800/50 flex items-center justify-between px-8 bg-[#09090b]/80 backdrop-blur-md sticky top-0 z-40 shrink-0">
          <h2 className="text-xl font-bold flex items-center gap-3">
            <Settings className="w-5 h-5 text-primary" /> Workspace Settings
          </h2>
        </header>

        <div className="p-8 max-w-4xl mx-auto w-full space-y-10 pb-20">
          {/* Profile Section */}
          <section className="space-y-6">
            <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-500">Account</h3>
            <Card className="bg-zinc-900/40 border-zinc-800/50">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center text-primary font-bold text-xl border border-primary/20">
                      JD
                    </div>
                    <div>
                      <h4 className="text-lg font-bold">John Doe</h4>
                      <p className="text-sm text-zinc-500">Senior Systems Architect</p>
                    </div>
                  </div>
                  <Button 
                    variant="outline" 
                    onClick={handleEditProfile}
                    className="border-zinc-800 bg-zinc-900 hover:bg-zinc-800"
                  >
                    Edit Profile
                  </Button>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* AI Configuration */}
          <section className="space-y-6">
             <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-500">Intelligence Layers</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <SettingsCard 
                icon={<Cpu className="w-5 h-5 text-primary" />} 
                title="VEXA V1.4.0" 
                description="Active high-velocity reasoning model."
                active={activeLayer === 'vexa'}
                onClick={() => handleLayerSwitch('vexa')}
              />
              <SettingsCard 
                icon={<Zap className={cn("w-5 h-5", activeLayer === 'vision' ? "text-primary" : "text-zinc-600")} />} 
                title="Vision Analysis" 
                description="Asset generation & visual debugging."
                active={activeLayer === 'vision'}
                onClick={() => handleLayerSwitch('vision')}
              />
            </div>
          </section>

          {/* General Settings */}
          <section className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-500">System Preferences</h3>
            <div className="space-y-2">
              <SettingLink 
                icon={<Shield className="w-4 h-4" />} 
                label="Security & Access" 
                sub="Manage API keys and project permissions" 
                onClick={() => handlePreferenceClick("Security")}
              />
              <SettingLink 
                icon={<Bell className="w-4 h-4" />} 
                label="Notifications" 
                sub="Configure email and workspace alerts" 
                onClick={() => handlePreferenceClick("Notifications")}
              />
              <SettingLink 
                icon={<CreditCard className="w-4 h-4" />} 
                label="Billing & Subscription" 
                sub="Manage your workspace plan" 
                onClick={() => handlePreferenceClick("Billing")}
              />
              <SettingLink 
                icon={<Lock className="w-4 h-4" />} 
                label="Privacy" 
                sub="Data retention and project indexing policies" 
                onClick={() => handlePreferenceClick("Privacy")}
              />
            </div>
          </section>

          <div className="pt-10 flex justify-center">
            <p className="text-[10px] text-zinc-600 font-mono">VEXA VERSION 1.4.0 — BUILT FOR AGENTIC FLOWS</p>
          </div>
        </div>
      </main>
    </div>
  );
}

function SettingsCard({ icon, title, description, active, onClick }: { 
  icon: React.ReactNode, 
  title: string, 
  description: string, 
  active: boolean,
  onClick: () => void 
}) {
  return (
    <Card 
      onClick={onClick}
      className={cn(
        "bg-zinc-900/40 border-zinc-800/50 hover:bg-zinc-800/30 transition-all cursor-pointer group",
        active && "border-primary/40 ring-1 ring-primary/20"
      )}
    >
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className={cn(
            "p-2 bg-zinc-950 rounded-xl border transition-colors",
            active ? "border-primary/20" : "border-zinc-800"
          )}>
            {icon}
          </div>
          {active && <Badge className="bg-primary text-[9px] text-primary-foreground border-none">ACTIVE</Badge>}
        </div>
        <h4 className="font-bold mb-1">{title}</h4>
        <p className="text-xs text-zinc-500 leading-relaxed">{description}</p>
      </CardContent>
    </Card>
  );
}

function SettingLink({ icon, label, sub, onClick }: { 
  icon: React.ReactNode, 
  label: string, 
  sub: string,
  onClick: () => void 
}) {
  return (
    <div 
      onClick={onClick}
      className="flex items-center justify-between p-4 rounded-xl hover:bg-zinc-800/30 transition-all cursor-pointer group"
    >
      <div className="flex items-center gap-4">
        <div className="text-zinc-500 group-hover:text-primary transition-colors">
          {icon}
        </div>
        <div>
          <p className="text-sm font-semibold text-zinc-200">{label}</p>
          <p className="text-xs text-zinc-500">{sub}</p>
        </div>
      </div>
      <ChevronRight className="w-4 h-4 text-zinc-700 group-hover:text-zinc-400 transition-colors" />
    </div>
  );
}
