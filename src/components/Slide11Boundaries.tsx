import React from 'react';
import { Target, AlertCircle, Globe2, CheckCircle2 } from 'lucide-react';

export const Slide11Boundaries: React.FC = () => {
  const pillars = [
    {
      icon: Target,
      title: 'Primary Contribution',
      subtitle: 'Bridging Seismology & Governance',
      theme: 'sky',
      accentColor: 'bg-sky-500',
      iconBg: 'bg-sky-50 text-sky-700 border-sky-200',
      checkColor: 'text-sky-600',
      intro:
        'Aims to bridge the divide between technical ground-motion models and municipal capital budgeting.',
      points: [
        {
          label: 'Operational 9-Cell Matrix',
          text: 'Will convert ground acceleration into statutory risk registers and CapEx votes.',
        },
        {
          label: 'Departmental Ownership',
          text: 'Will establish workflows across water, transport, health, and housing agencies.',
        },
        {
          label: 'Ex-Ante Resourcing',
          text: 'Designed to shift municipal policy to institutionalized, pre-allocated resilience budgets.',
        },
      ],
    },
    {
      icon: AlertCircle,
      title: 'Contextual Baseline',
      subtitle: 'Empirical Scope & Boundaries',
      theme: 'amber',
      accentColor: 'bg-amber-500',
      iconBg: 'bg-amber-50 text-amber-700 border-amber-200',
      checkColor: 'text-amber-600',
      intro:
        'Grounded in İzmir\'s active graben tectonics, with defined methodological and empirical limits.',
      points: [
        {
          label: 'Metropolitan Testbed',
          text: 'To be calibrated for İzmir\'s active faults, basin amplification, and concrete housing.',
        },
        {
          label: 'Longitudinal Validation',
          text: 'Theoretical loss reductions will require empirical verification against future events.',
        },
        {
          label: 'Fiscal Boundaries',
          text: 'Velocity will be constrained by municipal debt ceilings and sovereign borrowing limits.',
        },
      ],
    },
    {
      icon: Globe2,
      title: 'Transferability & Horizons',
      subtitle: 'Mediterranean Generalizability',
      theme: 'emerald',
      accentColor: 'bg-emerald-500',
      iconBg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      checkColor: 'text-emerald-600',
      intro:
        'Exportable modular architecture for seismically active metropolitan centers worldwide.',
      points: [
        {
          label: 'Regional Archetypes',
          text: 'Applicable to Athens, Thessaloniki, Naples, Catania, and the Marmara corridor.',
        },
        {
          label: 'Standardized Toolkit',
          text: 'The 4-tier nexus provides an open governance standard for active cities.',
        },
        {
          label: 'Multi-Hazard Horizons',
          text: 'Future extensions encompass cascading hazards like liquefaction and tsunamis.',
        },
      ],
    },
  ];

  return (
    <div className="w-full h-full min-h-0 flex flex-col justify-between max-w-[115.625rem] mx-auto p-2 sm:p-4 lg:p-5 xl:p-6 overflow-hidden">
      {/* Slide Header */}
      <div className="mb-2 sm:mb-3 lg:mb-4 shrink-0 border-b border-slate-200/80 pb-2 sm:pb-3 xl:pb-4">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-black text-slate-900 tracking-tight leading-tight">
          Contribution &amp; <span className="text-sky-600">Evidence Boundaries</span>
        </h1>
        <p className="text-xs sm:text-sm lg:text-base xl:text-lg 2xl:text-xl text-slate-600 mt-1 sm:mt-1.5 max-w-5xl font-medium">
          Framing core research innovations, empirical validation parameters, and cross-metropolitan transferability.
        </p>
      </div>

      {/* Main Container - 3 Balanced Pillars */}
      <div className="flex-1 min-h-0 grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 lg:gap-5 xl:gap-6 items-stretch">
        {pillars.map((pillar, idx) => {
          const Icon = pillar.icon;
          return (
            <div
              key={idx}
              className="bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-5 lg:p-6 xl:p-7 shadow-xs flex flex-col justify-between hover:border-slate-300 hover:shadow-sm transition-all relative overflow-hidden group"
            >
              {/* Top Accent Strip */}
              <div className={`absolute top-0 left-0 right-0 h-1.5 ${pillar.accentColor}`} />

              <div className="flex flex-col h-full gap-2.5 sm:gap-3.5 xl:gap-4">
                {/* Header: Icon + Title & Subtitle */}
                <div>
                  <div className="flex items-center gap-3 sm:gap-3.5 xl:gap-4 mb-2 sm:mb-2.5 xl:mb-3">
                    <span className={`p-2 sm:p-2.5 xl:p-3 rounded-xl border shrink-0 ${pillar.iconBg}`}>
                      <Icon className="w-5 h-5 sm:w-6 sm:h-6 xl:w-7 xl:h-7" />
                    </span>
                    <div className="min-w-0">
                      <span className="text-[11px] sm:text-xs xl:text-sm font-mono font-bold text-slate-400 uppercase tracking-wider block mb-0.5">
                        {pillar.subtitle}
                      </span>
                      <h2 className="text-base sm:text-lg lg:text-xl xl:text-2xl 2xl:text-[1.65rem] font-black text-slate-900 leading-snug tracking-tight">
                        {pillar.title}
                      </h2>
                    </div>
                  </div>

                  {/* Concise Overview Statement */}
                  <div className="bg-slate-50 border border-slate-100/90 rounded-xl px-3 sm:px-3.5 xl:px-4 py-2 xl:py-2.5">
                    <p className="text-sm sm:text-base lg:text-lg xl:text-xl 2xl:text-2xl font-medium text-slate-700 leading-relaxed">
                      {pillar.intro}
                    </p>
                  </div>
                </div>

                {/* Scannable Bullets Proportionally Distributed on Full Screen */}
                <div className="flex-1 flex flex-col justify-evenly py-1 gap-2 xl:gap-3">
                  {pillar.points.map((pt, pIdx) => (
                    <div
                      key={pIdx}
                      className="bg-slate-50/70 hover:bg-slate-50 border border-slate-100/90 rounded-xl p-3 sm:p-3.5 xl:p-4.5 transition-colors flex items-start gap-2.5 sm:gap-3"
                    >
                      <CheckCircle2
                        className={`w-4 h-4 sm:w-4.5 sm:h-4.5 xl:w-5 xl:h-5 mt-0.5 xl:mt-1 shrink-0 ${pillar.checkColor}`}
                      />
                      <div className="text-sm sm:text-base lg:text-lg xl:text-xl 2xl:text-2xl text-slate-700 leading-relaxed">
                        <strong className="font-bold text-slate-950 block mb-0.5">
                          {pt.label}
                        </strong>
                        <span>{pt.text}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Slide Footer Citation */}
      <div className="mt-2 sm:mt-3 pt-2 sm:pt-2.5 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between text-xs sm:text-sm text-slate-500 shrink-0 gap-1">
        <span className="font-semibold text-slate-700">
          Bektaş, Uzun, Gerçek, Hızal, &amp; Aktaş (2025)
        </span>
        <span className="font-mono text-slate-500 text-xs sm:text-sm">
          Methodological Transparency · Empirical Scope · Cross-Metropolitan Scalability
        </span>
      </div>
    </div>
  );
};
