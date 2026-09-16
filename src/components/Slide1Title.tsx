import React from 'react';
import { Mail } from 'lucide-react';

export const Slide1Title: React.FC = () => {
  return (
    <div className="w-full h-full min-h-0 flex flex-col justify-center items-center max-w-[87.5rem] mx-auto py-2 px-4 @sm:px-8">
      <div className="w-full bg-white rounded-3xl border border-slate-200 p-8 @sm:p-14 @lg:p-16 shadow-xl relative overflow-hidden flex flex-col justify-center">
        {/* Subtle accent bar */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-sky-600 via-emerald-600 to-amber-500" />

        {/* Paper / Presentation Title */}
        <h1 className="text-3xl @sm:text-4xl @md:text-5xl @lg:text-[3.25rem] font-black text-slate-900 text-center leading-tight tracking-tight mb-8 max-w-5xl mx-auto">
          A City-Scale Integrated Earthquake Risk Management Framework for Enhancing Urban Resilience
        </h1>

        {/* Authors */}
        <div className="text-center mb-8">
          <p className="text-base @sm:text-lg @lg:text-xl text-slate-800 font-semibold leading-relaxed">
            <strong className="text-sky-600 font-extrabold">Nurullah BEKTAŞ</strong>¹ · Ertuğrul Türker UZUN² · Deniz GERÇEK³ · Çağlayan HIZAL⁴ · Engin AKTAŞ⁵
          </p>
        </div>

        {/* Affiliations */}
        <div className="text-xs @sm:text-sm @lg:text-base text-slate-600 text-center leading-relaxed space-y-2 mb-8 border-y border-slate-100 py-6 max-w-4xl mx-auto font-sans">
          <p>
            <sup className="font-bold text-sky-700">1</sup> Dept. of Structural Engineering &amp; Geotechnics, Széchenyi István University, Győr, Hungary
          </p>
          <p>
            <sup className="font-bold text-sky-700">2</sup> Dept. of Civil Engineering, İzmir Kâtip Çelebi University, İzmir, Türkiye
          </p>
          <p>
            <sup className="font-bold text-sky-700">3</sup> Dept. of City and Regional Planning, İzmir Institute of Technology (İZTECH), İzmir, Türkiye
          </p>
          <p>
            <sup className="font-bold text-sky-700">4</sup> Dept. of Civil Engineering, Ege University, İzmir, Türkiye
          </p>
          <p>
            <sup className="font-bold text-sky-700">5</sup> Dept. of Civil Engineering, İzmir Institute of Technology (İZTECH), İzmir, Türkiye
          </p>
        </div>

        {/* Contact Email */}
        <div className="flex items-center justify-center text-sm font-mono">
          <a
            href="mailto:bektas.nurullah@sze.hu"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100 transition-colors font-semibold text-sm @lg:text-base shadow-xs"
          >
            <Mail className="w-4 h-4" />
            bektas.nurullah@sze.hu
          </a>
        </div>
      </div>
    </div>
  );
};
