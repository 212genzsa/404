'use client';

import { Moon, Sun, Globe, Lock, FileText, Image, Video, Users, Shield } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function EvidencePage() {
  const [darkMode, setDarkMode] = useState(true);
  const [locale, setLocale] = useState('ar');
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isUnlocked, setIsUnlocked] = useState(false);

  const languages = [
    { code: 'ar', name: 'العربية', flag: '🇲🇦', dir: 'rtl' },
    { code: 'amz', name: 'ⵜⴰⵎⴰⵣⵉⵖⵜ', flag: '🇲🇦', dir: 'ltr' },
    { code: 'fr', name: 'Français', flag: '🇫🇷', dir: 'ltr' },
    { code: 'en', name: 'English', flag: '🇬🇧', dir: 'ltr' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪', dir: 'ltr' },
    { code: 'nl', name: 'Nederlands', flag: '🇳🇱', dir: 'ltr' },
    { code: 'pt', name: 'Português', flag: '🇵🇹', dir: 'ltr' }
  ];

  const translations = {
    ar: { 
      title: 'الأدلة',
      files: 'الملفات',
      screenshots: 'لقطات الشاشة',
      media: 'الوسائط',
      traitors: 'الخونة',
      locked: 'مقفل حتى',
      items: 'عنصر'
    },
    en: { 
      title: 'Evidence',
      files: 'Files',
      screenshots: 'Screenshots',
      media: 'Media',
      traitors: 'Traitors',
      locked: 'Locked until',
      items: 'items'
    },
    fr: { 
      title: 'Preuves',
      files: 'Fichiers',
      screenshots: 'Captures',
      media: 'Médias',
      traitors: 'Traîtres',
      locked: 'Verrouillé jusqu\'à',
      items: 'éléments'
    },
    de: { 
      title: 'Beweise',
      files: 'Dateien',
      screenshots: 'Screenshots',
      media: 'Medien',
      traitors: 'Verräter',
      locked: 'Gesperrt bis',
      items: 'Elemente'
    },
    nl: { 
      title: 'Bewijs',
      files: 'Bestanden',
      screenshots: 'Screenshots',
      media: 'Media',
      traitors: 'Verraders',
      locked: 'Vergrendeld tot',
      items: 'items'
    },
    pt: { 
      title: 'Evidências',
      files: 'Arquivos',
      screenshots: 'Capturas',
      media: 'Mídia',
      traitors: 'Traidores',
      locked: 'Bloqueado até',
      items: 'itens'
    },
    amz: { 
      title: 'ⵉⵏⵎⵎⴰⵍⵏ',
      files: 'ⵉⴼⴰⵢⵍⵓⵜⵏ',
      screenshots: 'ⵜⵓⵖⴰⵡⵙⵉⵡⵉⵏ',
      media: 'ⴰⵎⵉⴷⵢⴰ',
      traitors: 'ⵉⵎⵙⵅⴰⵔⴼⵏ',
      locked: 'ⵉⵜⵜⵓⵔⴳⵍ ⴰⵔ',
      items: 'ⵉⴼⵔⴷⵉⵙⵏ'
    }
  };

  const currentLang = languages.find(l => l.code === locale) || languages[0];
  const t = translations[locale as keyof typeof translations];

  useEffect(() => {
    const targetDate = new Date(2025, 9, 26, 23, 59, 59);

    const updateTimer = () => {
      const currentTime = new Date();
      const distance = targetDate.getTime() - currentTime.getTime();

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
        setIsUnlocked(false);
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        setIsUnlocked(true);
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  const evidenceCards = [
    { 
      icon: FileText, 
      title: t.files, 
      count: 247,
      color: 'from-blue-500 to-cyan-500'
    },
    { 
      icon: Image, 
      title: t.screenshots, 
      count: 1843,
      color: 'from-purple-500 to-pink-500'
    },
    { 
      icon: Video, 
      title: t.media, 
      count: 89,
      color: 'from-orange-500 to-red-500'
    },
    { 
      icon: Users, 
      title: t.traitors, 
      count: 34,
      color: 'from-red-600 to-rose-700'
    }
  ];

  const bgClass = darkMode ? 'bg-black' : 'bg-gray-50';
  const textPrimary = darkMode ? 'text-white' : 'text-gray-900';
  const textSecondary = darkMode ? 'text-gray-300' : 'text-gray-700';
  const textMuted = darkMode ? 'text-gray-400' : 'text-gray-600';
  const cardBg = darkMode ? 'bg-white/5 border-white/10' : 'bg-white border-gray-200';

  return (
    <div dir={currentLang.dir} className={`min-h-screen ${bgClass} transition-colors duration-500 relative overflow-hidden`}>
      {/* Background Image with Glassmorphism */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: 'url(/background.webp)' }}
        ></div>
        {/* Overlay for better contrast and glassmorphism effect */}
        <div className={`absolute inset-0 ${darkMode ? 'bg-black/60' : 'bg-white/40'}`}></div>
      </div>

      {/* Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 ${cardBg} border-b backdrop-blur-xl shadow-lg`}>
        <div className="container mx-auto px-4 py-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="relative">
              <button
                onClick={() => setShowLangMenu(!showLangMenu)}
                className={`p-2 rounded-lg ${cardBg} border backdrop-blur-lg hover:scale-105 transition-all duration-300 flex items-center gap-1.5`}
              >
                <Globe className={`w-5 h-5 ${textPrimary}`} />
                <span className="text-base">{currentLang.flag}</span>
              </button>
              
              {showLangMenu && (
                <div className={`absolute top-full mt-2 left-0 ${cardBg} border backdrop-blur-xl rounded-xl shadow-2xl overflow-hidden min-w-[180px]`}>
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLocale(lang.code);
                        setShowLangMenu(false);
                      }}
                      className={`w-full px-3 py-2 text-left hover:bg-white/5 transition-colors flex items-center gap-2 ${
                        locale === lang.code ? 'bg-white/10' : ''
                      }`}
                    >
                      <span className="text-base">{lang.flag}</span>
                      <span className={`${textPrimary} text-sm`}>{lang.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 rounded-lg ${cardBg} border backdrop-blur-lg hover:scale-105 transition-all duration-300`}
            >
              {darkMode ? (
                <Sun className="w-5 h-5 text-yellow-400" />
              ) : (
                <Moon className="w-5 h-5 text-gray-700" />
              )}
            </button>
          </div>

          <div className={`backdrop-blur-lg bg-white/10 p-2 rounded-lg border border-white/20`}>
            <div className="w-10 h-10 flex items-center justify-center">
              <Shield className={`w-7 h-7 ${textPrimary}`} />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 py-8 max-w-6xl mt-20">
        <div className="text-center mb-12">
          <h1 className={`text-4xl md:text-5xl font-bold ${textPrimary} mb-4`}>
            {t.title}
          </h1>
          {!isUnlocked && (
            <div className="flex items-center justify-center gap-2 text-red-400">
              <Lock className="w-5 h-5 animate-pulse" />
              <p className="text-sm">
                {t.locked}: {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
              </p>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {evidenceCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <div
                key={index}
                className={`${cardBg} border backdrop-blur-xl rounded-2xl p-8 shadow-2xl relative overflow-hidden group hover:scale-105 transition-all duration-300`}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${card.color} opacity-5 group-hover:opacity-10 transition-opacity`}></div>
                
                {!isUnlocked && (
                  <div className="absolute inset-0 backdrop-blur-sm bg-black/60 flex items-center justify-center z-10 rounded-2xl">
                    <div className="text-center">
                      <Lock className="w-16 h-16 text-red-400 mx-auto mb-4 animate-pulse" />
                      <p className={`${textMuted} text-sm`}>{t.locked}</p>
                    </div>
                  </div>
                )}

                <div className="relative z-0">
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center mb-4`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <h3 className={`text-2xl font-bold ${textPrimary} mb-2`}>
                    {card.title}
                  </h3>
                  
                  <div className="flex items-center gap-3">
                    <div className={`px-4 py-2 rounded-lg bg-gradient-to-r ${card.color} text-white font-bold text-lg`}>
                      {card.count}
                    </div>
                    <span className={`${textMuted} text-sm`}>
                      {t.items}
                    </span>
                  </div>

                  <div className="flex gap-2 mt-4">
                    <span className={`px-2 py-1 ${cardBg} rounded-md text-xs ${textMuted} border`}>
                      {isUnlocked ? '✓ Verified' : '● Pending'}
                    </span>
                    <span className={`px-2 py-1 ${cardBg} rounded-md text-xs ${textMuted} border`}>
                      High Priority
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className={`mt-12 text-center ${cardBg} border backdrop-blur-xl rounded-2xl p-6 max-w-2xl mx-auto`}>
          <p className={`${textMuted} text-sm`}>
            {isUnlocked 
              ? '🔓 Evidence unlocked. Access granted.' 
              : '🔒 All evidence will be automatically unlocked when the countdown reaches zero.'}
          </p>
        </div>
      </div>
    </div>
  );
}
