import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { toast } from 'sonner';
import { useLanguage } from '../hooks/useLanguage';

gsap.registerPlugin(ScrollTrigger);

// Inline SVG Icons
const CheckCircle = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
);
const Instagram = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
);
const Mail = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
);
const MapPin = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
);
const Phone = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
);
const Send = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
);

const WhatsAppIcon = () => (
  <svg 
    version="1.0" 
    xmlns="http://www.w3.org/2000/svg"
    width="24px" 
    height="24px" 
    viewBox="0 0 512.000000 512.000000"
    preserveAspectRatio="xMidYMid meet"
    className="w-6 h-6"
  >
    <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)" fill="currentColor" stroke="none">
      <path d="M2405 5114 c-16 -2 -73 -9 -125 -15 -840 -94 -1611 -626 -1990 -1374
      -361 -710 -356 -1572 12 -2297 l59 -117 -180 -653 c-99 -359 -179 -654 -178
      -655 2 -1 305 77 675 174 l672 175 93 -45 c266 -129 544 -212 832 -248 146
      -18 455 -15 605 5 937 126 1727 733 2064 1586 122 310 171 578 171 935 -1 238
      -12 349 -56 550 -91 416 -312 843 -593 1142 -40 43 -77 85 -82 95 -13 24 -155
      149 -259 228 -193 147 -446 286 -670 368 -131 48 -359 105 -505 127 -99 15
      -480 28 -545 19z m520 -443 c449 -78 829 -275 1151 -596 311 -310 506 -686
      589 -1140 26 -137 31 -459 11 -614 -69 -522 -316 -981 -709 -1317 -382 -326
      -835 -504 -1328 -521 -401 -14 -759 75 -1120 277 l-106 59 -397 -103 c-224
      -58 -396 -98 -396 -92 0 6 47 181 105 389 l104 378 -43 67 c-434 672 -443
      1523 -24 2221 168 278 429 543 703 711 94 58 312 161 409 194 150 51 344 93
      511 110 104 11 424 -3 540 -23z"/>
      <path d="M1575 3741 c-82 -37 -202 -198 -258 -344 -30 -79 -32 -88 -32 -237 0
      -150 1 -158 33 -250 61 -175 157 -336 326 -544 435 -538 718 -743 1296 -937
      274 -92 499 -68 710 76 133 90 185 179 209 358 14 99 6 134 -38 163 -20 13
      -52 27 -71 31 -19 3 -114 44 -210 91 -219 105 -261 122 -310 122 -38 0 -42 -4
      -133 -117 -158 -198 -168 -208 -214 -207 -53 2 -267 105 -392 189 -211 141
      -412 356 -531 568 -40 72 -37 87 40 176 72 83 136 182 145 221 9 41 -215 581
      -261 628 l-32 32 -118 0 c-94 0 -128 -4 -159 -19z"/>
    </g>
  </svg>
);

const contactInfo = [
  {
    icon: Phone,
    labelKey: 'contact_phone',
    value: '+48 515 536 936',
    href: 'tel:+48515536936',
  },
  {
    icon: Mail,
    labelKey: 'contact_email',
    value: 'info@buildit.academy',
    href: 'mailto:info@buildit.academy',
  },
  {
    icon: MapPin,
    labelKey: 'contact_address',
    value: 'Polska 02-676',
    href: 'https://maps.app.goo.gl/X5JDopXewVPmWgT97',
  },
  {
    icon: Instagram,
    labelKey: 'contact_instagram',
    value: '@builditacademy',
    href: 'https://instagram.com/builditacademy',
  },
];

