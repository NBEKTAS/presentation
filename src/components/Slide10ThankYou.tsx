import React, { useState } from 'react';
import {
  GraduationCap,
  Mail,
  Globe,
  ExternalLink,
  QrCode,
  Copy,
  Check,
  RotateCcw,
  Building2,
  Linkedin,
  Network,
  Cpu,
  BookOpen,
  User,
} from 'lucide-react';

interface Slide10ThankYouProps {
  onRestart?: () => void;
}

export const Slide10ThankYou: React.FC<Slide10ThankYouProps> = ({ onRestart }) => {
  const [copiedEmail, setCopiedEmail] = useState<string | null>(null);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedEmail(label);
    setTimeout(() => setCopiedEmail(null), 2000);
  };

  const linkedInUrl = 'https://www.linkedin.com/in/nurullahbektas/';

  return (
    <div className="relative w-full h-full min-h-0 flex flex-col justify-between max-w-[106.25rem] mx-auto p-3 @sm:p-4 @lg:p-5 @xl:p-6 rounded-2xl overflow-hidden shadow-2xl border border-white/20">
      {/* University Campus Aerial Background Image */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden select-none bg-slate-950">
        <img
          src={`${import.meta.env.BASE_URL}images/sze_campus_bg.jpg`}
          alt="Széchenyi István University Campus, Győr"
          className="w-full h-full object-cover object-center opacity-90"
          referrerPolicy="no-referrer"
        />
        {/* Very soft edge gradient to ensure top title readability without dimming the campus photo */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/50 via-transparent to-slate-950/25 pointer-events-none" />
      </div>

      {/* Foreground Content Layer */}
      <div className="relative z-10 flex flex-col justify-between h-full w-full min-h-0">
        {/* Slide Header with crisp white & sky text */}
        <div className="flex flex-col @sm:flex-row @sm:items-end justify-between gap-2 mb-3 @sm:mb-4 shrink-0 border-b border-white/20 pb-2.5 @sm:pb-3.5">
          <div>
            <h1 className="text-2xl @sm:text-3xl @lg:text-4xl @xl:text-[2.75rem] font-black text-white tracking-tight leading-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)]">
              Thank <span className="text-sky-300">You</span>
            </h1>
            <p className="text-xs @sm:text-sm @lg:text-base @xl:text-lg text-slate-100 font-bold mt-1 drop-shadow-[0_1px_3px_rgba(0,0,0,0.95)]">
              Questions, Discussion &amp; Collaborative Research Opportunities
            </p>
          </div>

          {onRestart && (
            <button
              onClick={onRestart}
              className="self-start @sm:self-auto inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-white/30 bg-slate-950/40 hover:bg-slate-950/60 backdrop-blur-sm text-xs @sm:text-sm font-bold text-white shadow-lg transition-all cursor-pointer shrink-0"
            >
              <RotateCcw className="w-4 h-4 text-sky-400" />
              <span>Restart Presentation</span>
            </button>
          )}
        </div>

        {/* Main Content: Highly Transparent Ultra-Light Glass Columns */}
        <div className="flex-1 min-h-0 grid grid-cols-1 @lg:grid-cols-12 gap-4 @sm:gap-5 items-stretch">
          {/* Left Column: Presenter Profile & Verified Contacts (6 cols) */}
          <div className="@lg:col-span-6 bg-slate-950/15 hover:bg-slate-950/20 backdrop-blur-[2px] border border-white/30 rounded-2xl p-5 @sm:p-6 @lg:p-7 shadow-2xl flex flex-col justify-between relative overflow-hidden transition-colors">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-sky-400 to-emerald-400" />

            <div>
              {/* Header: Presenter Badge, Name, Academic Affiliation */}
              <div className="flex items-start justify-between gap-3 pb-4 border-b border-white/20">
                <div>
                  <span className="text-xs font-mono font-black text-sky-200 uppercase tracking-wider bg-sky-950/60 px-3.5 py-1 rounded-full border border-sky-400/50 inline-block shadow-sm">
                    Presenter
                  </span>
                  <h2 className="text-2xl @sm:text-3xl @lg:text-4xl @xl:text-[2.6rem] font-black text-white tracking-tight mt-2.5 leading-tight drop-shadow-[0_2px_5px_rgba(0,0,0,0.95)]">
                    Dr. Nurullah Bektaş
                  </h2>
                  <div className="text-sm @sm:text-base @lg:text-lg text-white font-extrabold mt-2 flex items-center gap-2 drop-shadow-[0_1px_3px_rgba(0,0,0,0.95)]">
                    <Building2 className="w-4.5 h-4.5 text-sky-300 shrink-0" />
                    <span>Széchenyi István University (SZE), Győr, Hungary</span>
                  </div>
                  <div className="text-xs @sm:text-sm @lg:text-base text-slate-100 font-bold mt-1 drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">
                    Department of Structural Engineering &amp; Geotechnics
                  </div>
                  <div className="mt-4 text-sm @sm:text-base text-slate-200 leading-relaxed font-bold drop-shadow-md">
                    <p>
                      Researcher specializing in systemic risk, structural engineering, disaster resilience, and technology. Focused on developing quantitative frameworks and digital platforms for mitigating risks in critical infrastructure.
                    </p>
                  </div>
                </div>

                <div className="p-3.5 bg-slate-950/30 rounded-2xl text-sky-300 border border-white/25 shadow-md shrink-0 hidden @sm:block">
                  <GraduationCap className="w-9 h-9 drop-shadow-sm" />
                </div>
              </div>

              {/* Direct Communication Channels - Ultra-Light Glass Plates */}
              <div className="mt-5 space-y-3">
                <div className="flex items-center justify-between bg-slate-950/20 hover:bg-slate-950/30 border border-white/25 p-3.5 rounded-xl transition-colors shadow-md">
                  <a
                    href="mailto:bektas.nurullah@sze.hu"
                    className="flex items-center gap-3 text-white hover:text-sky-300 truncate font-mono text-xs @sm:text-sm @lg:text-base font-black tracking-wide drop-shadow-[0_1px_3px_rgba(0,0,0,0.95)]"
                  >
                    <span className="p-2 bg-sky-500/25 text-sky-200 rounded-lg shrink-0 border border-sky-400/50 shadow-xs">
                      <Mail className="w-4 h-4" />
                    </span>
                    <span className="truncate">bektas.nurullah@sze.hu</span>
                  </a>
                  <button
                    onClick={() => copyToClipboard('bektas.nurullah@sze.hu', 'sze')}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-white/15 hover:bg-white/25 border border-white/30 text-xs font-bold text-white shadow-sm cursor-pointer shrink-0 ml-2 transition-colors"
                    title="Copy Email"
                  >
                    {copiedEmail === 'sze' ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-300" />
                        <span className="text-emerald-200 font-extrabold">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-slate-100" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>


              </div>
            </div>

            {/* Academic Web Portals & Professional Network Links */}
            <div className="mt-6 pt-4 border-t border-white/20 flex flex-wrap items-center justify-start gap-3 text-xs @sm:text-sm">
              <a
                href={linkedInUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 font-bold text-white hover:text-sky-300 bg-slate-950/25 hover:bg-slate-950/45 px-3.5 py-2 rounded-xl border border-white/25 shadow-sm transition-colors drop-shadow-sm"
              >
                <Linkedin className="w-4 h-4 text-sky-400" />
                <span>LinkedIn</span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-300" />
              </a>

              <a
                href="https://scholar.google.com/citations?user=8wdUpBsAAAAJ&hl=en"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 font-bold text-white hover:text-sky-300 bg-slate-950/25 hover:bg-slate-950/45 px-3.5 py-2 rounded-xl border border-white/25 shadow-sm transition-colors drop-shadow-sm"
              >
                <BookOpen className="w-4 h-4 text-sky-400" />
                <span>Google Scholar</span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-300" />
              </a>

              <a
                href="https://www.researchgate.net/profile/Nurullah-Bektas?ev=hdr_xprf"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 font-bold text-white hover:text-sky-300 bg-slate-950/25 hover:bg-slate-950/45 px-3.5 py-2 rounded-xl border border-white/25 shadow-sm transition-colors drop-shadow-sm"
              >
                <Network className="w-4 h-4 text-sky-400" />
                <span>ResearchGate</span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-300" />
              </a>

              <a
                href="https://scicentrum.zevizar.com/profile/nurullah-bektas"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 font-bold text-white hover:text-sky-300 bg-slate-950/25 hover:bg-slate-950/45 px-3.5 py-2 rounded-xl border border-white/25 shadow-sm transition-colors drop-shadow-sm"
              >
                <User className="w-4 h-4 text-sky-400" />
                <span>SciCentrum Profile</span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-300" />
              </a>
            </div>
          </div>

          {/* Right Column: Independent Initiatives (Zevizar Ecosystem) */}
          <div className="@lg:col-span-6 bg-slate-900/40 hover:bg-slate-900/50 backdrop-blur-md border border-emerald-500/30 rounded-2xl p-5 @sm:p-6 @lg:p-7 shadow-2xl flex flex-col relative overflow-hidden transition-colors">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-400 to-teal-400" />
            
            <div className="mb-6">
              <div className="flex items-center gap-2.5">
                <Globe className="w-5 h-5 text-emerald-400" />
                <h3 className="text-xl @sm:text-2xl font-black text-white drop-shadow-md">
                  Dr. Bektaş's Involvements
                </h3>
              </div>
              <p className="text-sm text-slate-200 font-bold mt-1.5 drop-shadow-sm">
                Explore the Zevizar ecosystem and other collaborative platforms I am involved in.
              </p>
            </div>

            <ol className="flex flex-col gap-4 list-decimal list-inside text-emerald-400 font-black space-y-1 overflow-y-auto pr-2 custom-scrollbar">
              <li className="bg-slate-950/30 p-4 rounded-xl border border-white/10 hover:border-emerald-400/50 transition-colors shadow-md">
                <a href="https://zevizar.com/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-base @sm:text-lg text-emerald-300 hover:text-emerald-100">
                  <span className="underline decoration-emerald-500/50 underline-offset-4">Zevizar Core</span>
                  <ExternalLink className="w-4 h-4 text-emerald-500" />
                </a>
                <p className="text-xs @sm:text-sm text-slate-300 mt-2 pl-6 font-bold leading-relaxed">
                  The primary organization driving resilient technology, disaster intelligence, and advanced structural solutions.
                </p>
              </li>

              <li className="bg-slate-950/30 p-4 rounded-xl border border-white/10 hover:border-emerald-400/50 transition-colors shadow-md">
                <a href="https://cdrn.zevizar.com/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-base @sm:text-lg text-emerald-300 hover:text-emerald-100">
                  <span className="underline decoration-emerald-500/50 underline-offset-4">CDRN Association</span>
                  <ExternalLink className="w-4 h-4 text-emerald-500" />
                </a>
                <p className="text-xs @sm:text-sm text-slate-300 mt-2 pl-6 font-bold leading-relaxed">
                  Collaborative Disaster Resilience Network. An international consortium fostering joint research and active mitigation strategies.
                </p>
              </li>

              <li className="bg-slate-950/30 p-4 rounded-xl border border-white/10 hover:border-emerald-400/50 transition-colors shadow-md">
                <a href="https://dip.zevizar.com/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-base @sm:text-lg text-emerald-300 hover:text-emerald-100">
                  <span className="underline decoration-emerald-500/50 underline-offset-4">Zevizar DIP</span>
                  <ExternalLink className="w-4 h-4 text-emerald-500" />
                </a>
                <p className="text-xs @sm:text-sm text-slate-300 mt-2 pl-6 font-bold leading-relaxed">
                  Disaster Intelligence Platform. A 100% GDPR-compliant Private AI platform providing decision support, conversational GIS, and real-time telemetry.
                </p>
              </li>

              <li className="bg-slate-950/30 p-4 rounded-xl border border-white/10 hover:border-emerald-400/50 transition-colors shadow-md">
                <a href="https://scicentrum.zevizar.com/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-base @sm:text-lg text-emerald-300 hover:text-emerald-100">
                  <span className="underline decoration-emerald-500/50 underline-offset-4">SciCentrum</span>
                  <ExternalLink className="w-4 h-4 text-emerald-500" />
                </a>
                <p className="text-xs @sm:text-sm text-slate-300 mt-2 pl-6 font-bold leading-relaxed">
                  Academic network designed to help researchers connect with peers, discover collaborative studies, and engage in global scholarly forums.
                </p>
              </li>
            </ol>
            
            <div className="mt-auto pt-4 border-t border-white/10 flex items-center justify-between text-xs text-emerald-200/70 font-bold drop-shadow-sm">
              <span>Distinct from Széchenyi István University</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
