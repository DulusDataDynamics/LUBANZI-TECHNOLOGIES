
import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import { FirebaseClientProvider } from '@/firebase';
import { LoadingScreen } from '@/components/ui/loading-screen';

export const metadata: Metadata = {
  title: "Lubanzi Technologies | Premium CCTV & Security Solutions",
  description: "Security Today • Peace of Mind Tomorrow. Professional CCTV installations for home and business in South Africa.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-sans bg-[#020617] text-zinc-100 antialiased selection:bg-cyan-500/30">
        <ThemeProvider attribute="class" defaultTheme="dark" forcedTheme="dark">
          <FirebaseClientProvider>
            <LoadingScreen />
            {children}
            <Toaster />
          </FirebaseClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