export default function Contact() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

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

      // Form animation
      gsap.fromTo(
        formRef.current,
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: 0.2,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: formRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Info cards stagger animation
      const infoCards = infoRef.current?.children;
      if (infoCards) {
        gsap.fromTo(
          infoCards,
          { x: -50, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: infoRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const BOT_TOKEN = "8150155886:AAF7rXIP_UJDWKMy1TezJg8X6hQzdDU9dik";
    const CHAT_ID = "-1003835072910";
    
    // Construct text message
    const text = `📩 New message\n👤 Name: ${formData.name}\n📞 Mobile: ${formData.phone}\n📝 Message: ${formData.message}`;
    
    try {
      // Access the global axios instance from the CDN script
      const axios = (window as any).axios;
      
      if (!axios) {
        throw new Error('Axios library not loaded');
      }

      await axios.get(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
        params: {
          chat_id: CHAT_ID,
          text: text
        }
      });

      toast.success("Message sent!", {
        description: "We've received your message and will contact you shortly.",
      });
      setFormData({ name: '', phone: '', message: '' });
      
    } catch (error) {
      console.error('Telegram API Error:', error);
      toast.error("Failed to send message", {
        description: "Please check your internet connection or try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const openWhatsApp = () => {
    window.open('https://wa.me/48515536936', '_blank');
  };

  return (
    <section ref={sectionRef} id="contact" className="relative py-24 lg:py-32 bg-white overflow-hidden">
      {/* Decorative Blobs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#2563EB]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#1D4ED8]/5 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 ref={titleRef} className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#050505]">
            {t('contact_title')}
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          <div ref={infoRef} className="space-y-6">
            {contactInfo.map((item, index) => {
              const Icon = item.icon;
              return (
                <a
                  key={index}
                  href={item.href}
                  target={item.href.startsWith('http') ? '_blank' : undefined}
                  rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="group flex items-center gap-5 p-5 rounded-2xl bg-[#F5F5F7] border border-gray-200/50 hover:border-[#2563EB]/30 hover:bg-[#2563EB]/5 transition-all duration-300"
                >
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#2563EB]/10 to-[#1D4ED8]/10 flex items-center justify-center group-hover:scale-110 group-hover:from-[#2563EB]/20 group-hover:to-[#1D4ED8]/20 transition-all duration-300">
                    <Icon className="w-6 h-6 text-[#2563EB]" />
                  </div>
                  <div>
                    <p className="text-sm text-[#666666] mb-1">{t(item.labelKey)}</p>
                    <p className="text-base font-medium text-[#050505] group-hover:text-[#2563EB] transition-colors">
                      {item.value}
                    </p>
                  </div>
                </a>
              );
            })}

            <button
              onClick={openWhatsApp}
              className="w-full flex items-center justify-center gap-3 p-5 rounded-2xl bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white font-medium hover:opacity-90 transition-all duration-300 hover:scale-[1.02] shadow-lg"
            >
              <WhatsAppIcon />
              <span>{t('contact_whatsapp')}</span>
            </button>
          </div>

          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="relative p-8 rounded-3xl bg-[#F5F5F7] border border-gray-200/50"
          >
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#2563EB]/10 to-[#1D4ED8]/10 blur-xl -z-10" />

            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-[#050505]">
                  {t('contact_form_name')}
                </label>
                <Input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder={`${t('contact_form_name')}...`}
                  className="bg-white border-gray-200/50 focus:border-[#2563EB] focus:ring-[#2563EB]/20 h-12 rounded-xl transition-all duration-300 text-[#050505]"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-[#050505]">
                  {t('contact_form_phone')}
                </label>
                <Input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  placeholder="+994 XX XXX XX XX"
                  className="bg-white border-gray-200/50 focus:border-[#2563EB] focus:ring-[#2563EB]/20 h-12 rounded-xl transition-all duration-300 text-[#050505]"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-[#050505]">
                  {t('contact_form_message')}
                </label>
                <Textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder={`${t('contact_form_message')}...`}
                  rows={5}
                  className="bg-white border-gray-200/50 focus:border-[#2563EB] focus:ring-[#2563EB]/20 rounded-xl resize-none transition-all duration-300 text-[#050505]"
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-[#1D4ED8] to-[#2563EB] hover:opacity-90 text-white font-medium py-6 rounded-xl transition-all duration-300 hover:scale-[1.02] disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Sending...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    {t('contact_form_send')}
                    <Send className="w-4 h-4" />
                  </span>
                )}
              </Button>
            </div>

            {/* Decorative Element */}
            <div className="absolute -top-3 -right-3 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center opacity-0 scale-0 transition-all duration-300">
              <CheckCircle className="w-4 h-4 text-white" />
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
