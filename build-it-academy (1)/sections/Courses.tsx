import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '../components/ui/card';
import { useLanguage } from '../hooks/useLanguage';
import { Course } from '../types';
import { cn } from '../lib/utils';

gsap.registerPlugin(ScrollTrigger);

// Inline SVG Icons
const Monitor = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect width="20" height="14" x="2" y="3" rx="2"/><line x1="8" x2="16" y1="21" y2="21"/><line x1="12" x2="12" y1="17" y2="21"/></svg>
);
const Network = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect x="16" y="16" width="6" height="6" rx="1"/><rect x="2" y="16" width="6" height="6" rx="1"/><rect x="9" y="2" width="6" height="6" rx="1"/><path d="M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3"/><path d="M12 12V8"/></svg>
);
const Shield = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/></svg>
);
const Code = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
);
const Gamepad2 = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><line x1="6" x2="10" y1="12" y2="12"/><line x1="8" x2="8" y1="10" y2="14"/><line x1="15" x2="15.01" y1="13" y2="13"/><line x1="18" x2="18.01" y1="11" y2="11"/><rect width="20" height="12" x="2" y="6" rx="2"/></svg>
);
const Clock = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
);
const ArrowRight = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
);

const coursesData: Course[] = [
  {
    id: 'helpdesk',
    icon: Monitor,
    durationKey: 'courses_helpdesk_duration',
    descriptionKey: 'courses_helpdesk_desc',
    priceKey: 'courses_helpdesk_price',
    certificationsKey: null,
  },
  {
    id: 'network',
    icon: Network,
    durationKey: 'courses_network_duration',
    descriptionKey: 'courses_network_desc',
    priceKey: 'courses_network_price',
    certificationsKey: 'courses_network_certs',
  },
  {
    id: 'cyber',
    icon: Shield,
    durationKey: 'courses_cyber_duration',
    descriptionKey: 'courses_cyber_desc',
    priceKey: 'courses_cyber_price',
    certificationsKey: 'courses_cyber_certs',
  },
  {
    id: 'python',
    icon: Code,
    durationKey: 'courses_python_duration',
    descriptionKey: 'courses_python_desc',
    priceKey: 'courses_python_price',
    certificationsKey: 'courses_python_certs',
  },
  {
    id: 'gamedev',
    icon: Gamepad2,
    durationKey: 'courses_gamedev_duration',
    descriptionKey: 'courses_gamedev_desc',
    priceKey: 'courses_gamedev_price',
    certificationsKey: null,
  },
];

export default function Courses() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const pathRef = useRef<SVGPathElement>(null);

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

      // Path line draw animation
      if (pathRef.current) {
        const pathLength = pathRef.current.getTotalLength();
        gsap.set(pathRef.current, { strokeDasharray: pathLength, strokeDashoffset: pathLength });
        gsap.to(pathRef.current, {
          strokeDashoffset: 0,
          duration: 2,
          ease: 'power2.inOut',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            toggleActions: 'play none none reverse',
          },
        });
      }

      // Cards stagger animation
      cardsRef.current.forEach((card, index) => {
        if (card) {
          gsap.fromTo(
            card,
            { x: -50, opacity: 0 },
            {
              x: 0,
              opacity: 1,
              duration: 0.6,
              delay: index * 0.15,
              ease: 'expo.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section ref={sectionRef} id="courses" className="relative py-24 lg:py-32 bg-white overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-1/4 right-0 w-72 h-72 bg-[#1D4ED8]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-0 w-72 h-72 bg-[#2563EB]/5 rounded-full blur-3xl" />
      
      {/* Curved Path Background */}
      <svg 
        className="absolute top-1/2 left-0 w-full h-[500px] -translate-y-1/2 pointer-events-none hidden lg:block" 
        viewBox="0 0 1440 320"
        style={{ zIndex: 0 }}
      >
        <defs>
          <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#1D4ED8" stopOpacity="0.4" />
            <stop offset="50%" stopColor="#2563EB" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#1D4ED8" stopOpacity="0.4" />
          </linearGradient>
        </defs>
        <path
          ref={pathRef}
          d="M-100,160 C200,280 400,40 720,160 C1040,280 1240,40 1540,160"
          fill="none"
          stroke="url(#pathGradient)"
          strokeWidth="3"
          className="path-line"
        />
      </svg>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 ref={titleRef} className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#050505]">
            {t('courses_title')}
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {coursesData.map((course, index) => {
            const Icon = course.icon;
            const titleKey = `courses_${course.id}_title`;
            return (
              <div
                key={course.id}
                ref={(el) => {
                   cardsRef.current[index] = el;
                }}
                className="group"
              >
                <Card className="relative h-full flex flex-col bg-white border-gray-200/50 rounded-lg overflow-hidden card-hover">
                  {/* Hover Effect Background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#2563EB]/0 to-[#1D4ED8]/0 group-hover:from-[#2563EB]/5 group-hover:to-[#1D4ED8]/5 transition-all duration-500" />
                  
                  {/* Shimmer Effect */}
                  <div className="absolute inset-0 shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <CardHeader className="relative pb-4">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#2563EB]/10 to-[#1D4ED8]/10 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                      <Icon className="w-7 h-7 text-[#2563EB]" />
                    </div>
                    
                    {/* Duration Badge with Grey Rectangle Background */}
                    <div className="absolute -top-1.5 right-0 bg-[#F3F4F6] px-3 py-1.5 rounded-bl-lg z-10">
                      <div className="flex items-center gap-1.5 text-xs font-medium text-[#666666]">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{t(course.durationKey)}</span>
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-[#050505] group-hover:text-[#2563EB] transition-colors duration-300">
                      {t(titleKey)}
                    </h3>
                  </CardHeader>

                  <CardContent className="relative flex-1 space-y-3">
                    <p className={cn(
                      "text-sm",
                      course.id === 'helpdesk' ? "text-[#2563EB] font-medium" : "text-[#666666]"
                    )}>
                      {t(course.descriptionKey)}
                    </p>
                    
                    {course.certificationsKey && (
                      <div className="pt-2 border-t border-gray-200/50">
                        <p className="text-xs text-[#2563EB] font-medium">
                          {t(course.certificationsKey)}
                        </p>
                      </div>
                    )}
                  </CardContent>

                  <CardFooter className="relative flex flex-col gap-4 pt-4 mt-auto">
                    {/* Price */}
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-bold text-[#050505]">
                        {t(course.priceKey)}
                      </span>
                      <span className="text-sm text-[#666666]">
                        {t('courses_per_month')}
                      </span>
                    </div>

                    <Button 
                      onClick={scrollToContact}
                      className="w-full bg-gradient-to-r from-[#1D4ED8] to-[#2563EB] hover:opacity-90 text-white font-medium py-5 rounded-lg transition-all duration-300 group/btn"
                    >
                      {t('courses_more')}
                      <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
