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
  ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import imageGrid from '@/app/lib/placeholder-images.json';

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

  const heroImageSrc = imageGrid.placeholderImages.find(img => img.id === 'hero-lubanzi')?.imageUrl || 'https://cdn.yesss.co.uk/media/Blogs/CCTV%20is%20Still%20a%20Cornerstone%20of%20Security%20Solutions%20in%202025/shutterstock_2078664664.jpg';

  return (
    <div className="min-h-screen bg-[#020617] text-zinc-100 font-sans selection:bg-cyan-500/20 antialiased overflow-x-hidden">
      
      <header className={cn(
        "fixed top-0 z-50 w-full transition-all duration-300",
        scrolled ? "h-16 bg-[#020617]/90 backdrop-blur-xl border-b border-zinc-800/80" : "h-20 bg-transparent"
      )}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
          
          <Logo />

          <nav className="hidden lg:flex items-center gap-8 text-xs font-bold uppercase tracking-wider text-zinc-400">
            <button onClick={() => scrollToSection('home')} className="hover:text-cyan-400 transition-colors">Home</button>
            <button onClick={() => scrollToSection('services')} className="hover:text-cyan-400 transition-colors">Services</button>
            <button onClick={() => scrollToSection('solutions')} className="hover:text-cyan-400 transition-colors">CCTV Solutions</button>
            <button onClick={() => scrollToSection('about')} className="hover:text-cyan-400 transition-colors">About</button>
            <button onClick={() => scrollToSection('contact')} className="hover:text-cyan-400 transition-colors text-cyan-400">Contact</button>
          </nav>

          <div className="hidden lg:flex items-center gap-4">
            <Button 
              onClick={() => scrollToSection('contact')}
              className="bg-cyan-500 text-zinc-950 font-black hover:bg-cyan-400 rounded-full px-8 shadow-xl shadow-cyan-500/20 transition-all text-xs uppercase tracking-widest border-none h-10"
            >
              Request a Quote
            </Button>
          </div>

          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl border border-zinc-800 bg-zinc-900/50 text-zinc-400 hover:text-white transition-colors"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#020617]/98 backdrop-blur-xl lg:hidden transition-all animate-in fade-in duration-300">
          <div className="flex flex-col p-8 pt-24 space-y-6 text-xl font-black uppercase tracking-widest border-t border-zinc-800/60">
            <button onClick={() => scrollToSection('home')} className="text-left py-4 border-b border-zinc-900 text-zinc-300">Home</button>
            <button onClick={() => scrollToSection('services')} className="text-left py-4 border-b border-zinc-900 text-zinc-300">Services</button>
            <button onClick={() => scrollToSection('solutions')} className="text-left py-4 border-b border-zinc-900 text-zinc-300">CCTV Solutions</button>
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

      <section id="home" className="relative min-h-[90vh] flex items-center tech-grid pt-24 lg:pt-0 border-b border-zinc-900/50">
        <div className="absolute inset-0 hero-glow pointer-events-none" />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            <div className="lg:col-span-6 space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-[10px] font-black uppercase tracking-[0.2em]">
                <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
                PREMIUM SECURITY SYSTEM INTEGRATION
              </div>
              
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white tracking-tighter leading-[0.95] uppercase text-glow">
                PROTECT <span className="text-cyan-400">WHAT MATTERS</span> MOST
              </h1>
              
              <p className="text-base text-zinc-400 leading-relaxed font-medium max-w-xl">
                Professional CCTV installation and security solutions for homes, businesses, and commercial properties. Keep your property, assets and loved ones safe with our reliable and affordable security solutions.
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
                <Button 
                  onClick={() => scrollToSection('contact')}
                  className="bg-cyan-500 text-zinc-950 font-black hover:bg-cyan-400 h-14 px-8 rounded-full shadow-2xl shadow-cyan-500/30 text-xs uppercase tracking-widest group"
                >
                  Request a Quote <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
                
                <a 
                  href="https://wa.me/27746417112"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-3 border-2 border-zinc-800 bg-zinc-900/50 hover:bg-zinc-800/80 text-zinc-100 font-black h-14 px-8 rounded-full transition-all text-xs uppercase tracking-widest group"
                >
                  <MessageCircle className="w-4 h-4 text-cyan-400 fill-cyan-400/20 group-hover:scale-110 transition-transform" /> WhatsApp Us
                </a>
              </div>
            </div>

            <div className="lg:col-span-6 relative group">
              <div className="relative aspect-[4/3] sm:aspect-video lg:aspect-[4/3] rounded-3xl overflow-hidden border border-zinc-800 shadow-2xl">
                <Image 
                  src={heroImageSrc}
                  alt="Lubanzi CCTV Systems"
                  fill
                  priority
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  data-ai-hint="security surveillance"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/10 to-transparent opacity-60" />
              </div>
            </div>

          </div>
        </div>
      </section>

      <section id="services" className="py-24 bg-zinc-950/20 relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center space-y-4 mb-16">
            <Badge className="bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500/10 border-cyan-500/20 px-4 py-1 uppercase tracking-widest text-[10px] font-black">
              Professional Expertise
            </Badge>
            <h2 className="text-3xl lg:text-5xl font-black text-white uppercase tracking-tighter">OUR SERVICES</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <ServiceCard 
              icon={<Shield className="w-5 h-5" />}
              title="Residential Security"
              desc="Keep your home safe with reliable CCTV surveillance and remote viewing."
            />

            <ServiceCard 
              icon={<Tv className="w-5 h-5" />}
              title="Commercial Security"
              desc="Protect your business, staff, property and assets with professional surveillance solutions."
            />

            <ServiceCard 
              icon={<Cctv className="w-5 h-5" />}
              title="Professional Installation"
              desc="Clean, neat and reliable CCTV installation carried out with attention to detail."
            />

            <ServiceCard 
              icon={<Smartphone className="w-5 h-5" />}
              title="Remote Viewing"
              desc="View your cameras remotely from your phone and stay connected wherever you are."
            />

          </div>
        </div>
      </section>

      <section className="py-24 border-y border-zinc-900 bg-zinc-900/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            <div className="lg:col-span-5 space-y-6">
              <Badge className="bg-cyan-500/10 text-cyan-400 border-cyan-500/20 font-black tracking-widest text-[10px]">WHY CHOOSE LUBANZI</Badge>
              <h2 className="text-3xl lg:text-4xl font-black text-white uppercase tracking-tighter">
                HIGH PERFORMANCE ADVANTAGES
              </h2>
              <p className="text-zinc-400 text-sm leading-relaxed font-medium">
                Our deployments follow strict industry guidelines to maximize perimeter visibility and coverage fields.
              </p>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <TechFeature title="HD QUALITY" desc="Crisp high definition camera streams for effective visual forensics." />
              <TechFeature title="NIGHT VISION" desc="Equipped with automatic infrared sensors for total dark performance." />
              <TechFeature title="MOTION DETECTION" desc="Intelligent video triggers log specific movements straight away." />
              <TechFeature title="WEATHERPROOF" desc="Rugged exterior chassis built to withstand harsh outdoor elements." />
              <TechFeature title="LATEST TECHNOLOGY" desc="Advanced surveillance hardware with multi-channel video recorders." />
              <TechFeature title="EXPERT INSTALLATION" desc="Clean cabling and precise camera angle optimization on every client site." />
            </div>

          </div>
        </div>
      </section>

      <section id="solutions" className="py-24 relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-6 mb-16">
            <Badge className="bg-cyan-500/10 text-cyan-400 border-cyan-500/20 font-black tracking-widest text-[10px]">COMPLETE SURVEILLANCE CAPABILITIES</Badge>
            <h2 className="text-3xl lg:text-5xl font-black text-white uppercase tracking-tighter">WHAT OUR SOLUTIONS PROVIDE</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'Live Camera Viewing', text: 'Real-time observation channels stream data securely directly into your chosen viewing grid.' },
              { title: 'Remote Smartphone Access', text: 'Full modern configuration setup allows quick remote access from your phone anywhere, anytime.' },
              { title: 'Day and Night Surveillance', text: 'Automatic illumination cut-overs keep operations active across bright noon-day glare or midnight dark.' },
              { title: 'Motion Detection Alerts', text: 'Receive proactive alerts when security grids recognize custom defined movement paths.' },
              { title: 'Continuous Recording', text: 'High capacity secure video arrays systematically cache multi-day loops for retro-active investigations.' },
              { title: 'Proactive Property Monitoring', text: 'A visible, professional camera grid serves as a premier preventative barrier to potential unwanted intrusions.' }
            ].map((sol, index) => (
              <div key={index} className="p-8 bg-zinc-900/40 border border-zinc-800/60 rounded-2xl space-y-3">
                <div className="w-2 h-2 rounded-full bg-cyan-400" />
                <h4 className="text-lg font-black text-white uppercase tracking-wider">{sol.title}</h4>
                <p className="text-zinc-400 text-sm font-medium leading-relaxed">{sol.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="py-24 bg-zinc-950/40 border-t border-zinc-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center space-y-8">
          <Badge className="bg-cyan-500/10 text-cyan-400 border-cyan-500/20 font-black tracking-widest text-[10px]">ABOUT OUR COMPANY</Badge>
          <h3 className="text-3xl lg:text-4xl font-black uppercase text-white tracking-tight">LUBANZI TECHNOLOGIES</h3>
          <p className="text-lg text-zinc-300 leading-relaxed max-w-2xl mx-auto font-medium">
            We are a professional CCTV installation and security solutions company focused on reliable, affordable and practical security systems. Keep your property, assets and loved ones safe with our security integrations.
          </p>
          <div className="text-cyan-400 font-bold tracking-widest text-xs uppercase pt-4">
            "Your Security • Our Priority"
          </div>
        </div>
      </section>

      <section className="py-24 bg-zinc-900/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-5xl font-black text-white uppercase tracking-tighter">THE DEPLOYMENT PROCESS</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { num: '01', title: 'Consultation', desc: 'Initial alignment to chart clear client perimeter demands.' },
              { num: '02', title: 'Site Assessment', desc: 'Detailed spatial evaluation to pinpoint potential structural blindspots.' },
              { num: '03', title: 'System Recommendation', desc: 'Curating custom tailored packages based exactly on perimeter layout.' },
              { num: '04', title: 'Professional Installation', desc: 'Clean, robust deployment with pristine cable routing and secure mountings.' },
              { num: '05', title: 'Setup & Testing', desc: 'Rigorous fine-tuning loops confirm active signal feed clarity across channels.' },
              { num: '06', title: 'Customer Handover', desc: 'Onboarding training to navigate client application sync tools seamlessly.' }
            ].map((step, idx) => (
              <div key={idx} className="p-8 bg-zinc-950/50 border border-zinc-800/40 rounded-2xl space-y-3">
                <span className="text-2xl font-black text-cyan-500/40 block">{step.num}</span>
                <h4 className="text-base font-black text-white uppercase tracking-wider">{step.title}</h4>
                <p className="text-xs text-zinc-500 font-medium leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="py-24 bg-zinc-950 border-t border-zinc-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          
          <div className="text-center space-y-4 mb-16">
            <Badge className="bg-cyan-500/10 text-cyan-400 border-cyan-500/20 font-black tracking-widest text-[10px]">CONNECT WITH US</Badge>
            <h2 className="text-3xl lg:text-5xl font-black text-white uppercase tracking-tighter">DIRECT TECHNICAL CHANNELS</h2>
            <p className="text-zinc-500 text-sm max-w-md mx-auto">Get in touch directly with our technicians for specialized deployment assistance.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ContactCard 
              href="tel:064550783"
              icon={<Phone className="w-6 h-6 text-cyan-400" />}
              label="Direct Line"
              value="06 455 0783"
            />
            <ContactCard 
              href="https://wa.me/27746417112"
              icon={<MessageCircle className="w-6 h-6 text-emerald-400" />}
              label="WhatsApp"
              value="074 641 7112"
            />
            <ContactCard 
              href="mailto:CoetzeeLeo82@gmail.com"
              icon={<Mail className="w-6 h-6 text-cyan-400" />}
              label="Email Enquiries"
              value="CoetzeeLeo82@gmail.com"
            />
          </div>

        </div>
      </section>

      <footer className="bg-[#010410] pt-16 pb-12 border-t border-zinc-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 mb-12">
            
            <div className="lg:col-span-2 space-y-4">
              <Logo />
              <p className="text-zinc-500 max-w-sm text-sm font-medium leading-relaxed">
                Professional CCTV installation services for homes, businesses and commercial properties across South Africa.
              </p>
              <p className="text-cyan-400 text-xs font-black uppercase tracking-widest italic">
                "Security Today • Peace of Mind Tomorrow"
              </p>
            </div>

            <div className="space-y-4">
              <h4 className="text-xs font-black uppercase tracking-widest text-white">Quick Navigation</h4>
              <ul className="space-y-2 text-sm font-bold text-zinc-500">
                <li><button onClick={() => scrollToSection('home')} className="hover:text-cyan-400 transition-colors">Home</button></li>
                <li><button onClick={() => scrollToSection('services')} className="hover:text-cyan-400 transition-colors">Services</button></li>
                <li><button onClick={() => scrollToSection('solutions')} className="hover:text-cyan-400 transition-colors">CCTV Solutions</button></li>
                <li><button onClick={() => scrollToSection('about')} className="hover:text-cyan-400 transition-colors">About</button></li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="text-xs font-black uppercase tracking-widest text-white">Corporate Slogan</h4>
              <p className="text-xs text-zinc-600 uppercase font-black tracking-widest">
                Your Security • Our Priority
              </p>
            </div>

          </div>

          <div className="pt-8 border-t border-zinc-900 text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-[10px] text-zinc-600 font-bold uppercase tracking-widest">
              © 2024 LUBANZI TECHNOLOGIES. ALL RIGHTS RESERVED.
            </p>
          </div>
        </div>
      </footer>

    </div>
  );
}

function ServiceCard({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="p-8 bg-zinc-900/30 border border-zinc-800/60 rounded-2xl space-y-4 hover:border-cyan-500/20 transition-all group">
      <div className="w-10 h-10 rounded-xl bg-zinc-900 flex items-center justify-center text-cyan-400 border border-zinc-800 group-hover:bg-cyan-500 group-hover:text-zinc-950 transition-colors">
        {icon}
      </div>
      <h3 className="text-lg font-black text-white uppercase tracking-wider">{title}</h3>
      <p className="text-zinc-400 text-xs font-medium leading-relaxed">{desc}</p>
    </div>
  );
}

function TechFeature({ title, desc }: { title: string, desc: string }) {
  return (
    <div className="p-5 bg-zinc-900/40 border border-zinc-800/60 rounded-xl space-y-1">
      <h4 className="text-xs font-black text-white uppercase tracking-widest text-cyan-400">{title}</h4>
      <p className="text-[11px] text-zinc-500 font-bold leading-relaxed">{desc}</p>
    </div>
  );
}

function ContactCard({ href, icon, label, value }: { href: string, icon: React.ReactNode, label: string, value: string }) {
  return (
    <a 
      href={href}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel={href.startsWith('http') ? 'noreferrer' : undefined}
      className="p-6 rounded-2xl bg-zinc-900/30 border border-zinc-800/60 flex flex-col items-center text-center space-y-3 hover:bg-zinc-900/60 transition-all group"
    >
      <div className="w-12 h-12 rounded-full bg-zinc-950 flex items-center justify-center border border-zinc-800 group-hover:scale-105 transition-transform">
        {icon}
      </div>
      <div>
        <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500">{label}</p>
        <p className="text-base font-black text-white tracking-tight mt-1">{value}</p>
      </div>
    </a>
  );
}
