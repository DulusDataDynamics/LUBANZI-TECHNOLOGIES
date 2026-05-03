"use client"

import React from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { usePouch } from '@/components/pouch-context';
import { Trash2, Plus, Minus, Flower } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface PouchDrawerProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export const PouchDrawer: React.FC<PouchDrawerProps> = ({ isOpen, onOpenChange }) => {
  const { items, removeItem, updateQuantity, total, addItem } = usePouch();

  const handleAddMystery = () => {
    addItem({
      id: 'mystery-charm',
      name: 'Mystery Charm Pack',
      price: 6.00,
      image: 'https://picsum.photos/seed/mystery/200/200',
      quantity: 1,
      personalization: 'Surprise me!'
    });
  };

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-md flex flex-col h-full bg-background">
        <SheetHeader className="pb-6 border-b border-border/50">
          <SheetTitle className="font-headline text-2xl flex items-center gap-2">
            Your Pouch <HeartIcon className="text-primary w-5 h-5" />
          </SheetTitle>
        </SheetHeader>

        <div className="flex-grow overflow-y-auto py-6 space-y-6">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-8 space-y-4">
              <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center">
                <ShoppingBagIcon className="w-10 h-10 text-muted-foreground opacity-50" />
              </div>
              <p className="text-muted-foreground font-accent text-xl">Your pouch is empty... want to start a charm bracelet?</p>
              <Button asChild onClick={() => onOpenChange(false)} variant="outline" className="rounded-full border-primary text-primary hover:bg-primary/10">
                <Link href="/shop">Go Knotting</Link>
              </Button>
            </div>
          ) : (
            <>
              <ul className="space-y-6">
                {items.map((item, idx) => (
                  <li key={`${item.id}-${idx}`} className="flex gap-4 group">
                    <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden border border-border/50">
                      <Image src={item.image} alt={item.name} fill className="object-cover" />
                    </div>
                    <div className="flex-grow min-w-0">
                      <div className="flex justify-between">
                        <h4 className="font-medium text-sm truncate">{item.name}</h4>
                        <button onClick={() => removeItem(item.id)} className="text-muted-foreground hover:text-destructive transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      {item.personalization && (
                        <p className="text-xs text-muted-foreground font-accent mt-0.5">Note: {item.personalization}</p>
                      )}
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center border border-border/50 rounded-full h-8 px-1">
                          <button onClick={() => updateQuantity(item.id, -1)} className="p-1 hover:text-primary"><Minus className="w-3 h-3" /></button>
                          <span className="w-8 text-center text-xs font-medium">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, 1)} className="p-1 hover:text-primary"><Plus className="w-3 h-3" /></button>
                        </div>
                        <span className="text-sm font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="pt-6 border-t border-dashed border-border/50">
                <div className="bg-secondary/20 rounded-xl p-4 flex items-center gap-4 border border-secondary/30">
                  <div className="relative w-12 h-12 flex-shrink-0 rounded-lg overflow-hidden">
                    <Image src="https://picsum.photos/seed/mystery/100/100" alt="Mystery Pack" fill className="object-cover" />
                  </div>
                  <div className="flex-grow">
                    <h5 className="text-xs font-semibold">Mystery Charm Pack</h5>
                    <p className="text-[10px] text-muted-foreground">3 random charms for $6.00</p>
                  </div>
                  <Button size="sm" onClick={handleAddMystery} className="rounded-full h-8 px-3 text-[10px] bg-primary hover:bg-primary/80">Add</Button>
                </div>
              </div>

              <div className="space-y-2 pt-4">
                <div className="flex items-center gap-2 text-xs text-secondary-foreground bg-secondary/10 p-2 rounded-lg border border-secondary/20">
                  <Flower className="w-3 h-3" />
                  <span>Pressed flower added (+ $0.00 for magic)</span>
                </div>
              </div>
            </>
          )}
        </div>

        {items.length > 0 && (
          <SheetFooter className="border-t border-border/50 pt-6 flex-col gap-4">
            <div className="w-full space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-semibold">${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Estimated Shipping</span>
                <span className="font-semibold">$4.50</span>
              </div>
              <div className="flex justify-between text-lg pt-2 border-t border-border/50">
                <span className="font-headline">Total</span>
                <span className="font-semibold">${(total + 4.50).toFixed(2)}</span>
              </div>
            </div>
            <Button asChild className="w-full h-12 rounded-full font-semibold bg-accent text-accent-foreground hover:bg-accent/80 transition-all">
              <Link href="/checkout" onClick={() => onOpenChange(false)}>Checkout My Charms</Link>
            </Button>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
};

const HeartIcon = (props: any) => <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" /></svg>
const ShoppingBagIcon = (props: any) => <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
