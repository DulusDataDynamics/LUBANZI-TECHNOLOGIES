
'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { 
  Shield, 
  Cctv, 
  Eye, 
  CheckCircle2, 
  Smartphone, 
  Tv, 
  Phone, 
  Mail, 
  MessageCircle, 
  Menu, 
  X, 
  ArrowRight,
  ExternalLink,
  ChevronRight,
  Play
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export default function LubanziTechnologiesHome() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const Logo = () => (
    <div 
      onClick={() => scrollToSection('home')} 
      className="flex items-center gap-3 cursor-pointer group"
    >
      <div className="relative">
        <div className="w-10 h-10 rounded-xl bg-cyan-500 flex items-center justify-center text-zinc-950 shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform">
          <Shield className="w-6 h-6 stroke-[2.5]" />
        </div>
        <div className="absolute -inset-1 border border-cyan-500/20 rounded-xl animate-pulse" />
      </div>
      <div>
        <span className="font-black text-xl tracking-tight text-white block group-hover:text-cyan-400 transition-colors">
          LUBANZI
        </span>
        <span className="text-[9px] uppercase font-bold tracking-[0.3em] text-cyan-400 block -mt-1 leading-none">
          TECHNOLOGIES
        </span>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#020617] text-zinc-100 font-sans selection:bg-cyan-500/20 antialiased overflow-x-hidden">
      
      {/* 1. NAVIGATION BAR */}
      <header className={cn(
        "fixed top-0 z-50 w-full transition-all duration-300",
        scrolled ? "h-16 bg-[#020617]/80 backdrop-blur-xl border-b border-zinc-800/80" : "h-20 bg-transparent"
      )}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
          
          <Logo />

          {/* Desktop Nav links */}
          <nav className="hidden lg:flex items-center gap-8 text-xs font-bold uppercase tracking-wider text-zinc-400">
            <button onClick={() => scrollToSection('home')} className="hover:text-cyan-400 transition-colors">Home</button>
            <button onClick={() => scrollToSection('services')} className="hover:text-cyan-400 transition-colors">Services</button>
            <button onClick={() => scrollToSection('solutions')} className="hover:text-cyan-400 transition-colors">Solutions</button>
            <button onClick={() => scrollToSection('about')} className="hover:text-cyan-400 transition-colors">About</button>
            <button onClick={() => scrollToSection('contact')} className="hover:text-cyan-400 transition-colors text-cyan-400">Contact</button>
          </nav>

          <div className="hidden lg:flex items-center gap-4">
            <Button 
              onClick={() => scrollToSection('contact')}
              className="bg-cyan-500 text-zinc-950 font-black hover:bg-cyan-400 rounded-full px-8 shadow-xl shadow-cyan-500/20 transition-all text-xs uppercase tracking-widest border-none h-10"
            >
              Get a Quote
            </Button>
          </div>

          {/* Mobile hamburger icon */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl border border-zinc-800 bg-zinc-900/50 text-zinc-400 hover:text-white transition-colors"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile drawer layout */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#020617]/98 backdrop-blur-xl lg:hidden transition-all animate-in fade-in duration-300">
          <div className="flex flex-col p-8 pt-24 space-y-6 text-xl font-black uppercase tracking-widest border-t border-zinc-800/60">
            <button onClick={() => scrollToSection('home')} className="text-left py-4 border-b border-zinc-900 text-zinc-300">Home</button>
            <button onClick={() => scrollToSection('services')} className="text-left py-4 border-b border-zinc-900 text-zinc-300">Services</button>
            <button onClick={() => scrollToSection('solutions')} className="text-left py-4 border-b border-zinc-900 text-zinc-300">Solutions</button>
            <button onClick={() => scrollToSection('about')} className="text-left py-4 border-b border-zinc-900 text-zinc-300">About</button>
            <button onClick={() => scrollToSection('contact')} className="text-left py-4 border-b border-zinc-900 text-cyan-400">Contact</button>
            
            <div className="pt-8 flex flex-col gap-4">
              <Button 
                onClick={() => scrollToSection('contact')}
                className="w-full bg-cyan-500 text-zinc-950 font-black hover:bg-cyan-400 h-14 rounded-2xl text-sm"
              >
                REQUEST QUOTE
              </Button>
              <a 
                href="https://wa.me/27746417112"
                target="_blank"
                rel="noreferrer"
                className="w-full flex items-center justify-center gap-3 border-2 border-zinc-800 bg-zinc-900/40 text-white font-black h-14 rounded-2xl text-sm"
              >
                <MessageCircle className="w-5 h-5 text-cyan-400 fill-cyan-400/10" /> WHATSAPP
              </a>
            </div>
          </div>
        </div>
      )}

      {/* 2. HERO SECTION */}
      <section id="home" className="relative min-h-[90vh] flex items-center tech-grid pt-24 lg:pt-0 border-b border-zinc-900/50">
        <div className="absolute inset-0 hero-glow pointer-events-none" />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            <div className="lg:col-span-6 space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-[10px] font-black uppercase tracking-[0.2em] animate-in slide-in-from-left duration-700">
                <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
                ADVANCED SURVEILLANCE SYSTEMS
              </div>
              
              <h1 className="text-5xl sm:text-6xl lg:text-8xl font-black text-white tracking-tighter leading-[0.9] uppercase text-glow animate-in fade-in slide-in-from-bottom duration-700">
                PROTECT <span className="text-cyan-400">WHAT MATTERS</span> MOST
              </h1>
              
              <p className="text-lg text-zinc-400 leading-relaxed font-medium max-w-xl animate-in fade-in duration-1000 delay-200">
                Professional CCTV installation and smart security solutions for homes, businesses, and industrial complexes across South Africa.
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-6 pt-4 animate-in fade-in duration-1000 delay-300">
                <Button 
                  onClick={() => scrollToSection('contact')}
                  className="bg-cyan-500 text-zinc-950 font-black hover:bg-cyan-400 h-16 px-10 rounded-full shadow-2xl shadow-cyan-500/30 text-sm uppercase tracking-widest group"
                >
                  Request a Quote <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
                
                <a 
                  href="https://wa.me/27746417112"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-3 border-2 border-zinc-800 bg-zinc-900/50 hover:bg-zinc-800/80 text-zinc-100 font-black h-16 px-10 rounded-full transition-all text-sm uppercase tracking-widest group"
                >
                  <MessageCircle className="w-5 h-5 text-cyan-400 fill-cyan-400/20 group-hover:scale-110 transition-transform" /> WhatsApp Us
                </a>
              </div>

              <div className="grid grid-cols-3 gap-8 pt-8 border-t border-zinc-800/50 max-w-lg">
                <div>
                  <p className="text-2xl font-black text-white">4K</p>
                  <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">Ultra HD</p>
                </div>
                <div>
                  <p className="text-2xl font-black text-white">24/7</p>
                  <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">Monitoring</p>
                </div>
                <div>
                  <p className="text-2xl font-black text-white">LIVE</p>
                  <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">Phone Sync</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 relative group animate-in zoom-in duration-1000">
              <div className="relative aspect-[4/5] sm:aspect-square lg:aspect-[4/5] rounded-[2rem] overflow-hidden border border-zinc-800 shadow-2xl">
                <Image 
                  src="https://picsum.photos/seed/lubanzi-secure-1/800/1000" 
                  alt="High-Tech Security Camera"
                  fill
                  priority
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  data-ai-hint="security camera"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/20 to-transparent opacity-80" />
                
                <div className="absolute bottom-8 left-8 right-8 space-y-4">
                  <div className="p-6 glass-panel rounded-2xl flex items-center gap-4 animate-float">
                    <div className="w-12 h-12 rounded-xl bg-cyan-500 text-zinc-950 flex items-center justify-center shadow-lg">
                      <Cctv className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-xs font-black text-white uppercase tracking-widest">AI Detection Active</p>
                      <p className="text-[10px] text-cyan-400/70 font-bold uppercase">Human & Vehicle Identification</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-cyan-500/10 blur-[60px] rounded-full" />
              <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-cyan-500/5 blur-[80px] rounded-full" />
            </div>

          </div>
        </div>
      </section>

      {/* 3. SERVICES SECTION */}
      <section id="services" className="py-32 bg-zinc-950/20 relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
            <div className="space-y-4">
              <Badge className="bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500/10 border-cyan-500/20 px-4 py-1 uppercase tracking-widest text-[10px] font-black">
                Our Expertise
              </Badge>
              <h2 className="text-4xl lg:text-6xl font-black text-white uppercase tracking-tighter">SURVEILLANCE <br /> <span className="text-cyan-400">ECOSYSTEM</span></h2>
            </div>
            <p className="text-zinc-500 max-w-md text-sm font-medium leading-relaxed">
              We deploy industrial-grade hardware with intelligent software integration to ensure zero blind spots in your security perimeter.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            
            <ServiceCard 
              icon={<Shield className="w-6 h-6" />}
              title="RESIDENTIAL"
              desc="Comprehensive smart home surveillance with full integration for gated communities and estates."
            />

            <ServiceCard 
              icon={<Tv className="w-6 h-6" />}
              title="COMMERCIAL"
              desc="Multi-node systems for warehouses, retail outlets, and corporate office parks."
            />

            <ServiceCard 
              icon={<Cctv className="w-6 h-6" />}
              title="INSTALLATION"
              desc="Certified technical deployments with neat, secure cable management and optimized camera angles."
            />

            <ServiceCard 
              icon={<Smartphone className="w-6 h-6" />}
              title="REMOTE VIEWING"
              desc="Instant smartphone synchronization allowing real-time monitoring from anywhere in the world."
            />

          </div>
        </div>
      </section>

      {/* 4. WHY CHOOSE US - TECH SPECS */}
      <section className="py-32 border-y border-zinc-900 bg-zinc-900/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-center">
            
            <div className="lg:col-span-5 space-y-8">
              <Badge className="bg-cyan-500/10 text-cyan-400 border-cyan-500/20 font-black tracking-widest text-[10px]">WHY LUBANZI</Badge>
              <h2 className="text-4xl lg:text-5xl font-black text-white uppercase tracking-tighter">
                PRECISION <span className="text-cyan-400">ENGINEERING</span> FOR TOTAL PEACE OF MIND
              </h2>
              <p className="text-zinc-400 leading-relaxed font-medium">
                We don't just install cameras; we build active deterrent systems. Our hardware is selected for clarity, reliability, and extreme durability.
              </p>
              
              <ul className="space-y-4 pt-4">
                {['Certified Technicians', '2-Year Hardware Warranty', 'South African Managed Support'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm font-bold uppercase tracking-widest text-white">
                    <CheckCircle2 className="w-5 h-5 text-cyan-500" /> {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <TechFeature title="HD QUALITY" desc="4K and 1080p high-definition imagery for precise identification." />
              <TechFeature title="NIGHT VISION" desc="Infrared and ColorVu technology for 24/7 visibility in total darkness." />
              <TechFeature title="SMART ALERTS" desc="Intelligent motion detection that sends instant push notifications." />
              <TechFeature title="WEATHERPROOF" desc="IP67 certified hardware built to withstand harsh African climates." />
            </div>

          </div>
        </div>
      </section>

      {/* 5. PROCESS SECTION */}
      <section className="py-32 relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-20">
          
          <div className="max-w-3xl mx-auto space-y-4">
            <Badge className="bg-cyan-500/10 text-cyan-400 border-cyan-500/20 font-black tracking-widest text-[10px]">OUR WORKFLOW</Badge>
            <h2 className="text-4xl lg:text-6xl font-black text-white uppercase tracking-tighter">THE DEPLOYMENT <span className="text-cyan-400">PROCESS</span></h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 relative">
            {/* Connecting lines for desktop */}
            <div className="hidden lg:block absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent -z-10" />
            
            {[
              { num: '01', title: 'Consultation', desc: 'Detailed requirements analysis.' },
              { num: '02', title: 'Assessment', desc: 'On-site security grid mapping.' },
              { num: '03', title: 'Proposal', desc: 'Custom optimized system design.' },
              { num: '04', title: 'Deployment', desc: 'Clean professional installation.' },
              { num: '05', title: 'Testing', desc: 'Rigorous signal & angle checks.' },
              { num: '06', title: 'Handover', desc: 'Client training & app setup.' }
            ].map((step, idx) => (
              <div key={idx} className="group p-8 glass-panel rounded-3xl space-y-4 text-left hover:border-cyan-500/50 transition-all duration-500">
                <span className="text-4xl font-black text-zinc-800 group-hover:text-cyan-500/20 transition-colors duration-500">{step.num}</span>
                <h4 className="text-lg font-black text-white uppercase tracking-widest">{step.title}</h4>
                <p className="text-sm text-zinc-500 font-medium">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. CONTACT CHANNELS */}
      <section id="contact" className="py-32 bg-cyan-500 text-zinc-950">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            <div className="space-y-8">
              <h2 className="text-5xl lg:text-7xl font-black uppercase tracking-tighter leading-none">READY TO <br /> SECURE YOUR <br /> SPACE?</h2>
              <p className="text-lg font-bold text-zinc-900/70 max-w-sm">
                Connect directly with our technical team for an immediate security assessment.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6">
              <ContactLink 
                href="tel:064550783"
                icon={<Phone className="w-8 h-8" />}
                label="Direct Line"
                value="06 455 0783"
              />
              <ContactLink 
                href="https://wa.me/27746417112"
                icon={<MessageCircle className="w-8 h-8" />}
                label="WhatsApp"
                value="074 641 7112"
              />
              <ContactLink 
                href="mailto:CoetzeeLeo82@gmail.com"
                icon={<Mail className="w-8 h-8" />}
                label="Email Enquiries"
                value="CoetzeeLeo82@gmail.com"
              />
            </div>

          </div>
        </div>
      </section>

      {/* 7. FOOTER */}
      <footer className="bg-[#010410] pt-24 pb-12 border-t border-zinc-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-16 mb-20">
            
            <div className="lg:col-span-2 space-y-8">
              <Logo />
              <p className="text-zinc-500 max-w-md font-medium leading-relaxed">
                Lubanzi Technologies is a premier security integration firm dedicated to providing high-performance surveillance systems across residential and commercial sectors.
              </p>
              <p className="text-cyan-400 text-xs font-black uppercase tracking-[0.2em] italic">
                "Security Today • Peace of Mind Tomorrow"
              </p>
            </div>

            <div className="space-y-8">
              <h4 className="text-xs font-black uppercase tracking-widest text-white">Quick Nav</h4>
              <ul className="space-y-4 text-sm font-bold text-zinc-500">
                <li><button onClick={() => scrollToSection('home')} className="hover:text-cyan-400">Home</button></li>
                <li><button onClick={() => scrollToSection('services')} className="hover:text-cyan-400">Services</button></li>
                <li><button onClick={() => scrollToSection('solutions')} className="hover:text-cyan-400">Solutions</button></li>
                <li><button onClick={() => scrollToSection('about')} className="hover:text-cyan-400">About</button></li>
              </ul>
            </div>

            <div className="space-y-8">
              <h4 className="text-xs font-black uppercase tracking-widest text-white">Legal</h4>
              <ul className="space-y-4 text-sm font-bold text-zinc-500">
                <li><a href="#" className="hover:text-cyan-400">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-cyan-400">Terms of Service</a></li>
                <li><a href="#" className="hover:text-cyan-400">Warranty Details</a></li>
              </ul>
            </div>

          </div>

          <div className="pt-12 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-[10px] text-zinc-600 font-bold uppercase tracking-widest">
              © 2024 LUBANZI TECHNOLOGIES. ALL RIGHTS RESERVED.
            </p>
            <div className="flex items-center gap-6">
              <span className="text-[10px] text-zinc-600 font-bold uppercase tracking-widest italic">Your Security • Our Priority</span>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}

function ServiceCard({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="p-10 glass-panel rounded-[2.5rem] space-y-6 hover:translate-y-[-8px] transition-all duration-500 hover:border-cyan-500/30 group">
      <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center group-hover:bg-cyan-500 group-hover:text-zinc-950 transition-colors duration-500">
        {icon}
      </div>
      <h3 className="text-xl font-black text-white uppercase tracking-widest">{title}</h3>
      <p className="text-zinc-500 text-sm font-medium leading-relaxed">{desc}</p>
      <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-cyan-400 group-hover:text-white transition-colors">
        Learn More <ChevronRight className="w-3 h-3" />
      </button>
    </div>
  );
}

function TechFeature({ title, desc }: { title: string, desc: string }) {
  return (
    <div className="p-6 glass-panel rounded-2xl space-y-2 border-l-4 border-l-cyan-500">
      <h4 className="text-xs font-black text-white uppercase tracking-widest">{title}</h4>
      <p className="text-[11px] text-zinc-500 font-bold leading-relaxed">{desc}</p>
    </div>
  );
}

function ContactLink({ href, icon, label, value }: { href: string, icon: React.ReactNode, label: string, value: string }) {
  return (
    <a 
      href={href}
      className="flex items-center justify-between p-8 rounded-3xl bg-zinc-950/40 hover:bg-zinc-950/80 transition-all border-2 border-transparent hover:border-zinc-900 group"
    >
      <div className="flex items-center gap-6">
        <div className="text-zinc-950">
          {icon}
        </div>
        <div>
          <p className="text-[10px] font-black uppercase tracking-widest opacity-40">{label}</p>
          <p className="text-2xl font-black text-zinc-950 tracking-tighter">{value}</p>
        </div>
      </div>
      <div className="w-12 h-12 rounded-full border border-zinc-900/20 flex items-center justify-center group-hover:bg-zinc-950 group-hover:text-cyan-400 transition-all">
        <ExternalLink className="w-5 h-5" />
      </div>
    </a>
  );
}
