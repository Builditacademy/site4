import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Language, Translations } from '../types';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations: Translations = {
  en: {
    nav_courses: 'Courses',
    nav_career: 'Career Advisor',
    nav_contact: 'Contact',
    hero_title: 'Your IT future starts here!',
    hero_description: 'Learn with us, earn an international certificate, and claim your place in the IT world.',
    hero_cta: 'See our courses',
    about_title: 'Why choose us?',
    about_card1_title: 'Expert lecturers',
    about_card1_desc: 'Learn from industry professionals with years of practical experience in leading tech companies.',
    about_card2_title: 'Modern approach',
    about_card2_desc: 'Our curriculum is constantly updated to match the latest industry trends and technologies.',
    about_card3_title: 'Practical skills',
    about_card3_desc: 'Hands-on projects and real-world scenarios prepare you for actual workplace challenges.',
    about_card4_title: 'Support and career guidance',
    about_card4_desc: 'Dedicated mentors help you throughout your learning journey and beyond.',
    courses_title: 'Our courses',
    courses_duration: 'Duration',
    courses_price: 'Price',
    courses_month: 'month',
    courses_months: 'months',
    courses_per_month: '/ month',
    courses_more: 'More details',
    courses_helpdesk_title: 'Helpdesk IT',
    courses_helpdesk_duration: '3 months',
    courses_helpdesk_desc: 'Prepares for CompTIA A+',
    courses_helpdesk_price: '350 zł',
    courses_network_title: 'Network IT',
    courses_network_duration: '3 months',
    courses_network_desc: 'Requires Helpdesk knowledge',
    courses_network_certs: 'Certifications: CompTIA Network+, CCNA',
    courses_network_price: '400 zł',
    courses_cyber_title: 'Cyber Security',
    courses_cyber_duration: '4 months',
    courses_cyber_desc: 'Requires Network IT knowledge',
    courses_cyber_certs: 'Certification: CompTIA Security+',
    courses_cyber_price: '550 zł',
    courses_python_title: 'Python',
    courses_python_duration: '5 months',
    courses_python_desc: 'Learn Python programming from basics to advanced',
    courses_python_certs: 'Certification: OpenEDG Python',
    courses_python_price: '600 zł',
    courses_gamedev_title: 'Game Design (Unity Engine)',
    courses_gamedev_duration: '3 months',
    courses_gamedev_desc: 'Create games with Unity Engine',
    courses_gamedev_price: '300 zł',
    career_title: 'Career advisor',
    career_path: 'Your IT Career Path',
    career_entry: 'Entry Level',
    career_main: 'Cybersecurity',
    career_main_role: 'Cybersecurity Analyst / Engineer',
    career_growth: 'Leadership & Growth',
    career_entry_roles: 'Helpdesk, IT Support, Network Admin, Linux Admin, Systems Engineer, IoT Engineer',
    career_growth_roles: 'IT Manager, IT Project Manager, Data Analyst, E-Commerce Analyst',
    contact_title: 'Contact Us',
    contact_phone: 'Phone',
    contact_email: 'Email',
    contact_address: 'Address',
    contact_instagram: 'Instagram',
    contact_whatsapp: 'Chat on WhatsApp',
    contact_form_name: 'Name',
    contact_form_phone: 'Mobile Number',
    contact_form_message: 'Message',
    contact_form_send: 'Send message',
    footer_copyright: '© 2026 Build IT Academy. All rights reserved.',
    footer_privacy: 'Privacy Policy',
    footer_terms: 'Terms of Service'
  },
  pl: {
    nav_courses: 'Kursy',
    nav_career: 'Doradztwo',
    nav_contact: 'Kontakt',
    hero_title: 'Twoja przyszłość z IT zaczyna się tutaj!',
    hero_description: 'Ucz się z nami, zdobądź międzynarodowy certyfikat i znajdź swoje miejsce w świecie IT.',
    hero_cta: 'Zobacz nasze kursy',
    about_title: 'Dlaczego my?',
    about_card1_title: 'Eksperci wykładowcy',
    about_card1_desc: 'Ucz się od profesjonalistów z wieloletnim doświadczeniem w czołowych firmach technologicznych.',
    about_card2_title: 'Nowoczesne podejście',
    about_card2_desc: 'Nasz program jest stale aktualizowany, aby odzwierciedlać najnowsze trendy i technologie w branży.',
    about_card3_title: 'Praktyczne umiejętności',
    about_card3_desc: 'Projekty praktyczne i rzeczywiste scenariusze przygotowują Cię do rzeczywistych wyzwań zawodowych.',
    about_card4_title: 'Wsparcie i doradztwo',
    about_card4_desc: 'Dedykowani mentorzy pomagają Ci przez całą ścieżkę edukacyjną i nie tylko.',
    courses_title: 'Nasze kursy',
    courses_duration: 'Czas trwania',
    courses_price: 'Cena',
    courses_month: 'miesiąc',
    courses_months: 'miesiące',
    courses_per_month: '/ miesiąc',
    courses_more: 'Więcej szczegółów',
    courses_helpdesk_title: 'Helpdesk IT',
    courses_helpdesk_duration: '3 miesiące',
    courses_helpdesk_desc: 'Przygotowanie do CompTIA A+',
    courses_helpdesk_price: '350 zł',
    courses_network_title: 'Sieci IT',
    courses_network_duration: '3 miesiące',
    courses_network_desc: 'Wymaga wiedzy z Helpdesk',
    courses_network_certs: 'Certyfikaty: CompTIA Network+, CCNA',
    courses_network_price: '400 zł',
    courses_cyber_title: 'Cyberbezpieczeństwo',
    courses_cyber_duration: '4 miesiące',
    courses_cyber_desc: 'Wymaga wiedzy z Sieci IT',
    courses_cyber_certs: 'Certyfikat: CompTIA Security+',
    courses_cyber_price: '550 zł',
    courses_python_title: 'Python',
    courses_python_duration: '5 miesięcy',
    courses_python_desc: 'Nauka programowania Python od podstaw do zaawansowanych',
    courses_python_certs: 'Certyfikat: OpenEDG Python',
    courses_python_price: '600 zł',
    courses_gamedev_title: 'Projektowanie gier (Unity Engine)',
    courses_gamedev_duration: '3 miesiące',
    courses_gamedev_desc: 'Twórz gry z Unity Engine',
    courses_gamedev_price: '300 zł',
    career_title: 'Doradztwo zawodowe',
    career_path: 'Twoja ścieżka kariery IT',
    career_entry: 'Poziom początkowy',
    career_main: 'Cyberbezpieczeństwo',
    career_main_role: 'Analityk / Inżynier cyberbezpieczeństwa',
    career_growth: 'Przywództwo i rozwój',
    career_entry_roles: 'Helpdesk, Wsparcie IT, Administrator sieci, Administrator Linux, Inżynier systemów, Inżynier IoT',
    career_growth_roles: 'Manager IT, Project Manager IT, Analityk danych, Analityk e-commerce',
    contact_title: 'Skontaktuj się z nami',
    contact_phone: 'Telefon',
    contact_email: 'Email',
    contact_address: 'Adres',
    contact_instagram: 'Instagram',
    contact_whatsapp: 'Czat na WhatsApp',
    contact_form_name: 'Imię',
    contact_form_phone: 'Numer telefonu',
    contact_form_message: 'Wiadomość',
    contact_form_send: 'Wyślij wiadomość',
    footer_copyright: '© 2026 Build IT Academy. Wszystkie prawa zastrzeżone.',
    footer_privacy: 'Məxfilik Siyasəti',
    footer_terms: 'Xidmət Şərtləri'
  },
  az: {
    nav_courses: 'Kurslar',
    nav_career: 'Karyera Məsləhətçisi',
    nav_contact: 'Əlaqə',
    hero_title: 'IT gələcəyin burdan başlayır!',
    hero_description: 'Bizimlə öyrən, beynəlxalq sertifikat al və IT dünyasında yerini tut',
    hero_cta: 'Kurslarımıza baxın',
    about_title: 'Niyə bizi seçməlisiniz?',
    about_card1_title: 'Eksperci wykładowcy',
    about_card1_desc: 'Aparıcı texnologiya şirkətlərində illərlə təcrübəsi olan sənaye peşəkarlarından öyrənin.',
    about_card2_title: 'Müasir yanaşma',
    about_card2_desc: 'Tədris proqramımız sənaye trendlərinə və texnologiyalarına uyğun olaraq daim yenilənir.',
    about_card3_title: 'Praktiki bacarıqlar',
    about_card3_desc: 'Praktiki layihələr və real ssenarilər sizi iş yerindəki real çətinliklərə hazırlayır.',
    about_card4_title: 'Dəstək və karyera rəhbərliyi',
    about_card4_desc: 'Fədakar mentorlar sizə təhsil yolunuzda və ondan sonrasında kömək edir.',
    courses_title: 'Kurslarımız',
    courses_duration: 'Müddət',
    courses_price: 'Qiymət',
    courses_month: 'ay',
    courses_months: 'ay',
    courses_per_month: '/ ay',
    courses_more: 'Daha ətraflı',
    courses_helpdesk_title: 'Helpdesk IT',
    courses_helpdesk_duration: '3 ay',
    courses_helpdesk_desc: 'CompTIA A+ üçün hazırlayır',
    courses_helpdesk_price: '350 zł',
    courses_network_title: 'Şəbəkə IT',
    courses_network_duration: '3 ay',
    courses_network_desc: 'Helpdesk biliyi tələb olunur',
    courses_network_certs: 'Sertifikatlar: CompTIA Network+, CCNA',
    courses_network_price: '400 zł',
    courses_cyber_title: 'Kiber Təhlükəsizlik',
    courses_cyber_duration: '4 ay',
    courses_cyber_desc: 'Şəbəkə IT biliyi tələb olunur',
    courses_cyber_certs: 'Sertifikat: CompTIA Security+',
    courses_cyber_price: '550 zł',
    courses_python_title: 'Python',
    courses_python_duration: '5 ay',
    courses_python_desc: 'Python proqramlaşdırmasını sıfırdan mükəmmələ qədər öyrənin',
    courses_python_certs: 'Sertifikat: OpenEDG Python',
    courses_python_price: '600 zł',
    courses_gamedev_title: 'Oyun Dizaynı (Unity Engine)',
    courses_gamedev_duration: '3 ay',
    courses_gamedev_desc: 'Unity Engine ilə oyunlar yaradın',
    courses_gamedev_price: '300 zł',
    career_title: 'Karyera məsləhətçisi',
    career_path: 'IT Karyera Yolunuz',
    career_entry: 'Giriş Səviyyəsi',
    career_main: 'Kiber Təhlükəsizlik',
    career_main_role: 'Kiber Təhlükəsizlik Analitiki / Mühəndisi',
    career_growth: 'Liderlik və İnkişaf',
    career_entry_roles: 'Helpdesk, IT Dəstək, Şəbəkə İnzibatçısı, Linux İnzibatçısı, Sistem Mühəndisi, IoT Mühəndisi',
    career_growth_roles: 'IT Meneceri, IT Layihə Meneceri, Məlumat Analitiki, E-Ticarət Analitiki',
    contact_title: 'Bizimlə əlaqə',
    contact_phone: 'Telefon',
    contact_email: 'E-poçt',
    contact_address: 'Ünvan',
    contact_instagram: 'Instagram',
    contact_whatsapp: 'WhatsApp-da yazın',
    contact_form_name: 'Ad',
    contact_form_phone: 'Mobil Nömrə',
    contact_form_message: 'Mesaj',
    contact_form_send: 'Mesaj göndər',
    footer_copyright: '© 2026 Build IT Academy. Bütün hüquqlar qorunur.',
    footer_privacy: 'Məxfilik Siyasəti',
    footer_terms: 'Xidmət Şərtləri'
  }
};

export function LanguageProvider({ children }: { children?: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en');

  useEffect(() => {
    const savedLang = localStorage.getItem('language');
    if (savedLang && ['en', 'pl', 'az'].includes(savedLang)) {
      setLanguageState(savedLang as Language);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
  };

  const t = (key: string): string => {
    // Safety check: attempt to get translation for current language, fallback to EN, then key itself
    const currentLangTrans = translations[language];
    if (currentLangTrans && currentLangTrans[key]) {
      return currentLangTrans[key];
    }
    return translations.en[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
