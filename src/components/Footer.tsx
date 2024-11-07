import { Facebook, Github, Instagram, Linkedin, Mail } from 'lucide-react';

export function Footer() {
  return (
    <footer className="py-12 bg-chocolate-accent">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center">
          <div className="flex gap-6 mb-8">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-chocolate-primary transition-colors"
            >
              <Github className="w-6 h-6" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-chocolate-primary transition-colors"
            >
              <Linkedin className="w-6 h-6" />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-chocolate-primary transition-colors"
            >
              <Facebook className="w-6 h-6" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-chocolate-primary transition-colors"
            >
              <Instagram className="w-6 h-6" />
            </a>
            <a
              href="mailto:contact@example.com"
              className="hover:text-chocolate-primary transition-colors"
            >
              <Mail className="w-6 h-6" />
            </a>
          </div>
          
          <div className="flex gap-6 mb-8 text-sm">
            <a href="#home" className="hover:text-chocolate-primary transition-colors">Home</a>
            <a href="#about" className="hover:text-chocolate-primary transition-colors">About</a>
            <a href="#technologies" className="hover:text-chocolate-primary transition-colors">Technologies</a>
            <a href="#projects" className="hover:text-chocolate-primary transition-colors">Projects</a>
            <a href="#contact" className="hover:text-chocolate-primary transition-colors">Contact</a>
          </div>
          
          <p className="text-sm text-chocolate-secondary">
            © {new Date().getFullYear()} Shanuka Dilshan. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}