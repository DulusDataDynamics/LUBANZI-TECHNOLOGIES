
"use client"

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { LoadingScreen } from '@/components/ui/loading-screen';
import { PRODUCTS } from '@/lib/mock-data';
import { Star, Moon, ArrowRight, Instagram, Heart } from 'lucide-react';

export default function Home() {
  const bestsellers = PRODUCTS.filter(p => p.isBestseller);
  const instagramUrl = "https://www.instagram.com/nikis_charms/";

  return (
    <div className="relative overflow-hidden">
      <LoadingScreen />

      {/* Hero Section */}
      <section className="relative h-[85vh] w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://picsum.photos/seed/nikis-charms-hero/1920/1080"
            alt="Hand knotting charms"
            fill
            className="object-cover brightness-90 grayscale-[0.2]"
            data-ai-hint="pastel friendship bracelet workspace"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/60" />
        </div>
        
        <div className="relative z-10 text-center text-white px-4 max-w-2xl">
          <span className="font-accent text-3xl mb-4 block animate-bounce">One of a kind...</span>
          <h1 className="font-headline text-5xl md:text-7xl mb-6 tracking-tight leading-tight">
            Hand-knotted memories. One charm at a time.
          </h1>
          <Button asChild size="lg" className="rounded-full bg-accent text-accent-foreground hover:bg-accent/80 transition-all duration-300 animate-pulse-soft px-10 h-14 text-lg">
            <Link href="/shop">Shop Newest Drop</Link>
          </Button>
        </div>
      </section>

      {/* Customization Bar */}
      <div className="bg-primary/20 py-3 border-y border-primary/30 text-center sticky top-16 z-30 backdrop-blur-sm">
        <p className="text-sm font-medium flex items-center justify-center gap-2">
          🌷 Add a letter bead or birthstone charm for +$3 – just leave a note at checkout.
        </p>
      </div>

      {/* Bestsellers Row */}
      <section className="py-20 container mx-auto px-4 overflow-hidden">
        <div className="flex items-end justify-between mb-12">
          <div>
            <span className="text-primary font-accent text-2xl">Crafted with love</span>
            <h2 className="text-4xl font-headline mt-2">Bestsellers</h2>
          </div>
          <Link href="/shop" className="group flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors">
            View All <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="flex gap-6 overflow-x-auto pb-8 scrollbar-hide -mx-4 px-4 snap-x">
          {bestsellers.map(product => (
            <div key={product.id} className="min-w-[280px] md:min-w-[320px] group snap-start">
              <Link href={`/shop/${product.id}`} className="block space-y-4">
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-muted border border-border/50">
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-4 right-4 bg-background/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest flex items-center gap-1.5 shadow-sm">
                    <Moon className="w-3 h-3 text-secondary-foreground" />
                    Bestseller
                  </div>
                </div>
                <div className="flex justify-between items-start px-1">
                  <div>
                    <h3 className="font-headline text-xl">{product.name}</h3>
                    <p className="text-muted-foreground text-sm">{product.category}</p>
                  </div>
                  <span className="font-semibold text-primary">${product.price.toFixed(2)}</span>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Handwritten Note Section */}
      <section className="py-24 bg-card/50 relative">
        <div className="container mx-auto px-4 flex flex-col items-center">
          <div className="relative max-w-xl bg-background p-10 md:p-16 shadow-xl rounded-[2rem] border border-border/50 rotate-1 transform-gpu">
            <div className="absolute top-4 right-8 opacity-20"><Heart className="w-12 h-12 text-primary" /></div>
            <div className="absolute -bottom-4 -left-4 w-24 h-24 rotate-[-15deg] opacity-40">
              <Image src="https://picsum.photos/seed/flower/200/200" alt="Dried flower" width={200} height={200} className="rounded-full" />
            </div>
            
            <div className="font-accent text-3xl md:text-4xl leading-relaxed text-center space-y-6 text-foreground/80">
              <p>Every bracelet is knotted while listening to lo-fi.</p>
              <p>Every keychain comes with a pressed flower.</p>
              <p className="text-primary pt-4 font-headline not-italic text-2xl">Thank you for being here.</p>
              <p className="text-sm font-body uppercase tracking-[0.3em] pt-4 opacity-50">— Niki</p>
            </div>
          </div>
        </div>
      </section>

      {/* Instagram Grid (Static Mock) */}
      <section className="py-20 container mx-auto px-4">
        <div className="text-center mb-12">
          <a 
            href={instagramUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-block group"
          >
            <h2 className="text-3xl font-headline mb-4 flex items-center justify-center gap-2 group-hover:text-primary transition-colors">
              <Instagram className="w-6 h-6" /> From our community
            </h2>
            <p className="text-muted-foreground font-accent text-xl">Tag #NikisCharms to be featured 📸</p>
          </a>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map(i => (
            <a 
              key={i} 
              href={instagramUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="aspect-square relative rounded-xl overflow-hidden group cursor-pointer border border-border/50"
            >
              <Image
                src={`https://picsum.photos/seed/insta${i}/600/600`}
                alt="Instagram post"
                fill
                className="object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-500"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Heart className="text-white fill-white w-8 h-8" />
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 bg-background border-t border-border/50">
        <div className="container mx-auto px-4 text-center space-y-8">
          <div className="flex flex-col items-center gap-4">
            <h3 className="font-headline text-3xl">Niki's Charms</h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              Knotted with intention in Seattle. Every order plants one virtual wildflower (we donate to pollinator funds).
            </p>
          </div>
          <div className="flex items-center justify-center gap-8 text-sm font-medium">
            <Link href="/shop" className="hover:text-primary">Shop</Link>
            <Link href="/diary" className="hover:text-primary">Diary</Link>
            <a href={instagramUrl} target="_blank" rel="noopener noreferrer" className="hover:text-primary flex items-center gap-1">
              <Instagram className="w-4 h-4" /> Instagram
            </a>
            <Link href="#" className="hover:text-primary">Contact</Link>
          </div>
          <div className="pt-8 border-t border-border/30 text-[10px] uppercase tracking-widest text-muted-foreground">
            © 2024 NIKI'S CHARMS. ALL MEMORIES KNOTTED HANDMADE.
          </div>
        </div>
      </footer>
    </div>
  );
}
