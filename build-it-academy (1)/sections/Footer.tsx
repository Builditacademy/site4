import React from 'react';
import { useLanguage } from '../hooks/useLanguage';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="relative py-6 bg-[#0B0B1A] border-t border-[#2563EB]/20 overflow-hidden">
      {/* Animated Top Border */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#2563EB]/50 to-transparent animate-pulse" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center">
          <p className="text-sm text-gray-400 text-center">
            {t('footer_copyright')}
          </p>
        </div>
      </div>
    </footer>
  );
}