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
      <div className="flex-1 min-h-0 w-full bg-white rounded-2xl border border-slate-200 p-4 sm:p-6 lg:p-8 shadow-sm relative flex items-center justify-center overflow-y-auto">
        {/* Dynamic Responsive Curved Connecting Arcs */}
        <div className="absolute inset-0 w-full h-full pointer-events-none hidden md:block z-0">
          {/* 1 -> 2 (Top to Right) */}
          <div className="absolute top-[20%] left-[50%] w-[32%] h-[30%] border-t-[3px] border-r-[3px] border-dashed border-blue-600 rounded-tr-[3rem] animate-pulse" />
          <div className="absolute top-[50%] right-[16.5%] -mt-1.5 w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-l-[10px] border-l-blue-600 rotate-90" />
          
          {/* 2 -> 3 (Right to Bottom) */}
          <div className="absolute top-[50%] left-[50%] w-[32%] h-[30%] border-b-[3px] border-r-[3px] border-dashed border-amber-600 rounded-br-[3rem] animate-pulse" />
          <div className="absolute bottom-[18.5%] left-[50%] -ml-1.5 w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-r-[10px] border-r-amber-600 rotate-90" />

          {/* 3 -> 4 (Bottom to Left) */}
          <div className="absolute top-[50%] right-[50%] w-[32%] h-[30%] border-b-[3px] border-l-[3px] border-dashed border-emerald-600 rounded-bl-[3rem] animate-pulse" />
          <div className="absolute top-[50%] left-[16.5%] -mt-1.5 w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-r-[10px] border-r-emerald-600 -rotate-90" />

          {/* 4 -> 1 (Left to Top) */}
          <div className="absolute top-[20%] right-[50%] w-[32%] h-[30%] border-t-[3px] border-l-[3px] border-dashed border-purple-600 rounded-tl-[3rem] animate-pulse" />
          <div className="absolute top-[18.5%] left-[50%] -ml-1.5 w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-l-[10px] border-l-purple-600 -rotate-90" />
        </div>

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
