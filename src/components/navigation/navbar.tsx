
"use client"

import React from 'react';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { Moon, Sun, ShoppingBag, BookOpen, Heart, Sparkles } from 'lucide-react';
import { usePouch } from '@/components/pouch-context';
import { PouchDrawer } from '@/components/pouch/pouch-drawer';
import { Button } from '@/components/ui/button';

export const Navbar: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const { itemCount } = usePouch();
  const [isPouchOpen, setIsPouchOpen] = React.useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-background/80 backdrop-blur-md border-b border-border/50 transition-colors">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity group">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 border border-primary/20 shadow-sm">
              <BraceletIcon className="w-5 h-5 text-primary" />
            </div>
            <div className="flex items-center gap-1.5">
              <span className="font-headline text-2xl tracking-tight">Niki's Charms</span>
              <Heart className="h-4 w-4 text-primary fill-primary group-hover:scale-125 transition-transform duration-300" />
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            <Link href="/shop" className="hover:text-primary transition-colors">Shop</Link>
            <Link href="/diary" className="hover:text-primary transition-colors">Diary</Link>
          </nav>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="rounded-full hover:bg-primary/10 transition-colors"
            >
              {theme === 'dark' ? (
                <Sun className="h-5 w-5 text-accent" />
              ) : (
                <Moon className="h-5 w-5 text-secondary-foreground" />
              )}
              <span className="sr-only">Toggle theme</span>
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsPouchOpen(true)}
              className="relative rounded-full hover:bg-primary/10 transition-colors"
            >
              <ShoppingBag className="h-5 w-5" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center">
                  {itemCount}
                </span>
              )}
              <span className="sr-only">Open Pouch</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile Bottom Nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-background/95 backdrop-blur-md border-t border-border/50 px-6 py-3 flex items-center justify-between">
        <Link href="/" className="flex flex-col items-center gap-1">
          <Heart className="h-5 w-5" />
          <span className="text-[10px]">Home</span>
        </Link>
        <Link href="/shop" className="flex flex-col items-center gap-1">
          <Sparkles className="h-5 w-5" />
          <span className="text-[10px]">Shop</span>
        </Link>
        <Link href="/diary" className="flex flex-col items-center gap-1">
          <BookOpen className="h-5 w-5" />
          <span className="text-[10px]">Diary</span>
        </Link>
        <button onClick={() => setIsPouchOpen(true)} className="flex flex-col items-center gap-1 relative">
          <ShoppingBag className="h-5 w-5" />
          {itemCount > 0 && (
            <span className="absolute -top-1 -right-2 bg-primary text-primary-foreground text-[8px] font-bold h-3 w-3 rounded-full flex items-center justify-center">
              {itemCount}
            </span>
          )}
          <span className="text-[10px]">Pouch</span>
        </button>
      </nav>

      <PouchDrawer isOpen={isPouchOpen} onOpenChange={setIsPouchOpen} />
    </>
  );
};

const BraceletIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="9" />
    <circle cx="12" cy="3" r="1.5" fill="currentColor" />
    <circle cx="12" cy="21" r="1.5" fill="currentColor" />
    <circle cx="3" cy="12" r="1.5" fill="currentColor" />
    <circle cx="21" cy="12" r="1.5" fill="currentColor" />
    <circle cx="5.5" cy="5.5" r="1" fill="currentColor" />
    <circle cx="18.5" cy="5.5" r="1" fill="currentColor" />
    <circle cx="5.5" cy="18.5" r="1" fill="currentColor" />
    <circle cx="18.5" cy="18.5" r="1" fill="currentColor" />
  </svg>
);
