'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { supabase, CorruptPerson, CorruptionCase } from '@/lib/supabase';
import Header from '@/components/Header';
import { ArrowLeft, Calendar, DollarSign, FileText, ExternalLink, Image as ImageIcon } from 'lucide-react';
import Link from 'next/link';

export default function CorruptDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [locale, setLocale] = useState('ar');
  const [translations, setTranslations] = useState<any>(null);
  const [person, setPerson] = useState<CorruptPerson | null>(null);
  const [cases, setCases] = useState<CorruptionCase[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

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

  // Fetch person and cases
  useEffect(() => {
    const fetchData = async () => {
      if (!params.id) return;
      
      setLoading(true);
      try {
        // Fetch person
        const { data: personData, error: personError } = await supabase
          .from('corrupt_people')
          .select('*')
          .eq('id', params.id)
          .single();
        
        if (personError) throw personError;
        setPerson(personData);

        // Fetch cases
        const { data: casesData, error: casesError } = await supabase
          .from('corruption_cases')
          .select('*')
          .eq('person_id', params.id)
          .order('date', { ascending: false });
        
        if (casesError) throw casesError;
        setCases(casesData || []);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [params.id]);

  const getLocalizedField = (obj: any, field: string) => {
    const localeField = `${field}_${locale}`;
    return obj[localeField] || obj[field] || '';
  };

  const t = translations || {};

  if (!translations || loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl">{t.loading || 'Loading...'}</div>
      </div>
    );
  }

  if (!person) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl">{t.corrupt?.notFound || 'Person not found'}</div>
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

      {/* Image Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-6xl max-h-[90vh]">
            <img 
              src={selectedImage} 
              alt="Evidence" 
              className="max-w-full max-h-[90vh] object-contain rounded-2xl"
            />
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 backdrop-blur-md bg-white/10 hover:bg-white/20 p-3 rounded-full border border-white/20"
            >
              <span className="text-white text-2xl">×</span>
            </button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Back Button */}
        <Link 
          href="/corrupt"
          className="inline-flex items-center gap-2 text-neutral-300 hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          {t.corrupt?.backToList || 'Back to List'}
        </Link>

        {/* Person Header */}
        <div className="backdrop-blur-xl bg-white/5 rounded-3xl border border-white/10 overflow-hidden mb-8">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-2/5 h-96 relative">
              <img
                src={person.image_url}
                alt={getLocalizedField(person, 'name')}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/60 to-transparent"></div>
            </div>
            <div className="md:w-3/5 p-8 md:p-12">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-4xl font-bold text-white mb-2">
                    {getLocalizedField(person, 'name')}
                  </h1>
                  <p className="text-red-400 text-xl">{getLocalizedField(person, 'position')}</p>
                </div>
                <span className={`px-4 py-2 rounded-full text-sm font-semibold backdrop-blur-md border ${
                  person.status === 'convicted' 
                    ? 'bg-green-500/20 border-green-500/50 text-green-300'
                    : person.status === 'investigated'
                    ? 'bg-yellow-500/20 border-yellow-500/50 text-yellow-300'
                    : 'bg-red-500/20 border-red-500/50 text-red-300'
                }`}>
                  {t.corrupt?.status?.[person.status] || person.status}
                </span>
              </div>

              <p className="text-neutral-300 text-lg mb-8 leading-relaxed">
                {getLocalizedField(person, 'description')}
              </p>

              <div className="grid grid-cols-3 gap-4">
                <div className="backdrop-blur-md bg-white/5 rounded-xl p-4 border border-white/10">
                  <div className="text-sm text-neutral-400 mb-2">{t.corrupt?.totalCases || 'Total Cases'}</div>
                  <div className="text-3xl font-bold text-white">{person.cases_count}</div>
                </div>
                {person.amount_stolen && (
                  <div className="backdrop-blur-md bg-white/5 rounded-xl p-4 border border-white/10">
                    <div className="text-sm text-neutral-400 mb-2">{t.corrupt?.totalStolen || 'Total Stolen'}</div>
                    <div className="text-3xl font-bold text-red-400">
                      {person.amount_stolen >= 1000000000
                        ? `${(person.amount_stolen / 1000000000).toFixed(1)}B`
                        : `${(person.amount_stolen / 1000000).toFixed(1)}M`}
                    </div>
                  </div>
                )}
                <div className="backdrop-blur-md bg-white/5 rounded-xl p-4 border border-white/10">
                  <div className="text-sm text-neutral-400 mb-2">{t.corrupt?.category || 'Category'}</div>
                  <div className="text-lg font-bold text-white capitalize">{person.category}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Cases Timeline */}
        <div className="backdrop-blur-xl bg-white/5 rounded-3xl border border-white/10 p-8">
          <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
            <FileText className="w-8 h-8" />
            {t.corrupt?.casesTitle || 'Corruption Cases'}
          </h2>

          {cases.length === 0 ? (
            <div className="text-center py-12 text-neutral-400">
              {t.corrupt?.noCases || 'No cases documented yet'}
            </div>
          ) : (
            <div className="space-y-6">
              {cases.map((case_, index) => (
                <div 
                  key={case_.id}
                  className="backdrop-blur-md bg-white/5 rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all"
                >
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-white mb-2">
                        {getLocalizedField(case_, 'title')}
                      </h3>
                      <div className="flex flex-wrap gap-4 text-sm text-neutral-400 mb-4">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          {new Date(case_.date).toLocaleDateString(locale)}
                        </div>
                        {case_.amount && (
                          <div className="flex items-center gap-2">
                            <DollarSign className="w-4 h-4" />
                            <span className="text-red-400 font-semibold">
                              {case_.amount >= 1000000000
                                ? `${(case_.amount / 1000000000).toFixed(2)}B MAD`
                                : `${(case_.amount / 1000000).toFixed(2)}M MAD`}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="backdrop-blur-md bg-blue-500/10 border border-blue-500/20 px-4 py-2 rounded-lg">
                      <span className="text-blue-300 font-semibold text-sm">
                        {t.corrupt?.caseNumber || 'Case'} #{index + 1}
                      </span>
                    </div>
                  </div>

                  <p className="text-neutral-300 leading-relaxed mb-6">
                    {getLocalizedField(case_, 'description')}
                  </p>

                  {/* Evidence Gallery */}
                  {case_.evidence_urls && case_.evidence_urls.length > 0 && (
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                        <ImageIcon className="w-5 h-5" />
                        {t.corrupt?.evidence || 'Evidence'}
                      </h4>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {case_.evidence_urls.map((url, idx) => (
                          <button
                            key={idx}
                            onClick={() => setSelectedImage(url)}
                            className="relative h-32 rounded-lg overflow-hidden group border border-white/10 hover:border-white/30 transition-all"
                          >
                            <img
                              src={url}
                              alt={`Evidence ${idx + 1}`}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                            />
                            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                              <ExternalLink className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
