'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { supabase, CorruptPerson, Statistics } from '@/lib/supabase';
import Header from '@/components/Header';
import { AlertCircle, TrendingUp, Users, Scale, ChevronLeft, ChevronRight } from 'lucide-react';

export default function CorruptPage() {
  const [locale, setLocale] = useState('ar');
  const [translations, setTranslations] = useState<any>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [corruptPeople, setCorruptPeople] = useState<CorruptPerson[]>([]);
  const [statistics, setStatistics] = useState<Statistics | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);

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

  // Fetch corrupt people and statistics
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch corrupt people
        let query = supabase.from('corrupt_people').select('*');
        if (selectedCategory !== 'all') {
          query = query.eq('category', selectedCategory);
        }
        const { data: people, error: peopleError } = await query;
        
        if (peopleError) throw peopleError;
        setCorruptPeople(people || []);

        // Fetch statistics
        const { data: stats, error: statsError } = await supabase
          .from('statistics')
          .select('*')
          .single();
        
        if (statsError) throw statsError;
        setStatistics(stats);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedCategory]);

  // Auto-advance slider
  useEffect(() => {
    if (corruptPeople.length === 0) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % Math.min(corruptPeople.length, 5));
    }, 5000);
    return () => clearInterval(interval);
  }, [corruptPeople.length]);

  const t = translations || {};
  const categories = [
    { id: 'all', label: t.corrupt?.categories?.all || 'All', icon: Users },
    { id: 'politician', label: t.corrupt?.categories?.politician || 'Politicians', icon: Scale },
    { id: 'businessman', label: t.corrupt?.categories?.businessman || 'Business', icon: TrendingUp },
    { id: 'official', label: t.corrupt?.categories?.official || 'Officials', icon: AlertCircle }
  ];

  const getLocalizedField = (person: CorruptPerson, field: string) => {
    const localeField = `${field}_${locale}`;
    return (person as any)[localeField] || (person as any)[field] || '';
  };

  if (!translations) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  const topCorrupt = corruptPeople.slice(0, 5);

  return (
    <div dir={currentLang.dir} className="min-h-screen relative overflow-hidden font-sans bg-black" style={{ fontFamily: currentLang.font || 'inherit' }}>
      {/* Background */}
      <div className="fixed inset-0 z-0" style={{
        backgroundImage: 'url(/background.webp)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}>
        <div className="absolute inset-0 bg-black/85"></div>
      </div>

      {/* Header */}
      <Header locale={locale} setLocale={setLocale} translations={translations} />

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Page Title */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4 drop-shadow-lg">
            {t.corrupt?.title || 'Corruption Database'}
          </h1>
          <p className="text-lg text-neutral-300 max-w-3xl mx-auto">
            {t.corrupt?.subtitle || 'Exposing corruption for transparency and accountability'}
          </p>
        </div>

        {/* Statistics */}
        {statistics && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            <div className="backdrop-blur-lg bg-red-500/10 border border-red-500/20 rounded-2xl p-6 text-center">
              <div className="text-3xl font-bold text-red-400 mb-2">{statistics.total_corrupt}</div>
              <div className="text-sm text-neutral-300">{t.corrupt?.stats?.total || 'Total Cases'}</div>
            </div>
            <div className="backdrop-blur-lg bg-yellow-500/10 border border-yellow-500/20 rounded-2xl p-6 text-center">
              <div className="text-3xl font-bold text-yellow-400 mb-2">
                {statistics.total_stolen ? `${(statistics.total_stolen / 1000000000).toFixed(1)}B` : 'N/A'}
              </div>
              <div className="text-sm text-neutral-300">{t.corrupt?.stats?.stolen || 'Stolen (MAD)'}</div>
            </div>
            <div className="backdrop-blur-lg bg-orange-500/10 border border-orange-500/20 rounded-2xl p-6 text-center">
              <div className="text-3xl font-bold text-orange-400 mb-2">{statistics.cases_active}</div>
              <div className="text-sm text-neutral-300">{t.corrupt?.stats?.active || 'Active Cases'}</div>
            </div>
            <div className="backdrop-blur-lg bg-green-500/10 border border-green-500/20 rounded-2xl p-6 text-center">
              <div className="text-3xl font-bold text-green-400 mb-2">{statistics.convictions}</div>
              <div className="text-sm text-neutral-300">{t.corrupt?.stats?.convictions || 'Convictions'}</div>
            </div>
          </div>
        )}

        {/* Featured Slider */}
        {topCorrupt.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6">{t.corrupt?.featured || 'Most Notorious'}</h2>
            <div className="relative backdrop-blur-xl bg-white/5 rounded-3xl border border-white/10 overflow-hidden">
              <div className="relative h-96">
                {topCorrupt.map((person, index) => (
                  <div
                    key={person.id}
                    className={`absolute inset-0 transition-opacity duration-500 ${
                      index === currentSlide ? 'opacity-100' : 'opacity-0'
                    }`}
                  >
                    <div className="flex flex-col md:flex-row h-full">
                      <div className="md:w-1/2 h-64 md:h-full relative">
                        <img
                          src={person.image_url}
                          alt={getLocalizedField(person, 'name')}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/80 to-transparent"></div>
                      </div>
                      <div className="md:w-1/2 p-8 flex flex-col justify-center">
                        <h3 className="text-3xl font-bold text-white mb-2">
                          {getLocalizedField(person, 'name')}
                        </h3>
                        <p className="text-red-400 text-lg mb-4">{getLocalizedField(person, 'position')}</p>
                        <p className="text-neutral-300 mb-6 line-clamp-4">
                          {getLocalizedField(person, 'description')}
                        </p>
                        <div className="flex gap-4 mb-6">
                          <div className="backdrop-blur-md bg-white/10 rounded-lg px-4 py-2 border border-white/20">
                            <div className="text-sm text-neutral-400">{t.corrupt?.cases || 'Cases'}</div>
                            <div className="text-xl font-bold text-white">{person.cases_count}</div>
                          </div>
                          {person.amount_stolen && (
                            <div className="backdrop-blur-md bg-white/10 rounded-lg px-4 py-2 border border-white/20">
                              <div className="text-sm text-neutral-400">{t.corrupt?.amount || 'Amount'}</div>
                              <div className="text-xl font-bold text-red-400">
                                {(person.amount_stolen / 1000000).toFixed(1)}M
                              </div>
                            </div>
                          )}
                        </div>
                        <Link
                          href={`/corrupt/${person.id}`}
                          className="inline-block backdrop-blur-md bg-white hover:bg-white/90 text-black font-semibold px-6 py-3 rounded-lg transition-all duration-300 text-center"
                        >
                          {t.corrupt?.viewDetails || 'View Details'}
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Slider Controls */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                {topCorrupt.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentSlide ? 'bg-white w-8' : 'bg-white/40'
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={() => setCurrentSlide((prev) => (prev - 1 + topCorrupt.length) % topCorrupt.length)}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 backdrop-blur-md bg-white/10 hover:bg-white/20 p-3 rounded-full border border-white/20 transition-all"
              >
                <ChevronLeft className="w-6 h-6 text-white" />
              </button>

              <button
                onClick={() => setCurrentSlide((prev) => (prev + 1) % topCorrupt.length)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 backdrop-blur-md bg-white/10 hover:bg-white/20 p-3 rounded-full border border-white/20 transition-all"
              >
                <ChevronRight className="w-6 h-6 text-white" />
              </button>
            </div>
          </div>
        )}

        {/* Category Filter */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-3">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-white text-black'
                    : 'backdrop-blur-lg bg-white/5 text-neutral-300 hover:bg-white/10 border border-white/10'
                }`}
              >
                <cat.icon className="w-5 h-5" />
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Grid of Corrupt People */}
        {loading ? (
          <div className="text-center py-20">
            <div className="text-white text-xl">{t.loading || 'Loading...'}</div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {corruptPeople.map((person) => (
              <Link
                key={person.id}
                href={`/corrupt/${person.id}`}
                className="group backdrop-blur-xl bg-white/5 hover:bg-white/10 rounded-2xl border border-white/10 hover:border-white/20 overflow-hidden transition-all duration-300"
              >
                <div className="relative h-64">
                  <img
                    src={person.image_url}
                    alt={getLocalizedField(person, 'name')}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                  <div className="absolute top-3 right-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-md border ${
                      person.status === 'convicted' 
                        ? 'bg-green-500/20 border-green-500/50 text-green-300'
                        : person.status === 'investigated'
                        ? 'bg-yellow-500/20 border-yellow-500/50 text-yellow-300'
                        : 'bg-red-500/20 border-red-500/50 text-red-300'
                    }`}>
                      {t.corrupt?.status?.[person.status] || person.status}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-1 group-hover:text-neutral-200 transition-colors">
                    {getLocalizedField(person, 'name')}
                  </h3>
                  <p className="text-red-400 text-sm mb-3">{getLocalizedField(person, 'position')}</p>
                  <p className="text-neutral-400 text-sm mb-4 line-clamp-2">
                    {getLocalizedField(person, 'description')}
                  </p>
                  <div className="flex gap-3">
                    <div className="flex-1 backdrop-blur-md bg-white/5 rounded-lg p-3 border border-white/10">
                      <div className="text-xs text-neutral-400 mb-1">{t.corrupt?.cases || 'Cases'}</div>
                      <div className="text-lg font-bold text-white">{person.cases_count}</div>
                    </div>
                    {person.amount_stolen && (
                      <div className="flex-1 backdrop-blur-md bg-white/5 rounded-lg p-3 border border-white/10">
                        <div className="text-xs text-neutral-400 mb-1">{t.corrupt?.amount || 'Amount'}</div>
                        <div className="text-lg font-bold text-red-400">
                          {person.amount_stolen >= 1000000000
                            ? `${(person.amount_stolen / 1000000000).toFixed(1)}B`
                            : `${(person.amount_stolen / 1000000).toFixed(1)}M`}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {corruptPeople.length === 0 && !loading && (
          <div className="text-center py-20 backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10">
            <AlertCircle className="w-16 h-16 text-neutral-500 mx-auto mb-4" />
            <p className="text-xl text-neutral-300">{t.corrupt?.noData || 'No data available'}</p>
          </div>
        )}
      </div>
    </div>
  );
}
