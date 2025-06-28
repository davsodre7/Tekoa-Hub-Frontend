import React from 'react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t bg-muted/50 cultural-pattern">
      <div className="container mx-auto px-4 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="relative w-10 h-10 bg-gradient-to-br from-primary to-primary/80 rounded-lg flex items-center justify-center shadow-lg">
                {/* Geometric pattern inspired by indigenous art */}
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-primary-foreground">
                  {/* Central diamond */}
                  <path d="M12 2 L18 8 L12 14 L6 8 Z" fill="currentColor" opacity="0.9"/>
                  {/* Side triangles */}
                  <path d="M12 10 L18 16 L12 22 L6 16 Z" fill="currentColor" opacity="0.7"/>
                  {/* Connecting lines */}
                  <path d="M12 8 L16 12 L12 16 L8 12 Z" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.5"/>
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold text-foreground tracking-wide">Tekoá Hub</span>
              </div>
            </div>
            <p className="text-muted-foreground max-w-md">
              Descubra a rica herança cultural dos povos indígenas brasileiros através de histórias, arte, música e tradições ancestrais.
            </p>
            <span className="block mt-2 text-xs">Preservando e valorizando culturas indígenas do Brasil.</span>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Explorar</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/explore?filter=stories" className="text-muted-foreground hover:text-primary transition-colors">
                  Histórias
                </Link>
              </li>
              <li>
                <Link to="/explore?filter=crafts" className="text-muted-foreground hover:text-primary transition-colors">
                  Artesanato Tradicional
                </Link>
              </li>
              <li>
                <Link to="/explore?filter=music" className="text-muted-foreground hover:text-primary transition-colors">
                  Música e Dança
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="font-semibold mb-4">Sobre</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">
                  Sobre
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                  Contato
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-muted-foreground hover:text-primary transition-colors">
                  Privacidade
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-muted-foreground">
          <span>Tekoá Hub © {new Date().getFullYear()}</span>
        </div>
      </div>
    </footer>
  );
};
