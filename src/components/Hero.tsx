import { Facebook, Github, Instagram, Linkedin, Mail, ArrowRight } from 'lucide-react';
import heroImg from '../assets/hero.png';

export function Hero() {
  return (
    <section id="home" className="min-h-screen flex items-center pt-16 overflow-hidden relative">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <div className="hero-image-wrapper absolute right-0 top-0 md:mt-0">
          <img
            style={{ width: '57%', height: 'auto', marginLeft: '48%' }}
            src= { heroImg }
            alt=""
            className="hero-image fade-in"
          />
        </div>
      </div>

      {/* Animated background shapes */}
      <div className="floating-shapes">
        <div></div>
        <div></div>
        <div></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl lg:pl-6 ">
          <div className="space-y-8 fade-in">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-tight max-w-full lg:max-w-[70%] whitespace-nowrap">
            Welcome to <br />
            <span className="bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent" style={{ display: 'inline-block', marginTop: '0.65rem' }} >
              Shanuka's World
            </span>
          </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-slate-600 dark:text-slate-300">
              Crafting digital experiences through code and creativity
            </p>
            
            <div className="flex gap-4 slide-in" style={{ animationDelay: '200ms' }}>
              {[
                { icon: <Github />, href: "https://github.com" },
                { icon: <Linkedin />, href: "https://linkedin.com" },
                { icon: <Facebook />, href: "https://facebook.com" },
                { icon: <Instagram />, href: "https://instagram.com" },
                { icon: <Mail />, href: "mailto:contact@example.com" }
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-300 hover:scale-110 hover-lift"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {social.icon}
                </a>
              ))}
            </div>
            
            <div className="slide-up" style={{ animationDelay: '400ms' }}>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600/90 hover:bg-blue-500 text-white rounded-full transition-all duration-300 hover:scale-105 hover-lift backdrop-blur-sm group"
              >
                Let's Create Something Amazing
                <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}