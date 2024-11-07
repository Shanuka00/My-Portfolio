import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';
import { useState } from 'react';

export function Header() {
  const { isDark, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed w-full top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md shadow-lg">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <a href="#home" className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent hover:scale-105 transition-transform">
            Shanuka
          </a>

          <div className="flex items-center gap-4 ml-auto">
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              {['Home', 'About', 'Technologies', 'Projects', 'Contact'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="relative overflow-hidden group py-2"
                >
                  <span className="relative z-10 transition-colors group-hover:text-blue-600 dark:group-hover:text-blue-400">
                    {item}
                  </span>
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 dark:bg-blue-400 transform origin-left scale-x-0 transition-transform group-hover:scale-x-100"></span>
                </a>
              ))}
            </nav>

            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-blue-50 dark:hover:bg-slate-800 transition-colors"
              aria-label="Toggle theme"
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-blue-50 dark:hover:bg-slate-800 transition-colors"
            >
              <div className="w-6 h-0.5 bg-current mb-1.5 transition-all" style={{
                transform: isMenuOpen ? 'rotate(45deg) translate(2px, 6px)' : 'none'
              }}></div>
              <div className="w-6 h-0.5 bg-current mb-1.5 transition-all" style={{
                opacity: isMenuOpen ? 0 : 1
              }}></div>
              <div className="w-6 h-0.5 bg-current transition-all" style={{
                transform: isMenuOpen ? 'rotate(-45deg) translate(2px, -6px)' : 'none'
              }}></div>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <nav className={`md:hidden absolute left-0 right-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shadow-lg transition-all duration-300 ${
          isMenuOpen ? 'max-h-64 py-4' : 'max-h-0'
        } overflow-hidden`}>
          {['Home', 'About', 'Technologies', 'Projects', 'Contact'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="block px-6 py-2 hover:bg-blue-50 dark:hover:bg-slate-800 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              {item}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}