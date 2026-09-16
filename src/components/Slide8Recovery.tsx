import React from 'react';

export const Slide8Recovery: React.FC = () => {
  return (
    <div className="w-full h-full flex flex-col max-w-[100rem] mx-auto p-1 sm:p-3 lg:p-4 justify-between overflow-y-auto">
      {/* Slide Header */}
      <div className="shrink-0 mb-1 sm:mb-2">
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-slate-900 tracking-tight">
          Operational Cycle of the Integrated Resilience Framework for İzmir
        </h1>
        <p className="text-base sm:text-lg lg:text-xl xl:text-2xl xl:text-xl text-slate-500">
          Continuous closed-loop cycle connecting pre-disaster mitigation, event disturbance response, and adaptive recovery.
        </p>
      </div>

      {/* Main Diagram Canvas - Proportional flex container filling the slide height */}
      <div className="flex-1 bg-white rounded-2xl border border-slate-200/90 p-3 sm:p-4 lg:p-5 shadow-xs flex flex-col justify-between overflow-visible gap-4 sm:gap-6 min-h-min mb-4">
        
        {/* ========================================================= */}
        {/* 1. PRE-DISASTER PHASE (GREEN) */}
        {/* ========================================================= */}
        <div className="relative border-2 border-emerald-700 rounded-xl p-2.5 sm:p-3.5 lg:p-4 pt-3.5 sm:pt-4 bg-emerald-50/25 flex-1 min-h-0 flex flex-col justify-center">
          {/* Phase Header Tag */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald-700 text-white px-4 sm:px-6 py-0.5 sm:py-1 rounded-md shadow-xs text-center whitespace-nowrap">
            <div className="text-base sm:text-lg lg:text-xl xl:text-2xl xl:text-xl font-extrabold uppercase tracking-wider leading-tight">Pre-Disaster Phase</div>
            <div className="text-[10px] sm:text-xs text-emerald-100 font-medium leading-none">Preparedness &amp; Mitigation</div>
          </div>

          {/* 3 Sub-Boxes */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 sm:gap-3 lg:gap-4 mt-0.5 sm:mt-1 flex-1 min-h-0 items-stretch">
            {/* Box 1 */}
            <div className="border border-emerald-700/80 rounded-lg bg-white overflow-hidden shadow-2xs flex flex-col">
              <div className="bg-emerald-700 text-white text-base sm:text-lg lg:text-xl xl:text-2xl xl:text-xl font-bold text-center py-1 sm:py-1.5 px-2">
                Risk Identification &amp; Assessment
              </div>
              <div className="p-2 sm:p-3 lg:p-4 flex-1 flex flex-col justify-center space-y-1 sm:space-y-2 text-base sm:text-lg lg:text-xl xl:text-2xl xl:text-xl text-slate-800">
                <div className="flex items-center gap-2 font-semibold">
                  <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-emerald-700 shrink-0" />
                  <span>Hazard Modeling</span>
                </div>
                <div className="flex items-center gap-2 font-semibold">
                  <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-emerald-700 shrink-0" />
                  <span>Vulnerability Analysis</span>
                </div>
              </div>
            </div>

            {/* Box 2 */}
            <div className="border border-emerald-700/80 rounded-lg bg-white overflow-hidden shadow-2xs flex flex-col">
              <div className="bg-emerald-700 text-white text-base sm:text-lg lg:text-xl xl:text-2xl xl:text-xl font-bold text-center py-1 sm:py-1.5 px-2">
                Risk Prevention &amp; Mitigation
              </div>
              <div className="p-2 sm:p-3 lg:p-4 flex-1 flex flex-col justify-center space-y-1 sm:space-y-2 text-base sm:text-lg lg:text-xl xl:text-2xl xl:text-xl text-slate-800">
                <div className="flex items-center gap-2 font-semibold">
                  <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-emerald-700 shrink-0" />
                  <span>Structural Retrofitting</span>
                </div>
                <div className="flex items-center gap-2 font-semibold">
                  <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-emerald-700 shrink-0" />
                  <span>Land-Use Planning</span>
                </div>
              </div>
            </div>

            {/* Box 3 */}
            <div className="border border-emerald-700/80 rounded-lg bg-white overflow-hidden shadow-2xs flex flex-col">
              <div className="bg-emerald-700 text-white text-base sm:text-lg lg:text-xl xl:text-2xl xl:text-xl font-bold text-center py-1 sm:py-1.5 px-2">
                Emergency Preparedness
              </div>
              <div className="p-2 sm:p-3 lg:p-4 flex-1 flex flex-col justify-center space-y-1 sm:space-y-2 text-base sm:text-lg lg:text-xl xl:text-2xl xl:text-xl text-slate-800">
                <div className="flex items-center gap-2 font-semibold">
                  <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-emerald-700 shrink-0" />
                  <span>Early Warning Systems</span>
                </div>
                <div className="flex items-center gap-2 font-semibold">
                  <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-emerald-700 shrink-0" />
                  <span>Response Planning</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Transition Arrow 1: Green -> Orange */}
        <div className="flex justify-center items-center my-0 sm:my-0.5 shrink-0">
          <svg width="28" height="18" viewBox="0 0 28 18" fill="none" className="text-emerald-700">
            <path d="M14 18L5 7H10V0H18V7H23L14 18Z" fill="currentColor" />
          </svg>
        </div>

        {/* ========================================================= */}
        {/* 2. DURING DISASTER PHASE (ORANGE) */}
        {/* ========================================================= */}
        <div className="relative border-2 border-amber-600 rounded-xl p-2.5 sm:p-3.5 lg:p-4 pt-3.5 sm:pt-4 bg-amber-50/25 flex-1 min-h-0 flex flex-col justify-center">
          {/* Phase Header Tag */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-600 text-white px-4 sm:px-6 py-0.5 sm:py-1 rounded-md shadow-xs text-center whitespace-nowrap">
            <div className="text-base sm:text-lg lg:text-xl xl:text-2xl xl:text-xl font-extrabold uppercase tracking-wider leading-tight">During Disaster Phase</div>
            <div className="text-[10px] sm:text-xs text-amber-100 font-medium leading-none">Disturbance &amp; Response</div>
          </div>

          {/* 3 Sub-Boxes */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 sm:gap-3 lg:gap-4 mt-0.5 sm:mt-1 flex-1 min-h-0 items-stretch">
            {/* Box 1: Seismic Event with wave graphic */}
            <div className="border border-amber-600/80 rounded-lg bg-white overflow-hidden shadow-2xs flex flex-col">
              <div className="bg-amber-600 text-white text-base sm:text-lg lg:text-xl xl:text-2xl xl:text-xl font-bold text-center py-1 sm:py-1.5 px-2 truncate">
                Seismic Event (Disequilibrium)
              </div>
              <div className="p-2 sm:p-3 flex-1 flex flex-col items-center justify-center">
                <svg viewBox="0 0 220 50" className="w-full max-w-[17.5rem] h-10 sm:h-12 lg:h-14">
                  {/* Jagged Seismograph Wave in Red */}
                  <path
                    d="M 5 25 L 40 25 L 48 16 L 55 35 L 62 6 L 70 44 L 78 12 L 86 36 L 94 22 L 102 28 L 215 25"
                    fill="none"
                    stroke="#dc2626"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  {/* Epicenter concentric pulse rings */}
                  <ellipse cx="74" cy="40" rx="18" ry="5" fill="none" stroke="#dc2626" strokeWidth="1.5" opacity="0.65" />
                  <ellipse cx="74" cy="40" rx="32" ry="8" fill="none" stroke="#dc2626" strokeWidth="1" strokeDasharray="4 2" opacity="0.4" />
                </svg>
                <span className="text-[10px] sm:text-xs font-semibold text-rose-700 tracking-tight mt-0.5">
                  Transient Shock &amp; Structural Shaking
                </span>
              </div>
            </div>

            {/* Box 2 */}
            <div className="border border-amber-600/80 rounded-lg bg-white overflow-hidden shadow-2xs flex flex-col">
              <div className="bg-amber-600 text-white text-base sm:text-lg lg:text-xl xl:text-2xl xl:text-xl font-bold text-center py-1 sm:py-1.5 px-2">
                Emergency Response
              </div>
              <div className="p-2 sm:p-3 lg:p-4 flex-1 flex flex-col justify-center space-y-1 sm:space-y-2 text-base sm:text-lg lg:text-xl xl:text-2xl xl:text-xl text-slate-800">
                <div className="flex items-center gap-2 font-semibold">
                  <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-amber-600 shrink-0" />
                  <span>Search &amp; Rescue</span>
                </div>
                <div className="flex items-center gap-2 font-semibold">
                  <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-amber-600 shrink-0" />
                  <span>Evacuation Operations</span>
                </div>
              </div>
            </div>

            {/* Box 3 */}
            <div className="border border-amber-600/80 rounded-lg bg-white overflow-hidden shadow-2xs flex flex-col">
              <div className="bg-amber-600 text-white text-base sm:text-lg lg:text-xl xl:text-2xl xl:text-xl font-bold text-center py-1 sm:py-1.5 px-2">
                Rapid Damage Assessment
              </div>
              <div className="p-2 sm:p-3 lg:p-4 flex-1 flex flex-col justify-center space-y-1 sm:space-y-2 text-base sm:text-lg lg:text-xl xl:text-2xl xl:text-xl text-slate-800">
                <div className="flex items-center gap-2 font-semibold">
                  <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-amber-600 shrink-0" />
                  <span>Damage Evaluation</span>
                </div>
                <div className="flex items-center gap-2 font-semibold">
                  <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-amber-600 shrink-0" />
                  <span>Resource Deployment</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Transition Arrow 2: Orange -> Blue */}
        <div className="flex justify-center items-center my-0 sm:my-0.5 shrink-0">
          <svg width="28" height="18" viewBox="0 0 28 18" fill="none" className="text-amber-600">
            <path d="M14 18L5 7H10V0H18V7H23L14 18Z" fill="currentColor" />
          </svg>
        </div>

        {/* ========================================================= */}
        {/* 3. POST-DISASTER PHASE (BLUE) */}
        {/* ========================================================= */}
        <div className="relative border-2 border-blue-600 rounded-xl p-2.5 sm:p-3.5 lg:p-4 pt-3.5 sm:pt-4 bg-blue-50/25 flex-1 min-h-0 flex flex-col justify-center">
          {/* Phase Header Tag */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-4 sm:px-6 py-0.5 sm:py-1 rounded-md shadow-xs text-center whitespace-nowrap">
            <div className="text-base sm:text-lg lg:text-xl xl:text-2xl xl:text-xl font-extrabold uppercase tracking-wider leading-tight">Post-Disaster Phase</div>
            <div className="text-[10px] sm:text-xs text-blue-100 font-medium leading-none">Recovery &amp; Continuous Improvement</div>
          </div>

          {/* 2 Centered Sub-Boxes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 lg:gap-6 max-w-4xl mx-auto w-full mt-0.5 sm:mt-1 flex-1 min-h-0 items-stretch">
            {/* Box 1 */}
            <div className="border border-blue-600/80 rounded-lg bg-white overflow-hidden shadow-2xs flex flex-col">
              <div className="bg-blue-600 text-white text-base sm:text-lg lg:text-xl xl:text-2xl xl:text-xl font-bold text-center py-1 sm:py-1.5 px-2">
                Recovery &amp; Rehabilitation
              </div>
              <div className="p-2 sm:p-3 lg:p-4 flex-1 flex flex-col justify-center space-y-1 sm:space-y-2 text-base sm:text-lg lg:text-xl xl:text-2xl xl:text-xl text-slate-800">
                <div className="flex items-center gap-2 font-semibold">
                  <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-blue-600 shrink-0" />
                  <span>Infrastructure Repair</span>
                </div>
                <div className="flex items-center gap-2 font-semibold">
                  <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-blue-600 shrink-0" />
                  <span>Community Support</span>
                </div>
              </div>
            </div>

            {/* Box 2 */}
            <div className="border border-blue-600/80 rounded-lg bg-white overflow-hidden shadow-2xs flex flex-col">
              <div className="bg-blue-600 text-white text-base sm:text-lg lg:text-xl xl:text-2xl xl:text-xl font-bold text-center py-1 sm:py-1.5 px-2">
                Adaptation &amp; Transformation
              </div>
              <div className="p-2 sm:p-3 lg:p-4 flex-1 flex flex-col justify-center space-y-1 sm:space-y-2 text-base sm:text-lg lg:text-xl xl:text-2xl xl:text-xl text-slate-800">
                <div className="flex items-center gap-2 font-semibold">
                  <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-blue-600 shrink-0" />
                  <span>Building Resilience</span>
                </div>
                <div className="flex items-center gap-2 font-semibold">
                  <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-blue-600 shrink-0" />
                  <span>Urban Renewal</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Transition Arrow 3: Blue -> Feedback Loop */}
        <div className="flex justify-center items-center my-0 sm:my-0.5 shrink-0">
          <svg width="28" height="18" viewBox="0 0 28 18" fill="none" className="text-blue-600">
            <path d="M14 18L5 7H10V0H18V7H23L14 18Z" fill="currentColor" />
          </svg>
        </div>

        {/* ========================================================= */}
        {/* 4. THE FEEDBACK LOOP (GREEN) */}
        {/* ========================================================= */}
        <div className="max-w-3xl mx-auto w-full bg-emerald-800 text-white rounded-xl py-2 sm:py-2.5 lg:py-3 px-5 sm:px-8 shadow-sm flex items-center justify-between shrink-0">
          {/* Left Loop Arrow */}
          <div className="flex items-center">
            <svg width="34" height="26" viewBox="0 0 32 24" fill="none" className="text-emerald-200">
              <path
                d="M 28 8 C 16 2, 4 10, 4 18 C 4 22, 12 22, 18 22"
                stroke="currentColor"
                strokeWidth="3.5"
                strokeLinecap="round"
                fill="none"
              />
              <polygon points="24,22 14,18 16,24" fill="currentColor" />
            </svg>
          </div>

          {/* Center Text */}
          <div className="text-center px-3">
            <div className="text-base sm:text-lg lg:text-xl xl:text-2xl xl:text-xl font-black tracking-widest uppercase leading-tight">
              The Feedback Loop
            </div>
            <div className="text-[11px] sm:text-xs text-emerald-100 font-medium mt-0.5">
              Lessons Learned &amp; Continuous Institutional Monitoring
            </div>
          </div>

          {/* Right Loop Arrow */}
          <div className="flex items-center">
            <svg width="34" height="26" viewBox="0 0 32 24" fill="none" className="text-emerald-200">
              <path
                d="M 4 22 C 12 22, 20 22, 24 18 C 28 12, 20 2, 6 6"
                stroke="currentColor"
                strokeWidth="3.5"
                strokeLinecap="round"
                fill="none"
              />
              <polygon points="2,6 12,2 10,8" fill="currentColor" />
            </svg>
          </div>
        </div>

      </div>

      {/* Manuscript Academic Caption */}
      <div className="mt-1 sm:mt-1.5 text-center text-xs sm:text-sm text-slate-600 shrink-0">
        <span className="font-bold text-slate-800">Figure 3.</span> Operational Cycle of the Integrated Resilience Framework for İzmir, illustrating the continuous feedback loop among the four core components.
      </div>
    </div>
  );
};
