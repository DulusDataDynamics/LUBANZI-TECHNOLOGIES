"use client"

import React, { useState, useTransition } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { PRODUCTS } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { usePouch } from '@/components/pouch-context';
import { toast } from '@/hooks/use-toast';
import { suggestGiftNote } from '@/ai/flows/suggest-gift-note';
import { suggestLetterBeads } from '@/ai/flows/suggest-letter-beads';
import { Sparkles, Heart, Star, Truck, RefreshCcw, Wand2, MessageCircleHeart } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

export default function ProductDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const product = PRODUCTS.find(p => p.id === id);
  const { addItem } = usePouch();
  const [personalization, setPersonalization] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [isSuggestingNote, startSuggestingNote] = useTransition();
  const [isSuggestingBeads, startSuggestingBeads] = useTransition();

  if (!product) return <div>Product not found</div>;

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      quantity,
      personalization: personalization || undefined
    });
    toast({
      title: "In your Pouch! ✨",
      description: `${product.name} was added. Check your pouch to complete order.`
    });
  };

  const handleAiNote = async () => {
    startSuggestingNote(async () => {
      try {
        const res = await suggestGiftNote({
          recipient: "a friend",
          occasion: "just because",
          giftType: product.name
        });
        setPersonalization(res.giftNote);
      } catch (e) {
        toast({ variant: 'destructive', title: 'Oops', description: 'Failed to generate note.' });
      }
    });
  };

  const handleAiBeads = async () => {
    startSuggestingBeads(async () => {
      try {
        const res = await suggestLetterBeads({
          context: "a summer dream",
          itemType: product.category
        });
        setPersonalization(res.suggestions[0]);
      } catch (e) {
        toast({ variant: 'destructive', title: 'Oops', description: 'Failed to generate bead ideas.' });
      }
    });
  };

  return (
    <div className="container mx-auto px-4 py-12 md:py-24">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24">
        {/* Left: Gallery */}
        <div className="space-y-6">
          <Carousel className="w-full">
            <CarouselContent>
              {product.images.map((img, idx) => (
                <CarouselItem key={idx}>
                  <div className="relative aspect-[3/4] rounded-3xl overflow-hidden bg-card border border-border/50">
                    <Image src={img} alt={product.name} fill className="object-cover" />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-4" />
            <CarouselNext className="right-4" />
          </Carousel>
          
          <div className="grid grid-cols-4 gap-4">
            {product.images.map((img, idx) => (
              <div key={idx} className="relative aspect-square rounded-xl overflow-hidden border border-border/50 cursor-pointer hover:opacity-80">
                <Image src={img} alt="thumbnail" fill className="object-cover" />
              </div>
            ))}
          </div>
        </div>

        {/* Right: Details */}
        <div className="flex flex-col space-y-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">Handmade in 1–3 days</span>
              {product.stockCount < 10 && (
                <span className="text-destructive text-[10px] font-bold uppercase tracking-widest animate-pulse flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> Only {product.stockCount} left
                </span>
              )}
            </div>
            <h1 className="text-4xl md:text-5xl font-headline tracking-tight">{product.name}</h1>
            <p className="text-2xl font-accent text-primary mt-2">${product.price.toFixed(2)}</p>
          </div>

          <p className="text-muted-foreground leading-relaxed">{product.description}</p>

          <div className="space-y-6 pt-4 border-t border-border/50">
            {product.personalizable && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="personalization" className="text-sm font-semibold flex items-center gap-2">
                    <MessageCircleHeart className="w-4 h-4 text-primary" /> Personalization
                  </Label>
                  <div className="flex gap-2">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-[10px] h-7 px-2 text-secondary-foreground hover:bg-secondary/20"
                      onClick={handleAiNote}
                      disabled={isSuggestingNote}
                    >
                      <Wand2 className="w-3 h-3 mr-1" /> {isSuggestingNote ? 'Thinking...' : 'AI Gift Note'}
                    </Button>
                    {product.category === 'Bracelets' && (
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-[10px] h-7 px-2 text-accent-foreground hover:bg-accent/20"
                        onClick={handleAiBeads}
                        disabled={isSuggestingBeads}
                      >
                        <Star className="w-3 h-3 mr-1" /> {isSuggestingBeads ? 'Styling...' : 'Bead Ideas'}
                      </Button>
                    )}
                  </div>
                </div>
                <Input
                  id="personalization"
                  placeholder="Add up to 3 letter beads (e.g. 'N + K') or a tiny note..."
                  value={personalization}
                  onChange={(e) => setPersonalization(e.target.value)}
                  maxLength={30}
                  className="rounded-xl border-border/50 bg-card/30"
                />
                <p className="text-[10px] text-muted-foreground text-right">{personalization.length}/30 characters</p>
              </div>
            )}

            <div className="flex items-center gap-4">
              <div className="flex items-center border border-border rounded-full h-12 px-2 bg-card/30">
                <Button variant="ghost" size="icon" onClick={() => setQuantity(Math.max(1, quantity - 1))} className="rounded-full h-8 w-8"><MinusIcon className="w-3 h-3" /></Button>
                <span className="w-10 text-center font-semibold">{quantity}</span>
                <Button variant="ghost" size="icon" onClick={() => setQuantity(quantity + 1)} className="rounded-full h-8 w-8"><PlusIcon className="w-3 h-3" /></Button>
              </div>
              <Button onClick={handleAddToCart} className="flex-grow h-12 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-lg shadow-lg hover:shadow-xl transition-all gap-2 group">
                Add to Pouch <Heart className="w-5 h-5 group-hover:scale-125 transition-transform" />
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-8 border-t border-border/50 text-[10px] uppercase tracking-widest text-muted-foreground">
            <div className="flex items-center gap-2"><Truck className="w-4 h-4" /> Global Shipping</div>
            <div className="flex items-center gap-2"><RefreshCcw className="w-4 h-4" /> Recycled Packaging</div>
            <div className="flex items-center gap-2"><Heart className="w-4 h-4" /> Knotted Hand-made</div>
            <div className="flex items-center gap-2"><Star className="w-4 h-4" /> Custom Gifts</div>
          </div>

          <div className="bg-secondary/10 rounded-2xl p-6 border border-secondary/20">
            <h4 className="font-headline text-lg mb-2">Shipping note ✉️</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              All orders come in a recycled kraft box with dried lavender and a holographic charm sticker. 
              Orders containing handmade bracelets may take up to 3 days to ship.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

const PlusIcon = (props: any) => <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12h14" /></svg>
const MinusIcon = (props: any) => <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /></svg>
