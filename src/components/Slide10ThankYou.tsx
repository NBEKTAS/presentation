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

  // QR Code URLs for SciCentrum and Zevizar DIP
  const sciCentrumUrl = 'https://scicentrum.zevizar.com/';
  const dipUrl = 'https://dip.zevizar.com/';
  const linkedInUrl = 'https://www.linkedin.com/in/nurullahbektas/';

  const sciCentrumQrSrc = `https://api.qrserver.com/v1/create-qr-code/?size=360x360&margin=6&data=${encodeURIComponent(
    sciCentrumUrl
  )}`;
  const dipQrSrc = `https://api.qrserver.com/v1/create-qr-code/?size=360x360&margin=6&data=${encodeURIComponent(
    dipUrl
  )}`;

  return (
    <div className="relative w-full h-full min-h-0 flex flex-col justify-between max-w-[106.25rem] mx-auto p-3 sm:p-4 lg:p-5 xl:p-6 rounded-2xl overflow-hidden shadow-2xl border border-white/20">
      {/* University Campus Aerial Background Image */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden select-none">
        <img
          src="/images/sze_campus_bg.jpg"
          alt="Széchenyi István University Campus, Győr"
          className="w-full h-full object-cover object-center"
          referrerPolicy="no-referrer"
        />
        {/* Very soft edge gradient to ensure top title readability without dimming the campus photo */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/40 via-transparent to-slate-950/25 pointer-events-none" />
      </div>

      {/* Foreground Content Layer */}
      <div className="relative z-10 flex flex-col justify-between h-full w-full min-h-0">
        {/* Slide Header with crisp white & sky text */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-3 sm:mb-4 shrink-0 border-b border-white/20 pb-2.5 sm:pb-3.5">
          <div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-[2.75rem] font-black text-white tracking-tight leading-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)]">
              Thank <span className="text-sky-300">You</span>
            </h1>
            <p className="text-xs sm:text-sm lg:text-base xl:text-lg text-slate-100 font-bold mt-1 drop-shadow-[0_1px_3px_rgba(0,0,0,0.95)]">
              Questions, Discussion &amp; Collaborative Research Opportunities
            </p>
          </div>

          {onRestart && (
            <button
              onClick={onRestart}
              className="self-start sm:self-auto inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-white/30 bg-slate-950/40 hover:bg-slate-950/60 backdrop-blur-sm text-xs sm:text-sm font-bold text-white shadow-lg transition-all cursor-pointer shrink-0"
            >
              <RotateCcw className="w-4 h-4 text-sky-400" />
              <span>Restart Presentation</span>
            </button>
          )}
        </div>

        {/* Main Content: Highly Transparent Ultra-Light Glass Columns */}
        <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5 items-stretch">
          {/* Left Column: Presenter Profile & Verified Contacts (6 cols) */}
          <div className="lg:col-span-6 bg-slate-950/15 hover:bg-slate-950/20 backdrop-blur-[2px] border border-white/30 rounded-2xl p-5 sm:p-6 lg:p-7 shadow-2xl flex flex-col justify-between relative overflow-hidden transition-colors">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-sky-400 to-emerald-400" />

            <div>
              {/* Header: Presenter Badge, Name, Academic Affiliation */}
              <div className="flex items-start justify-between gap-3 pb-4 border-b border-white/20">
                <div>
                  <span className="text-xs font-mono font-black text-sky-200 uppercase tracking-wider bg-sky-950/60 px-3.5 py-1 rounded-full border border-sky-400/50 inline-block shadow-sm">
                    Presenter
                  </span>
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-[2.6rem] font-black text-white tracking-tight mt-2.5 leading-tight drop-shadow-[0_2px_5px_rgba(0,0,0,0.95)]">
                    Dr. Nurullah Bektaş
                  </h2>
                  <div className="text-sm sm:text-base lg:text-lg text-white font-extrabold mt-2 flex items-center gap-2 drop-shadow-[0_1px_3px_rgba(0,0,0,0.95)]">
                    <Building2 className="w-4.5 h-4.5 text-sky-300 shrink-0" />
                    <span>Széchenyi István University (SZE), Győr, Hungary</span>
                  </div>
                  <div className="text-xs sm:text-sm lg:text-base text-slate-100 font-bold mt-1 drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">
                    Department of Structural Engineering &amp; Geotechnics
                  </div>
                </div>

                <div className="p-3.5 bg-slate-950/30 rounded-2xl text-sky-300 border border-white/25 shadow-md shrink-0 hidden sm:block">
                  <GraduationCap className="w-9 h-9 drop-shadow-sm" />
                </div>
              </div>

              {/* Direct Communication Channels - Ultra-Light Glass Plates */}
              <div className="mt-5 space-y-3">
                <div className="flex items-center justify-between bg-slate-950/20 hover:bg-slate-950/30 border border-white/25 p-3.5 rounded-xl transition-colors shadow-md">
                  <a
                    href="mailto:bektas.nurullah@sze.hu"
                    className="flex items-center gap-3 text-white hover:text-sky-300 truncate font-mono text-xs sm:text-sm lg:text-base font-black tracking-wide drop-shadow-[0_1px_3px_rgba(0,0,0,0.95)]"
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

                <div className="flex items-center justify-between bg-slate-950/20 hover:bg-slate-950/30 border border-white/25 p-3.5 rounded-xl transition-colors shadow-md">
                  <a
                    href="mailto:info@zevizar.com"
                    className="flex items-center gap-3 text-white hover:text-emerald-300 truncate font-mono text-xs sm:text-sm lg:text-base font-black tracking-wide drop-shadow-[0_1px_3px_rgba(0,0,0,0.95)]"
                  >
                    <span className="p-2 bg-emerald-500/25 text-emerald-200 rounded-lg shrink-0 border border-emerald-400/50 shadow-xs">
                      <Mail className="w-4 h-4" />
                    </span>
                    <span className="truncate">info@zevizar.com</span>
                  </a>
                  <button
                    onClick={() => copyToClipboard('info@zevizar.com', 'zevizar')}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-white/15 hover:bg-white/25 border border-white/30 text-xs font-bold text-white shadow-sm cursor-pointer shrink-0 ml-2 transition-colors"
                    title="Copy Email"
                  >
                    {copiedEmail === 'zevizar' ? (
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
            <div className="mt-6 pt-4 border-t border-white/20 flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm">
              <a
                href="https://zevizar.com"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 font-bold text-white hover:text-sky-300 bg-slate-950/25 hover:bg-slate-950/45 px-3.5 py-2 rounded-xl border border-white/25 shadow-sm transition-colors drop-shadow-sm"
              >
                <Globe className="w-4 h-4 text-sky-400" />
                <span>zevizar.com</span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-300" />
              </a>

              <a
                href="https://cdrn.zevizar.com"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 font-bold text-white hover:text-emerald-300 bg-slate-950/25 hover:bg-slate-950/45 px-3.5 py-2 rounded-xl border border-white/25 shadow-sm transition-colors drop-shadow-sm"
              >
                <Globe className="w-4 h-4 text-emerald-400" />
                <span>cdrn.zevizar.com</span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-300" />
              </a>

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
            </div>
          </div>

          {/* Right Column: SciCentrum & Zevizar DIP QR Showcase (6 cols) */}
          <div className="lg:col-span-6 bg-slate-950/15 hover:bg-slate-950/20 backdrop-blur-[2px] border border-white/30 rounded-2xl p-5 sm:p-6 lg:p-7 shadow-2xl flex flex-col justify-between relative overflow-hidden transition-colors">
            <div className="absolute top-0 left-0 right-0 h-1 bg-sky-400" />

            {/* Section Header */}
            <div className="mb-4">
              <div className="flex items-center gap-2.5">
                <QrCode className="w-5 h-5 text-sky-300" />
                <h3 className="text-lg sm:text-xl lg:text-2xl font-black text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)]">
                  Digital Platforms &amp; Collaboration
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-100 font-bold mt-1 drop-shadow-[0_1px_3px_rgba(0,0,0,0.95)]">
                Scan QR codes to access collaborative research tools and AI disaster intelligence.
              </p>
            </div>

            {/* Dual Large QR Code Modules: SciCentrum & Zevizar DIP */}
            <div className="flex-1 flex flex-col justify-around gap-4 my-1">
              {/* SciCentrum QR Module - Highly Transparent Glass Module */}
              <div className="flex-1 bg-slate-950/20 hover:bg-slate-950/30 border border-white/25 rounded-2xl p-4 sm:p-4.5 flex flex-row items-center gap-4 sm:gap-5 transition-all shadow-md">
                {/* QR Box - Pure White Frame for Instant Scanner Recognition */}
                <div className="w-28 h-28 sm:w-32 sm:h-32 lg:w-36 lg:h-36 xl:w-40 xl:h-40 bg-white p-2.5 rounded-2xl border-2 border-white/90 shadow-2xl flex items-center justify-center shrink-0">
                  <img
                    src={sciCentrumQrSrc}
                    alt="SciCentrum QR Code"
                    className="w-full h-full object-contain"
                    loading="lazy"
                  />
                </div>

                <div className="flex flex-col justify-between flex-1 min-w-0">
                  <div>
                    <div className="flex items-center gap-1.5">
                      <Network className="w-3.5 h-3.5 text-sky-300" />
                      <span className="text-[11px] font-mono font-black text-sky-200 uppercase tracking-wider bg-sky-950/60 px-2.5 py-0.5 rounded border border-sky-400/50 shadow-xs">
                        Academic Network
                      </span>
                    </div>
                    <h4 className="text-base sm:text-lg lg:text-xl font-black text-white mt-1.5 drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)]">
                      SciCentrum
                    </h4>
                    <span className="text-xs sm:text-sm font-black text-sky-300 block drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">
                      Find Your Research Partner
                    </span>
                    <p className="text-xs sm:text-sm text-slate-100 mt-1.5 line-clamp-2 leading-relaxed font-bold drop-shadow-[0_1px_3px_rgba(0,0,0,0.95)]">
                      Connect with peers, discover collaborative studies, and engage in global scholarly forums.
                    </p>
                  </div>

                  <a
                    href={sciCentrumUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-3 self-start inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-sky-500 hover:bg-sky-400 text-slate-950 text-xs sm:text-sm font-black shadow-md transition-colors"
                  >
                    <span>Visit scicentrum.zevizar.com</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Zevizar DIP (Disaster Intelligence Platform) QR Module */}
              <div className="flex-1 bg-slate-950/20 hover:bg-slate-950/30 border border-white/25 rounded-2xl p-4 sm:p-4.5 flex flex-row items-center gap-4 sm:gap-5 transition-all shadow-md">
                {/* QR Box - Pure White Frame for Instant Scanner Recognition */}
                <div className="w-28 h-28 sm:w-32 sm:h-32 lg:w-36 lg:h-36 xl:w-40 xl:h-40 bg-white p-2.5 rounded-2xl border-2 border-white/90 shadow-2xl flex items-center justify-center shrink-0">
                  <img
                    src={dipQrSrc}
                    alt="Zevizar DIP QR Code"
                    className="w-full h-full object-contain"
                    loading="lazy"
                  />
                </div>

                <div className="flex flex-col justify-between flex-1 min-w-0">
                  <div>
                    <div className="flex items-center gap-1.5">
                      <Cpu className="w-3.5 h-3.5 text-emerald-300" />
                      <span className="text-[11px] font-mono font-black text-emerald-200 uppercase tracking-wider bg-emerald-950/60 px-2.5 py-0.5 rounded border border-emerald-400/50 shadow-xs">
                        Disaster Intelligence
                      </span>
                    </div>
                    <h4 className="text-base sm:text-lg lg:text-xl font-black text-white mt-1.5 drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)]">
                      Zevizar DIP
                    </h4>
                    <span className="text-xs sm:text-sm font-black text-emerald-300 block drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">
                      Decision Support &amp; Telemetry
                    </span>
                    <p className="text-xs sm:text-sm text-slate-100 mt-1.5 line-clamp-2 leading-relaxed font-bold drop-shadow-[0_1px_3px_rgba(0,0,0,0.95)]">
                      100% GDPR-compliant Private AI platform with conversational GIS bridge and proactive simulation.
                    </p>
                  </div>

                  <a
                    href={dipUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-3 self-start inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs sm:text-sm font-black shadow-md transition-colors"
                  >
                    <span>Launch dip.zevizar.com</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Bottom Card Note */}
            <div className="pt-3 border-t border-white/20 flex items-center justify-between text-xs text-slate-100 font-bold drop-shadow-[0_1px_2px_rgba(0,0,0,0.95)]">
              <span>High-End Resilience Technology &amp; Academic Partnership</span>
              <span className="font-mono text-white font-black">Live Platforms</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
