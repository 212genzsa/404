'use client';

import { Instagram, MessageCircle, Facebook, Menu, X, Globe } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';

interface HeaderProps {
  locale: string;
  setLocale: (locale: string) => void;
  translations: any;
  onComingSoonClick?: () => void;
}

export default function Header({ locale, setLocale, translations, onComingSoonClick }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);

  const languages = [
    { code: 'ar', name: 'العربية', flag: '🇲🇦', dir: 'rtl', font: '' },
    { code: 'amz', name: 'ⵜⴰⵎⴰⵣⵉⵖⵜ', flag: '🇲🇦', dir: 'ltr', font: 'Noto Sans Tifinagh' },
    { code: 'fr', name: 'Français', flag: '🇫🇷', dir: 'ltr', font: '' },
    { code: 'en', name: 'English', flag: '🇬🇧', dir: 'ltr', font: '' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪', dir: 'ltr', font: '' },
    { code: 'nl', name: 'Nederlands', flag: '🇳🇱', dir: 'ltr', font: '' },
    { code: 'pt', name: 'Português', flag: '🇵🇹', dir: 'ltr', font: '' }
  ];

  const currentLang = languages.find(l => l.code === locale) || languages[0];
  const t = translations || {};

  const handleComingSoonClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (onComingSoonClick) {
      onComingSoonClick();
    }
    setIsMenuOpen(false);
  };

  const changeLanguage = (code: string) => {
    setLocale(code);
    setIsLangMenuOpen(false);
    setIsMenuOpen(false);
  };

  return (
    <>
      <header className="relative z-30 border-b border-neutral-800/50 backdrop-blur-md bg-neutral-900/90">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center overflow-hidden">
                <img src="/X.png" alt="Logo" className="w-full h-full object-contain" />
              </div>
            </Link>
            
            {/* Desktop Menu */}
            <nav className="hidden md:flex items-center gap-6">
              <Link href="/" className="text-neutral-300 hover:text-white transition-colors text-sm font-medium">
                {t.header?.menu?.home || 'Home'}
              </Link>
              <Link href="/about" className="text-neutral-300 hover:text-white transition-colors text-sm font-medium">
                {t.header?.menu?.about}
              </Link>
              <Link href="/vision" className="text-neutral-300 hover:text-white transition-colors text-sm font-medium">
                {t.header?.menu?.vision}
              </Link>
              <Link href="/corrupt" className="text-neutral-300 hover:text-white transition-colors text-sm font-medium">
                {t.header?.menu?.corrupt || 'Corrupt'}
              </Link>
              <Link href="/vote" className="text-neutral-300 hover:text-white transition-colors text-sm font-medium">
                {t.header?.menu?.vote}
              </Link>
              <a href="#faq" onClick={handleComingSoonClick} className="text-neutral-300 hover:text-white transition-colors text-sm font-medium">
                {t.header?.menu?.faq}
              </a>
              
              {/* Language Selector */}
              <div className="relative">
                <button 
                  onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                  className="flex items-center gap-2 text-neutral-300 hover:text-white transition-colors text-sm font-medium"
                >
                  <Globe className="w-4 h-4" />
                  {currentLang.flag}
                </button>
                
                {isLangMenuOpen && (
                  <div className="absolute top-full mt-2 right-0 backdrop-blur-lg bg-neutral-900/95 rounded-xl border border-white/10 shadow-xl py-2 min-w-[140px]">
                    {languages.map(lang => (
                      <button
                        key={lang.code}
                        onClick={() => changeLanguage(lang.code)}
                        className={`w-full px-4 py-2 text-left hover:bg-white/10 transition-colors flex items-center gap-2 ${
                          locale === lang.code ? 'text-white' : 'text-neutral-400'
                        }`}
                      >
                        <span>{lang.flag}</span>
                        <span className="text-sm">{lang.name}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </nav>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-neutral-300 hover:text-white p-2 transition-colors"
              aria-label="Navigation menu"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Fullscreen Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-xl">
            <div className="h-full flex items-center justify-center p-8">
              <div className="w-full max-w-md backdrop-blur-lg bg-white/5 rounded-3xl border border-white/10 p-8 shadow-2xl">
                <nav className="flex flex-col space-y-6">
                  <Link 
                    href="/"
                    onClick={() => setIsMenuOpen(false)}
                    className="text-white hover:text-neutral-300 transition-all duration-300 text-2xl font-semibold text-center py-4 px-6 rounded-xl hover:bg-white/10 backdrop-blur-sm border border-transparent hover:border-white/20"
                  >
                    {t.header?.menu?.home || 'Home'}
                  </Link>
                  <Link 
                    href="/about"
                    onClick={() => setIsMenuOpen(false)}
                    className="text-white hover:text-neutral-300 transition-all duration-300 text-2xl font-semibold text-center py-4 px-6 rounded-xl hover:bg-white/10 backdrop-blur-sm border border-transparent hover:border-white/20"
                  >
                    {t.header?.menu?.about}
                  </Link>
                  <Link 
                    href="/vision"
                    onClick={() => setIsMenuOpen(false)}
                    className="text-white hover:text-neutral-300 transition-all duration-300 text-2xl font-semibold text-center py-4 px-6 rounded-xl hover:bg-white/10 backdrop-blur-sm border border-transparent hover:border-white/20"
                  >
                    {t.header?.menu?.vision}
                  </Link>
                  <Link 
                    href="/corrupt"
                    onClick={() => setIsMenuOpen(false)}
                    className="text-white hover:text-neutral-300 transition-all duration-300 text-2xl font-semibold text-center py-4 px-6 rounded-xl hover:bg-white/10 backdrop-blur-sm border border-transparent hover:border-white/20"
                  >
                    {t.header?.menu?.corrupt || 'Corrupt'}
                  </Link>
                  <Link 
                    href="/vote"
                    onClick={() => setIsMenuOpen(false)}
                    className="text-white hover:text-neutral-300 transition-all duration-300 text-2xl font-semibold text-center py-4 px-6 rounded-xl hover:bg-white/10 backdrop-blur-sm border border-transparent hover:border-white/20"
                  >
                    {t.header?.menu?.vote}
                  </Link>
                  <a 
                    href="#faq" 
                    onClick={handleComingSoonClick}
                    className="text-white hover:text-neutral-300 transition-all duration-300 text-2xl font-semibold text-center py-4 px-6 rounded-xl hover:bg-white/10 backdrop-blur-sm border border-transparent hover:border-white/20"
                  >
                    {t.header?.menu?.faq}
                  </a>
                  
                  {/* Mobile Language Selector */}
                  <div className="pt-4 border-t border-white/10">
                    <div className="grid grid-cols-2 gap-3">
                      {languages.map(lang => (
                        <button
                          key={lang.code}
                          onClick={() => changeLanguage(lang.code)}
                          className={`py-3 px-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 ${
                            locale === lang.code 
                              ? 'bg-white/20 text-white border border-white/30' 
                              : 'bg-white/5 text-neutral-400 border border-white/10 hover:bg-white/10'
                          }`}
                        >
                          <span className="text-xl">{lang.flag}</span>
                          <span className="text-sm font-medium">{lang.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </nav>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
