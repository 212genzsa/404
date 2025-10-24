'use client';

import { Moon, Sun, AlertTriangle, Shield, MessageSquare, Globe } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function CountdownAnnouncement() {
  const [darkMode, setDarkMode] = useState(true);
  const [locale, setLocale] = useState('ar');
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

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
      alert: 'إعلان مجتمعي حرج',
      subtitle: 'أدلة على التلاعب والسيطرة المنسقة',
      countdown: 'الكشف الكامل خلال',
      days: 'أيام',
      hours: 'ساعات',
      minutes: 'دقائق',
      seconds: 'ثواني',
      evidenceTitle: 'أدلة السيطرة',
      description1: 'مجتمع GenZ212، الذي يضم أكثر من ',
      members: '500,000+ عضو',
      description2: ' عبر منصات متعددة، تم التحكم فيه والتلاعب به بشكل منهجي من قبل أفراد عملوا بنشاط ضد مصالح بلدنا وقيم المجتمع.',
      description3: 'من خلال التحقيق الدقيق والتوثيق، كشفنا عن شبكة من الجهود المنسقة المصممة للتأثير والتلاعب وإعادة توجيه مناقشات وأعمال المجتمع لتحقيق مكاسب شخصية مع تقويض المصالح الوطنية.',
      manipulationTitle: 'نمط التلاعب',
      point1: '• حملات رسائل منسقة',
      point2: '• قمع الأصوات المعارضة',
      point3: '• نشر معلومات مضللة استراتيجية',
      whatMeansTitle: 'ماذا يعني هذا',
      whatMeans: 'هذا الإعلان بمثابة تحذير ودعوة للشفافية. الأفراد المسؤولون استخدموا هذه المنصة لتعزيز أجندات تتعارض بشكل مباشر مع رفاهية أمتنا وشعبها. خلال 3 أيام، سننشر وثائق شاملة وسجلات اتصالات وأدلة تكشف المدى الكامل لهذه العملية المنسقة.',
      truth: 'الحقيقة لا يمكن أن تبقى مخفية. العدالة يجب أن تتحقق.',
      promise: 'هذا ليس تهديداً. هذا وعد بالشفافية والمساءلة.',
      contact: 'للتحقق والاتصال: contact@genz212.me'
    },
    amz: {
      alert: 'ⴰⵙⵙⵏⵎⴰⵍ ⵏ ⵜⵎⵙⵎⵓⵏⵜ ⵉⵙⵙⴰⵏⴰⵏ',
      subtitle: 'ⵉⵏⵎⵎⴰⵍⵏ ⵏ ⵓⵙⵏⴼⵍ ⴷ ⵓⵙⵙⵓⴷⵙ',
      countdown: 'ⴰⵙⵎⵎⵍ ⴰⵛⵛⴰⵕⴰⵏ ⴷⴳ',
      days: 'ⵓⵙⵙⴰⵏ',
      hours: 'ⵜⵙⵔⴰⴳⵉⵏ',
      minutes: 'ⵜⵙⴷⵉⴷⵉⵏ',
      seconds: 'ⵜⴰⵙⵉⵏⵜⵉⵏ',
      evidenceTitle: 'ⵉⵏⵎⵎⴰⵍⵏ ⵏ ⵓⵙⵙⵓⴷⵙ',
      description1: 'ⵜⴰⵎⵙⵎⵓⵏⵜ GenZ212, ⵉⵍⴰⵏ ',
      members: '500,000+ ⵏ ⵉⵎⴰⵙⵙⵏ',
      description2: ' ⴷⴳ ⴽⵉⴳⴰⵏ ⵏ ⵜⵏⴰⴼⵓⵜⵉⵏ, ⵉⵜⵜⵓⵙⵓⴷⵙ ⴷ ⵉⵜⵜⵓⵙⵏⴼⵍ ⵙ ⵓⵎⴰⵜⴰ ⵙⴳ ⵎⵉⴷⴷⵏ ⵉⵅⴷⴷⵎⵏ ⵎⴳⴰⵍ ⵜⵉⵎⵏⵜⵉⵍⵉⵏ ⵏ ⵜⵎⵓⵔⵜ-ⵏⵏⵖ.',
      description3: 'ⵙ ⵓⵙⵙⵓⴷⵙ ⴷ ⵓⵙⵎⵓⵍⵙ, ⵏⵙⴼⴰⵡ ⵢⴰⵜ ⵜⴰⵣⴷⴰⵢⵜ ⵏ ⵜⵡⵓⵔⵉⵡⵉⵏ ⵉⵎⵙⴰⵙⴰⵏ ⵉⵜⵜⵓⵙⴽⴰⵔⵏ ⵉ ⵓⵙⵏⴼⵍ ⴷ ⵓⵙⵙⵉⵜⴳ ⵏ ⵜⵎⵙⵎⵓⵏⵜ.',
      manipulationTitle: 'ⴰⵏⴰⵡ ⵏ ⵓⵙⵏⴼⵍ',
      point1: '• ⵜⵉⵎⵙⴰⵙⴰⵏⵉⵏ ⵏ ⵉⵣⵏⴰⵏ ⵉⵎⵙⴰⵙⴰⵏ',
      point2: '• ⴰⵙⴽⵙⵙⵎ ⵏ ⵉⵎⵙⵉⵡⵍⵏ ⵉⵏⴳⵍⵏ',
      point3: '• ⴰⵙⵏⴼⴰⵍ ⵏ ⵉⵙⴰⵍⵏ ⵉⵎⵣⴳⴰⵏ',
      whatMeansTitle: 'ⵎⴰⴷ ⵉⵙⵙⴽⴰⵔ ⴰⵢⴰ',
      whatMeans: 'ⴰⵙⵙⵏⵎⴰⵍ-ⴰ ⵉⴳⴰ ⵢⴰⵏ ⵓⵙⵎⵓⵍⵙ ⴷ ⵢⴰⵜ ⵜⵙⴰⵡⴰⵍⵜ ⵉ ⵓⵙⵎⵢⴰⵏⴰ. ⴷⴳ 3 ⵏ ⵡⵓⵙⵙⴰⵏ, ⴰⴷ ⵏⴼⵙⵔ ⴰⵙⵏⵎⵓⵍ ⴰⵛⵛⴰⵕⴰⵏ ⴷ ⵉⵏⵎⵎⴰⵍⵏ.',
      truth: 'ⵜⵉⴷⵜ ⵓⵔ ⵜⵣⴹⴰⵕ ⴰⴷ ⵜⵇⵇⵉⵎ ⵜⴼⴼⵔⵜ. ⵍⵃⴰⵇ ⵉⵅⵚⵚⴰ ⴰⴷ ⵉⵍⵉ.',
      promise: 'ⴰⵢⴰ ⵓⵔ ⴳⵉⵙ ⴰⵙⵎⴰⵍⵍⵙ. ⴰⵢⴰ ⴷ ⴰⵡⴰⴷ ⵏ ⵓⵙⵎⵢⴰⵏⴰ.',
      contact: 'ⵉ ⵓⵙⵏⵜⵎ: contact@genz212.me'
    },
    fr: {
      alert: 'ANNONCE COMMUNAUTAIRE CRITIQUE',
      subtitle: 'Preuves de manipulation et de contrôle coordonnés',
      countdown: 'Divulgation complète dans',
      days: 'Jours',
      hours: 'Heures',
      minutes: 'Minutes',
      seconds: 'Secondes',
      evidenceTitle: 'Preuves de Contrôle',
      description1: 'La communauté GenZ212, avec plus de ',
      members: '500 000+ membres',
      description2: ' sur plusieurs plateformes, a été systématiquement contrôlée et manipulée par des individus qui ont activement travaillé contre les intérêts de notre pays et les valeurs communautaires.',
      description3: 'Grâce à une enquête minutieuse et à une documentation, nous avons découvert un réseau d\'efforts coordonnés conçus pour influencer, manipuler et rediriger les discussions et actions communautaires pour un gain personnel tout en sapant les intérêts nationaux.',
      manipulationTitle: 'Schéma de Manipulation',
      point1: '• Campagnes de messages coordonnées',
      point2: '• Suppression des voix dissidentes',
      point3: '• Diffusion stratégique de désinformation',
      whatMeansTitle: 'Ce que cela signifie',
      whatMeans: 'Cette annonce sert d\'avertissement et d\'appel à la transparence. Les individus responsables ont utilisé cette plateforme pour promouvoir des agendas qui contredisent directement le bien-être de notre nation et de son peuple. Dans 3 jours, nous publierons une documentation complète, des enregistrements de communications et des preuves révélant toute l\'étendue de cette opération coordonnée.',
      truth: 'La vérité ne peut rester cachée. La justice doit être rendue.',
      promise: 'Ce n\'est pas une menace. C\'est une promesse de transparence et de responsabilité.',
      contact: 'Pour vérification et contact : contact@genz212.me'
    },
    en: {
      alert: 'CRITICAL COMMUNITY ANNOUNCEMENT',
      subtitle: 'Evidence of coordinated manipulation and control',
      countdown: 'Full Disclosure In',
      days: 'Days',
      hours: 'Hours',
      minutes: 'Minutes',
      seconds: 'Seconds',
      evidenceTitle: 'Evidence of Control',
      description1: 'The GenZ212 community, with over ',
      members: '500,000+ members',
      description2: ' across multiple platforms, has been systematically controlled and manipulated by individuals who have actively worked against the interests of our country and community values.',
      description3: 'Through careful investigation and documentation, we have uncovered a network of coordinated efforts designed to influence, manipulate, and redirect community discussions and actions for personal gain while undermining national interests.',
      manipulationTitle: 'Pattern of Manipulation',
      point1: '• Coordinated messaging campaigns',
      point2: '• Suppression of dissenting voices',
      point3: '• Strategic misinformation spread',
      whatMeansTitle: 'What This Means',
      whatMeans: 'This announcement serves as a warning and a call for transparency. The individuals responsible have used this platform to further agendas that directly contradict the wellbeing of our nation and its people. In 3 days, we will release comprehensive documentation, communications records, and evidence that reveals the full extent of this coordinated operation.',
      truth: 'Truth cannot remain hidden. Justice must be served.',
      promise: 'This is not a threat. This is a promise of transparency and accountability.',
      contact: 'For verification and contact: contact@genz212.me'
    },
    de: {
      alert: 'KRITISCHE GEMEINSCHAFTSANKÜNDIGUNG',
      subtitle: 'Beweise für koordinierte Manipulation und Kontrolle',
      countdown: 'Vollständige Offenlegung in',
      days: 'Tage',
      hours: 'Stunden',
      minutes: 'Minuten',
      seconds: 'Sekunden',
      evidenceTitle: 'Beweise der Kontrolle',
      description1: 'Die GenZ212-Community mit über ',
      members: '500.000+ Mitgliedern',
      description2: ' auf mehreren Plattformen wurde systematisch von Personen kontrolliert und manipuliert, die aktiv gegen die Interessen unseres Landes und die Gemeinschaftswerte gearbeitet haben.',
      description3: 'Durch sorgfältige Untersuchungen und Dokumentationen haben wir ein Netzwerk koordinierter Bemühungen aufgedeckt, die darauf abzielen, Community-Diskussionen und -Aktionen für persönlichen Gewinn zu beeinflussen, zu manipulieren und umzuleiten, während nationale Interessen untergraben werden.',
      manipulationTitle: 'Manipulationsmuster',
      point1: '• Koordinierte Messaging-Kampagnen',
      point2: '• Unterdrückung abweichender Stimmen',
      point3: '• Strategische Verbreitung von Fehlinformationen',
      whatMeansTitle: 'Was das bedeutet',
      whatMeans: 'Diese Ankündigung dient als Warnung und Aufruf zur Transparenz. Die Verantwortlichen haben diese Plattform genutzt, um Agenden voranzutreiben, die dem Wohlergehen unserer Nation und ihrer Menschen direkt widersprechen. In 3 Tagen werden wir umfassende Dokumentationen, Kommunikationsaufzeichnungen und Beweise veröffentlichen, die das volle Ausmaß dieser koordinierten Operation offenlegen.',
      truth: 'Die Wahrheit kann nicht verborgen bleiben. Gerechtigkeit muss durchgesetzt werden.',
      promise: 'Dies ist keine Drohung. Dies ist ein Versprechen von Transparenz und Rechenschaftspflicht.',
      contact: 'Für Verifizierung und Kontakt: contact@genz212.me'
    },
    nl: {
      alert: 'KRITIEKE GEMEENSCHAPSAANKONDIGING',
      subtitle: 'Bewijs van gecoördineerde manipulatie en controle',
      countdown: 'Volledige Onthulling Over',
      days: 'Dagen',
      hours: 'Uren',
      minutes: 'Minuten',
      seconds: 'Seconden',
      evidenceTitle: 'Bewijs van Controle',
      description1: 'De GenZ212-gemeenschap, met meer dan ',
      members: '500.000+ leden',
      description2: ' op meerdere platforms, is systematisch gecontroleerd en gemanipuleerd door individuen die actief hebben gewerkt tegen de belangen van ons land en gemeenschapswaarden.',
      description3: 'Door zorgvuldig onderzoek en documentatie hebben we een netwerk van gecoördineerde inspanningen blootgelegd die zijn ontworpen om gemeenschapsdiscussies en -acties te beïnvloeden, manipuleren en omleiden voor persoonlijk gewin, terwijl nationale belangen worden ondermijnd.',
      manipulationTitle: 'Patroon van Manipulatie',
      point1: '• Gecoördineerde berichtencampagnes',
      point2: '• Onderdrukking van dissidente stemmen',
      point3: '• Strategische verspreiding van desinformatie',
      whatMeansTitle: 'Wat Dit Betekent',
      whatMeans: 'Deze aankondiging dient als een waarschuwing en een oproep tot transparantie. De verantwoordelijke individuen hebben dit platform gebruikt om agenda\'s te bevorderen die direct in tegenspraak zijn met het welzijn van onze natie en haar mensen. Over 3 dagen zullen we uitgebreide documentatie, communicatierecords en bewijs vrijgeven dat de volledige omvang van deze gecoördineerde operatie onthult.',
      truth: 'De waarheid kan niet verborgen blijven. Gerechtigheid moet worden gediend.',
      promise: 'Dit is geen bedreiging. Dit is een belofte van transparantie en verantwoordelijkheid.',
      contact: 'Voor verificatie en contact: contact@genz212.me'
    },
    pt: {
      alert: 'ANÚNCIO COMUNITÁRIO CRÍTICO',
      subtitle: 'Evidência de manipulação e controle coordenados',
      countdown: 'Divulgação Completa Em',
      days: 'Dias',
      hours: 'Horas',
      minutes: 'Minutos',
      seconds: 'Segundos',
      evidenceTitle: 'Evidência de Controle',
      description1: 'A comunidade GenZ212, com mais de ',
      members: '500.000+ membros',
      description2: ' em várias plataformas, foi sistematicamente controlada e manipulada por indivíduos que trabalharam ativamente contra os interesses do nosso país e valores comunitários.',
      description3: 'Através de investigação cuidadosa e documentação, descobrimos uma rede de esforços coordenados projetados para influenciar, manipular e redirecionar discussões e ações comunitárias para ganho pessoal, enquanto minam interesses nacionais.',
      manipulationTitle: 'Padrão de Manipulação',
      point1: '• Campanhas de mensagens coordenadas',
      point2: '• Supressão de vozes dissidentes',
      point3: '• Disseminação estratégica de desinformação',
      whatMeansTitle: 'O Que Isto Significa',
      whatMeans: 'Este anúncio serve como um aviso e um apelo à transparência. Os indivíduos responsáveis usaram esta plataforma para promover agendas que contradizem diretamente o bem-estar da nossa nação e seu povo. Em 3 dias, divulgaremos documentação abrangente, registros de comunicações e evidências que revelam toda a extensão desta operação coordenada.',
      truth: 'A verdade não pode permanecer escondida. A justiça deve ser feita.',
      promise: 'Isto não é uma ameaça. Esta é uma promessa de transparência e responsabilidade.',
      contact: 'Para verificação e contato: contact@genz212.me'
    }
  };

  const currentLang = languages.find(l => l.code === locale) || languages[0];
  const t = translations[locale as keyof typeof translations];

  // Calculate time remaining until October 17, 2025 at 1:00 AM
  useEffect(() => {
    const targetDate = new Date('2025-10-17T01:00:00');

    const updateTimer = () => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  const bgClass = darkMode 
    ? 'bg-gradient-to-br from-gray-900 via-black to-gray-900' 
    : 'bg-gradient-to-br from-gray-50 via-white to-gray-100';
  
  const textPrimary = darkMode ? 'text-white' : 'text-gray-900';
  const textSecondary = darkMode ? 'text-gray-300' : 'text-gray-700';
  const textMuted = darkMode ? 'text-gray-400' : 'text-gray-600';
  const cardBg = darkMode ? 'bg-white/5 border-white/10' : 'bg-white border-gray-200';
  const accentBg = darkMode ? 'bg-red-500/10 border-red-500/20' : 'bg-red-50 border-red-200';
  const accentText = darkMode ? 'text-red-400' : 'text-red-600';

  return (
    <div dir={currentLang.dir} className={`min-h-screen ${bgClass} transition-colors duration-500 relative overflow-hidden`}>
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-20 left-10 w-72 h-72 ${darkMode ? 'bg-red-500/10' : 'bg-red-200/30'} rounded-full blur-3xl animate-pulse`}></div>
        <div className={`absolute bottom-20 right-10 w-96 h-96 ${darkMode ? 'bg-purple-500/10' : 'bg-purple-200/30'} rounded-full blur-3xl animate-pulse delay-1000`}></div>
      </div>

      {/* Controls */}
      <div className="fixed top-6 right-6 z-50 flex gap-3">
        {/* Language Selector */}
        <div className="relative">
          <button
            onClick={() => setShowLangMenu(!showLangMenu)}
            className={`p-3 rounded-full ${cardBg} border backdrop-blur-lg shadow-lg hover:scale-110 transition-all duration-300 flex items-center gap-2`}
          >
            <Globe className={`w-6 h-6 ${textPrimary}`} />
            <span className="text-lg">{currentLang.flag}</span>
          </button>
          
          {showLangMenu && (
            <div className={`absolute top-full mt-2 right-0 ${cardBg} border backdrop-blur-xl rounded-xl shadow-2xl overflow-hidden min-w-[200px]`}>
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    setLocale(lang.code);
                    setShowLangMenu(false);
                  }}
                  className={`w-full px-4 py-3 text-left hover:bg-white/5 transition-colors flex items-center gap-3 ${
                    locale === lang.code ? 'bg-white/10' : ''
                  }`}
                >
                  <span className="text-xl">{lang.flag}</span>
                  <span className={textPrimary}>{lang.name}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Dark/Light Mode Toggle */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className={`p-3 rounded-full ${cardBg} border backdrop-blur-lg shadow-lg hover:scale-110 transition-all duration-300`}
        >
          {darkMode ? (
            <Sun className="w-6 h-6 text-yellow-400" />
          ) : (
            <Moon className="w-6 h-6 text-gray-700" />
          )}
        </button>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-12 max-w-6xl">
        {/* Alert Banner */}
        <div className={`${accentBg} border rounded-2xl p-6 mb-8 backdrop-blur-lg shadow-xl`}>
          <div className="flex items-center justify-center gap-3 mb-2">
            <AlertTriangle className={`w-8 h-8 ${accentText} animate-pulse`} />
            <h1 className={`text-2xl md:text-3xl font-bold ${accentText}`}>
              {t.alert}
            </h1>
          </div>
          <p className={`text-center ${textMuted} text-sm md:text-base`}>
            {t.subtitle}
          </p>
        </div>

        {/* Countdown Timer */}
        <div className={`${cardBg} border backdrop-blur-xl rounded-3xl p-8 mb-8 shadow-2xl`}>
          <h2 className={`text-xl md:text-2xl font-bold ${textPrimary} text-center mb-6`}>
            {t.countdown}
          </h2>
          <div className="grid grid-cols-4 gap-4 md:gap-6 max-w-3xl mx-auto">
            {[
              { label: t.days, value: timeLeft.days },
              { label: t.hours, value: timeLeft.hours },
              { label: t.minutes, value: timeLeft.minutes },
              { label: t.seconds, value: timeLeft.seconds }
            ].map((item) => (
              <div key={item.label} className={`${accentBg} border rounded-xl p-4 md:p-6 backdrop-blur-lg`}>
                <div className={`text-3xl md:text-5xl font-bold ${accentText} mb-2 text-center font-mono`}>
                  {String(item.value).padStart(2, '0')}
                </div>
                <div className={`text-xs md:text-sm ${textMuted} text-center uppercase tracking-wider`}>
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Evidence Section */}
        <div className={`${cardBg} border backdrop-blur-xl rounded-3xl p-8 mb-8 shadow-2xl`}>
          <div className="flex items-center gap-3 mb-6">
            <Shield className={`w-7 h-7 ${accentText}`} />
            <h2 className={`text-2xl md:text-3xl font-bold ${textPrimary}`}>
              {t.evidenceTitle}
            </h2>
          </div>
          
          <div className={`${accentBg} border rounded-xl p-6 mb-6`}>
            <p className={`${textSecondary} leading-relaxed mb-4`}>
              {t.description1}<span className="font-bold">{t.members}</span>{t.description2}
            </p>
            <p className={`${textSecondary} leading-relaxed`}>
              {t.description3}
            </p>
          </div>

          {/* Evidence Points */}
          <div className="mb-6">
            <div className={`${cardBg} border rounded-xl p-5`}>
              <div className="flex items-start gap-3">
                <MessageSquare className={`w-6 h-6 ${accentText} mt-1 flex-shrink-0`} />
                <div>
                  <h3 className={`font-semibold ${textPrimary} mb-2`}>{t.manipulationTitle}</h3>
                  <ul className={`${textMuted} text-sm space-y-1`}>
                    <li>{t.point1}</li>
                    <li>{t.point2}</li>
                    <li>{t.point3}</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className={`${accentBg} border rounded-xl p-5`}>
            <h3 className={`font-semibold ${textPrimary} mb-3 flex items-center gap-2`}>
              <AlertTriangle className={`w-5 h-5 ${accentText}`} />
              {t.whatMeansTitle}
            </h3>
            <p className={`${textSecondary} text-sm leading-relaxed`}>
              {t.whatMeans}
            </p>
          </div>
        </div>

        {/* Call to Action */}
        <div className={`${cardBg} border backdrop-blur-xl rounded-2xl p-6 shadow-xl text-center`}>
          <p className={`${textSecondary} mb-4`}>
            {t.truth}
          </p>
          <p className={`${textMuted} text-sm`}>
            {t.promise}
          </p>
        </div>

        {/* Footer Note */}
        <div className="text-center mt-8">
          <p className={`${textMuted} text-xs`}>
            {t.contact}
          </p>
        </div>
      </div>
    </div>
  );
}
