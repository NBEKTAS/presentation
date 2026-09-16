import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Maximize2, Minimize2, Grid, Clock, Play, Pause, RotateCcw } from 'lucide-react';
import { SlideInfo } from '../types';

interface DeckNavProps {
  slides: SlideInfo[];
  currentSlide: number;
  onSelectSlide: (num: number) => void;
  onPrev: () => void;
  onNext: () => void;
  onToggleOverview: () => void;
  isFullscreen?: boolean;
}

export const DeckNav: React.FC<DeckNavProps> = ({
  slides,
  currentSlide,
  onSelectSlide,
  onPrev,
  onNext,
  onToggleOverview,
  isFullscreen: externalIsFullscreen,
}) => {
  const [internalFullscreen, setInternalFullscreen] = useState(false);
  const isFullscreen = externalIsFullscreen !== undefined ? externalIsFullscreen : internalFullscreen;
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);
  const [showTimer, setShowTimer] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (timerRunning) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timerRunning]);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => setInternalFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setInternalFullscreen(false)).catch(() => {});
    }
  };

  const formatTimer = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <header className="h-[52px] bg-white border-b border-slate-200 flex items-center justify-between px-4 z-[1000] select-none shadow-xs">
      {/* Left placeholder */}
      <div />

      {/* Center Deck Controls */}
      <div className="flex items-center gap-2">
        <button
          id="btnPrev"
          onClick={onPrev}
          disabled={currentSlide <= 1}
          className="h-8 px-3 rounded-md bg-white border border-slate-200 text-slate-700 text-xs font-semibold hover:bg-slate-50 hover:border-sky-500 hover:text-sky-600 disabled:opacity-40 disabled:pointer-events-none transition-all flex items-center gap-1 shadow-xs cursor-pointer"
          title="Previous Slide (← / Left Arrow)"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
          <span className="hidden md:inline">Prev</span>
        </button>

        <select
          id="slideSelect"
          value={currentSlide}
          onChange={(e) => {
            onSelectSlide(Number(e.target.value));
            e.target.blur();
          }}
          className="h-8 bg-slate-100 text-slate-800 border border-slate-200 px-2.5 rounded-md text-xs font-semibold outline-none cursor-pointer hover:bg-slate-200/70 transition-colors max-w-[190px] sm:max-w-[280px]"
        >
          {slides.map((s) => (
            <option key={s.id} value={s.number}>
              {s.shortTitle}
            </option>
          ))}
        </select>

        <span
          id="deckCounter"
          className="font-mono text-xs font-bold text-slate-500 min-w-[50px] text-center px-1"
        >
          {currentSlide} / {slides.length}
        </span>

        <button
          id="btnNext"
          onClick={onNext}
          disabled={currentSlide >= slides.length}
          className="h-8 px-3 rounded-md bg-white border border-slate-200 text-slate-700 text-xs font-semibold hover:bg-slate-50 hover:border-sky-500 hover:text-sky-600 disabled:opacity-40 disabled:pointer-events-none transition-all flex items-center gap-1 shadow-xs cursor-pointer"
          title="Next Slide (→ / Right Arrow or Space)"
        >
          <span className="hidden md:inline">Next</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Right Tools: Timer, Overview, Fullscreen */}
      <div className="flex items-center gap-1.5">
        {/* Presentation Timer */}
        {showTimer ? (
          <div className="flex items-center gap-1 bg-slate-100 border border-slate-200 rounded-md px-2 py-1 text-xs font-mono">
            <span className="font-bold text-slate-700">{formatTimer(timerSeconds)}</span>
            <button
              onClick={() => setTimerRunning(!timerRunning)}
              className="p-1 hover:text-sky-600 transition-colors"
              title={timerRunning ? 'Pause Timer' : 'Start Timer'}
            >
              {timerRunning ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
            </button>
            <button
              onClick={() => {
                setTimerRunning(false);
                setTimerSeconds(0);
              }}
              className="p-1 hover:text-rose-600 transition-colors"
              title="Reset Timer"
            >
              <RotateCcw className="w-3 h-3" />
            </button>
          </div>
        ) : (
          <button
            onClick={() => {
              setShowTimer(true);
              setTimerRunning(true);
            }}
            className="h-8 px-2 rounded-md bg-white border border-slate-200 text-slate-600 hover:text-sky-600 hover:border-sky-400 text-xs flex items-center gap-1 transition-all shadow-xs cursor-pointer"
            title="Start Presentation Timer"
          >
            <Clock className="w-3.5 h-3.5" />
            <span className="hidden lg:inline text-[11px]">Timer</span>
          </button>
        )}

        {/* Slide Overview Grid Button */}
        <button
          onClick={onToggleOverview}
          className="h-8 w-8 rounded-md bg-white border border-slate-200 text-slate-600 hover:text-sky-600 hover:border-sky-400 flex items-center justify-center transition-all shadow-xs cursor-pointer"
          title="Show All Slides Overview (Grid)"
        >
          <Grid className="w-3.5 h-3.5" />
        </button>

        {/* Fullscreen Button */}
        <button
          onClick={toggleFullscreen}
          className="h-8 w-8 rounded-md bg-white border border-slate-200 text-slate-600 hover:text-sky-600 hover:border-sky-400 flex items-center justify-center transition-all shadow-xs cursor-pointer"
          title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
        >
          {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
        </button>
      </div>
    </header>
  );
};
