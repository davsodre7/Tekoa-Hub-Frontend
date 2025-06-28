import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const Header: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname.startsWith(path);

  const navLinkClasses = `
    text-sm font-medium transition-all duration-300
    hover:text-foreground hover:scale-105
    focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background rounded-sm
  `;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-gradient-to-r from-[#2A2A2A] to-[#1a1a1a] shadow-md">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
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
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link
              to="/"
              className={`${navLinkClasses} ${isActive('/') && location.pathname === '/' ? 'text-foreground' : 'text-muted-foreground'
                }`}
            >
              Início
            </Link>
            <Link
              to="/explore"
              className={`${navLinkClasses} ${isActive('/explore') ? 'text-foreground' : 'text-muted-foreground'
                }`}
            >
              Explorar
            </Link>
            <Link
              to="/about"
              className={`${navLinkClasses} ${isActive('/about') ? 'text-foreground' : 'text-muted-foreground'
                }`}
            >
              Sobre
            </Link>
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-2">
            <Button size="sm" asChild>
              <Link to="/admin/conteudos">Admin</Link>
            </Button>

            {/* Mobile Menu Button */}
            <Button variant="ghost" size="sm" className="md:hidden">
              <Menu className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};
