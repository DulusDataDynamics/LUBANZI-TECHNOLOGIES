
import type {Metadata} from 'next';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import { SidebarProvider } from '@/components/layout/sidebar-context';
import { FirebaseClientProvider } from '@/firebase';

export const metadata: Metadata = {
  title: "VEXA | AI Software Engineering Agent",
  description: "Autonomous software engineering workspace for developers.",
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
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;700&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body bg-[#09090b] text-zinc-100 antialiased selection:bg-primary/30">
        <ThemeProvider attribute="class" defaultTheme="dark" forcedTheme="dark">
          <FirebaseClientProvider>
            <SidebarProvider>
              {children}
              <Toaster />
            </SidebarProvider>
          </FirebaseClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
