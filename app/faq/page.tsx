
// app/faq/page.tsx
'use client';

import { ArrowLeft, HelpCircle } from 'lucide-react';
import Link from 'next/link';

export default function FAQPage() {
  return (
    <div className="min-h-screen relative overflow-hidden font-sans bg-black">
      <div className="fixed inset-0 z-0" style={{ backgroundImage: 'url(/background.webp)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="absolute inset-0 bg-black/85"></div>
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="max-w-2xl w-full">
          <Link href="/" className="inline-flex items-center gap-2 text-white hover:text-neutral-300 transition-colors mb-8">
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm font-medium">Back to Home</span>
          </Link>

          <div className="backdrop-blur-2xl bg-white/5 rounded-3xl border border-white/10 shadow-2xl p-12 text-center">
            <div className="w-24 h-24 mx-auto bg-white/10 rounded-full flex items-center justify-center mb-6 border border-white/20">
              <HelpCircle className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-white mb-4">FAQ</h1>
            <p className="text-xl text-neutral-300 mb-8">This page is under construction</p>
            <div className="inline-block">
              <div className="flex gap-2">
                <div className="w-3 h-3 bg-white/40 rounded-full animate-pulse"></div>
                <div className="w-3 h-3 bg-white/40 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-3 h-3 bg-white/40 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}