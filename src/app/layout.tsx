import type {Metadata} from 'next';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { PouchProvider } from '@/components/pouch-context';
import { Navbar } from '@/components/navigation/navbar';
import { CursorTrail } from '@/components/ui/cursor-trail';
import { Toaster } from '@/components/ui/toaster';

export const metadata: Metadata = {
  title: "Niki's Charms | Hand-knotted Memories",
  description: "Whimsical, handmade sentimental accessories including friendship bracelets, custom keychains, and collector photocards.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&family=Caveat:wght@400..700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased selection:bg-primary/20">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          <PouchProvider>
            <div className="relative min-h-screen flex flex-col">
              <Navbar />
              <main className="flex-grow">
                {children}
              </main>
              <CursorTrail />
            </div>
            <Toaster />
          </PouchProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
