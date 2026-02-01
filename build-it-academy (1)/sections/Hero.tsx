import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { Button } from '../components/ui/button';
import { useLanguage } from '../hooks/useLanguage';

// Inline SVG for the scroll indicator
const ChevronDown = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="m6 9 6 6 6-6"/>
  </svg>
);

export default function Hero() {
  const { t } = useLanguage();
  const heroRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial states
      gsap.set(titleRef.current, { y: 50, opacity: 0 });
      gsap.set(descRef.current, { y: 30, opacity: 0 });
      gsap.set(ctaRef.current, { scale: 0, opacity: 0 });

      // Animation timeline
      const tl = gsap.timeline({ delay: 0.3 });

      tl.to(titleRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'expo.out'
      })
      .to(descRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'expo.out'
      }, '-=0.5')
      .to(ctaRef.current, {
        scale: 1,
        opacity: 1,
        duration: 0.6,
        ease: 'back.out(1.7)'
      }, '-=0.4');
    }, heroRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setShowScrollIndicator(false);
      } else {
        setShowScrollIndicator(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToCourses = () => {
    const element = document.getElementById('courses');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const heroTitleWords = t('hero_title').split(' ');

  return (
    <section ref={heroRef} className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden aurora-bg">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0B0B1A] via-[#0B0B1A] to-[#1A1040]/30" />
      
      {/* Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03]" 
        style={{
          backgroundImage: `linear-gradient(rgba(37, 99, 235, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(37, 99, 235, 0.5) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}
      />

      {/* Animated Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-[#2563EB]/40 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${5 + Math.random() * 5}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
        <div className="flex flex-col items-center text-center space-y-8">
          <h1 
            ref={titleRef}
            className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-tight text-white"
          >
            {heroTitleWords.map((word, index) => (
              <span key={index} className={index === heroTitleWords.length - 1 ? "bg-gradient-to-r from-[#1D4ED8] to-[#2563EB] bg-clip-text text-transparent" : ""}>
                {word}{' '}
              </span>
            ))}
          </h1>
          
          <p 
            ref={descRef}
            className="text-lg sm:text-xl lg:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
          >
            {t('hero_description')}
          </p>

          <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={scrollToCourses}
              className="magnetic-btn bg-gradient-to-r from-[#1D4ED8] to-[#2563EB] hover:opacity-90 text-white font-medium px-8 py-6 text-lg rounded-xl transition-all duration-300"
            >
              {t('hero_cta')}
            </Button>
            <Button 
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              variant="outline"
              className="px-8 py-6 text-lg rounded-xl border-white/20 text-white hover:bg-white/10 hover:text-white transition-all duration-300"
            >
              {t('contact_title')}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Scroll Indicator */}
      <div 
        className={`absolute bottom-8 left-1/2 -translate-x-1/2 transform transition-all duration-500 md:hidden ${
          showScrollIndicator ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
      >
        <div className="flex flex-col items-center gap-1 animate-bounce" style={{ animationDuration: '0.7s' }}>
          <ChevronDown className="w-9 h-9 text-white/70" />
        </div>
      </div>
    </section>
  );
}
