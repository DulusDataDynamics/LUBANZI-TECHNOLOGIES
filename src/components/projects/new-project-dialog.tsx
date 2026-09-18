
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
import { useUser, useFirestore } from '@/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

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
  const { user } = useUser();
  const db = useFirestore();

  const handleCreate = async () => {
    if (!name.trim() || !db || !user) return;

    setIsInitializing(true);
    
    try {
      // Simulate AI Scaffolding
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const docRef = await addDoc(collection(db, 'projects'), {
        name: name,
        description: description,
        status: 'Idle',
        ownerId: user.uid,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        memory: {
          purpose: description,
          architecture: 'Analyzing...',
          preferences: 'Standard TypeScript',
          knownIssues: 'None detected'
        }
      });

      // Add initial activity
      await addDoc(collection(db, 'projects', docRef.id, 'activities'), {
        type: 'create',
        title: 'Project Initialized',
        description: `${name} has been successfully scaffolded by VEXA V1.4.0.`,
        timestamp: new Date().toISOString(),
        agent: 'Planner'
      });
      
      setIsInitializing(false);
      setIsOpen(false);
      
      toast({
        title: "Project Initialized",
        description: `${name} is ready for instructions.`,
      });

      router.push(`/workspace/${docRef.id}`);
    } catch (e) {
      toast({
        variant: "destructive",
        title: "Scaffolding Failed",
        description: "VEXA encountered a grid sync error.",
      });
      setIsInitializing(false);
    }
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
              placeholder="Describe what you want to build..." 
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
