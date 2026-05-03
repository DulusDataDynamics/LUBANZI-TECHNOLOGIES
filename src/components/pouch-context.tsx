"use client"

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface PouchItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  personalization?: string;
}

interface PouchContextType {
  items: PouchItem[];
  addItem: (item: PouchItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, delta: number) => void;
  clearPouch: () => void;
  itemCount: number;
  total: number;
}

const PouchContext = createContext<PouchContextType | undefined>(undefined);

export const PouchProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<PouchItem[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('nikis_pouch');
    if (saved) setItems(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('nikis_pouch', JSON.stringify(items));
  }, [items]);

  const addItem = (item: PouchItem) => {
    setItems(prev => {
      const existing = prev.find(i => i.id === item.id && i.personalization === item.personalization);
      if (existing) {
        return prev.map(i => i === existing ? { ...i, quantity: i.quantity + item.quantity } : i);
      }
      return [...prev, item];
    });
  };

  const removeItem = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    setItems(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const clearPouch = () => setItems([]);

  const itemCount = items.reduce((acc, item) => acc + item.quantity, 0);
  const total = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  return (
    <PouchContext.Provider value={{ items, addItem, removeItem, updateQuantity, clearPouch, itemCount, total }}>
      {children}
    </PouchContext.Provider>
  );
};

export const usePouch = () => {
  const context = useContext(PouchContext);
  if (!context) throw new Error('usePouch must be used within a PouchProvider');
  return context;
};
