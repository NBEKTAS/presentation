import React from 'react';
import { Shield, Globe2, Building, Activity } from 'lucide-react';

export const Slide5NestedNexus: React.FC = () => {
  const tiers = [
    {
      id: 1,
      name: 'Tier 1: Disaster Risk Reduction Core',
      role: 'Municipal Operational Execution',
      color: 'border-emerald-500 bg-emerald-50/60',
      tagColor: 'bg-emerald-100 text-emerald-800 border border-emerald-200',
      icon: Shield,
      points: [
        'Enforced building code compliance & soft-story column retrofitting',
        'GIS common operational picture & rapid automated early warning',
        'Statutory post-disaster Build Back Better spatial reconstruction plans',
      ],
    },
    {
      id: 2,
      name: 'Tier 2: Sendai Framework 2015–2030',
      role: 'International Policy Coherence',
      color: 'border-purple-500 bg-purple-50/60',
      tagColor: 'bg-purple-100 text-purple-800 border border-purple-200',
      icon: Globe2,
      points: [
        'Sendai Priorities 1–4 & global Targets A–G vertical alignment',
        'İzmir Provincial Disaster Risk Reduction Plan (İRAP) harmonization',
        'Statutory 5% ex-ante capital allocation for urban disaster resilience',
      ],
    },
    {
      id: 3,
      name: 'Tier 3: Urban Systems & Societal Well-being',
      role: 'Exposed Metropolitan Infrastructure',
      color: 'border-amber-500 bg-amber-50/60',
      tagColor: 'bg-amber-100 text-amber-800 border border-amber-200',
      icon: Building,
      points: [
        'Metropolitan housing stock, commercial trade, and port logistics',
        'Critical lifelines redundancy (potable water, power grid, natural gas)',
        'Social safety nets, vulnerable demographics, and medical facilities',
      ],
    },
    {
      id: 4,
      name: 'Tier 4: Earthquake Disaster Shock',
      role: 'Regional Hazard Forcing',
      color: 'border-sky-500 bg-sky-50/60',
      tagColor: 'bg-sky-100 text-sky-800 border border-sky-200',
      icon: Activity,
      points: [
        '17 local active onshore/offshore faults & Hellenic Arc subduction ruptures',
        'Alluvial basin shear-wave resonance amplification (Bayraklı / Konak)',
        'Secondary hazard triggers: coastal liquefaction and tsunami inundation',
      ],
    },
  ];

  return (
    <div className="w-full h-full min-h-0 flex flex-col justify-between max-w-[1600px] mx-auto">
      {/* Slide Heading */}
      <div className="mb-3 lg:mb-4 shrink-0">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
          Nested Nexus <span className="text-sky-600">Architecture Model</span>
        </h1>
        <p className="text-xs sm:text-sm lg:text-base text-slate-500 mt-1">
          A four-tier concentric system nesting municipal operations inside international policy, urban systems, and regional seismotectonics.
        </p>
      </div>

      {/* Main Presentation Card */}
      <div className="flex-1 min-h-0 w-full bg-white rounded-2xl border border-slate-200 p-4 sm:p-6 lg:p-8 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center overflow-hidden">
        {/* Left Column: Concentric Circles Diagram (5 cols) */}
        <div className="lg:col-span-5 h-full flex flex-col items-center justify-center p-2">
          <svg viewBox="0 0 520 480" className="w-full h-full max-h-[440px] xl:max-h-[540px] overflow-visible">
            {/* Tier 4: Earthquake Shock (Outermost) */}
            <circle
              cx="235"
              cy="240"
              r="220"
              fill="#0284c7"
              fillOpacity="0.10"
              stroke="#0284c7"
              strokeWidth="3"
            />

            {/* Tier 3: Urban Systems (Third ring) */}
            <circle
              cx="190"
              cy="240"
              r="172"
              fill="#d97706"
              fillOpacity="0.12"
              stroke="#d97706"
              strokeWidth="3"
            />

            {/* Tier 2: Sendai Framework (Second ring) */}
            <circle
              cx="145"
              cy="240"
              r="124"
              fill="#7c3aed"
              fillOpacity="0.14"
              stroke="#7c3aed"
              strokeWidth="3"
            />

            {/* Tier 1: DRR Core (Innermost) */}
            <circle
              cx="95"
              cy="240"
              r="74"
              fill="#059669"
              fillOpacity="0.22"
              stroke="#059669"
              strokeWidth="3.5"
            />

            <defs>
              <filter id="badgeShadow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#0f172a" floodOpacity="0.08" />
              </filter>
            </defs>

            {/* Staggered Non-Overlapping Tier Badges */}
            <g className="pointer-events-none select-none font-sans">
              {/* Tier 1: DRR Core (Centered in Green Circle at x=95, y=240) */}
              <g transform="translate(95, 240)" textAnchor="middle" filter="url(#badgeShadow)">
                <rect
                  x="-52"
                  y="-22"
                  width="104"
                  height="44"
                  rx="8"
                  fill="#ffffff"
                  fillOpacity="0.94"
                  stroke="#059669"
                  strokeWidth="1.8"
                />
                <text y="-4" fill="#065f46" fontSize="13" fontWeight="800" letterSpacing="-0.01em">
                  DRR Core
                </text>
                <text y="13" fill="#047857" fontSize="9.5" fontWeight="600">
                  Tier 1 · Operations
                </text>
              </g>

              {/* Tier 2: Sendai 2015–30 (Staggered Upper-Right at x=200, y=175) */}
              <g transform="translate(200, 175)" textAnchor="middle" filter="url(#badgeShadow)">
                <rect
                  x="-58"
                  y="-22"
                  width="116"
                  height="44"
                  rx="8"
                  fill="#ffffff"
                  fillOpacity="0.94"
                  stroke="#7c3aed"
                  strokeWidth="1.8"
                />
                <text y="-4" fill="#581c87" fontSize="12" fontWeight="800" letterSpacing="-0.01em">
                  Sendai 2015–30
                </text>
                <text y="13" fill="#7c3aed" fontSize="9.5" fontWeight="600">
                  Tier 2 · Policy
                </text>
              </g>

              {/* Tier 3: Urban Systems (Staggered Lower-Right at x=295, y=305) */}
              <g transform="translate(295, 305)" textAnchor="middle" filter="url(#badgeShadow)">
                <rect
                  x="-58"
                  y="-22"
                  width="116"
                  height="44"
                  rx="8"
                  fill="#ffffff"
                  fillOpacity="0.94"
                  stroke="#d97706"
                  strokeWidth="1.8"
                />
                <text y="-4" fill="#92400e" fontSize="12" fontWeight="800" letterSpacing="-0.01em">
                  Urban Systems
                </text>
                <text y="13" fill="#b45309" fontSize="9.5" fontWeight="600">
                  Tier 3 · Exposure
                </text>
              </g>

              {/* Tier 4: Hazard Shock (Staggered Upper-Right at x=390, y=175) */}
              <g transform="translate(390, 175)" textAnchor="middle" filter="url(#badgeShadow)">
                <rect
                  x="-58"
                  y="-22"
                  width="116"
                  height="44"
                  rx="8"
                  fill="#ffffff"
                  fillOpacity="0.94"
                  stroke="#0284c7"
                  strokeWidth="1.8"
                />
                <text y="-4" fill="#075985" fontSize="12" fontWeight="800" letterSpacing="-0.01em">
                  Hazard Shock
                </text>
                <text y="13" fill="#0284c7" fontSize="9.5" fontWeight="600">
                  Tier 4 · Seismotectonics
                </text>
              </g>
            </g>
          </svg>
        </div>

        {/* Right Column: The 4 Structural Tiers (7 cols) */}
        <div className="lg:col-span-7 h-full flex flex-col justify-between gap-3 lg:gap-4 py-1">
          {tiers.map((tier) => (
            <div
              key={tier.id}
              className={`flex-1 p-3.5 sm:p-4 lg:p-5 rounded-xl border ${tier.color} shadow-2xs flex flex-col justify-center`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2.5">
                  <tier.icon className="w-4 h-4 sm:w-5 sm:h-5 text-slate-800 shrink-0" />
                  <h3 className="font-bold text-sm sm:text-base lg:text-lg text-slate-900">
                    {tier.name}
                  </h3>
                </div>
                <span className={`text-[11px] sm:text-xs lg:text-sm px-2.5 py-0.5 rounded-full font-bold ${tier.tagColor}`}>
                  {tier.role}
                </span>
              </div>
              <ul className="space-y-1 sm:space-y-1.5 text-xs sm:text-sm lg:text-[15px] text-slate-700">
                {tier.points.map((pt, pIdx) => (
                  <li key={pIdx} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400 shrink-0 mt-1.5" />
                    <span className="leading-snug">{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
