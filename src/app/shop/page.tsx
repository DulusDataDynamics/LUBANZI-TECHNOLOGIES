"use client"

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { PRODUCTS, ProductCategory } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Heart } from 'lucide-react';
import { usePouch } from '@/components/pouch-context';
import { toast } from '@/hooks/use-toast';

export default function ShopPage() {
  const [activeCategory, setActiveCategory] = useState<ProductCategory | 'All'>('All');
  const { addItem } = usePouch();

  const categories: (ProductCategory | 'All')[] = ['All', 'Bracelets', 'Keychains', 'Photocards'];

  const filteredProducts = useMemo(() => {
    if (activeCategory === 'All') return PRODUCTS;
    return PRODUCTS.filter(p => p.category === activeCategory);
  }, [activeCategory]);

  const handleQuickAdd = (e: React.MouseEvent, product: any) => {
    e.preventDefault();
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      quantity: 1
    });
    toast({
      title: "Added to Pouch ✨",
      description: `${product.name} is now in your charms collection.`
    });
  };

  return (
    <div className="min-h-screen pt-12 pb-24 container mx-auto px-4">
      <header className="mb-16 text-center space-y-4">
        <span className="font-accent text-3xl text-primary">Browse the collection</span>
        <h1 className="text-5xl font-headline tracking-tight">The Charm Drop</h1>
        
        <div className="flex flex-wrap items-center justify-center gap-2 pt-8">
          {categories.map(cat => (
            <Button
              key={cat}
              variant={activeCategory === cat ? 'default' : 'ghost'}
              onClick={() => setActiveCategory(cat)}
              className={`rounded-full px-6 ${activeCategory === cat ? 'bg-primary text-primary-foreground' : 'hover:bg-primary/10'}`}
            >
              {cat}
            </Button>
          ))}
        </div>
      </header>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12">
        {filteredProducts.map(product => (
          <div key={product.id} className="group relative flex flex-col">
            <Link href={`/shop/${product.id}`} className="block relative group-hover:-translate-y-2 transition-transform duration-500">
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-card border border-border/50">
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-1000"
                />
                
                {/* Badge Overlay */}
                <div className="absolute top-3 left-3 flex flex-col gap-2">
                  <Badge className="bg-background/80 text-foreground backdrop-blur-md border-none shadow-sm flex items-center gap-1.5 py-1 px-2.5">
                    <Sparkles className="w-3 h-3 text-accent" /> handmade
                  </Badge>
                  {product.stockCount < 5 && (
                    <Badge variant="destructive" className="animate-pulse shadow-sm py-1 px-2.5">
                      Low Stock
                    </Badge>
                  )}
                </div>

                {/* Quick Add Overlay */}
                <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-6">
                  <Button 
                    size="sm" 
                    onClick={(e) => handleQuickAdd(e, product)}
                    className="rounded-full bg-background text-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300 shadow-xl gap-2"
                  >
                    <PlusIcon className="w-4 h-4" /> Quick Pouch
                  </Button>
                </div>
              </div>

              <div className="mt-4 flex flex-col items-center text-center px-2">
                <h3 className="font-headline text-lg group-hover:text-primary transition-colors">{product.name}</h3>
                <p className="text-muted-foreground text-sm font-accent text-xl mt-1">${product.price.toFixed(2)}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="py-24 text-center space-y-4">
          <p className="font-accent text-2xl text-muted-foreground">More charms arriving soon...</p>
          <Button onClick={() => setActiveCategory('All')} variant="link">Show everything</Button>
        </div>
      )}
    </div>
  );
}

const PlusIcon = (props: any) => <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12h14" /></svg>
