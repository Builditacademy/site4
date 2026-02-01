import type React from 'react';

export type Language = 'en' | 'pl' | 'az';

export interface Translations {
  [key: string]: {
    [key: string]: string;
  };
}

export interface NavItem {
  id: string;
  label: string;
}

export interface Course {
  id: string;
  icon: React.ElementType;
  durationKey: string;
  descriptionKey: string;
  priceKey: string;
  certificationsKey: string | null;
}