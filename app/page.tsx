'use client';

import { Instagram, MessageCircle, Facebook, Mail, Menu, X, Globe } from 'lucide-react';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [locale, setLocale] = useState('ar');
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const [showComingSoon, setShowComingSoon] = useState(false);
  const [translations, setTranslations] = useState(null);
  
  const languages = [
    { code: 'ar', name: 'العربية', flag: '🇲🇦', dir: 'rtl', font: '' },
    { code: 'amz', name: 'ⵜⴰⵎⴰⵣⵉⵖⵜ', flag: '🇲🇦', dir: 'ltr', font: 'Noto Sans Tifinagh' },
    { code: 'fr', name: 'Français', flag: '🇫🇷', dir: 'ltr', font: '' },
    { code: 'en', name: 'English', flag: '🇬🇧', dir: 'ltr', font: '' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪', dir: 'ltr', font: '' },
    { code: 'nl', name: 'Nederlands', flag: '🇳🇱', dir: 'ltr', font: '' },
    { code: 'pt', name: 'Português', flag: '🇵🇹', dir: 'ltr', font: '' }
  ];

  // Load translations from /public/locales/
  useEffect(() => {
    const loadTranslations = async () => {
      try {
        const response = await fetch(`/locales/${locale}/common.json`);
        if (!response.ok) {
          throw new Error(`Failed to load translations for ${locale}`);
        }
        const data = await response.json();
        setTranslations(data);
      } catch (error) {
        console.error('Failed to load translations:', error);
      }
    };
    loadTranslations();
  }, [locale]);

  const currentLang = languages.find(l => l.code === locale) || languages[0];
  const t = translations || {};

  const handleComingSoonClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setShowComingSoon(true);
    setIsMenuOpen(false);
  };

  const changeLanguage = (code: string) => {
    setLocale(code);
    setIsLangMenuOpen(false);
    setIsMenuOpen(false);
  };

  if (!translations) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div dir={currentLang.dir} className="min-h-screen relative overflow-hidden font-sans bg-black" style={{ fontFamily: currentLang.font || 'inherit' }}>
      {/* Google Fonts for Noto Sans Tifinagh */}
      <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+Tifinagh&display=swap" rel="stylesheet" />
      
      {/* Background Image with Dark Overlay */}
      <div 
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: 'url(/background.webp)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="absolute inset-0 bg-black/85"></div>
      </div>

      {/* Coming Soon Modal */}
      {showComingSoon && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-xl" onClick={() => setShowComingSoon(false)}></div>
          <div className="relative backdrop-blur-2xl bg-white/10 rounded-3xl border border-white/20 shadow-2xl p-8 sm:p-12 max-w-md w-full text-center">
            <div className="mb-6">
              <div className="w-20 h-20 mx-auto bg-white/10 rounded-full flex items-center justify-center mb-4 border border-white/20">
                <span className="text-4xl">🚧</span>
              </div>
              <h2 className="text-3xl font-bold text-white mb-3">{t.comingSoon?.title}</h2>
              <p className="text-neutral-300 text-lg">{t.comingSoon?.message}</p>
            </div>
            <button
              onClick={() => setShowComingSoon(false)}
              className="backdrop-blur-md bg-white hover:bg-white/90 text-black font-semibold px-6 py-3 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              {t.comingSoon?.button}
            </button>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="relative z-30 border-b border-neutral-800/50 backdrop-blur-md bg-neutral-900/90">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center overflow-hidden">
                <img src="/X.png" alt="Logo" className="w-full h-full object-contain" />
              </div>
            </div>
            
            {/* Desktop Menu */}
            <nav className="hidden md:flex items-center gap-6">
              <Link href="/about" className="text-neutral-300 hover:text-white transition-colors text-sm font-medium">
                {t.header?.menu?.about}
              </Link>
              <Link href="/vision" className="text-neutral-300 hover:text-white transition-colors text-sm font-medium">
                {t.header?.menu?.vision}
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
        <div className="fixed inset-0 z-20 md:hidden">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-xl">
            <div className="h-full flex items-center justify-center p-8">
              <div className="w-full max-w-md backdrop-blur-lg bg-white/5 rounded-3xl border border-white/10 p-8 shadow-2xl">
                <nav className="flex flex-col space-y-6">
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

      {/* Main Container */}
      <div className="relative z-10 min-h-[calc(100vh-73px)] flex items-center justify-center p-4 sm:p-8">
        <div className="w-full max-w-6xl backdrop-blur-2xl bg-white/5 rounded-3xl border border-white/10 shadow-2xl p-8 sm:p-12">
          
          {/* Logo Section */}
          <div className="text-center mb-12">
            <div className="inline-block backdrop-blur-lg bg-white/10 p-5 rounded-2xl mb-6 border border-white/20 shadow-lg">
              <div className="w-24 h-24 flex items-center justify-center overflow-hidden">
                <img src="/X.png" alt="Logo" className="w-full h-full object-contain" />
              </div>
            </div>
            
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4 drop-shadow-lg">
              {t.hero?.title}
            </h1>
            
            <p className="text-base sm:text-lg text-neutral-300 max-w-2xl mx-auto leading-relaxed">
              {t.hero?.description}
            </p>
          </div>

          {/* Social Media Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {/* Instagram Card */}
            <a 
              href="https://www.instagram.com/system_tbdel/" 
              target="_blank"
              rel="noopener noreferrer"
              className="group backdrop-blur-lg bg-white/5 hover:bg-white/10 rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300 flex flex-col shadow-lg"
            >
              <div className="flex flex-col items-center text-center flex-grow">
                <div className="backdrop-blur-md bg-white/10 p-4 rounded-xl mb-4 group-hover:bg-white/15 transition-colors duration-300 border border-white/20">
                  <Instagram className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{t.social?.instagram?.title}</h3>
                <p className="text-neutral-400 text-sm mb-4 flex-grow">{t.social?.instagram?.description}</p>
                <div className="text-white text-base font-medium">
                  <span className="text-neutral-400">{t.social?.instagram?.members}:</span> 200K
                </div>
              </div>
            </a>

            {/* Discord Card */}
            <a 
              href="https://discord.gg/genz212" 
              target="_blank"
              rel="noopener noreferrer"
              className="group backdrop-blur-lg bg-white/5 hover:bg-white/10 rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300 flex flex-col shadow-lg"
            >
              <div className="flex flex-col items-center text-center flex-grow">
                <div className="backdrop-blur-md bg-white/10 p-4 rounded-xl mb-4 group-hover:bg-white/15 transition-colors duration-300 relative border border-white/20">
                  <MessageCircle className="w-8 h-8 text-white" />
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-neutral-900"></span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{t.social?.discord?.title}</h3>
                <p className="text-neutral-400 text-sm mb-4 flex-grow">{t.social?.discord?.description}</p>
                <div className="text-base space-y-2">
                  <div className="text-white font-medium">
                    <span className="text-neutral-400">{t.social?.discord?.members}:</span> +200K
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                    <span className="text-green-400 text-sm font-medium">25K {t.social?.discord?.online}</span>
                  </div>
                </div>
              </div>
            </a>

            {/* Facebook Card */}
            <a 
              href="#" 
              className="group backdrop-blur-lg bg-white/5 hover:bg-white/10 rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300 flex flex-col shadow-lg"
            >
              <div className="flex flex-col items-center text-center flex-grow">
                <div className="backdrop-blur-md bg-white/10 p-4 rounded-xl mb-4 group-hover:bg-white/15 transition-colors duration-300 border border-white/20">
                  <Facebook className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{t.social?.facebook?.title}</h3>
                <p className="text-neutral-400 text-sm mb-4 flex-grow">{t.social?.facebook?.description}</p>
                <div className="text-white text-base font-medium">
                  <span className="text-neutral-400">{t.social?.facebook?.members}:</span> 300K
                </div>
              </div>
            </a>
          </div>

          {/* Contact Section */}
          <div className="text-center backdrop-blur-lg bg-white/5 rounded-2xl p-5 border border-white/10 shadow-lg">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Mail className="w-5 h-5 text-neutral-300" />
              <h3 className="text-lg font-semibold text-white">{t.contact?.title}</h3>
            </div>
            <p className="text-neutral-400 mb-4 text-sm">
              {t.contact?.description}
            </p>
            <a 
              href="mailto:contact@genz212.me" 
              className="inline-flex items-center gap-2 backdrop-blur-md bg-white hover:bg-white/90 text-black font-medium px-5 py-2.5 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
            >
              contact@genz212.me
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
