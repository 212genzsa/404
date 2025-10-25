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
      {/* CLEAN BACKGROUND - Galaxy Theme */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none bg-black">
        {/* Red Light */}
        <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] rounded-full bg-red-500/30 blur-3xl animate-float-1"></div>
        
        {/* Blue Light */}
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-blue-500/30 blur-3xl animate-float-2"></div>

        {/* King Chess Character with Beams */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          {/* Beams Popping from Center */}
          <div className="beams-container">
            {[...Array(20)].map((_, i) => {
              const angle = (360 / 20) * i;
              return (
                <div
                  key={`beam-${i}`}
                  className="beam"
                  style={{
                    transform: `rotate(${angle}deg)`,
                    animationDelay: `${i * 0.1}s`
                  }}
                ></div>
              );
            })}
          </div>

          {/* King Chess Piece */}
          <div className="king-container">
            <svg width="400" height="400" viewBox="0 0 400 400" className="king-svg">
              <defs>
                <linearGradient id="king-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#fbbf24" />
                  <stop offset="50%" stopColor="#f59e0b" />
                  <stop offset="100%" stopColor="#d97706" />
                </linearGradient>
                <filter id="king-glow">
                  <feGaussianBlur stdDeviation="6" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>
              
              {/* Base */}
              <ellipse cx="200" cy="340" rx="80" ry="20" fill="url(#king-gradient)" filter="url(#king-glow)" opacity="0.9"/>
              
              {/* Bottom platform */}
              <path d="M 140 340 L 130 320 L 270 320 L 260 340 Z" fill="url(#king-gradient)" filter="url(#king-glow)"/>
              
              {/* Lower body */}
              <path d="M 130 320 L 140 280 L 260 280 L 270 320 Z" fill="url(#king-gradient)" filter="url(#king-glow)"/>
              
              {/* Middle section */}
              <path d="M 140 280 L 150 220 L 250 220 L 260 280 Z" fill="url(#king-gradient)" filter="url(#king-glow)"/>
              
              {/* Upper body */}
              <path d="M 150 220 L 160 180 L 240 180 L 250 220 Z" fill="url(#king-gradient)" filter="url(#king-glow)"/>
              
              {/* Neck */}
              <rect x="170" y="160" width="60" height="20" rx="5" fill="url(#king-gradient)" filter="url(#king-glow)"/>
              
              {/* Head sphere */}
              <circle cx="200" cy="130" r="35" fill="url(#king-gradient)" filter="url(#king-glow)"/>
              
              {/* Crown base */}
              <ellipse cx="200" cy="100" rx="45" ry="12" fill="url(#king-gradient)" filter="url(#king-glow)"/>
              
              {/* Crown points */}
              <path d="M 155 100 L 160 70 L 170 90 L 180 65 L 190 90 L 200 60 L 210 90 L 220 65 L 230 90 L 240 70 L 245 100 Z" 
                    fill="url(#king-gradient)" filter="url(#king-glow)"/>
              
              {/* Cross on top */}
              <rect x="195" y="40" width="10" height="25" rx="2" fill="url(#king-gradient)" filter="url(#king-glow)"/>
              <rect x="187" y="48" width="26" height="10" rx="2" fill="url(#king-gradient)" filter="url(#king-glow)"/>
              
              {/* Decorative gems */}
              <circle cx="200" cy="130" r="8" fill="#ef4444" opacity="0.8"/>
              <circle cx="175" cy="85" r="5" fill="#3b82f6" opacity="0.8"/>
              <circle cx="225" cy="85" r="5" fill="#3b82f6" opacity="0.8"/>
              <circle cx="200" cy="75" r="6" fill="#8b5cf6" opacity="0.8"/>
            </svg>
          </div>
        </div>
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

      <style jsx>{`
        @keyframes float-1 {
          0%, 100% {
            transform: translate(0, 0) scale(1);
            opacity: 0.3;
          }
          50% {
            transform: translate(100px, -50px) scale(1.2);
            opacity: 0.6;
          }
        }
        @keyframes float-2 {
          0%, 100% {
            transform: translate(0, 0) scale(1);
            opacity: 0.3;
          }
          50% {
            transform: translate(-80px, 60px) scale(1.3);
            opacity: 0.6;
          }
        }
        @keyframes beam-pop {
          0% {
            height: 0;
            opacity: 0;
          }
          50% {
            height: 800px;
            opacity: 1;
          }
          100% {
            height: 0;
            opacity: 0;
          }
        }
        @keyframes king-float {
          0%, 100% {
            transform: translateY(0) scale(1);
          }
          50% {
            transform: translateY(-20px) scale(1.05);
          }
        }
        
        @keyframes king-rotate {
          from {
            transform: rotate(-5deg);
          }
          to {
            transform: rotate(5deg);
          }
        }
        
        .beams-container {
          position: absolute;
          width: 600px;
          height: 600px;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 1;
        }
        
        .beam {
          position: absolute;
          width: 3px;
          height: 0;
          background: linear-gradient(to top, transparent, #fbbf24, #f59e0b, #d97706);
          top: 50%;
          left: 50%;
          transform-origin: bottom center;
          animation: beam-pop 2s ease-out infinite;
          box-shadow: 0 0 15px #fbbf24, 0 0 25px #f59e0b;
          filter: blur(1px);
        }
        
        .king-container {
          position: relative;
          z-index: 2;
          animation: king-float 3s ease-in-out infinite;
        }
        
        .king-svg {
          filter: drop-shadow(0 0 30px rgba(251, 191, 36, 0.6));
          animation: king-rotate 4s ease-in-out infinite alternate;
        }
        
        .animate-float-1 {
          animation: float-1 8s ease-in-out infinite;
        }
        
        .animate-float-2 {
          animation: float-2 10s ease-in-out infinite;
        }
        
        .bg-gradient-radial {
          background: radial-gradient(circle, var(--tw-gradient-stops));
        }
      `}</style>
    </div>
  );
}
