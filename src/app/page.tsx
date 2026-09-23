'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { 
  Shield, 
  Cctv, 
  Eye, 
  CheckCircle2, 
  Smartphone, 
  Tv, 
  Zap, 
  Phone, 
  Mail, 
  MessageCircle, 
  Menu, 
  X, 
  HardDrive, 
  ChevronRight,
  Info,
  Layers,
  Sparkles
} from 'lucide-react';
import { useFirestore } from '@/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

export default function LubanziTechnologiesHome() {
  const { toast } = useToast();
  const db = useFirestore();

  // Mobile navigation state
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Form states
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [propertyType, setPropertyType] = useState('Residential');
  const [camerasCount, setCamerasCount] = useState('4');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleQuoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !email) {
      toast({
        variant: "destructive",
        title: "Missing Fields",
        description: "Please fill in your name, email, and contact phone number.",
      });
      return;
    }

    setIsSubmitting(true);

    const formData = {
      name,
      phone,
      email,
      propertyType,
      camerasCount: Number(camerasCount),
      message,
      createdAt: new Date().toISOString()
    };

    // Client-side execution without blocking
    if (db) {
      addDoc(collection(db, 'quote_requests'), {
        ...formData,
        serverTimestamp: serverTimestamp()
      })
      .catch(async (err) => {
        const permissionError = new FirestorePermissionError({
          path: '/quote_requests',
          operation: 'create',
          requestResourceData: formData
        });
        errorEmitter.emit('permission-error', permissionError);
      });
    }

    // Immediate rich presentation feedback
    setTimeout(() => {
      toast({
        title: "Quote Request Sent!",
        description: `Thank you ${name}. Our security technicians will review your ${propertyType} setup shortly.`,
      });
      // Clear fields
      setName('');
      setPhone('');
      setEmail('');
      setMessage('');
      setIsSubmitting(false);
    }, 900);
  };

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#030712] text-zinc-100 font-sans selection:bg-amber-500/20 antialiased overflow-x-hidden">
      
      {/* 1. NAVIGATION BAR */}
      <header className="sticky top-0 z-50 w-full bg-[#030712]/90 backdrop-blur-md border-b border-zinc-800/80 transition-all">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          <div 
            onClick={() => scrollToSection('home')} 
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-lg bg-amber-500 flex items-center justify-center text-[#030712] shadow-lg group-hover:scale-105 transition-transform">
              <Cctv className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div>
              <span className="font-extrabold text-xl tracking-tight text-white block group-hover:text-amber-500 transition-colors">
                LUBANZI
              </span>
              <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-amber-500 block -mt-1">
                TECHNOLOGIES
              </span>
            </div>
          </div>

          {/* Desktop Nav links */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-zinc-400">
            <button onClick={() => scrollToSection('home')} className="hover:text-amber-500 transition-colors">Home</button>
            <button onClick={() => scrollToSection('services')} className="hover:text-amber-500 transition-colors">Services</button>
            <button onClick={() => scrollToSection('solutions')} className="hover:text-amber-500 transition-colors">CCTV Solutions</button>
            <button onClick={() => scrollToSection('about')} className="hover:text-amber-500 transition-colors">About</button>
            <button onClick={() => scrollToSection('contact')} className="hover:text-amber-500 transition-colors">Contact</button>
          </nav>

          <div className="hidden lg:flex items-center gap-4">
            <Button 
              onClick={() => scrollToSection('quote')}
              className="bg-amber-500 text-zinc-950 font-bold hover:bg-amber-400 rounded-full px-6 shadow-md transition-all text-xs uppercase tracking-wider"
            >
              Request a Quote
            </Button>
          </div>

          {/* Mobile hamburger icon */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg border border-zinc-800 bg-zinc-900/50 text-zinc-400 hover:text-white transition-colors"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile drawer layout */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-20 z-40 bg-[#030712]/98 backdrop-blur-lg lg:hidden transition-all animate-in fade-in duration-200">
          <div className="flex flex-col p-6 space-y-6 text-lg font-semibold border-t border-zinc-800/60">
            <button onClick={() => scrollToSection('home')} className="text-left py-2 border-b border-zinc-900 text-zinc-300 hover:text-amber-500">Home</button>
            <button onClick={() => scrollToSection('services')} className="text-left py-2 border-b border-zinc-900 text-zinc-300 hover:text-amber-500">Services</button>
            <button onClick={() => scrollToSection('solutions')} className="text-left py-2 border-b border-zinc-900 text-zinc-300 hover:text-amber-500">CCTV Solutions</button>
            <button onClick={() => scrollToSection('about')} className="text-left py-2 border-b border-zinc-900 text-zinc-300 hover:text-amber-500">About</button>
            <button onClick={() => scrollToSection('contact')} className="text-left py-2 border-b border-zinc-900 text-zinc-300 hover:text-amber-500">Contact</button>
            
            <div className="pt-4 flex flex-col gap-3">
              <Button 
                onClick={() => scrollToSection('quote')}
                className="w-full bg-amber-500 text-zinc-950 font-bold hover:bg-amber-400 h-12 rounded-xl"
              >
                Request a Quote
              </Button>
              <a 
                href="https://wa.me/27746417112"
                target="_blank"
                rel="noreferrer"
                className="w-full flex items-center justify-center gap-2 border border-zinc-800 bg-zinc-900/40 text-white font-bold h-12 rounded-xl"
              >
                <MessageCircle className="w-5 h-5 text-emerald-500" /> WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      )}

      {/* 2. HERO SECTION */}
      <section id="home" className="relative security-gradient pt-16 pb-24 lg:pt-24 lg:pb-32 overflow-hidden border-b border-zinc-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-7 space-y-6 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-500 text-xs font-bold uppercase tracking-wider">
                <Shield className="w-3.5 h-3.5" /> Professional Security Specialists
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
                Protect What <span className="text-amber-500">Matters</span> Most
              </h1>
              
              <p className="text-lg text-zinc-400 leading-relaxed font-normal">
                Professional CCTV installation and security solutions for homes, businesses and commercial properties. Keep your property, assets and loved ones safe with our reliable and affordable security systems.
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
                <Button 
                  onClick={() => scrollToSection('quote')}
                  className="bg-amber-500 text-zinc-950 font-bold hover:bg-amber-400 h-12 px-8 rounded-full shadow-lg text-sm uppercase tracking-wider"
                >
                  Request a Quote
                </Button>
                
                <a 
                  href="https://wa.me/27746417112"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 border border-zinc-800 bg-zinc-900/50 hover:bg-zinc-800 text-zinc-100 font-bold h-12 px-8 rounded-full transition-colors text-sm"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-400 fill-emerald-400/20" /> WhatsApp Us
                </a>
              </div>

              <div className="pt-8 grid grid-cols-2 sm:grid-cols-3 gap-4 border-t border-zinc-900 mt-6">
                <div>
                  <span className="block text-[10px] uppercase font-bold text-zinc-500 tracking-wider">Tagline</span>
                  <span className="text-sm font-semibold text-zinc-300">Security Today</span>
                </div>
                <div>
                  <span className="block text-[10px] uppercase font-bold text-zinc-500 tracking-wider">Promise</span>
                  <span className="text-sm font-semibold text-zinc-300">Peace of Mind Tomorrow</span>
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <span className="block text-[10px] uppercase font-bold text-zinc-500 tracking-wider">Our Priority</span>
                  <span className="text-sm font-semibold text-zinc-300 text-amber-500">Your Security</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 relative w-full aspect-square sm:aspect-[4/3] lg:aspect-square rounded-3xl overflow-hidden border border-zinc-800 shadow-2xl shadow-amber-500/5">
              <Image 
                src="https://picsum.photos/seed/lubanzihero/1200/800" 
                alt="Lubanzi CCTV Camera Setup"
                fill
                priority
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                data-ai-hint="cctv surveillance security"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-transparent to-transparent opacity-80" />
              
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-zinc-950/80 backdrop-blur-md border border-zinc-800 flex items-center gap-3">
                <div className="p-2 rounded-lg bg-amber-500/10 text-amber-500">
                  <Eye className="w-5 h-5 animate-pulse" />
                </div>
                <div>
                  <p className="text-xs font-bold text-white uppercase tracking-wider">Live Security Surveillance</p>
                  <p className="text-[11px] text-zinc-400">24/7 Smart Phone Crystal Clear Remote Access</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. SERVICES SECTION */}
      <section id="services" className="py-24 bg-zinc-950/40 border-b border-zinc-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-16">
          
          <div className="max-w-3xl mx-auto space-y-4">
            <span className="text-xs uppercase tracking-[0.25em] font-bold text-amber-500">Comprehensive Solutions</span>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white">What We Deliver</h2>
            <p className="text-zinc-400 text-sm sm:text-base">
              Tailored surveillance configurations equipped with cutting edge technology to handle internal, external, and boundary control monitoring.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-left">
            
            <div className="bg-zinc-900/40 border border-zinc-800/60 p-8 rounded-2xl space-y-4 hover:border-amber-500/30 transition-all shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Residential Security</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Keep your home safe with reliable CCTV surveillance and remote viewing. Monitor gates, perimeters and yards instantly.
              </p>
            </div>

            <div className="bg-zinc-900/40 border border-zinc-800/60 p-8 rounded-2xl space-y-4 hover:border-amber-500/30 transition-all shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
                <Tv className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Commercial Security</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Protect your business, staff, property and assets with professional surveillance solutions. Mitigate internal risk and control access.
              </p>
            </div>

            <div className="bg-zinc-900/40 border border-zinc-800/60 p-8 rounded-2xl space-y-4 hover:border-amber-500/30 transition-all shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Professional Installation</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Clean, neat and reliable CCTV installation carried out with rigorous attention to detail. No untidy wiring exposed to elements.
              </p>
            </div>

            <div className="bg-zinc-900/40 border border-zinc-800/60 p-8 rounded-2xl space-y-4 hover:border-amber-500/30 transition-all shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
                <Smartphone className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Remote Viewing & Support</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                View your cameras remotely from your phone and stay connected wherever you are. Live playback setup included on handover.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 4. WHY CHOOSE US SECTION */}
      <section className="py-24 border-b border-zinc-900 bg-zinc-900/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-5 space-y-6">
              <span className="text-xs uppercase tracking-[0.25em] font-bold text-amber-500">Uncompromised Standard</span>
              <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                Engineered for Absolute Reliability
              </h2>
              <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
                We believe that premium security requires attention to every variable. Our hardware catalog and specialized tooling guarantee optimal operational integrity.
              </p>
              
              <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800 text-xs text-zinc-400 space-y-2">
                <p className="font-bold text-zinc-200 flex items-center gap-1.5 text-amber-500">
                  <Info className="w-4 h-4" /> Quick Johannesburg & SA Wide Note
                </p>
                <p>All camera recommendations are tailored after calculating specific focal lens weights, resolution bounds, and lighting scenarios on site.</p>
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
              
              <div className="flex gap-4 p-5 rounded-xl bg-zinc-900/40 border border-zinc-800/50">
                <div className="w-10 h-10 rounded-lg bg-amber-500/10 text-amber-500 flex items-center justify-center shrink-0">
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">HD Quality</h4>
                  <p className="text-xs text-zinc-400 mt-1">Crystal clear resolutions ranging from 4MP up to ultra 4K definitions to catch micro-details easily.</p>
                </div>
              </div>

              <div className="flex gap-4 p-5 rounded-xl bg-zinc-900/40 border border-zinc-800/50">
                <div className="w-10 h-10 rounded-lg bg-amber-500/10 text-amber-500 flex items-center justify-center shrink-0">
                  <Eye className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">Night Vision</h4>
                  <p className="text-xs text-zinc-400 mt-1">Infrared and full color illumination technology ensures optimal visibility even in total low-light drop scenarios.</p>
                </div>
              </div>

              <div className="flex gap-4 p-5 rounded-xl bg-zinc-900/40 border border-zinc-800/50">
                <div className="w-10 h-10 rounded-lg bg-amber-500/10 text-amber-500 flex items-center justify-center shrink-0">
                  <Cctv className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">Motion Detection</h4>
                  <p className="text-xs text-zinc-400 mt-1">Smart line-crossing tech triggers smartphone push pings automatically on unauthorized zone intrusion.</p>
                </div>
              </div>

              <div className="flex gap-4 p-5 rounded-xl bg-zinc-900/40 border border-zinc-800/50">
                <div className="w-10 h-10 rounded-lg bg-amber-500/10 text-amber-500 flex items-center justify-center shrink-0">
                  <Shield className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">Durable & Weatherproof</h4>
                  <p className="text-xs text-zinc-400 mt-1">IP66 & IP67 certified vandal-proof dome arrays designed to withstand extreme South African sun and heavy rain.</p>
                </div>
              </div>

              <div className="flex gap-4 p-5 rounded-xl bg-zinc-900/40 border border-zinc-800/50">
                <div className="w-10 h-10 rounded-lg bg-amber-500/10 text-amber-500 flex items-center justify-center shrink-0">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">Latest Technology</h4>
                  <p className="text-xs text-zinc-400 mt-1">AI human and vehicle filtering ensures you rarely deal with annoying false alarms triggered by pets or wind tree sway.</p>
                </div>
              </div>

              <div className="flex gap-4 p-5 rounded-xl bg-zinc-900/40 border border-zinc-800/50">
                <div className="w-10 h-10 rounded-lg bg-amber-500/10 text-amber-500 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">Professional Installation</h4>
                  <p className="text-xs text-zinc-400 mt-1">Neat trunking conduit tracks protect cabling from direct cosmic exposure or malicious cable cutting attempts.</p>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* 5. CCTV SOLUTIONS SECTION */}
      <section id="solutions" className="py-24 bg-zinc-950/20 border-b border-zinc-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-16">
          
          <div className="max-w-2xl mx-auto space-y-4">
            <span className="text-xs uppercase tracking-[0.25em] font-bold text-amber-500">System Capability</span>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">What Your CCTV System Will Provide</h2>
            <p className="text-zinc-400 text-sm">Our modern architectures unify powerful features directly into an easy-to-use localized or remote server platform.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            
            <div className="bg-zinc-900/20 border border-zinc-800/40 p-6 rounded-xl flex items-start gap-4 text-left">
              <div className="p-3 bg-amber-500/5 text-amber-500 rounded-lg shrink-0"><Eye className="w-5 h-5" /></div>
              <div>
                <h4 className="font-bold text-white text-sm">Live camera viewing</h4>
                <p className="text-xs text-zinc-500 mt-1">Zero latency local monitor stream setup directly in your kitchen, master bedroom or corporate guard shack desk.</p>
              </div>
            </div>

            <div className="bg-zinc-900/20 border border-zinc-800/40 p-6 rounded-xl flex items-start gap-4 text-left">
              <div className="p-3 bg-amber-500/5 text-amber-500 rounded-lg shrink-0"><Smartphone className="w-5 h-5" /></div>
              <div>
                <h4 className="font-bold text-white text-sm">Remote smartphone access</h4>
                <p className="text-xs text-zinc-500 mt-1">Stream secure multi camera channels via secure localized iOS & Android apps anywhere in South Africa or overseas.</p>
              </div>
            </div>

            <div className="bg-zinc-900/20 border border-zinc-800/40 p-6 rounded-xl flex items-start gap-4 text-left">
              <div className="p-3 bg-amber-500/5 text-amber-500 rounded-lg shrink-0"><Shield className="w-5 h-5" /></div>
              <div>
                <h4 className="font-bold text-white text-sm">Day and night surveillance</h4>
                <p className="text-xs text-zinc-500 mt-1">Automatic matrix lighting cutover switches seamlessly as sundown approaches to sustain continuous protection matrix.</p>
              </div>
            </div>

            <div className="bg-zinc-900/20 border border-zinc-800/40 p-6 rounded-xl flex items-start gap-4 text-left">
              <div className="p-3 bg-amber-500/5 text-amber-500 rounded-lg shrink-0"><Zap className="w-5 h-5" /></div>
              <div>
                <h4 className="font-bold text-white text-sm">Motion detection</h4>
                <p className="text-xs text-zinc-500 mt-1">Pre-configured dynamic alert masking prevents shadows, wind or heavy rain from setting off erratic warning sirens.</p>
              </div>
            </div>

            <div className="bg-zinc-900/20 border border-zinc-800/40 p-6 rounded-xl flex items-start gap-4 text-left">
              <div className="p-3 bg-amber-500/5 text-amber-500 rounded-lg shrink-0"><HardDrive className="w-5 h-5" /></div>
              <div>
                <h4 className="font-bold text-white text-sm">Recording & Playback</h4>
                <p className="text-xs text-zinc-500 mt-1">Heavy-duty surveillance grade internal hard disk arrays record weeks of high-def files over loop paradigms safely.</p>
              </div>
            </div>

            <div className="bg-zinc-900/20 border border-zinc-800/40 p-6 rounded-xl flex items-start gap-4 text-left">
              <div className="p-3 bg-amber-500/5 text-amber-500 rounded-lg shrink-0"><Tv className="w-5 h-5" /></div>
              <div>
                <h4 className="font-bold text-white text-sm">Property monitoring</h4>
                <p className="text-xs text-zinc-500 mt-1">Proactive visual deterrence. Visible security camera presence drops criminal target selection scoring dramatically.</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 6. ABOUT SECTION */}
      <section id="about" className="py-24 bg-zinc-950 border-b border-zinc-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto space-y-8 text-center">
            
            <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-500 flex items-center justify-center mx-auto shadow-inner">
              <Shield className="w-8 h-8 stroke-[1.5]" />
            </div>

            <div className="space-y-4">
              <span className="text-xs font-bold uppercase tracking-[0.3em] text-amber-500 block">About The Company</span>
              <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">LUBANZI TECHNOLOGIES</h2>
            </div>

            <p className="text-lg text-zinc-300 leading-relaxed font-normal text-left sm:text-center">
              We present LUBANZI TECHNOLOGIES as a professional CCTV installation and security solutions company focused on reliable, affordable and practical security systems. We eliminate technical jargon to provide straight-forward protection architectures that function smoothly under all circumstances. Keeping your property, assets, and loved ones safe with meticulous attention to detail is our ultimate mandate.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl mx-auto pt-6 text-left">
              <div className="p-4 rounded-xl border border-zinc-900 bg-zinc-900/20 flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-amber-500 shrink-0" />
                <span className="text-sm font-semibold text-zinc-300">Reliable & Practical Systems</span>
              </div>
              <div className="p-4 rounded-xl border border-zinc-900 bg-zinc-900/20 flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-amber-500 shrink-0" />
                <span className="text-sm font-semibold text-zinc-300">Affordable Pricing Guides</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 7. PROCESS SECTION */}
      <section className="py-24 border-b border-zinc-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <span className="text-xs uppercase tracking-[0.25em] font-bold text-amber-500">How We Operate</span>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">Our Structured Installation Journey</h2>
            <p className="text-zinc-400 text-sm">From the first call to final system deployment handover, we enforce rigorous technical standards.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {[
              { num: '01', title: 'Consultation', desc: 'We detail your visual security expectations over the phone or online messaging tabs.' },
              { num: '02', title: 'Site Assessment', desc: 'Our technicians analyze blind spots, light glare vectors, and cable run distances on property.' },
              { num: '03', title: 'System Recommendation', desc: 'We map out the exact count of dome/bullet camera feeds and NVR storage sizing required.' },
              { num: '04', title: 'Professional Installation', desc: 'Cabling is enclosed inside secure pathways, cameras mounted with sturdy professional anchors.' },
              { num: '05', title: 'Setup & Testing', desc: 'We configure remote surveillance application linkages, night definitions focus checks, and power safety.' },
              { num: '06', title: 'Customer Handover', desc: 'We train you on search playback markers and verify you have live phone video channels working.' },
            ].map((step, idx) => (
              <div key={idx} className="p-6 bg-zinc-900/30 border border-zinc-900 rounded-xl space-y-3 relative group hover:bg-zinc-900/50 transition-all">
                <span className="absolute top-4 right-4 text-3xl font-black text-zinc-800 tracking-tighter font-mono group-hover:text-amber-500/10 transition-colors">
                  {step.num}
                </span>
                <h4 className="font-bold text-white text-base pt-2">{step.title}</h4>
                <p className="text-xs text-zinc-400 leading-relaxed">{step.desc}</p>
              </div>
            ))}

          </div>
        </div>
      </section>

      {/* 8. CONTACT / QUOTE SECTION */}
      <section id="contact" className="py-24 bg-zinc-950/60 scroll-mt-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Contact Details pane */}
            <div className="lg:col-span-5 space-y-8">
              <div className="space-y-4">
                <span className="text-xs uppercase tracking-[0.25em] font-bold text-amber-500 block">Get in Touch</span>
                <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">Let's Secure Your Property</h2>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  Have questions about camera capabilities, pricing matrices, or scheduling an appointment? Reach out to us directly through any platform below.
                </p>
              </div>

              <div className="space-y-4">
                
                <div className="flex items-center gap-4 p-4 rounded-xl bg-zinc-900/40 border border-zinc-800/80">
                  <div className="w-10 h-10 rounded-lg bg-amber-500/10 text-amber-500 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-[10px] text-zinc-500 uppercase font-bold tracking-wider">Call Our Office</span>
                    <a href="tel:064550783" className="text-sm font-bold text-white hover:text-amber-500 transition-colors">
                      06 455 0783
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 rounded-xl bg-[#0f172a]/40 border border-emerald-500/20">
                  <div className="w-10 h-10 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
                    <MessageCircle className="w-5 h-5 fill-emerald-500/10" />
                  </div>
                  <div>
                    <span className="block text-[10px] text-emerald-500 uppercase font-bold tracking-wider">Direct WhatsApp Chat</span>
                    <a 
                      href="https://wa.me/27746417112" 
                      target="_blank" 
                      rel="noreferrer" 
                      className="text-sm font-bold text-emerald-400 hover:underline"
                    >
                      074 641 7112
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 rounded-xl bg-zinc-900/40 border border-zinc-800/80">
                  <div className="w-10 h-10 rounded-lg bg-amber-500/10 text-amber-500 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-[10px] text-zinc-500 uppercase font-bold tracking-wider">Email Address</span>
                    <a href="mailto:CoetzeeLeo82@gmail.com" className="text-sm font-bold text-white hover:text-amber-500 transition-colors break-all">
                      CoetzeeLeo82@gmail.com
                    </a>
                  </div>
                </div>

              </div>

              <div className="p-5 rounded-xl border border-zinc-900 bg-zinc-900/20 text-xs text-zinc-500">
                <p className="font-bold text-zinc-400 mb-1">Response Guarantee</p>
                <p>We actively return quote estimates within 24 hours of form submission data processing.</p>
              </div>
            </div>

            {/* Inbound Form pane */}
            <div id="quote" className="lg:col-span-7 bg-zinc-900/40 border border-zinc-800 p-6 sm:p-8 rounded-2xl shadow-xl scroll-mt-24">
              <div className="mb-6">
                <h3 className="text-xl font-bold text-white">Inquire or Request an Estimate</h3>
                <p className="text-xs text-zinc-500 mt-1">Fill out your specific environment metrics to facilitate precision recommendations.</p>
              </div>

              <form onSubmit={handleQuoteSubmit} className="space-y-5">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="clientName" className="text-xs text-zinc-400 font-medium">Your Name *</Label>
                    <Input 
                      id="clientName" 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Leo Coetzee"
                      className="bg-zinc-950 border-zinc-800 text-sm text-white focus:border-amber-500/50"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="clientPhone" className="text-xs text-zinc-400 font-medium">Phone Number *</Label>
                    <Input 
                      id="clientPhone" 
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. 064 555 0783"
                      className="bg-zinc-950 border-zinc-800 text-sm text-white focus:border-amber-500/50"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="clientEmail" className="text-xs text-zinc-400 font-medium">Email Address *</Label>
                  <Input 
                    id="clientEmail" 
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. coetzee@gmail.com"
                    className="bg-zinc-950 border-zinc-800 text-sm text-white focus:border-amber-500/50"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="propertyType" className="text-xs text-zinc-400 font-medium">Property Type</Label>
                    <select
                      id="propertyType"
                      value={propertyType}
                      onChange={(e) => setPropertyType(e.target.value)}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-md h-10 px-3 text-sm text-zinc-300 focus:border-amber-500 outline-none"
                    >
                      <option value="Residential">Residential</option>
                      <option value="Business">Business</option>
                      <option value="Commercial">Commercial</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="camerasCount" className="text-xs text-zinc-400 font-medium">Number of Cameras Needed</Label>
                    <select
                      id="camerasCount"
                      value={camerasCount}
                      onChange={(e) => setCamerasCount(e.target.value)}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-md h-10 px-3 text-sm text-zinc-300 focus:border-amber-500 outline-none"
                    >
                      <option value="2">2 Cameras (Small Entryways)</option>
                      <option value="4">4 Cameras (Standard Home)</option>
                      <option value="8">8 Cameras (Large Property)</option>
                      <option value="16">16+ Cameras (Commercial Matrix)</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="clientMessage" className="text-xs text-zinc-400 font-medium">Message / Special Instructions</Label>
                  <Textarea 
                    id="clientMessage"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Describe specific perimeters or requirements if any..."
                    className="bg-zinc-950 border-zinc-800 text-sm text-white focus:border-amber-500/50 min-h-[100px] resize-none"
                  />
                </div>

                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-amber-500 text-zinc-950 font-bold hover:bg-amber-400 h-12 text-sm uppercase tracking-wider rounded-xl transition-all"
                >
                  {isSubmitting ? 'Processing Estimate...' : 'Submit Quote Request'}
                </Button>

              </form>
            </div>

          </div>
        </div>
      </section>

      {/* 9. FOOTER */}
      <footer className="bg-zinc-950 border-t border-zinc-900 py-12 text-zinc-500 text-xs">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 pb-8 border-b border-zinc-900">
            <div>
              <h3 className="font-extrabold text-lg text-white tracking-tight">LUBANZI TECHNOLOGIES</h3>
              <p className="text-amber-500 font-medium mt-1">"Security Today • Peace of Mind Tomorrow"</p>
            </div>
            
            <div className="flex flex-wrap gap-6 text-zinc-400">
              <button onClick={() => scrollToSection('home')} className="hover:text-amber-500">Home</button>
              <button onClick={() => scrollToSection('services')} className="hover:text-amber-500">Services</button>
              <button onClick={() => scrollToSection('solutions')} className="hover:text-amber-500">Solutions</button>
              <button onClick={() => scrollToSection('about')} className="hover:text-amber-500">About</button>
              <button onClick={() => scrollToSection('contact')} className="hover:text-amber-500">Contact</button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-zinc-400 text-sm">
            <div>
              <span className="block text-[10px] uppercase font-bold text-zinc-600 tracking-wider mb-1">Phone Helpline</span>
              <p className="text-zinc-300 font-semibold">06 455 0783</p>
            </div>
            <div>
              <span className="block text-[10px] uppercase font-bold text-zinc-600 tracking-wider mb-1">WhatsApp Mobile</span>
              <p className="text-zinc-300 font-semibold">074 641 7112</p>
            </div>
            <div>
              <span className="block text-[10px] uppercase font-bold text-zinc-600 tracking-wider mb-1">Email Matrix</span>
              <p className="text-zinc-300 font-semibold">CoetzeeLeo82@gmail.com</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-zinc-600 text-[11px] pt-4">
            <p>© {new Date().getFullYear()} Lubanzi Technologies. All Rights Reserved. Professional CCTV Installations.</p>
            <p className="uppercase tracking-widest text-zinc-700">"Your Security • Our Priority"</p>
          </div>

        </div>
      </footer>

    </div>
  );
}