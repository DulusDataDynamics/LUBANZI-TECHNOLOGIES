"use client"

import React from 'react';
import Image from 'next/image';
import { DIARY_ENTRIES } from '@/lib/mock-data';
import { Heart, Music, Share2, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';

export default function DiaryPage() {
  const handleShare = (id: string) => {
    navigator.clipboard.writeText(`${window.location.origin}/diary#${id}`);
    toast({
      title: "Link copied! 💌",
      description: "Save this idea to your collection."
    });
  };

  return (
    <div className="min-h-screen bg-card/30">
      <header className="pt-24 pb-12 text-center container mx-auto px-4">
        <span className="font-accent text-3xl text-primary">Notes from the desk</span>
        <h1 className="text-6xl font-headline tracking-tighter mb-4">The Charm Diary</h1>
        <p className="text-muted-foreground max-w-lg mx-auto italic">
          A vertical stream of memories, tutorials, and dreamy afternoons.
        </p>
      </header>

      <div className="container mx-auto px-4 max-w-3xl pb-32">
        <div className="space-y-32">
          {DIARY_ENTRIES.map((entry, idx) => (
            <article 
              key={entry.id} 
              id={entry.id}
              className={`flex flex-col gap-12 ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
            >
              <div className="w-full md:w-1/2 group">
                <div className="relative aspect-[4/5] p-4 bg-white shadow-2xl rounded-sm border border-border/20 rotate-[-2deg] group-hover:rotate-0 transition-all duration-700">
                  <div className="relative w-full h-full overflow-hidden">
                    <Image src={entry.image} alt={entry.title} fill className="object-cover" />
                  </div>
                  <div className="pt-6 pb-2 px-1">
                    <span className="font-accent text-xl text-primary/60">{entry.date}</span>
                  </div>
                  {/* Polaroid Flash Effect */}
                  <div className="absolute inset-4 bg-gradient-to-tr from-white/10 to-transparent pointer-events-none" />
                </div>
              </div>

              <div className="w-full md:w-1/2 flex flex-col justify-center space-y-6">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-accent animate-pulse" />
                  <span className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground">New entry</span>
                </div>
                <h2 className="text-4xl font-headline leading-tight">{entry.title}</h2>
                <p className="text-lg text-muted-foreground leading-relaxed font-body">
                  {entry.content}
                </p>
                <div className="flex items-center gap-4 pt-4">
                  <Button 
                    onClick={() => handleShare(entry.id)}
                    variant="ghost" 
                    className="rounded-full text-xs gap-2 hover:bg-primary/10 transition-colors"
                  >
                    <Share2 className="w-4 h-4" /> Save Idea
                  </Button>
                  <Button variant="ghost" className="rounded-full text-xs gap-2 hover:bg-primary/10">
                    <Heart className="w-4 h-4" /> 24 Love
                  </Button>
                </div>
              </div>
            </article>
          ))}

          {/* Special Playlist Section */}
          <section className="bg-background/80 backdrop-blur-md p-12 rounded-[3rem] border border-dashed border-primary/30 flex flex-col items-center text-center space-y-6">
            <Music className="w-12 h-12 text-primary animate-bounce" />
            <h3 className="text-3xl font-headline">Niki's Monthly Playlist</h3>
            <p className="font-accent text-2xl text-muted-foreground">
              What I was listening to while knotting your charms this month.
            </p>
            <div className="w-full max-w-sm h-20 bg-muted rounded-2xl flex items-center justify-center border border-border/50">
              {/* Mock embedded Spotify */}
              <span className="text-xs uppercase tracking-[0.2em] font-bold opacity-30">Embedded Spotify Widget</span>
            </div>
            <Button variant="outline" className="rounded-full border-primary text-primary hover:bg-primary hover:text-white">Follow Playlist</Button>
          </section>
        </div>
      </div>
    </div>
  );
}
