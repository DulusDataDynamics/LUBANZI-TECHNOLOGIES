"use client"

import React, { useState } from 'react';
import { usePouch } from '@/components/pouch-context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Heart, ArrowLeft, ShieldCheck, Gift } from 'lucide-react';
import Link from 'next/link';

export default function CheckoutPage() {
  const { total, items, clearPouch } = usePouch();
  const [isOrdered, setIsOrdered] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsOrdered(true);
    clearPouch();
  };

  if (isOrdered) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center text-center space-y-8 px-4">
        <div className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center animate-bounce">
          <Heart className="w-12 h-12 text-primary fill-primary" />
        </div>
        <h1 className="text-5xl font-headline">Order Knotted!</h1>
        <p className="font-accent text-2xl text-muted-foreground max-w-md">
          Thank you for choosing Niki's Charms. We're starting to knot your memories right now.
          Check your email for a little sprinkle of magic.
        </p>
        <Button asChild className="rounded-full px-10 h-14 bg-accent text-accent-foreground">
          <Link href="/">Back to the Workshop</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16 md:py-24 max-w-6xl">
      <Link href="/shop" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-12">
        <ArrowLeft className="w-4 h-4" /> Keep knotting charms
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Left: Checkout Form */}
        <div className="space-y-12">
          <section className="space-y-6">
            <h2 className="text-3xl font-headline border-b border-border/50 pb-4">Where should they go?</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" required className="rounded-xl" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" required className="rounded-xl" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" required className="rounded-xl" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input id="address" required className="rounded-xl" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input id="city" required className="rounded-xl" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="zip">Zip Code</Label>
                  <Input id="zip" required className="rounded-xl" />
                </div>
              </div>
              
              <div className="pt-8 space-y-4">
                <h3 className="text-xl font-headline flex items-center gap-2">
                  <Gift className="w-5 h-5 text-primary" /> Gift Options
                </h3>
                <div className="flex items-center space-x-2 bg-card/50 p-4 rounded-xl border border-border/50">
                  <Checkbox id="wrap" />
                  <Label htmlFor="wrap" className="text-sm font-medium">Wrap in heart-themed tissue paper (free) 💖</Label>
                </div>
              </div>

              <Button type="submit" className="w-full h-14 rounded-full bg-accent text-accent-foreground text-lg font-bold shadow-xl hover:shadow-2xl transition-all">
                Complete Order – ${(total + 4.50).toFixed(2)}
              </Button>
            </form>
          </section>
        </div>

        {/* Right: Summary */}
        <div className="bg-card/50 p-8 md:p-12 rounded-[2rem] border border-border/50 h-fit space-y-8">
          <h2 className="text-2xl font-headline">Order Summary</h2>
          <div className="space-y-6">
            {items.map((item, idx) => (
              <div key={idx} className="flex gap-4">
                <div className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 border border-border/30">
                  <Image src={item.image} alt={item.name} fill className="object-cover" />
                </div>
                <div className="flex-grow">
                  <h4 className="font-medium text-sm">{item.name}</h4>
                  <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                </div>
                <span className="text-sm font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>

          <div className="space-y-3 pt-6 border-t border-border/50">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Subtotal</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Shipping (US Flat Rate)</span>
              <span>$4.50</span>
            </div>
            <div className="flex justify-between text-xl font-headline pt-4 border-t border-border/50">
              <span>Total</span>
              <span className="text-primary">${(total + 4.50).toFixed(2)}</span>
            </div>
          </div>

          <div className="flex items-center justify-center gap-2 text-[10px] uppercase tracking-widest text-muted-foreground pt-4">
            <ShieldCheck className="w-4 h-4" /> Secure checkout powered by Niki
          </div>
        </div>
      </div>
    </div>
  );
}
