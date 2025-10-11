'use client';

import { useState, useEffect } from 'react';
import { ArrowLeft, Eye, Target, Users, Scale, Megaphone, BookOpen, Shield, Heart, Zap, CheckCircle2, Lock } from 'lucide-react';
import Link from 'next/link';
import Header from '@/components/Header';

export default function VisionPage() {
  const [locale, setLocale] = useState('ar');
  const [translations, setTranslations] = useState<any>(null);
  const [activePhase, setActivePhase] = useState(0);

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

  // Load translations
  useEffect(() => {
    const loadTranslations = async () => {
      try {
        const response = await fetch(`/locales/${locale}/common.json`);
        if (!response.ok) throw new Error(`Failed to load translations for ${locale}`);
        const data = await response.json();
        setTranslations(data);
      } catch (error) {
        console.error('Failed to load translations:', error);
      }
    };
    loadTranslations();
  }, [locale]);

  const t = translations || {};

  // Core values for Gen Z 212
  const coreValues = [
    {
      icon: Shield,
      title: t.vision?.values?.transparency?.title || 'Transparency',
      description: t.vision?.values?.transparency?.desc || 'Exposing corruption and holding power accountable through radical transparency.',
      color: 'blue'
    },
    {
      icon: Scale,
      title: t.vision?.values?.justice?.title || 'Justice',
      description: t.vision?.values?.justice?.desc || 'Fighting for equal rights and fair treatment for all citizens.',
      color: 'purple'
    },
    {
      icon: Users,
      title: t.vision?.values?.unity?.title || 'Unity',
      description: t.vision?.values?.unity?.desc || 'Building bridges across communities, cultures, and generations.',
      color: 'green'
    },
    {
      icon: Megaphone,
      title: t.vision?.values?.voice?.title || 'Voice',
      description: t.vision?.values?.voice?.desc || 'Amplifying the unheard and giving power to the people.',
      color: 'red'
    },
    {
      icon: BookOpen,
      title: t.vision?.values?.education?.title || 'Education',
      description: t.vision?.values?.education?.desc || 'Empowering through knowledge, critical thinking, and civic awareness.',
      color: 'yellow'
    },
    {
      icon: Heart,
      title: t.vision?.values?.solidarity?.title || 'Solidarity',
      description: t.vision?.values?.solidarity?.desc || 'Standing together for collective liberation and mutual support.',
      color: 'pink'
    }
  ];

  // Roadmap phases
  const roadmapPhases = [
    {
      phase: 1,
      title: t.vision?.roadmap?.phase1?.title || 'Awakening',
      subtitle: t.vision?.roadmap?.phase1?.subtitle || '2024-2025: Building Awareness',
      status: 'active',
      icon: Zap,
      goals: [
        t.vision?.roadmap?.phase1?.goal1 || 'Reach 500K+ community members across all platforms',
        t.vision?.roadmap?.phase1?.goal2 || 'Launch corruption database with 100+ documented cases',
        t.vision?.roadmap?.phase1?.goal3 || 'Establish local chapters in 12 major cities',
        t.vision?.roadmap?.phase1?.goal4 || 'Create educational content reaching 1M+ views',
        t.vision?.roadmap?.phase1?.goal5 || 'Build coalition with 50+ civil society organizations'
      ],
      achievements: [
        t.vision?.roadmap?.phase1?.ach1 || '200K+ Instagram followers',
        t.vision?.roadmap?.phase1?.ach2 || '200K+ Discord community members',
        t.vision?.roadmap?.phase1?.ach3 || 'Launched transparency platform'
      ]
    },
    {
      phase: 2,
      title: t.vision?.roadmap?.phase2?.title || 'Mobilization',
      subtitle: t.vision?.roadmap?.phase2?.subtitle || '2025-2026: Building Power',
      status: 'upcoming',
      icon: Users,
      goals: [
        t.vision?.roadmap?.phase2?.goal1 || 'Organize nationwide peaceful protests and demonstrations',
        t.vision?.roadmap?.phase2?.goal2 || 'Launch citizen journalism initiative',
        t.vision?.roadmap?.phase2?.goal3 || 'Establish legal defense fund for activists',
        t.vision?.roadmap?.phase2?.goal4 || 'Create independent media platform',
        t.vision?.roadmap?.phase2?.goal5 || 'Form youth parliament shadow government'
      ],
      achievements: []
    },
    {
      phase: 3,
      title: t.vision?.roadmap?.phase3?.title || 'Transformation',
      subtitle: t.vision?.roadmap?.phase3?.subtitle || '2026-2027: Systemic Change',
      status: 'upcoming',
      icon: Target,
      goals: [
        t.vision?.roadmap?.phase3?.goal1 || 'Push for constitutional reforms',
        t.vision?.roadmap?.phase3?.goal2 || 'Establish anti-corruption enforcement mechanisms',
        t.vision?.roadmap?.phase3?.goal3 || 'Create transparent government accountability systems',
        t.vision?.roadmap?.phase3?.goal4 || 'Launch economic justice initiatives',
        t.vision?.roadmap?.phase3?.goal5 || 'Build sustainable alternative institutions'
      ],
      achievements: []
    },
    {
      phase: 4,
      title: t.vision?.roadmap?.phase4?.title || 'Liberation',
      subtitle: t.vision?.roadmap?.phase4?.subtitle || '2027+: A Free Morocco',
      status: 'future',
      icon: Eye,
      goals: [
        t.vision?.roadmap?.phase4?.goal1 || 'Achieve full governmental transparency',
        t.vision?.roadmap?.phase4?.goal2 || 'Establish direct democracy mechanisms',
        t.vision?.roadmap?.phase4?.goal3 || 'Ensure freedom of press and expression',
        t.vision?.roadmap?.phase4?.goal4 || 'Create equitable economic systems',
        t.vision?.roadmap?.phase4?.goal5 || 'Build truly representative governance'
      ],
      achievements: []
    }
  ];

  const getColorClasses = (color: string) => {
    const colors: Record<string, string> = {
      blue: 'bg-blue-500/10 border-blue-500/20 text-blue-300',
      purple: 'bg-purple-500/10 border-purple-500/20 text-purple-300',
      green: 'bg-green-500/10 border-green-500/20 text-green-300',
      red: 'bg-red-500/10 border-red-500/20 text-red-300',
      yellow: 'bg-yellow-500/10 border-yellow-500/20 text-yellow-300',
      pink: 'bg-pink-500/10 border-pink-500/20 text-pink-300'
    };
    return colors[color] || colors.blue;
  };

  const getPhaseColor = (status: string) => {
    if (status === 'active') return 'border-green-500/50 bg-green-500/10';
    if (status === 'upcoming') return 'border-blue-500/50 bg-blue-500/10';
    return 'border-neutral-500/50 bg-neutral-500/10';
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
      {/* Background */}
      <div className="fixed inset-0 z-0" style={{
        backgroundImage: 'url(/background.webp)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}>
        <div className="absolute inset-0 bg-black/90"></div>
      </div>

      {/* Header */}
      <Header locale={locale} setLocale={setLocale} translations={translations} />

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-block backdrop-blur-lg bg-white/10 p-6 rounded-2xl mb-6 border border-white/20">
            <Eye className="w-16 h-16 text-white mx-auto" />
          </div>
          <h1 className="text-5xl sm:text-6xl font-bold text-white mb-6 drop-shadow-lg">
            {t.vision?.hero?.title || 'Our Vision for Freedom'}
          </h1>
          <p className="text-xl text-neutral-300 max-w-4xl mx-auto leading-relaxed mb-8">
            {t.vision?.hero?.description || 'Gen Z 212 envisions a Morocco where transparency replaces corruption, where justice serves all citizens equally, and where the voice of the people shapes our collective future. This is our roadmap to liberation.'}
          </p>
          <div className="flex items-center justify-center gap-2 text-green-400">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <span className="font-semibold">{t.vision?.hero?.status || 'Active Movement'}</span>
          </div>
        </div>

        {/* Core Values */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            {t.vision?.valuesTitle || 'Our Core Values'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {coreValues.map((value, index) => (
              <div
                key={index}
                className={`backdrop-blur-lg ${getColorClasses(value.color)} rounded-2xl p-6 border transition-all duration-300 hover:scale-105`}
              >
                <div className="flex items-start gap-4">
                  <div className="backdrop-blur-md bg-white/10 p-3 rounded-xl border border-white/20">
                    <value.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">{value.title}</h3>
                    <p className="text-sm text-neutral-300">{value.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Roadmap */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-white mb-4 text-center">
            {t.vision?.roadmapTitle || 'Roadmap to Liberation'}
          </h2>
          <p className="text-neutral-400 text-center mb-12 max-w-2xl mx-auto">
            {t.vision?.roadmapDesc || 'Our strategic plan for achieving systemic change through grassroots organizing, transparency, and collective action.'}
          </p>

          {/* Phase Tabs */}
          <div className="flex flex-wrap gap-3 justify-center mb-12">
            {roadmapPhases.map((phase, index) => (
              <button
                key={index}
                onClick={() => setActivePhase(index)}
                className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                  activePhase === index
                    ? 'bg-white text-black'
                    : `backdrop-blur-lg ${getPhaseColor(phase.status)} text-white hover:bg-white/10`
                }`}
              >
                {t.vision?.phase || 'Phase'} {phase.phase}: {phase.title}
              </button>
            ))}
          </div>

          {/* Active Phase Details */}
          <div className="backdrop-blur-xl bg-white/5 rounded-3xl border border-white/10 p-8 md:p-12">
            <div className="flex items-center gap-4 mb-8">
              <div className={`backdrop-blur-md ${getPhaseColor(roadmapPhases[activePhase].status)} p-4 rounded-2xl border`}>
                {(() => {
                  const IconComponent = roadmapPhases[activePhase].icon;
                  return <IconComponent className="w-10 h-10 text-white" />;
                })()}
              </div>
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-3xl font-bold text-white">
                    {roadmapPhases[activePhase].title}
                  </h3>
                  {roadmapPhases[activePhase].status === 'active' && (
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-500/20 border border-green-500/50 text-green-300">
                      {t.vision?.activeNow || 'Active Now'}
                    </span>
                  )}
                  {roadmapPhases[activePhase].status === 'future' && (
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-neutral-500/20 border border-neutral-500/50 text-neutral-300 flex items-center gap-1">
                      <Lock className="w-3 h-3" />
                      {t.vision?.future || 'Future'}
                    </span>
                  )}
                </div>
                <p className="text-neutral-400">{roadmapPhases[activePhase].subtitle}</p>
              </div>
            </div>

            {/* Achievements */}
            {roadmapPhases[activePhase].achievements.length > 0 && (
              <div className="mb-8">
                <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-400" />
                  {t.vision?.achievements || 'Achievements'}
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {roadmapPhases[activePhase].achievements.map((achievement, idx) => (
                    <div
                      key={idx}
                      className="backdrop-blur-md bg-green-500/10 border border-green-500/20 rounded-xl p-4"
                    >
                      <p className="text-green-300 text-sm font-medium">{achievement}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Goals */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Target className="w-5 h-5 text-blue-400" />
                {t.vision?.goals || 'Strategic Goals'}
              </h4>
              <div className="space-y-3">
                {roadmapPhases[activePhase].goals.map((goal, idx) => (
                  <div
                    key={idx}
                    className="backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-all"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-500/20 border border-blue-500/50 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-blue-300 font-bold text-sm">{idx + 1}</span>
                      </div>
                      <p className="text-neutral-200 leading-relaxed">{goal}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="backdrop-blur-xl bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-3xl border border-white/10 p-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            {t.vision?.cta?.title || 'Join the Movement'}
          </h2>
          <p className="text-neutral-300 mb-8 max-w-2xl mx-auto">
            {t.vision?.cta?.description || 'The future of Morocco depends on our collective action. Every voice matters, every action counts. Together, we can build the free and just society we deserve.'}
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="https://discord.gg/genz212"
              target="_blank"
              className="backdrop-blur-md bg-white hover:bg-white/90 text-black font-semibold px-8 py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              {t.vision?.cta?.joinDiscord || 'Join Our Discord'}
            </Link>
            <Link
              href="/corrupt"
              className="backdrop-blur-md bg-white/10 hover:bg-white/20 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 border border-white/20"
            >
              {t.vision?.cta?.viewDatabase || 'View Corruption Database'}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
