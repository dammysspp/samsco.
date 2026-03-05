import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { galleryItems, GalleryItem } from './data';
import BackgroundCanvas from './components/BackgroundCanvas';
import CustomCursor from './components/CustomCursor';
import TextReveal from './components/TextReveal';
import GalleryModal from './components/GalleryModal';
import Lightbox from './components/Lightbox';
import HoverLoopText from './components/HoverLoopText';
import { Menu, X, ArrowRight } from 'lucide-react';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [time, setTime] = useState("00:00:00");
  
  // Hero Rotator State
  const heroWords = [
    { top: "VISION", bottom: "ENGINEERED" },
    { top: "REALITY", bottom: "RENDERED" },
    { top: "DIGITAL", bottom: "ALCHEMY" },
    { top: "LOGIC", bottom: "DEFYING" }
  ];
  const [heroIndex, setHeroIndex] = useState(0);
  const topTextRef = useRef<HTMLSpanElement>(null);
  const bottomTextRef = useRef<HTMLSpanElement>(null);

  // Time update
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString('en-US', { timeZone: 'Africa/Lagos', hour12: true }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // God Mode Easter Egg
  useEffect(() => {
    let keyHistory = "";
    const handleKeyDown = (e: KeyboardEvent) => {
      keyHistory += e.key.toUpperCase();
      if (keyHistory.length > 6) keyHistory = keyHistory.slice(-6);
      if (keyHistory === "SAMSCO") {
        document.body.classList.toggle("god-mode");
        keyHistory = "";
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Hero Text Animation
  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (heroIndex + 1) % heroWords.length;
      
      const tl = gsap.timeline();
      tl.to([topTextRef.current, bottomTextRef.current], {
        y: -100, opacity: 0, duration: 1, ease: "power4.in", stagger: 0.1,
        onComplete: () => {
          setHeroIndex(nextIndex);
          gsap.set([topTextRef.current, bottomTextRef.current], { y: 100 });
          gsap.to([topTextRef.current, bottomTextRef.current], { 
            y: 0, opacity: 1, duration: 1, ease: "power4.out", stagger: 0.1 
          });
        }
      });

    }, 4000);
    return () => clearInterval(interval);
  }, [heroIndex]);


  // Navigation Handlers
  const handleNextItem = () => {
    if (!selectedItem) return;
    const currentIndex = galleryItems.findIndex(i => i.id === selectedItem.id);
    const nextIndex = (currentIndex + 1) % galleryItems.length;
    setSelectedItem(galleryItems[nextIndex]);
  };

  const handlePrevItem = () => {
    if (!selectedItem) return;
    const currentIndex = galleryItems.findIndex(i => i.id === selectedItem.id);
    const prevIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
    setSelectedItem(galleryItems[prevIndex]);
  };

  return (
    <div className="relative min-h-screen text-white overflow-x-hidden selection:bg-blue-500 selection:text-white">
      <BackgroundCanvas />
      <CustomCursor />
      
      {/* Lagos Badge */}
      <div className="fixed bottom-8 right-5 md:right-8 z-40 bg-black/80 backdrop-blur-md border border-white/10 px-5 py-2 rounded-full flex items-center gap-3 text-xs font-bold tracking-widest shadow-xl">
        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_#22c55e]"></div>
        <span>LAGOS: {time}</span>
      </div>

      {/* Navigation */}
      <nav className="fixed w-full top-0 z-50 px-6 py-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center glass-card rounded-full px-8 py-4">
          <div className="text-xl font-bold tracking-tighter interactive cursor-pointer" onClick={() => window.scrollTo(0,0)}>
            SAMSCO<span className="text-blue-500">.</span>
          </div>
          <div className="hidden md:flex gap-10 text-xs font-bold tracking-widest">
             {["ABOUT", "EXPERTISE", "WORK", "CONTACT"].map(item => (
                 <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-blue-400 transition-colors interactive">{item}</a>
             ))}
          </div>
          <div className="md:hidden text-2xl cursor-pointer interactive" onClick={() => setIsMenuOpen(true)}>
            <Menu />
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 z-[60] bg-black/95 flex flex-col justify-center items-center gap-8 transition-transform duration-500 ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <button className="absolute top-8 right-8 text-white hover:text-blue-500 interactive" onClick={() => setIsMenuOpen(false)}>
            <X size={32} />
        </button>
        {["ABOUT", "EXPERTISE", "WORK", "CONTACT"].map(item => (
             <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setIsMenuOpen(false)} className="text-3xl font-bold hover:text-blue-500 mobile-link interactive">{item}</a>
        ))}
      </div>

      {/* Main Content */}
      <main className="relative z-10">
        
        {/* HERO SECTION */}
        <section id="home" className="min-h-screen flex flex-col justify-center items-center text-center px-4">
            <div className="hero-content z-20 mt-20">
                <div className="inline-block border border-blue-500/30 bg-blue-500/10 px-4 py-1 rounded-full mb-6 backdrop-blur-md">
                    <span className="text-blue-400 tracking-[0.2em] text-xs font-bold">19 Y/O • SAMSCO COMMUNICATIONS</span>
                </div>
                <h1 className="text-6xl md:text-9xl font-bold mb-6 leading-[0.9] tracking-tight">
                    <div className="hero-text-mask">
                        <span ref={topTextRef} className="inline-block">{heroWords[heroIndex].top}</span>
                    </div> 
                    <div className="hero-text-mask">
                        <span ref={bottomTextRef} className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">{heroWords[heroIndex].bottom}</span>
                    </div>
                </h1>
                <TextReveal delay={0.5}>
                    <p className="max-w-xl mx-auto text-gray-400 text-lg mb-10 leading-relaxed font-light">
                        Final Year Mass Communication Student & Creative Technologist. <br className="hidden md:block"/>Blending futuristic design, code, and storytelling.
                    </p>
                </TextReveal>
                <div className="flex justify-center gap-4">
                    <a href="#work" className="bg-white text-black px-8 py-4 rounded-full font-bold transition-all hover:bg-blue-50 interactive">View Selected Work</a>
                    <a href="#contact" className="border border-white/20 hover:border-white hover:bg-white/5 px-8 py-4 rounded-full font-bold transition-all interactive">Contact Me</a>
                </div>
            </div>
        </section>

        {/* Marquee */}
        <div className="w-full bg-black border-y border-white/10 overflow-hidden py-6 relative z-20">
            <div className="whitespace-nowrap flex gap-12 text-lg font-bold text-gray-500 animate-[marquee_40s_linear_infinite] tracking-widest">
                {Array(4).fill("3D VISUALIZATION • VFX • VIBE-CODING • GRAPHICS • DATA ANALYTICS • AI AUTOMATION • C# • MOTION GRAPHICS • ").map((text, i) => (
                    <span key={i}>{text}</span>
                ))}
            </div>
        </div>

        {/* ABOUT SECTION */}
        <section id="about" className="py-32 px-6 bg-gradient-to-b from-transparent to-black/80">
            <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
                <div className="relative group">
                    <div className="aspect-[4/5] bg-gray-900 rounded-2xl overflow-hidden relative glass-card border border-white/5">
                        <img src="https://images.unsplash.com/photo-1531297461734-296825d18e57?auto=format&fit=crop&w=800&q=80" 
                             alt="Samsco Portrait" 
                             className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 grayscale group-hover:grayscale-0" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                    </div>
                </div>
                <div>
                    <TextReveal>
                        <h2 className="text-4xl md:text-6xl font-bold mb-8">Hello, I'm <HoverLoopText mainText="Samsco" alternates={["Aiyedun Samuel", "Samsco Personal"]} />.</h2>
                    </TextReveal>
                    <TextReveal delay={0.2}>
                        <p className="text-xl text-gray-300 mb-6 leading-relaxed font-light">
                            19-Year-Old Multi-Disciplinary Talent. Final Year Student at <span className="text-white font-bold">Covenant University</span>.
                        </p>
                    </TextReveal>
                    <TextReveal delay={0.3}>
                        <p className="text-gray-400 mb-8 leading-relaxed">
                            I bridge the gap between Mass Communication and Creative Technology. My personality is a blend of youthful energy and a serious, growth-focused mindset. I don't just design; I create futuristic, interactive experiences using AI, Code, and 3D.
                        </p>
                    </TextReveal>
                    
                    <div className="grid grid-cols-2 gap-y-4 gap-x-8 text-sm font-bold tracking-wide text-white/80">
                        {["3D & Product Viz", "Vibe-Coding (C#, JS)", "Data Analytics", "Gaming & AI"].map(skill => (
                            <div key={skill} className="flex items-center gap-3"><span className="w-2 h-2 bg-blue-500 rounded-full"></span> {skill}</div>
                        ))}
                    </div>
                </div>
            </div>
        </section>

        {/* SERVICES */}
        <section id="expertise" className="py-32 px-6 bg-black">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-3xl md:text-5xl font-bold mb-20 text-center">Core Expertise</h2>
                <div className="grid md:grid-cols-3 gap-8">
                    {[
                        { icon: "❖", title: "3D & VFX", desc: "Product visualization and visual effects that push boundaries. Clean layouts with futuristic aesthetics." },
                        { icon: "⚡", title: "Design & Motion", desc: "Graphics design and fluid motion graphics. I create tech-inspired designs that tell a story." },
                        { icon: "⌬", title: "Code & Data", desc: "Creative coding (HTML/CSS/JS/C#) and Data Analytics. Building interactive and automated AI solutions." }
                    ].map((service, i) => (
                        <TextReveal key={i} delay={i * 0.1}>
                            <div className="glass-card p-10 rounded-2xl h-full group hover:bg-white/5 interactive">
                                <div className="text-4xl mb-8 group-hover:scale-110 transition-transform duration-300 text-blue-500">{service.icon}</div>
                                <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                                <p className="text-gray-400 leading-relaxed text-sm">{service.desc}</p>
                            </div>
                        </TextReveal>
                    ))}
                </div>
            </div>
        </section>

        {/* REPLACED SECTION: VISUAL VAULT (Was Experience) */}
        <section id="work" className="py-40 px-6 bg-black border-t border-white/10 relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
             
             <div className="max-w-5xl mx-auto text-center relative z-10">
                 <TextReveal>
                    <span className="text-blue-500 font-bold tracking-[0.3em] text-sm uppercase mb-4 block">Archive Access</span>
                 </TextReveal>
                 <TextReveal delay={0.1}>
                    <h2 className="text-5xl md:text-8xl font-bold mb-8">VISUAL <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-300">VAULT</span></h2>
                 </TextReveal>
                 <TextReveal delay={0.2}>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-16 leading-relaxed">
                        A curated collection of over 30+ experimental works, client projects, and digital explorations. Dive into the repository.
                    </p>
                 </TextReveal>
                 
                 <div className="group relative inline-block">
                    <button 
                        onClick={() => setIsGalleryOpen(true)}
                        className="relative z-10 bg-white text-black text-xl font-bold px-12 py-6 rounded-full interactive flex items-center gap-4 group-hover:bg-blue-500 group-hover:text-white transition-all duration-500"
                    >
                        OPEN ARCHIVE
                        <ArrowRight className="group-hover:translate-x-2 transition-transform" />
                    </button>
                    {/* Button Glow Effect */}
                    <div className="absolute inset-0 bg-blue-500 blur-3xl opacity-20 group-hover:opacity-60 transition-opacity duration-500 rounded-full"></div>
                 </div>
             </div>
        </section>

        {/* CONTACT SECTION */}
        <section id="contact" className="py-32 px-6 flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-blue-900/10 blur-[120px]"></div>
            <div className="max-w-4xl w-full text-center relative z-10 glass-card p-16 rounded-[3rem] border-t border-blue-500/30">
                <TextReveal>
                    <h2 className="text-5xl md:text-7xl font-bold mb-8">Let's Create the Future.</h2>
                </TextReveal>
                <p className="text-gray-300 mb-12 text-xl font-light">Available for freelance projects in 3D, Design, and Creative Coding.</p>
                
                <div className="flex flex-col md:flex-row justify-center gap-6 flex-wrap">
                    <a href="mailto:samscocommunications@gmail.com" className="bg-white text-black px-12 py-5 rounded-full font-bold text-lg hover:bg-blue-50 hover:scale-105 transition-all shadow-xl interactive">
                        Send Email
                    </a>
                    <a href="tel:09072483594" className="bg-transparent border border-white/20 text-white px-12 py-5 rounded-full font-bold text-lg hover:bg-white/10 transition-all interactive">
                        +234 907 248 3594
                    </a>
                </div>
            </div>
        </section>

        <footer className="bg-black pt-20 pb-10 border-t border-white/10 text-sm">
            <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-12 mb-16">
                <div className="col-span-1 md:col-span-2">
                    <h2 className="text-2xl font-bold mb-4">SAMSCO<span className="text-blue-500">.</span></h2>
                    <p className="text-gray-500 max-w-sm leading-relaxed">
                        Visual Engineering for the Modern Web. <br />
                        Enhancing creativity, communication, and digital experiences through technology.
                    </p>
                </div>
                <div>
                    <h4 className="font-bold text-white mb-6 tracking-widest text-xs">NAVIGATION</h4>
                    <ul className="space-y-4 text-gray-500">
                        {["Home", "Work", "Expertise", "Contact"].map(item => (
                            <li key={item}><a href={`#${item.toLowerCase()}`} className="hover:text-blue-500 transition-colors interactive">{item}</a></li>
                        ))}
                    </ul>
                </div>
                <div>
                    <h4 className="font-bold text-white mb-6 tracking-widest text-xs">CONNECT</h4>
                    <ul className="space-y-4 text-gray-500">
                        <li><a href="#" className="hover:text-blue-500 transition-colors interactive">LinkedIn</a></li>
                        <li><a href="#" className="hover:text-blue-500 transition-colors interactive">GitHub</a></li>
                        <li><a href="#" className="hover:text-blue-500 transition-colors interactive">Instagram</a></li>
                        <li><span className="text-gray-700">Lagos, NG (WAT)</span></li>
                    </ul>
                </div>
            </div>
            <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/5 text-gray-600 text-xs">
                <p>&copy; 2025 Samsco Communications. All Rights Reserved.</p>
                <p>Designed & Engineered by Samsco.</p>
            </div>
        </footer>

      </main>

      {/* MODALS */}
      <GalleryModal 
        isOpen={isGalleryOpen} 
        onClose={() => setIsGalleryOpen(false)} 
        items={galleryItems}
        onItemClick={(item) => setSelectedItem(item)}
      />

      <Lightbox 
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
        onNext={handleNextItem}
        onPrev={handlePrevItem}
      />

      <style>{`
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
      `}</style>
    </div>
  );
}

export default App;