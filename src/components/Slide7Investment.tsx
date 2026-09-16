import React from 'react';
import { ArrowRight, Shield, Activity, Layers, CheckCircle2 } from 'lucide-react';

export const Slide7Investment: React.FC = () => {
  return (
    <div className="relative w-full h-full min-h-0 flex flex-col max-w-[100rem] mx-auto p-4 justify-between overflow-hidden">
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
        className="absolute top-4 right-6 z-20 text-xs font-bold text-slate-500 hover:text-sky-600 bg-white/80 hover:bg-white px-2 py-1 rounded-md backdrop-blur-md border border-slate-200 transition-colors shadow-sm"
      >
        Image Source
      </a>

      {/* Title */}
      <div className="relative z-10 mb-3 shrink-0">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Turn Priorities into Investment
        </h1>
        <p className="text-xl text-slate-500">
          Systematic appraisal funnels translating disaster risk reduction priorities into municipal capital allocations.
        </p>
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 flex-1 min-h-0 flex flex-col justify-between gap-4">
        {/* Two Columns: Structural vs Non-Structural Measures */}
        <div className="grid grid-cols-2 gap-4 flex-1 min-h-0">
          {/* Structural Measures Card */}
          <div className="bg-white/25 hover:bg-white/30 transition-colors backdrop-blur-sm border border-white/40 rounded-2xl p-5 shadow-lg flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-4 pb-3 border-b border-white/30">
                <span className="p-2.5 rounded-xl bg-white/40 text-sky-800 border border-white/40 shadow-sm">
                  <Shield className="w-6 h-6" />
                </span>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Structural Measures</h3>
                  <span className="text-sm text-slate-500 font-medium">Engineering interventions &amp; physical resistance</span>
                </div>
              </div>
            </div>

            {/* List of Measures - Stretched to fill vertical space evenly */}
            <div className="flex-1 flex flex-col justify-around gap-2 my-2">
              <div className="flex items-start gap-2 bg-white/20 p-3 rounded-xl border border-white/30 shadow-sm">
                <CheckCircle2 className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <strong className="text-slate-900 block font-bold text-xl mb-0.5">
                      Structural Retrofitting
                    </strong>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-sky-100 text-sky-800">
                      High-Risk Buildings
                    </span>
                  </div>

                </div>
              </div>

              <div className="flex items-start gap-2 bg-white/20 p-3 rounded-xl border border-white/30 shadow-sm">
                <CheckCircle2 className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <strong className="text-slate-900 block font-bold text-xl mb-0.5">
                      Lifeline Infrastructure Strengthening
                    </strong>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-sky-100 text-sky-800">
                      Critical Networks
                    </span>
                  </div>

                </div>
              </div>

              <div className="flex items-start gap-2 bg-white/20 p-3 rounded-xl border border-white/30 shadow-sm">
                <CheckCircle2 className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <strong className="text-slate-900 block font-bold text-xl mb-0.5">
                      Site-Specific Ground Mitigation
                    </strong>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-sky-100 text-sky-800">
                      Geotechnical Works
                    </span>
                  </div>

                </div>
              </div>
            </div>

            <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-sm text-slate-500">
              <span className="font-medium text-slate-700">Focus: Physical resistance &amp; asset protection</span>
              <span className="font-mono bg-sky-50 text-sky-700 px-2.5 py-1 rounded font-semibold border border-sky-200 text-sm">
                Engineering Interventions
              </span>
            </div>
          </div>

          {/* Non-Structural Measures Card */}
          <div className="bg-white/25 hover:bg-white/30 transition-colors backdrop-blur-sm border border-white/40 rounded-2xl p-5 shadow-lg flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-4 pb-3 border-b border-white/30">
                <span className="p-2.5 rounded-xl bg-white/40 text-amber-800 border border-white/40 shadow-sm">
                  <Activity className="w-6 h-6" />
                </span>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Non-Structural Measures</h3>
                  <span className="text-sm text-slate-500 font-medium">Planning, policy, informational &amp; financial mechanisms</span>
                </div>
              </div>
            </div>

            {/* List of Measures - Stretched to fill vertical space evenly */}
            <div className="flex-1 flex flex-col justify-around gap-2 my-2">
              <div className="flex items-start gap-2 bg-white/20 p-3 rounded-xl border border-white/30 shadow-sm">
                <CheckCircle2 className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <strong className="text-slate-900 block font-bold text-xl mb-0.5">
                      Risk-Informed Land-Use Planning
                    </strong>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-amber-100 text-amber-800">
                      Spatial Master Plans
                    </span>
                  </div>

                </div>
              </div>

              <div className="flex items-start gap-2 bg-white/20 p-3 rounded-xl border border-white/30 shadow-sm">
                <CheckCircle2 className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <strong className="text-slate-900 block font-bold text-xl mb-0.5">
                      Early Warning &amp; Emergency Protocols
                    </strong>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-amber-100 text-amber-800">
                      Operational Readiness
                    </span>
                  </div>

                </div>
              </div>

              <div className="flex items-start gap-2 bg-white/20 p-3 rounded-xl border border-white/30 shadow-sm">
                <CheckCircle2 className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <strong className="text-slate-900 block font-bold text-xl mb-0.5">
                      Disaster Risk Financing &amp; Preparedness
                    </strong>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-amber-100 text-amber-800">
                      Fiscal Reserves
                    </span>
                  </div>

                </div>
              </div>
            </div>

            <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-sm text-slate-500">
              <span className="font-medium text-slate-700">Focus: Institutional readiness &amp; systemic risk reduction</span>
              <span className="font-mono bg-amber-50 text-amber-700 px-2.5 py-1 rounded font-semibold border border-amber-200 text-sm">
                Policy &amp; Planning
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};