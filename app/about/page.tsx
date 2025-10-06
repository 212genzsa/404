'use client';

import { ArrowLeft, Users, Target, Heart, Megaphone, BookOpen, Shield, Globe } from 'lucide-react';
import { useState } from 'react';

export default function AboutPage() {
  const [locale] = useState<'en'>('en');

  const content: Record<string, any> = {
    en: {
      backButton: "Back to Home",
      hero: {
        title: "Who We Are",
        subtitle: "A movement of young Moroccans fighting for justice, dignity, and a better future"
      },
      mission: {
        title: "Our Mission",
        description: "GenZ212 Morocco is a grassroots movement of young activists committed to transforming Morocco through justice, quality education, and accessible healthcare for all citizens. We believe that every Moroccan deserves dignity, opportunity, and a voice in shaping our nation's future."
      },
      values: [
        {
          icon: "Shield",
          title: "Justice for All",
          description: "Fighting corruption and inequality. We demand accountability and transparency from those in power."
        },
        {
          icon: "BookOpen",
          title: "Quality Education",
          description: "Every child deserves access to excellent education regardless of their background or location."
        },
        {
          icon: "Heart",
          title: "Universal Healthcare",
          description: "Healthcare is a right, not a privilege. We advocate for accessible, quality medical care for every Moroccan."
        },
        {
          icon: "Megaphone",
          title: "Youth Empowerment",
          description: "Amplifying young voices and creating platforms for meaningful participation in civic life."
        }
      ],
      story: {
        title: "Our Story",
        content: "Born from the frustrations and hopes of Morocco's youth, GenZ212 emerged as a powerful force for change. We are students, workers, artists, and dreamers united by a common vision: a Morocco where justice prevails, where education opens doors, and where healthcare protects every citizen. Through peaceful protests, community organizing, and digital activism, we're building the Morocco we deserve."
      },
      community: {
        title: "Our Growing Community",
        stats: [
          { number: "200K+", label: "Instagram Activists" },
          { number: "200K+", label: "Discord Members" },
          { number: "300K+", label: "Facebook Followers" },
          { number: "25K+", label: "Daily Active Members" }
        ]
      },
      join: {
        title: "Join the Movement",
        description: "Whether you're organizing in your community, spreading awareness online, or contributing ideas, there's a place for you in GenZ212. Together, we are the change Morocco needs.",
        cta: "Get Involved Today"
      }
    }
  };

  const t = content[locale];

  const iconMap = {
    Shield: Shield,
    BookOpen: BookOpen,
    Heart: Heart,
    Megaphone: Megaphone
  };

  return (
    <div className="min-h-screen relative overflow-hidden font-sans bg-black">
      {/* Background */}
      <div className="fixed inset-0 z-0" style={{ backgroundImage: 'url(/background.webp)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="absolute inset-0 bg-black/85"></div>
      </div>

      <div className="relative z-10">
        {/* Back Button */}
        <div className="max-w-6xl mx-auto px-4 pt-8">
          <a href="/" className="inline-flex items-center gap-2 text-white hover:text-neutral-300 transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm font-medium">{t.backButton}</span>
          </a>
        </div>

        {/* Hero Section */}
        <div className="max-w-6xl mx-auto px-4 py-16">
          <div className="text-center mb-16">
            <div className="inline-block backdrop-blur-lg bg-white/10 p-5 rounded-2xl mb-6 border border-white/20">
              <Users className="w-16 h-16 text-white" />
            </div>
            <h1 className="text-5xl font-bold text-white mb-4">{t.hero.title}</h1>
            <p className="text-xl text-neutral-300 max-w-3xl mx-auto">{t.hero.subtitle}</p>
          </div>

          {/* Mission Statement */}
          <div className="backdrop-blur-2xl bg-white/5 rounded-3xl border border-white/10 shadow-2xl p-8 md:p-12 mb-12">
            <div className="flex items-start gap-4 mb-6">
              <div className="backdrop-blur-lg bg-white/10 p-3 rounded-xl border border-white/20">
                <Target className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white mb-4">{t.mission.title}</h2>
                <p className="text-lg text-neutral-300 leading-relaxed">{t.mission.description}</p>
              </div>
            </div>
          </div>

          {/* Core Values */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {t.values.map((value: any, index: number) => {
              const Icon = iconMap[value.icon as keyof typeof iconMap];
              return (
                <div key={index} className="backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10 p-8 hover:bg-white/10 transition-all duration-300">
                  <div className="backdrop-blur-lg bg-white/10 p-3 rounded-xl mb-4 inline-block border border-white/20">
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">{value.title}</h3>
                  <p className="text-neutral-300 leading-relaxed">{value.description}</p>
                </div>
              );
            })}
          </div>

          {/* Our Story */}
          <div className="backdrop-blur-2xl bg-white/5 rounded-3xl border border-white/10 shadow-2xl p-8 md:p-12 mb-12">
            <h2 className="text-3xl font-bold text-white mb-6">{t.story.title}</h2>
            <p className="text-lg text-neutral-300 leading-relaxed">{t.story.content}</p>
          </div>

          {/* Community Stats */}
          <div className="backdrop-blur-2xl bg-white/5 rounded-3xl border border-white/10 shadow-2xl p-8 md:p-12 mb-12">
            <div className="flex items-center gap-3 mb-8 justify-center">
              <Globe className="w-8 h-8 text-white" />
              <h2 className="text-3xl font-bold text-white">{t.community.title}</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {t.community.stats.map((stat: any, index: number) => (
                <div key={index} className="text-center backdrop-blur-lg bg-white/5 rounded-2xl p-6 border border-white/10">
                  <div className="text-4xl font-bold text-white mb-2">{stat.number}</div>
                  <div className="text-neutral-400 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Join CTA */}
          <div className="backdrop-blur-2xl bg-gradient-to-br from-white/10 to-white/5 rounded-3xl border border-white/20 shadow-2xl p-8 md:p-12 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">{t.join.title}</h2>
            <p className="text-lg text-neutral-300 mb-8 max-w-2xl mx-auto">{t.join.description}</p>
            <a 
              href="mailto:contact@genz212.ma"
              className="inline-flex items-center gap-2 backdrop-blur-md bg-white hover:bg-white/90 text-black font-semibold px-8 py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl text-lg"
            >
              {t.join.cta}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
