import React from 'react';
import {
  ShieldCheck,
  RefreshCw,
  Sliders,
  Layers,
  CheckCircle2,
} from 'lucide-react';

export const Slide9Takeaways: React.FC = () => {
  const takeaways = [
    {
      icon: ShieldCheck,
      number: '01',
      category: 'Systemic Alignment',
      theme: 'sky',
      iconBg: 'bg-sky-50 text-sky-700 border-sky-200',
      checkColor: 'text-sky-600',
      title: 'From Fragmented Fixes to Systemic Resilience',
      principle:
        'Will synchronize physical structural safety with municipal lifelines and cross-agency governance.',
      points: [
        {
          label: 'Lifeline Interdependence',
          text: 'Will couple building safety with lifeline network reliability.',
        },
        {
          label: 'Multi-Agency Spatial Data',
          text: 'Aims to unify agency operations around a shared risk intelligence platform.',
        },
        {
          label: 'Area-Wide Interventions',
          text: 'Will prioritize district-scale resilience over single-building interventions.',
        },
      ],
    },
    {
      icon: RefreshCw,
      number: '02',
      category: 'Institutional Memory',
      theme: 'emerald',
      iconBg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      checkColor: 'text-emerald-600',
      title: 'Sendai-Aligned Continuous Learning Loop',
      principle:
        'Will unify mitigation, response, and recovery into an unbroken continuum across disaster cycles.',
      points: [
        {
          label: 'Post-Disaster Forensics',
          text: 'Will translate structural damage diagnostics into updated seismic fragility models.',
        },
        {
          label: 'Statutory Build Back Better',
          text: 'Will pre-enact reconstruction bylaws before seismic events strike.',
        },
        {
          label: 'Digital Risk Inventories',
          text: 'Designed to preserve risk knowledge across changing political administrations.',
        },
      ],
    },
    {
      icon: Sliders,
      number: '03',
      category: 'Fiscal Programming',
      theme: 'amber',
      iconBg: 'bg-amber-50 text-amber-700 border-amber-200',
      checkColor: 'text-amber-600',
      title: 'Operational Decision-Support Instruments',
      principle:
        'Will directly translate hazard microzonation and engineering models into municipal capital budgets.',
      points: [
        {
          label: 'Binding Master Plans',
          text: 'Enforces seismic safety limits in 1/25,000 and 1/5,000 spatial master plans and zoning bylaws.',
        },
        {
          label: 'Ex-Ante Risk Reserves',
          text: 'Will direct municipal budgets toward pre-disaster adaptation rather than post-disaster relief.',
        },
        {
          label: 'Appraisal Algorithms',
          text: 'Will employ automated appraisal algorithms to prevent subjective prioritization.',
        },
      ],
    },
    {
      icon: Layers,
      number: '04',
      category: 'Statutory Governance',
      theme: 'purple',
      iconBg: 'bg-purple-50 text-purple-700 border-purple-200',
      checkColor: 'text-purple-600',
      title: 'Statutory Mainstreaming & Civic Cohesion',
      principle:
        'Aims to embed quantitative risk thresholds into legally binding master plans and community networks.',
      points: [
        {
          label: 'Binding Master Plans',
          text: 'Enforces seismic safety limits in 1/25,000 and 1/5,000 spatial master plans and zoning bylaws.',
        },
        {
          label: 'Ex-Ante Risk Reserves',
          text: 'Will pre-allocate municipal contingency reserves instead of relying on post-disaster debt.',
        },
        {
          label: 'Grassroots CBDRM Toolkits',
          text: 'Will empower neighborhood volunteer networks with open-access hazard maps and resources.',
        },
      ],
    },
  ];

  return (
    <div className="w-full h-full flex flex-col justify-between max-w-[115.625rem] mx-auto p-2 @sm:p-4 @lg:p-5 @xl:p-6 overflow-hidden">
      {/* Dynamic Header Section */}
      <div className="shrink-0 mb-3 @sm:mb-4 @lg:mb-6 border-b border-slate-200/80 pb-2 @sm:pb-3 @xl:pb-4">
        <h1 className="text-2xl @sm:text-3xl @lg:text-4xl @xl:text-5xl font-black text-slate-900 tracking-tight leading-tight">
          Synthesis &amp; <span className="text-sky-600">Key Takeaways</span>
        </h1>
        <p className="text-xs @sm:text-sm @lg:text-base @xl:text-lg @2xl:text-xl text-slate-600 mt-1 @sm:mt-1.5 max-w-5xl font-medium">
          A four-pillar framework shifting urban risk management from reactive disaster response to institutionalized municipal resilience.
        </p>
      </div>

      {/* Main 2x2 Grid of Focused, Concise Pillars */}
      <div className="flex-1 grid grid-cols-1 @md:grid-cols-2 gap-3 @sm:gap-4 @lg:gap-5 @xl:gap-6 items-stretch min-h-min pb-4">
        {takeaways.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="bg-white border border-slate-200/90 rounded-2xl p-4 @sm:p-5 @lg:p-5 @xl:p-5 shadow-xs flex flex-col justify-between hover:border-slate-300 hover:shadow-sm transition-all relative overflow-hidden group"
            >
              {/* Top Accent Strip */}
              <div
                className={`absolute top-0 left-0 right-0 h-1.5 ${
                  item.theme === 'sky'
                    ? 'bg-sky-500'
                    : item.theme === 'emerald'
                    ? 'bg-emerald-500'
                    : item.theme === 'amber'
                    ? 'bg-amber-500'
                    : 'bg-purple-500'
                }`}
              />

              <div className="flex flex-col h-full gap-2.5 @sm:gap-3.5 @xl:gap-4">
                {/* Header: Icon + Number & Title */}
                <div>
                  <div className="flex items-center gap-3 @sm:gap-3.5 @xl:gap-4 mb-2 @sm:mb-2.5 @xl:mb-3">
                    <span className={`p-2 @sm:p-2.5 @xl:p-3 rounded-xl border shrink-0 ${item.iconBg}`}>
                      <Icon className="w-5 h-5 @sm:w-6 @sm:h-6 @xl:w-7 @xl:h-7" />
                    </span>
                    <div className="min-w-0">
                      <span className="text-[11px] @sm:text-xs @xl:text-sm font-mono font-bold text-slate-400 uppercase tracking-wider block mb-0.5">
                        Pillar {item.number} · {item.category}
                      </span>
                      <h2 className="text-lg @sm:text-xl @lg:text-2xl @xl:text-2xl @2xl:text-3xl font-black text-slate-900 leading-snug tracking-tight">
                        {item.title}
                      </h2>
                    </div>
                  </div>

                  {/* Concise Principle Statement */}
                  <div className="bg-slate-50 border border-slate-100/90 rounded-xl px-3 @sm:px-3.5 @xl:px-4 py-2 @xl:py-2.5">
                    <p className="text-sm @sm:text-base @lg:text-base @xl:text-lg @2xl:text-xl font-medium text-slate-700 leading-relaxed">
                      {item.principle}
                    </p>
                  </div>
                </div>

                {/* Scannable Bullets Proportionally Distributed on Full Screen */}
                <div className="flex-1 flex flex-col justify-evenly py-1 gap-2 @xl:gap-2">
                  {item.points.map((pt, pIdx) => (
                    <div
                      key={pIdx}
                      className="flex items-start gap-2.5 @sm:gap-3 text-sm @sm:text-base @lg:text-base @xl:text-lg @2xl:text-xl text-slate-700 leading-relaxed"
                    >
                      <CheckCircle2 className={`w-4 h-4 @sm:w-4.5 @sm:h-4.5 @xl:w-5 @xl:h-5 mt-0.5 @xl:mt-1 shrink-0 ${item.checkColor}`} />
                      <p>
                        <strong className="font-bold text-slate-950">{pt.label}:</strong>{' '}
                        <span>{pt.text}</span>
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Slide Footer Citation */}
      <div className="mt-2 @sm:mt-3 pt-2 @sm:pt-2.5 border-t border-slate-200/80 flex flex-col @sm:flex-row items-center justify-between text-xs @sm:text-sm text-slate-500 shrink-0 gap-1">
        <span className="font-semibold text-slate-700">
          Bektaş, Uzun, Gerçek, Hızal, &amp; Aktaş (2025)
        </span>
        <span className="font-mono text-slate-500 text-xs @sm:text-sm">
          A City-Scale Integrated Earthquake Risk Management Framework · Synthesis &amp; Takeaways
        </span>
      </div>
    </div>
  );
};

