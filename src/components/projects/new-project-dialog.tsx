
"use client"

import React, { useState } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter,
  DialogTrigger
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Loader2, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';

interface NewProjectDialogProps {
  children?: React.ReactNode;
}

export function NewProjectDialog({ children }: NewProjectDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isInitializing, setIsInitializing] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const { toast } = useToast();
  const router = useRouter();

  const handleCreate = async () => {
    if (!name.trim()) return;

    setIsInitializing(true);
    
    // Simulate AI Scaffolding
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsInitializing(false);
    setIsOpen(false);
    
    toast({
      title: "Project Initialized",
      description: `${name} has been successfully scaffolded by VEXA.`,
    });

    // In a real app, this would redirect to the new project ID
    router.push('/workspace/vexa-core');
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children || (
          <Button className="rounded-md bg-white text-black hover:bg-zinc-200 font-semibold px-6">
            <Plus className="w-4 h-4 mr-2" /> New Project
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="bg-card border-border text-white sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-emerald-500" /> Initialize New Project
          </DialogTitle>
          <DialogDescription className="text-zinc-500">
            VEXA will analyze your requirements and scaffold a premium project architecture.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-6 py-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Project Name</Label>
            <Input 
              id="name" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. quantum-engine-v2" 
              className="bg-black border-border focus:border-zinc-700 h-12" 
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description" className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Vision & Purpose</Label>
            <Textarea 
              id="description" 
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe what you want to build... (e.g. A real-time data visualizer with Next.js)" 
              className="bg-black border-border focus:border-zinc-700 min-h-[120px] resize-none" 
            />
          </div>
        </div>
        <DialogFooter className="gap-2 sm:gap-0">
          <Button 
            variant="outline" 
            onClick={() => setIsOpen(false)} 
            className="border-border hover:bg-zinc-900"
            disabled={isInitializing}
          >
            Cancel
          </Button>
          <Button 
            className="bg-white text-black hover:bg-zinc-200 min-w-[140px]" 
            onClick={handleCreate}
            disabled={isInitializing || !name.trim()}
          >
            {isInitializing ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Scaffolding...
              </>
            ) : (
              'Create Workspace'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
