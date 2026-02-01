import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../hooks/useLanguage';

gsap.registerPlugin(ScrollTrigger);

// Inline SVG Icons
const TrendingUp = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>
);
const Users = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
);
const Shield = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/></svg>
);

export default function Career() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const diagramRef = useRef<HTMLDivElement>(null);
  const nodesRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(
        titleRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Central node animation
      if (nodesRef.current[0]) {
        gsap.fromTo(
          nodesRef.current[0],
          { scale: 3, opacity: 0, filter: 'blur(20px)' },
          {
            scale: 1,
            opacity: 1,
            filter: 'blur(0px)',
            duration: 0.8,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: diagramRef.current,
              start: 'top 70%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Entry and growth nodes animation
      nodesRef.current.slice(1).forEach((node, index) => {
        if (node) {
          gsap.fromTo(
            node,
            { rotate: -90, opacity: 0, x: index < 6 ? -50 : 50 },
            {
              rotate: 0,
              opacity: 1,
              x: 0,
              duration: 0.8,
              delay: 0.2 + (index % 6) * 0.1,
              ease: 'expo.out',
              scrollTrigger: {
                trigger: diagramRef.current,
                start: 'top 60%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        }
      });

      // Path lines animation
      const paths = document.querySelectorAll('.career-path-line');
      paths.forEach((path, index) => {
        const pathElement = path as SVGPathElement;
        const length = pathElement.getTotalLength();
        gsap.set(pathElement, { strokeDasharray: length, strokeDashoffset: length });
        gsap.to(pathElement, {
          strokeDashoffset: 0,
          duration: 1,
          delay: 0.5 + index * 0.1,
          ease: 'power2.inOut',
          scrollTrigger: {
            trigger: diagramRef.current,
            start: 'top 60%',
            toggleActions: 'play none none reverse',
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const entryRoles = t('career_entry_roles').split(', ');
  const growthRoles = t('career_growth_roles').split(', ');

  return (
    <section ref={sectionRef} id="career" className="relative py-24 lg:py-32 bg-[#F5F5F7] overflow-hidden">
      {/* Decorative Blobs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#2563EB]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#1D4ED8]/5 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 ref={titleRef} className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#050505]">
            {t('career_title')}
          </h2>
        </div>

        <div ref={diagramRef} className="relative">
          {/* Connecting Lines SVG */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none hidden lg:block" style={{ zIndex: 0 }}>
            <defs>
              <linearGradient id="careerGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#1D4ED8" stopOpacity="0.6" />
                <stop offset="50%" stopColor="#2563EB" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#1D4ED8" stopOpacity="0.6" />
              </linearGradient>
            </defs>
            {/* Left to Center */}
            <path
              d="M 200 150 Q 350 200 500 250"
              fill="none"
              stroke="url(#careerGradient)"
              strokeWidth="3"
              className="career-path-line"
            />
            {/* Center to Right */}
            <path
              d="M 700 250 Q 850 200 1000 150"
              fill="none"
              stroke="url(#careerGradient)"
              strokeWidth="3"
              className="career-path-line"
            />
          </svg>

          <div className="grid lg:grid-cols-3 gap-8 lg:gap-4 items-center">
            {/* Entry Level Column */}
            <div 
              ref={(el) => {
                 nodesRef.current[1] = el;
              }}
              className="space-y-4"
            >
              <div className="flex items-center gap-2 mb-6">
                <Users className="w-5 h-5 text-[#1D4ED8]" />
                <h3 className="text-xl font-bold text-[#050505]">{t('career_entry')}</h3>
              </div>
              
              <div className="space-y-3">
                {entryRoles.map((role, index) => (
                  <div key={index} className="group flex items-center gap-3 p-3 rounded-xl bg-white border border-gray-200/50 hover:border-[#1D4ED8]/30 hover:bg-[#1D4ED8]/5 transition-all duration-300">
                    <div className="w-2 h-2 rounded-full bg-[#1D4ED8] group-hover:scale-150 transition-transform" />
                    <span className="text-sm font-medium text-[#050505]">{role}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Central Hub */}
            <div 
              ref={(el) => {
                 nodesRef.current[0] = el;
              }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#2563EB]/30 to-[#1D4ED8]/30 rounded-3xl blur-2xl scale-110" />
              
              <div className="relative p-8 rounded-3xl bg-gradient-to-br from-[#2563EB] to-[#1D4ED8] text-white overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-4 right-4 w-32 h-32 border-2 border-white rounded-full" />
                  <div className="absolute bottom-4 left-4 w-24 h-24 border-2 border-white rounded-full" />
                </div>

                <div className="relative text-center space-y-4">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm">
                    <Shield className="w-8 h-8" />
                  </div>
                  
                  <div>
                    <h3 className="text-2xl font-bold mb-2">{t('career_main')}</h3>
                    <p className="text-white/80 text-sm">
                      {t('career_main_role')}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Growth Column */}
            <div 
              ref={(el) => {
                 nodesRef.current[2] = el;
              }}
              className="space-y-4"
            >
              <div className="flex items-center gap-2 mb-6">
                <TrendingUp className="w-5 h-5 text-[#2563EB]" />
                <h3 className="text-xl font-bold text-[#050505]">{t('career_growth')}</h3>
              </div>
              
              <div className="space-y-3">
                {growthRoles.map((role, index) => (
                  <div key={index} className="group flex items-center gap-3 p-3 rounded-xl bg-white border border-gray-200/50 hover:border-[#2563EB]/30 hover:bg-[#2563EB]/5 transition-all duration-300">
                    <div className="w-2 h-2 rounded-full bg-[#2563EB] group-hover:scale-150 transition-transform" />
                    <span className="text-sm font-medium text-[#050505]">{role}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
