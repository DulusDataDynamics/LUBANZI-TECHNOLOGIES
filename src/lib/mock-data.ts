export type ProductCategory = 'Bracelets' | 'Keychains' | 'Photocards';

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  category: ProductCategory;
  images: string[];
  tags: string[];
  isBestseller?: boolean;
  stockCount: number;
  personalizable?: boolean;
}

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Twilight Dream Bracelet',
    price: 18.00,
    description: 'A hand-knotted masterpiece featuring soft lavender and midnight blue threads. Finished with a gold crescent moon charm.',
    category: 'Bracelets',
    images: [
      'https://picsum.photos/seed/bracelet1/600/800',
      'https://picsum.photos/seed/bracelet1-2/600/800'
    ],
    tags: ['pink', 'mixed', 'handmade'],
    isBestseller: true,
    stockCount: 5,
    personalizable: true,
  },
  {
    id: '2',
    name: 'Strawberry Milkheart Keychain',
    price: 14.50,
    description: 'Acrylic heart filled with dried baby\'s breath and tiny pink heart glitter. Perfect for your favorite tote bag.',
    category: 'Keychains',
    images: [
      'https://picsum.photos/seed/keychain1/600/800',
      'https://picsum.photos/seed/keychain1-2/600/800'
    ],
    tags: ['acrylic', 'pink'],
    isBestseller: true,
    stockCount: 12,
    personalizable: true,
  },
  {
    id: '3',
    name: 'Soft Glow Photocard Set',
    price: 12.00,
    description: 'A collection of 3 holographic-finish photocards with hand-drawn dreamy motifs. Collector\'s favorite.',
    category: 'Photocards',
    images: [
      'https://picsum.photos/seed/pc1/600/800',
      'https://picsum.photos/seed/pc1-2/600/800'
    ],
    tags: ['K-pop inspired', 'love'],
    isBestseller: true,
    stockCount: 20,
    personalizable: false,
  },
  {
    id: '4',
    name: 'Forest Whisper Bracelet',
    price: 16.00,
    description: 'Earthy greens and cream threads, knotted with intention. Features a tiny raw emerald-colored bead.',
    category: 'Bracelets',
    images: [
      'https://picsum.photos/seed/bracelet2/600/800',
      'https://picsum.photos/seed/bracelet2-2/600/800'
    ],
    tags: ['blue', 'custom'],
    isBestseller: false,
    stockCount: 3,
    personalizable: true,
  },
  {
    id: '5',
    name: 'Cloud Nine Resin Charm',
    price: 15.00,
    description: 'Resin cloud with encapsulated iridescent flakes. Comes with a lavender bag strap.',
    category: 'Keychains',
    images: [
      'https://picsum.photos/seed/keychain2/600/800',
      'https://picsum.photos/seed/keychain2-2/600/800'
    ],
    tags: ['resin', 'purple'],
    isBestseller: false,
    stockCount: 8,
    personalizable: true,
  },
  {
    id: '6',
    name: 'Sunset Serenade Photocard',
    price: 5.00,
    description: 'Single premium photocard with a warm sunset palette and glossy finish.',
    category: 'Photocards',
    images: [
      'https://picsum.photos/seed/pc2/600/800',
      'https://picsum.photos/seed/pc2-2/600/800'
    ],
    tags: ['friendship', 'K-pop inspired'],
    isBestseller: false,
    stockCount: 15,
    personalizable: false,
  }
];

export interface DiaryEntry {
  id: string;
  title: string;
  date: string;
  image: string;
  content: string;
}

export const DIARY_ENTRIES: DiaryEntry[] = [
  {
    id: '1',
    title: 'Dyeing threads with tea',
    date: 'Oct 12, 2023',
    image: 'https://picsum.photos/seed/diary1/400/500',
    content: 'A peaceful afternoon spent turning bright white cotton into vintage-inspired cream threads using black tea baths...'
  },
  {
    id: '2',
    title: 'How to tie a bracelet on a friend',
    date: 'Nov 05, 2023',
    image: 'https://picsum.photos/seed/diary2/400/500',
    content: 'The secret is in the double-knot and the wish you make together. Here is my favorite way to secure a charm...'
  },
  {
    id: '3',
    title: 'Photocard storage ideas',
    date: 'Dec 01, 2023',
    image: 'https://picsum.photos/seed/diary3/400/500',
    content: 'Organizing your collection can be as dreamy as the cards themselves. I love using lace-trimmed binders...'
  }
];
