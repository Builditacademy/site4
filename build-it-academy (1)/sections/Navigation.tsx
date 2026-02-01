import React, { useState, useEffect } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { NavItem, Language } from '../types';
import { cn } from '../lib/utils';

// Logo URL provided by user
const LOGO_URL = "https://i.ibb.co/7NYx5rfy/231321321231231231231321321.png";

/**
 * Navigation component that handles desktop and mobile menus, 
 * language switching, and smooth scrolling.
 */
export default function Navigation() {
  const { language, setLanguage, t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems: NavItem[] = [
    { id: 'courses', label: t('nav_courses') },
    { id: 'career', label: t('nav_career') },
    { id: 'contact', label: t('nav_contact') },
  ];

  const langs: Language[] = ['en', 'az', 'pl'];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b",
      isScrolled ? "bg-white/80 backdrop-blur-md py-4 border-gray-200 shadow-sm" : "bg-transparent py-6 border-transparent"
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-3 group"
          >
            <img src={LOGO_URL} alt="Build IT Logo" className="w-10 h-10 object-contain" />
            <div className="flex items-center gap-1.5 text-xl tracking-tight">
              <span className="font-extrabold bg-gradient-to-r from-[#1D4ED8] to-[#2563EB] bg-clip-text text-transparent">
                Build IT
              </span>
              <span className={cn(
                "font-light transition-colors duration-300",
                isScrolled ? "text-[#050505]" : "text-white"
              )}>
                Academy
              </span>
            </div>
          </button>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={cn(
                  "relative text-sm font-medium transition-colors duration-300 group",
                  isScrolled ? "text-[#666666] hover:text-[#2563EB]" : "text-white/80 hover:text-white"
                )}
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#2563EB] group-hover:w-full transition-all duration-300" />
              </button>
            ))}
          </div>

          {/* Desktop Language */}
          <div className="hidden md:flex items-center gap-4">
            <div className="flex items-center gap-2">
              {langs.map((lang) => (
                <button
                  key={lang}
                  onClick={() => setLanguage(lang)}
                  className={cn(
                    "px-3 py-1.5 rounded-md text-xs font-bold uppercase transition-all border",
                    language === lang
                      ? (isScrolled ? "bg-[#2563EB] text-white border-[#2563EB]" : "bg-white text-[#1D4ED8] border-white")
                      : (isScrolled ? "bg-transparent text-[#666666] border-gray-200 hover:bg-gray-100" : "bg-transparent text-white/70 border-white/20 hover:bg-white/10")
                  )}
                >
                  {lang}
                </button>
              ))}
            </div>
          </div>

          {/* Mobile Language Buttons (Replaces Hamburger) */}
          <div className="md:hidden flex items-center gap-1.5">
            {langs.map((lang) => (
              <button
                key={lang}
                onClick={() => setLanguage(lang)}
                className={cn(
                  "px-2 py-1 rounded-md text-[10px] font-bold uppercase transition-all border",
                  language === lang
                    ? (isScrolled ? "bg-[#2563EB] text-white border-[#2563EB]" : "bg-white text-[#1D4ED8] border-white")
                    : (isScrolled ? "bg-transparent text-[#666666] border-gray-200 hover:bg-gray-100" : "bg-transparent text-white/70 border-white/20 hover:bg-white/10")
                )}
              >
                {lang}
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
