import { motion } from 'framer-motion';
import { Facebook, Github, Instagram, Linkedin, Mail, ArrowRight } from 'lucide-react';
import heroImg from '../assets/hero.png';

const socialLinks = [
  { icon: <Github />, href: "https://github.com", delay: 0.2 },
  { icon: <Linkedin />, href: "https://linkedin.com", delay: 0.3 },
  { icon: <Facebook />, href: "https://facebook.com", delay: 0.4 },
  { icon: <Instagram />, href: "https://instagram.com", delay: 0.5 },
  { icon: <Mail />, href: "mailto:contact@example.com", delay: 0.6 }
];

export function Hero() {
  return (
    <section id="home" className="min-h-screen flex items-center pt-16 overflow-hidden relative">
      {/* Background Gradient with Dot Pattern */}
      <div className="absolute inset-0 -z-10 gradient-overlay"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8 lg:ml-10"
          >
            <motion.h1 
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Hello, <br />
              Welcome to <br />
              <motion.span 
                className="bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent inline-block mt-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Shanuka's World
              </motion.span>
            </motion.h1>

            <motion.p 
              className="text-lg sm:text-xl md:text-2xl text-slate-600 dark:text-slate-300"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Crafting digital experiences through code and creativity
            </motion.p>
            
            <div className="flex flex-wrap gap-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-300 hover:scale-110"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: social.delay }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <motion.a
                href="#contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600/90 hover:bg-blue-500 text-white rounded-full transition-all duration-300 group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Let's Create Something Amazing
                <motion.span
                  className="inline-block"
                  whileHover={{ x: 5 }}
                >
                  <ArrowRight className="w-5 h-5" />
                </motion.span>
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Right Content - Hero Image */}
          <motion.div 
            className="relative hidden lg:block"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
          >
            <motion.div
              className="relative z-10"
              animate={{ 
                y: [0, -20, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <img
                src={heroImg}
                alt="Hero illustration"
                className="w-full h-auto max-w-5xl mx-auto filter drop-shadow-xl"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Mobile Hero Image */}
      <div className="hero-image-mobile-wrapper absolute top-0 right-0 p-6 sm:p-10 md:p-12 lg:hidden fade-in">
            <motion.div
              className="relative z-10"
              animate={{ 
                y: [0, -20, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
        <motion.img
          src={heroImg}
          alt="Hero Image Mobile"
          className="hero-image object-cover w-11/12 ml-auto mt-10 -mr-10 opacity-40"
        />
        </motion.div>
      </div>

            {/* Dot Pattern - Bottom Left */}
            <div className="absolute bottom-10 left-10 grid grid-cols-6 gap-2 opacity-20">
              {Array.from({ length: 36 }).map((_, i) => (
                <div key={`bottom-${i}`} className="w-1.5 h-1.5 bg-gray-500 rounded-full" />
                ))}
            </div>

    </section>
  );
}
