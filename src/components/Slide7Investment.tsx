import React from 'react';
import { ArrowRight, Shield, Activity, Layers, CheckCircle2 } from 'lucide-react';

export const Slide7Investment: React.FC = () => {
  return (
    <div className="relative w-full h-full min-h-0 flex flex-col max-w-[100rem] mx-auto p-1 sm:p-3 lg:p-4 justify-between overflow-hidden">
      {/* Background Image Layer */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden select-none">
        <img
          src={`${import.meta.env.BASE_URL}images/izmir_skyline.png`}
          alt="İzmir Skyline"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-white/10 pointer-events-none" />
      </div>

      {/* Source Link */}
      <a 
        href="https://share.google/Du3LPJugKISC9Czsi" 
        target="_blank" 
        rel="noopener noreferrer"
        className="absolute top-3 right-4 sm:top-4 sm:right-6 z-20 text-[10px] sm:text-xs font-bold text-slate-500 hover:text-sky-600 bg-white/80 hover:bg-white px-2 py-1 rounded-md backdrop-blur-md border border-slate-200 transition-colors shadow-sm"
      >
        Image Source
      </a>

      {/* Title */}
      <div className="relative z-10 mb-2 sm:mb-3 shrink-0">
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-slate-900 tracking-tight">
          Turn Priorities into Investment
        </h1>
        <p className="text-base sm:text-lg lg:text-xl xl:text-2xl xl:text-xl text-slate-500">
          Systematic appraisal funnels translating disaster risk reduction priorities into municipal capital allocations.
        </p>
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 flex-1 min-h-0 flex flex-col justify-between gap-3 sm:gap-4">
        {/* Two Columns: Structural vs Non-Structural Measures */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 flex-1 min-h-0">
          {/* Structural Measures Card */}
          <div className="bg-white/25 hover:bg-white/30 transition-colors backdrop-blur-sm border border-white/40 rounded-2xl p-4 sm:p-6 shadow-lg flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2 sm:mb-4 pb-2 sm:pb-3 border-b border-white/30">
                <span className="p-2 sm:p-2.5 rounded-xl bg-white/40 text-sky-800 border border-white/40 shadow-sm">
                  <Shield className="w-5 h-5 sm:w-6 sm:h-6" />
                </span>
                <div>
                  <h3 className="text-base sm:text-lg lg:text-xl font-bold text-slate-900">Structural Measures</h3>
                  <span className="text-xs sm:text-sm text-slate-500 font-medium">Engineering interventions &amp; physical resistance</span>
                </div>
              </div>
            </div>

            {/* List of Measures - Stretched to fill vertical space evenly */}
            <div className="flex-1 flex flex-col justify-around gap-2.5 sm:gap-3.5 my-1 sm:my-2">
              <div className="flex items-start gap-3.5 bg-white/20 p-3 sm:p-4 lg:p-4.5 rounded-xl border border-white/30 shadow-sm">
                <CheckCircle2 className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <strong className="text-slate-900 block font-bold text-base sm:text-lg lg:text-xl xl:text-2xl mb-0.5">
                      Structural Retrofitting
                    </strong>
                    <span className="text-[11px] sm:text-xs font-semibold px-2 py-0.5 rounded-md bg-sky-100 text-sky-800">
                      High-Risk Buildings
                    </span>
                  </div>
                    <span className="text-slate-600 text-base sm:text-lg lg:text-xl xl:text-2xl xl:text-xl leading-relaxed block mt-1">
                      Prioritized seismic strengthening and retrofitting for high-risk buildings and critical public assets.
                    </span>
                </div>
              </div>

              <div className="flex items-start gap-3.5 bg-white/20 p-3 sm:p-4 lg:p-4.5 rounded-xl border border-white/30 shadow-sm">
                <CheckCircle2 className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <strong className="text-slate-900 block font-bold text-base sm:text-lg lg:text-xl xl:text-2xl mb-0.5">
                      Lifeline Infrastructure Strengthening
                    </strong>
                    <span className="text-[11px] sm:text-xs font-semibold px-2 py-0.5 rounded-md bg-sky-100 text-sky-800">
                      Critical Networks
                    </span>
                  </div>
                    <span className="text-slate-600 text-base sm:text-lg lg:text-xl xl:text-2xl xl:text-xl leading-relaxed block mt-1">
                      Physical hardening of water, energy, and transit networks to maintain critical functionality.
                    </span>
                </div>
              </div>

              <div className="flex items-start gap-3.5 bg-white/20 p-3 sm:p-4 lg:p-4.5 rounded-xl border border-white/30 shadow-sm">
                <CheckCircle2 className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <strong className="text-slate-900 block font-bold text-base sm:text-lg lg:text-xl xl:text-2xl mb-0.5">
                      Site-Specific Ground Mitigation
                    </strong>
                    <span className="text-[11px] sm:text-xs font-semibold px-2 py-0.5 rounded-md bg-sky-100 text-sky-800">
                      Geotechnical Works
                    </span>
                  </div>
                    <span className="text-slate-600 text-base sm:text-lg lg:text-xl xl:text-2xl xl:text-xl leading-relaxed block mt-1">
                      Geotechnical engineering to address local ground amplification, slope stability, and liquefaction risk.
                    </span>
                </div>
              </div>
            </div>

            <div className="mt-2 pt-2 sm:pt-3 border-t border-slate-100 flex items-center justify-between text-xs sm:text-sm text-slate-500">
              <span className="font-medium text-slate-700">Focus: Physical resistance &amp; asset protection</span>
              <span className="font-mono bg-sky-50 text-sky-700 px-2.5 py-1 rounded font-semibold border border-sky-200 text-xs sm:text-sm">
                Engineering Interventions
              </span>
            </div>
          </div>

          {/* Non-Structural Measures Card */}
          <div className="bg-white/25 hover:bg-white/30 transition-colors backdrop-blur-sm border border-white/40 rounded-2xl p-4 sm:p-6 shadow-lg flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2 sm:mb-4 pb-2 sm:pb-3 border-b border-white/30">
                <span className="p-2 sm:p-2.5 rounded-xl bg-white/40 text-amber-800 border border-white/40 shadow-sm">
                  <Activity className="w-5 h-5 sm:w-6 sm:h-6" />
                </span>
                <div>
                  <h3 className="text-base sm:text-lg lg:text-xl font-bold text-slate-900">Non-Structural Measures</h3>
                  <span className="text-xs sm:text-sm text-slate-500 font-medium">Planning, policy, informational &amp; financial mechanisms</span>
                </div>
              </div>
            </div>

            {/* List of Measures - Stretched to fill vertical space evenly */}
            <div className="flex-1 flex flex-col justify-around gap-2.5 sm:gap-3.5 my-1 sm:my-2">
              <div className="flex items-start gap-3.5 bg-white/20 p-3 sm:p-4 lg:p-4.5 rounded-xl border border-white/30 shadow-sm">
                <CheckCircle2 className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <strong className="text-slate-900 block font-bold text-base sm:text-lg lg:text-xl xl:text-2xl mb-0.5">
                      Risk-Informed Land-Use Planning
                    </strong>
                    <span className="text-[11px] sm:text-xs font-semibold px-2 py-0.5 rounded-md bg-amber-100 text-amber-800">
                      Spatial Master Plans
                    </span>
                  </div>
                    <span className="text-slate-600 text-base sm:text-lg lg:text-xl xl:text-2xl xl:text-xl leading-relaxed block mt-1">
                      Integrating hazard assessments and microzonation directly into statutory spatial master plans and regulations.
                    </span>
                </div>
              </div>

              <div className="flex items-start gap-3.5 bg-white/20 p-3 sm:p-4 lg:p-4.5 rounded-xl border border-white/30 shadow-sm">
                <CheckCircle2 className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <strong className="text-slate-900 block font-bold text-base sm:text-lg lg:text-xl xl:text-2xl mb-0.5">
                      Early Warning &amp; Emergency Protocols
                    </strong>
                    <span className="text-[11px] sm:text-xs font-semibold px-2 py-0.5 rounded-md bg-amber-100 text-amber-800">
                      Operational Readiness
                    </span>
                  </div>
                    <span className="text-slate-600 text-base sm:text-lg lg:text-xl xl:text-2xl xl:text-xl leading-relaxed block mt-1">
                      Deploying monitoring networks and automated protocols to alert agencies and initiate protective actions.
                    </span>
                </div>
              </div>

              <div className="flex items-start gap-3.5 bg-white/20 p-3 sm:p-4 lg:p-4.5 rounded-xl border border-white/30 shadow-sm">
                <CheckCircle2 className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <strong className="text-slate-900 block font-bold text-base sm:text-lg lg:text-xl xl:text-2xl mb-0.5">
                      Disaster Risk Financing &amp; Preparedness
                    </strong>
                    <span className="text-[11px] sm:text-xs font-semibold px-2 py-0.5 rounded-md bg-amber-100 text-amber-800">
                      Fiscal Reserves
                    </span>
                  </div>
                    <span className="text-slate-600 text-base sm:text-lg lg:text-xl xl:text-2xl xl:text-xl leading-relaxed block mt-1">
                      Establishing fiscal reserves and insurance mechanisms to support rapid post-disaster recovery.
                    </span>
                </div>
              </div>
            </div>

            <div className="mt-2 pt-2 sm:pt-3 border-t border-slate-100 flex items-center justify-between text-xs sm:text-sm text-slate-500">
              <span className="font-medium text-slate-700">Focus: Institutional readiness &amp; systemic risk reduction</span>
              <span className="font-mono bg-amber-50 text-amber-700 px-2.5 py-1 rounded font-semibold border border-amber-200 text-xs sm:text-sm">
                Policy &amp; Planning
              </span>
            </div>
          </div>
        </div>

        {/* Multi-Stage Decision Appraisal Funnel */}
        <div className="bg-white/25 hover:bg-white/30 transition-colors backdrop-blur-sm border border-white/40 rounded-2xl p-3 sm:p-5 lg:p-6 shadow-lg shrink-0">
          <div className="flex items-center justify-between mb-2 sm:mb-3">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 sm:w-5 sm:h-5 text-sky-600" />
              <span className="text-base sm:text-lg lg:text-xl xl:text-2xl xl:text-xl font-bold uppercase tracking-wider text-slate-800">
                Multi-Stage Decision Appraisal Funnel
              </span>
            </div>
            <span className="text-xs sm:text-sm text-slate-500 font-medium">
              Section 3.3 · From Technical Feasibility to Statutory Budget Allocation
            </span>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 sm:gap-4 lg:gap-6 font-mono">
            {/* Stage 1: CBA */}
            <div className="flex-1 w-full bg-white/20 border border-white/30 rounded-xl p-3 sm:p-4 text-center shadow-sm">
              <span className="text-[10px] sm:text-xs font-extrabold uppercase tracking-wider text-slate-500 block mb-1">
                Stage 1
              </span>
              <strong className="block text-sky-700 text-lg sm:text-2xl lg:text-3xl font-black">CBA</strong>
              <span className="text-base sm:text-lg lg:text-xl xl:text-2xl xl:text-xl text-slate-800 font-sans block mt-1 font-bold">
                Cost-Benefit Analysis
              </span>
              <span className="text-xs sm:text-sm text-slate-600 font-sans block mt-0.5">
                Economic feasibility &amp; monetizable risk reduction
              </span>
            </div>

            <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 text-slate-400 rotate-90 sm:rotate-0 shrink-0" />

            {/* Stage 2: CEA */}
            <div className="flex-1 w-full bg-white/20 border border-white/30 rounded-xl p-3 sm:p-4 text-center shadow-sm">
              <span className="text-[10px] sm:text-xs font-extrabold uppercase tracking-wider text-slate-500 block mb-1">
                Stage 2
              </span>
              <strong className="block text-amber-700 text-lg sm:text-2xl lg:text-3xl font-black">CEA</strong>
              <span className="text-base sm:text-lg lg:text-xl xl:text-2xl xl:text-xl text-slate-800 font-sans block mt-1 font-bold">
                Cost-Effectiveness Analysis
              </span>
              <span className="text-xs sm:text-sm text-slate-600 font-sans block mt-0.5">
                Assessment when benefits cannot be fully monetized
              </span>
            </div>

            <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 text-slate-400 rotate-90 sm:rotate-0 shrink-0" />

            {/* Stage 3: MCA */}
            <div className="flex-1 w-full bg-sky-50/30 border border-sky-300/40 rounded-xl p-3 sm:p-4 text-center shadow-sm">
              <span className="text-[10px] sm:text-xs font-extrabold uppercase tracking-wider text-sky-700 block mb-1">
                Stage 3
              </span>
              <strong className="block text-sky-800 text-lg sm:text-2xl lg:text-3xl font-black">MCA</strong>
              <span className="text-base sm:text-lg lg:text-xl xl:text-2xl xl:text-xl text-sky-950 font-sans block mt-1 font-bold">
                Multi-Criteria Appraisal
              </span>
              <span className="text-xs sm:text-sm text-sky-800 font-sans block mt-0.5">
                Multi-dimensional institutional &amp; strategic priorities
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
