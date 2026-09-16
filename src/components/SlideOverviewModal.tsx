import React from 'react';
import { X, Layers, ExternalLink } from 'lucide-react';
import { SlideInfo } from '../types';

interface SlideOverviewModalProps {
  slides: SlideInfo[];
  currentSlide: number;
  isOpen: boolean;
  onClose: () => void;
  onSelectSlide: (num: number) => void;
}

export const SlideOverviewModal: React.FC<SlideOverviewModalProps> = ({
  slides,
  currentSlide,
  isOpen,
  onClose,
  onSelectSlide,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[2000] bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 @sm:p-6 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl border border-slate-200 max-w-4xl w-full max-h-[88vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-sky-600" />
            <h2 className="text-base font-bold text-slate-800">Slide Deck Overview ({slides.length} Slides)</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Slide Grid */}
        <div className="p-6 overflow-y-auto grid grid-cols-1 @sm:grid-cols-2 @md:grid-cols-3 @lg:grid-cols-4 gap-4">
          {slides.map((s) => {
            const isActive = s.number === currentSlide;
            return (
              <button
                key={s.id}
                onClick={() => {
                  onSelectSlide(s.number);
                  onClose();
                }}
                className={`text-left p-3.5 rounded-xl border transition-all flex flex-col justify-between h-[130px] group cursor-pointer ${
                  isActive
                    ? 'border-sky-500 bg-sky-50/70 shadow-md ring-2 ring-sky-400/30'
                    : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50 hover:shadow-xs'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <span
                    className={`font-mono text-[11px] font-bold px-2 py-0.5 rounded-full ${
                      isActive ? 'bg-sky-600 text-white' : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    Slide {s.number}
                  </span>
                  <span className="text-[10px] uppercase tracking-wider font-semibold text-slate-400">
                    {s.category}
                  </span>
                </div>
                <p className="text-xs font-bold text-slate-800 line-clamp-2 mt-2 group-hover:text-sky-700 transition-colors">
                  {s.title}
                </p>
                <div className="flex items-center justify-end text-slate-400 group-hover:text-sky-600">
                  <ExternalLink className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100" />
                </div>
              </button>
            );
          })}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-slate-100 bg-slate-50 flex items-center justify-between text-xs text-slate-500">
          <span>Keyboard shortcuts: <kbd className="font-mono bg-white px-1.5 py-0.5 border rounded">←</kbd> / <kbd className="font-mono bg-white px-1.5 py-0.5 border rounded">→</kbd> or <kbd className="font-mono bg-white px-1.5 py-0.5 border rounded">Space</kbd></span>
          <span>Click any card to jump immediately</span>
        </div>
      </div>
    </div>
  );
};
