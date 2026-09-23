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
  Info,
  Sparkles
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function LubanziTechnologiesHome() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-zinc-100 font-sans selection:bg-cyan-500/20 antialiased overflow-x-hidden">
      
      {/* 1. NAVIGATION BAR */}
      <header className="sticky top-0 z-50 w-full bg-[#020617]/90 backdrop-blur-md border-b border-zinc-800/80 transition-all">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          <div 
            onClick={() => scrollToSection('home')} 
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-lg bg-cyan-500 flex items-center justify-center text-zinc-950 shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform">
              <Shield className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div>
              <span className="font-extrabold text-xl tracking-tight text-white block group-hover:text-cyan-400 transition-colors">
                LUBANZI
              </span>
              <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-cyan-400 block -mt-1">
                TECHNOLOGIES
              </span>
            </div>
          </div>

          {/* Desktop Nav links */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-zinc-400">
            <button onClick={() => scrollToSection('home')} className="hover:text-cyan-400 transition-colors">Home</button>
            <button onClick={() => scrollToSection('services')} className="hover:text-cyan-400 transition-colors">Services</button>
            <button onClick={() => scrollToSection('solutions')} className="hover:text-cyan-400 transition-colors">CCTV Solutions</button>
            <button onClick={() => scrollToSection('about')} className="hover:text-cyan-400 transition-colors">About</button>
            <button onClick={() => scrollToSection('contact')} className="hover:text-cyan-400 transition-colors">Contact</button>
          </nav>

          <div className="hidden lg:flex items-center gap-4">
            <Button 
              onClick={() => scrollToSection('contact')}
              className="bg-cyan-500 text-zinc-950 font-bold hover:bg-cyan-400 rounded-full px-6 shadow-md shadow-cyan-500/10 transition-all text-xs uppercase tracking-wider"
            >
              Contact Us
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
        <div className="fixed inset-0 top-20 z-40 bg-[#020617]/98 backdrop-blur-lg lg:hidden transition-all animate-in fade-in duration-200">
          <div className="flex flex-col p-6 space-y-6 text-lg font-semibold border-t border-zinc-800/60">
            <button onClick={() => scrollToSection('home')} className="text-left py-2 border-b border-zinc-900 text-zinc-300 hover:text-cyan-400">Home</button>
            <button onClick={() => scrollToSection('services')} className="text-left py-2 border-b border-zinc-900 text-zinc-300 hover:text-cyan-400">Services</button>
            <button onClick={() => scrollToSection('solutions')} className="text-left py-2 border-b border-zinc-900 text-zinc-300 hover:text-cyan-400">CCTV Solutions</button>
            <button onClick={() => scrollToSection('about')} className="text-left py-2 border-b border-zinc-900 text-zinc-300 hover:text-cyan-400">About</button>
            <button onClick={() => scrollToSection('contact')} className="text-left py-2 border-b border-zinc-900 text-zinc-300 hover:text-cyan-400">Contact</button>
            
            <div className="pt-4 flex flex-col gap-3">
              <Button 
                onClick={() => scrollToSection('contact')}
                className="w-full bg-cyan-500 text-zinc-950 font-bold hover:bg-cyan-400 h-12 rounded-xl"
              >
                Get In Touch
              </Button>
              <a 
                href="https://wa.me/27746417112"
                target="_blank"
                rel="noreferrer"
                className="w-full flex items-center justify-center gap-2 border border-zinc-800 bg-zinc-900/40 text-white font-bold h-12 rounded-xl"
              >
                <MessageCircle className="w-5 h-5 text-emerald-400" /> WhatsApp Us
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
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-bold uppercase tracking-wider">
                <Cctv className="w-3.5 h-3.5" /> SECURITY TODAY • PEACE OF MIND TOMORROW
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight uppercase">
                CCTV <span className="text-cyan-400 block sm:inline">INSTALLATION</span>
              </h1>
              <p className="text-xl font-bold text-zinc-200 tracking-wide">
                Protect What Matters Most
              </p>
              
              <p className="text-base text-zinc-400 leading-relaxed font-normal">
                We provide professional CCTV installation services for homes, businesses and commercial premises. Keep your property, assets and loved ones safe with our reliable and affordable security solutions.
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
                <Button 
                  onClick={() => scrollToSection('contact')}
                  className="bg-cyan-500 text-zinc-950 font-bold hover:bg-cyan-400 h-12 px-8 rounded-full shadow-lg text-sm uppercase tracking-wider"
                >
                  Contact Now
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
            </div>

            <div className="lg:col-span-5 relative w-full aspect-square sm:aspect-[4/3] lg:aspect-square rounded-3xl overflow-hidden border border-zinc-800 shadow-2xl shadow-cyan-500/5">
              <Image 
                src="https://picsum.photos/seed/lubanzihero/600/400" 
                alt="Lubanzi CCTV Camera Setup"
                fill
                priority
                className="object-cover"
                data-ai-hint="cctv surveillance security"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent opacity-60" />
              
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-zinc-950/90 backdrop-blur-md border border-zinc-800 flex items-center gap-3">
                <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400">
                  <Eye className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-white uppercase tracking-wider">Live Visual Security</p>
                  <p className="text-[11px] text-zinc-400">Remote smartphone access deployment standard</p>
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
            <span className="text-xs uppercase tracking-[0.25em] font-bold text-cyan-400">Expert Integrations</span>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white uppercase">Surveillance Matrix</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-left">
            
            <div className="bg-zinc-900/20 border border-zinc-800/60 p-8 rounded-2xl space-y-4 hover:border-cyan-500/30 transition-all shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">RESIDENTIAL SECURITY</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Keep your home safe with reliable CCTV surveillance and remote viewing.
              </p>
            </div>

            <div className="bg-zinc-900/20 border border-zinc-800/60 p-8 rounded-2xl space-y-4 hover:border-cyan-500/30 transition-all shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center">
                <Tv className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">COMMERCIAL SECURITY</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Protect your business, staff, property and assets with professional surveillance solutions.
              </p>
            </div>

            <div className="bg-zinc-900/20 border border-zinc-800/60 p-8 rounded-2xl space-y-4 hover:border-cyan-500/30 transition-all shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">PROFESSIONAL INSTALLATION</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Clean, neat and reliable CCTV installation carried out with attention to detail.
              </p>
            </div>

            <div className="bg-zinc-900/20 border border-zinc-800/60 p-8 rounded-2xl space-y-4 hover:border-cyan-500/30 transition-all shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center">
                <Smartphone className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">REMOTE VIEWING & SUPPORT</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                View from anywhere instantly with micro-second state sync setups on demand.
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
              <span className="text-xs uppercase tracking-[0.25em] font-bold text-cyan-400">Precision Engineering</span>
              <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight uppercase">
                Technical Highlights
              </h2>
              <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
                Uncompromising hardware catalog designed to ensure clear identification parameters under extreme environments.
              </p>
            </div>

            <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-4">
              {[
                { title: 'HD QUALITY', desc: 'Crystal clear definition vectors.' },
                { title: 'NIGHT VISION', desc: 'Infrared visibility parameters.' },
                { title: 'MOTION DETECTION', desc: 'Smart line trip event metrics.' },
                { title: 'DURABLE', desc: 'Weatherproof certified casings.' },
                { title: 'LATEST TECH', desc: 'AI human vehicle filters.' },
                { title: 'PRO DEP', desc: 'Neat secure tracking layouts.' }
              ].map((item, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-zinc-900/40 border border-zinc-800/50 space-y-1 text-center">
                  <h4 className="font-bold text-cyan-400 text-xs tracking-wider">{item.title}</h4>
                  <p className="text-[11px] text-zinc-500">{item.desc}</p>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* 5. CCTV SOLUTIONS SECTION */}
      <section id="solutions" className="py-24 bg-zinc-950/20 border-b border-zinc-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-16">
          
          <div className="max-w-2xl mx-auto space-y-4">
            <span className="text-xs uppercase tracking-[0.25em] font-bold text-cyan-400">Integrated Capabilities</span>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight uppercase">System Deliverables</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'Live camera viewing', desc: 'Zero latency monitoring streams configured locally.' },
              { title: 'Remote smartphone access', desc: 'Check dynamic status indices from iOS and Android platforms.' },
              { title: 'Day and night surveillance', desc: 'Automatic lux metrics cutout logic changes seamlessly.' },
              { title: 'Motion detection triggers', desc: 'Smart push alert messaging vectors directly into endpoints.' },
              { title: 'Continuous Recording', desc: 'Surveillance grade high density cyclical loop drives.' },
              { title: 'Active property monitoring', desc: 'Deter external risk footprints with high visual presence scores.' }
            ].map((sol, index) => (
              <div key={index} className="bg-zinc-900/20 border border-zinc-800/40 p-6 rounded-xl text-left space-y-2">
                <h4 className="font-bold text-white text-sm flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" /> {sol.title}
                </h4>
                <p className="text-xs text-zinc-400 leading-relaxed">{sol.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. ABOUT SECTION */}
      <section id="about" className="py-24 bg-zinc-950 border-b border-zinc-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto space-y-6 text-center">
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-cyan-400 block">Identity Parameters</span>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight uppercase">LUBANZI TECHNOLOGIES</h2>
            <p className="text-zinc-300 leading-relaxed font-normal text-sm sm:text-base text-left sm:text-center">
              Presenting LUBANZI TECHNOLOGIES as a professional CCTV installation and security solutions company focused on reliable, affordable and practical security systems. We deliver direct, robust protection grids tailored carefully to secure home coordinates, warehouse grids, and commercial assets.
            </p>
          </div>
        </div>
      </section>

      {/* 7. PROCESS SECTION */}
      <section className="py-24 border-b border-zinc-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <span className="text-xs uppercase tracking-[0.25em] font-bold text-cyan-400">Execution Framework</span>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight uppercase">Installation Journey</h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { num: '01', title: 'Consultation' },
              { num: '02', title: 'Site Assessment' },
              { num: '03', title: 'System Rec' },
              { num: '04', title: 'Installation' },
              { num: '05', title: 'Testing' },
              { num: '06', title: 'Handover' }
            ].map((step, idx) => (
              <div key={idx} className="p-4 bg-zinc-900/30 border border-zinc-900 rounded-xl space-y-2 text-center relative group">
                <span className="block text-xs font-mono font-bold text-cyan-400/60">{step.num}</span>
                <h4 className="font-bold text-white text-xs uppercase tracking-wider">{step.title}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. HIGH-IMPACT CONTACT CHANNELS SECTION */}
      <section id="contact" className="py-24 bg-zinc-950/60 border-b border-zinc-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl space-y-12">
          
          <div className="text-center space-y-3">
            <span className="text-xs uppercase tracking-[0.25em] font-bold text-cyan-400 block">Connect Directly</span>
            <h2 className="text-3xl font-black text-white uppercase tracking-tight">Operational Communication Gateways</h2>
            <p className="text-zinc-400 text-xs">Reach our security installation technicians through any certified channel below.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Call Badge */}
            <a 
              href="tel:064550783" 
              className="flex items-center justify-between p-6 rounded-2xl bg-zinc-900/80 border-2 border-cyan-500/40 hover:border-cyan-400 transition-all group"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-cyan-500 text-zinc-950 flex items-center justify-center shrink-0 shadow-lg shadow-cyan-500/20">
                  <Phone className="w-6 h-6 stroke-[2.5]" />
                </div>
                <div>
                  <span className="block text-[10px] text-zinc-500 uppercase font-bold tracking-wider">CALL NOW</span>
                  <span className="text-lg font-black text-white tracking-wide group-hover:text-cyan-400 transition-colors">
                    06 455 0783
                  </span>
                </div>
              </div>
            </a>

            {/* WhatsApp Badge */}
            <a 
              href="https://wa.me/27746417112" 
              target="_blank" 
              rel="noreferrer" 
              className="flex items-center justify-between p-6 rounded-2xl bg-zinc-900/80 border-2 border-emerald-500/40 hover:border-emerald-400 transition-all group"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-500 text-zinc-950 flex items-center justify-center shrink-0 shadow-lg shadow-emerald-500/20">
                  <MessageCircle className="w-6 h-6 stroke-[2.5] fill-zinc-950" />
                </div>
                <div>
                  <span className="block text-[10px] text-zinc-500 uppercase font-bold tracking-wider">WHATSAPP</span>
                  <span className="text-lg font-black text-white tracking-wide group-hover:text-emerald-400 transition-colors">
                    074 641 7112
                  </span>
                </div>
              </div>
            </a>

          </div>

          {/* Email row identifier */}
          <div className="p-4 rounded-xl bg-zinc-900/40 border border-zinc-800 flex flex-col sm:flex-row items-center justify-center gap-3 text-sm font-mono text-zinc-300">
            <Mail className="w-4 h-4 text-cyan-400" />
            <a href="mailto:CoetzeeLeo82@gmail.com" className="hover:text-cyan-400 hover:underline transition-all">
              CoetzeeLeo82@gmail.com
            </a>
          </div>

          {/* Slogan underline representation */}
          <div className="pt-6 text-center border-t border-zinc-900">
            <p className="text-sm font-semibold tracking-widest text-cyan-400 italic">
              Your Security • Our Priority
            </p>
          </div>

        </div>
      </section>

      {/* 9. FOOTER */}
      <footer className="bg-zinc-950 border-t border-zinc-900 py-12 text-zinc-500 text-xs">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 pb-8 border-b border-zinc-900">
            <div>
              <h3 className="font-extrabold text-lg text-white tracking-tight">LUBANZI TECHNOLOGIES</h3>
              <p className="text-cyan-400 font-medium mt-1">"Security Today • Peace of Mind Tomorrow"</p>
            </div>
            
            <div className="flex flex-wrap gap-6 text-zinc-400">
              <button onClick={() => scrollToSection('home')} className="hover:text-cyan-400">Home</button>
              <button onClick={() => scrollToSection('services')} className="hover:text-cyan-400">Services</button>
              <button onClick={() => scrollToSection('solutions')} className="hover:text-cyan-400">Solutions</button>
              <button onClick={() => scrollToSection('about')} className="hover:text-cyan-400">About</button>
              <button onClick={() => scrollToSection('contact')} className="hover:text-cyan-400">Contact</button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-zinc-600 text-[11px]">
            <p>© Lubanzi Technologies. All Rights Reserved. Professional CCTV Installations.</p>
            <p className="uppercase tracking-widest text-zinc-700">Your Security • Our Priority</p>
          </div>

        </div>
      </footer>

    </div>
  );
}
