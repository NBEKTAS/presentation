import React from 'react';

export const Slide4LearningCycle: React.FC = () => {
  return (
    <div className="w-full h-full min-h-0 flex flex-col justify-between max-w-[100rem] mx-auto">
      {/* Slide Heading */}
      <div className="mb-3 lg:mb-4 shrink-0">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
          Sendai Closed-Loop <span className="text-sky-600">Learning Cycle</span>
        </h1>
        <p className="text-xs sm:text-sm lg:text-base text-slate-500 mt-1">
          Translating the global Sendai Framework into a closed-loop municipal learning and decision cycle.
        </p>
      </div>

      {/* Main Presentation Card */}
      <div className="flex-1 min-h-0 w-full bg-white rounded-2xl border border-slate-200 p-4 sm:p-6 lg:p-8 shadow-sm relative flex items-center justify-center overflow-hidden">
        {/* Animated Curved Connecting Arcs */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none hidden md:block"
          viewBox="0 0 1000 600"
          preserveAspectRatio="xMidYMid meet"
          aria-hidden="true"
        >
          <defs>
            <marker id="arr-blue" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto">
              <polygon points="0 0, 10 5, 0 10" fill="#2563eb" />
            </marker>
            <marker id="arr-amber" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto">
              <polygon points="0 0, 10 5, 0 10" fill="#d97706" />
            </marker>
            <marker id="arr-emerald" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto">
              <polygon points="0 0, 10 5, 0 10" fill="#059669" />
            </marker>
            <marker id="arr-purple" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto">
              <polygon points="0 0, 10 5, 0 10" fill="#7c3aed" />
            </marker>
          </defs>

          {/* 1 -> 2 (Top to Right) */}
          <path
            d="M 610 200 C 690 200, 720 230, 720 260"
            fill="none"
            stroke="#2563eb"
            strokeWidth="3"
            strokeDasharray="6 6"
            markerEnd="url(#arr-blue)"
          />
          {/* 2 -> 3 (Right to Bottom) */}
          <path
            d="M 720 370 C 720 400, 690 430, 610 430"
            fill="none"
            stroke="#d97706"
            strokeWidth="3"
            strokeDasharray="6 6"
            markerEnd="url(#arr-amber)"
          />
          {/* 3 -> 4 (Bottom to Left) */}
          <path
            d="M 390 430 C 310 430, 280 400, 280 370"
            fill="none"
            stroke="#059669"
            strokeWidth="3"
            strokeDasharray="6 6"
            markerEnd="url(#arr-emerald)"
          />
          {/* 4 -> 1 (Left to Top) */}
          <path
            d="M 280 260 C 280 230, 310 200, 390 200"
            fill="none"
            stroke="#7c3aed"
            strokeWidth="3"
            strokeDasharray="6 6"
            markerEnd="url(#arr-purple)"
          />
        </svg>

        {/* 3x3 Grid Layout of the Cycle */}
        <div className="w-full max-w-6xl h-full flex flex-col justify-between py-2 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-8 items-center flex-1">
            {/* Left Column: Priority 4 */}
            <div className="flex justify-center h-full items-center">
              <div className="w-full max-w-md bg-white rounded-2xl border-2 border-purple-200 p-5 lg:p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-extrabold text-base sm:text-lg lg:text-xl text-purple-700">
                    4. Preparedness &amp; BBB
                  </h3>
                  <span className="text-xs lg:text-sm px-3 py-1 rounded-full bg-purple-100 text-purple-800 font-bold">
                    Priority 4
                  </span>
                </div>
                <ul className="space-y-2 text-xs sm:text-sm lg:text-[15px] text-slate-700">
                  <li className="flex items-start gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-purple-500 shrink-0 mt-1.5" />
                    <span>Robust Emergency Response Protocols</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-purple-500 shrink-0 mt-1.5" />
                    <span>Multi-channel Early Warning Networks</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-purple-500 shrink-0 mt-1.5" />
                    <span>INSARAG Search &amp; Rescue Depots</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-purple-500 shrink-0 mt-1.5" />
                    <span>Resilient Build Back Better Spatial Plans</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Center Column: Top P1, Center Integration Core, Bottom P3 */}
            <div className="flex flex-col items-center justify-between h-full gap-4 lg:gap-6">
              {/* Top: Priority 1 */}
              <div className="w-full max-w-md bg-white rounded-2xl border-2 border-blue-200 p-5 lg:p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-extrabold text-base sm:text-lg lg:text-xl text-blue-700">
                    1. Understanding Risk
                  </h3>
                  <span className="text-xs lg:text-sm px-3 py-1 rounded-full bg-blue-100 text-blue-800 font-bold">
                    Priority 1
                  </span>
                </div>
                <ul className="space-y-2 text-xs sm:text-sm lg:text-[15px] text-slate-700">
                  <li className="flex items-start gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-blue-500 shrink-0 mt-1.5" />
                    <span>Probabilistic Hazard Assessment (PSHA)</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-blue-500 shrink-0 mt-1.5" />
                    <span>Multi-scale Exposure Mapping</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-blue-500 shrink-0 mt-1.5" />
                    <span>Vulnerability &amp; Fragility Modeling</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-blue-500 shrink-0 mt-1.5" />
                    <span>Transparent Risk Portals &amp; Communication</span>
                  </li>
                </ul>
              </div>

              {/* Center: City-Scale Operational Integration Core */}
              <div className="w-full max-w-md bg-white rounded-2xl border-2 border-slate-900 p-4 lg:p-5 shadow-md text-slate-900">
                <div className="flex items-center gap-2.5 pb-2.5 mb-2.5 border-b border-slate-200">
                  <svg className="w-5 h-5 text-sky-600 animate-spin-slow shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  <h4 className="font-extrabold text-sm sm:text-base lg:text-lg text-slate-900">
                    City-Scale Operational Core
                  </h4>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs sm:text-sm lg:text-[14px] text-slate-800 font-medium">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-sky-500 shrink-0" />
                    <span>GIS Digital Twin</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0" />
                    <span>Ex-Ante Budgets</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                    <span>Resilience Scorecards</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-purple-500 shrink-0" />
                    <span>Adaptive Feedback</span>
                  </div>
                </div>
              </div>

              {/* Bottom: Priority 3 */}
              <div className="w-full max-w-md bg-white rounded-2xl border-2 border-emerald-200 p-5 lg:p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-extrabold text-base sm:text-lg lg:text-xl text-emerald-700">
                    3. Resilience Investment
                  </h3>
                  <span className="text-xs lg:text-sm px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 font-bold">
                    Priority 3
                  </span>
                </div>
                <ul className="space-y-2 text-xs sm:text-sm lg:text-[15px] text-slate-700">
                  <li className="flex items-start gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0 mt-1.5" />
                    <span>Targeted Structural Building Retrofits</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0 mt-1.5" />
                    <span>Lifeline &amp; Aqueduct Hardening</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0 mt-1.5" />
                    <span>Catastrophe Insurance &amp; Reserve Funds</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0 mt-1.5" />
                    <span>Statutory Spatial Zoning Clearance</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Right Column: Priority 2 */}
            <div className="flex justify-center h-full items-center">
              <div className="w-full max-w-md bg-white rounded-2xl border-2 border-amber-200 p-5 lg:p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-extrabold text-base sm:text-lg lg:text-xl text-amber-700">
                    2. Risk Governance
                  </h3>
                  <span className="text-xs lg:text-sm px-3 py-1 rounded-full bg-amber-100 text-amber-800 font-bold">
                    Priority 2
                  </span>
                </div>
                <ul className="space-y-2 text-xs sm:text-sm lg:text-[15px] text-slate-700">
                  <li className="flex items-start gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0 mt-1.5" />
                    <span>Clear Institutional Legal Mandates</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0 mt-1.5" />
                    <span>Strict Seismic Regulatory Enforcement</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0 mt-1.5" />
                    <span>Cross-Agency Multi-Sector Working Groups</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0 mt-1.5" />
                    <span>Sustained Cross-Electoral Commitment</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
