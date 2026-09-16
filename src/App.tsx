import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { SLIDES_LIST } from './data/frameworkData';
import { DeckNav } from './components/DeckNav';
import { SlideOverviewModal } from './components/SlideOverviewModal';

// Slide components
import { Slide1Title } from './components/Slide1Title';
import { Slide2SystemicRisk } from './components/Slide2SystemicRisk';
import { Slide3IzmirFocus } from './components/Slide3IzmirFocus';
import { Slide4LearningCycle } from './components/Slide4LearningCycle';
import { Slide5NestedNexus } from './components/Slide5NestedNexus';
import { Slide7Investment } from './components/Slide7Investment';
import { Slide8Recovery } from './components/Slide8Recovery';
import { Slide11Boundaries } from './components/Slide11Boundaries';
import { Slide9Takeaways } from './components/Slide9Takeaways';
import { Slide10ThankYou } from './components/Slide10ThankYou';

export default function App() {
  // Initialize slide from URL hash or localStorage or fallback to 1
  const [currentSlide, setCurrentSlide] = useState<number>(() => {
    try {
      // 1. Check URL hash first, e.g. #slide-5 or #5
      const hash = window.location.hash;
      if (hash) {
        const match = hash.match(/(?:slide-)?(\d+)/i);
        if (match) {
          const parsed = parseInt(match[1], 10);
          if (parsed >= 1 && parsed <= SLIDES_LIST.length) {
            return parsed;
          }
        }
      }
      // 2. Fallback to localStorage
      const saved = localStorage.getItem('ecee_deck_current_slide');
      if (saved) {
        const parsed = parseInt(saved, 10);
        if (parsed >= 1 && parsed <= SLIDES_LIST.length) {
          return parsed;
        }
      }
    } catch {
      // ignore storage/URL access errors
    }
    return 1;
  });

  const [isOverviewOpen, setIsOverviewOpen] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const goToSlide = (num: number) => {
    if (num >= 1 && num <= SLIDES_LIST.length) {
      setCurrentSlide(num);
      try {
        localStorage.setItem('ecee_deck_current_slide', num.toString());
        window.history.replaceState(null, '', `#slide-${num}`);
      } catch {
        // ignore
      }
    }
  };

  // Sync state on hash change (e.g. browser back/forward buttons)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash) {
        const match = hash.match(/(?:slide-)?(\d+)/i);
        if (match) {
          const parsed = parseInt(match[1], 10);
          if (parsed >= 1 && parsed <= SLIDES_LIST.length && parsed !== currentSlide) {
            setCurrentSlide(parsed);
            try {
              localStorage.setItem('ecee_deck_current_slide', parsed.toString());
            } catch {
              // ignore
            }
          }
        }
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [currentSlide]);

  // Ensure current slide is reflected in hash and storage on initial load
  useEffect(() => {
    try {
      localStorage.setItem('ecee_deck_current_slide', currentSlide.toString());
      if (window.location.hash !== `#slide-${currentSlide}`) {
        window.history.replaceState(null, '', `#slide-${currentSlide}`);
      }
    } catch {
      // ignore
    }
  }, [currentSlide]);

  const handlePrev = () => {
    goToSlide(currentSlide - 1);
  };

  const handleNext = () => {
    goToSlide(currentSlide + 1);
  };

  // Keyboard navigation & direction buttons handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      // Don't trigger if typing in text inputs or textareas
      if (target && ['INPUT', 'TEXTAREA'].includes(target.tagName)) {
        return;
      }

      // If user had focused a select, blur it so direction keys switch slides
      if (target && target.tagName === 'SELECT') {
        target.blur();
      }

      // Next slide: Right arrow, Down arrow, PageDown, Space
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === ' ') {
        e.preventDefault();
        goToSlide(currentSlide + 1);
      }
      // Previous slide: Left arrow, Up arrow, PageUp, Backspace
      else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp' || e.key === 'PageUp' || e.key === 'Backspace') {
        e.preventDefault();
        goToSlide(currentSlide - 1);
      }
      // Jump to first / last slide
      else if (e.key === 'Home') {
        e.preventDefault();
        goToSlide(1);
      } else if (e.key === 'End') {
        e.preventDefault();
        goToSlide(SLIDES_LIST.length);
      } else if (e.key === 'Escape') {
        setIsOverviewOpen(false);
      } else if (e.key.toLowerCase() === 'g') {
        setIsOverviewOpen((prev) => !prev);
      } else if (e.key.toLowerCase() === 'f' && !e.ctrlKey && !e.metaKey) {
        e.preventDefault();
        if (!document.fullscreenElement) {
          document.documentElement.requestFullscreen().catch(() => {});
        } else {
          document.exitFullscreen().catch(() => {});
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlide]);

  // Render the active slide component
  const renderSlideContent = () => {
    switch (currentSlide) {
      case 1:
        return <Slide1Title />;
      case 2:
        return <Slide2SystemicRisk />;
      case 3:
        return <Slide3IzmirFocus />;
      case 4:
        return <Slide4LearningCycle />;
      case 5:
        return <Slide5NestedNexus />;
      case 6:
        return <Slide8Recovery />;
      case 7:
        return <Slide7Investment />;
      case 8:
        return <Slide11Boundaries />;
      case 9:
        return <Slide9Takeaways />;
      case 10:
        return <Slide10ThankYou onRestart={() => goToSlide(1)} />;
      default:
        return <Slide1Title />;
    }
  };

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-[#f8fafc] text-[#0f172a] font-sans antialiased">
      {/* Top Deck Navigation */}
      <DeckNav
        slides={SLIDES_LIST}
        currentSlide={currentSlide}
        onSelectSlide={goToSlide}
        onPrev={handlePrev}
        onNext={handleNext}
        onToggleOverview={() => setIsOverviewOpen(true)}
        isFullscreen={isFullscreen}
      />

      {/* Main Slide Presentation Stage */}
      <main className="flex-1 min-h-0 w-full relative overflow-y-auto overflow-x-hidden flex flex-col p-2 sm:p-4 lg:p-6 items-stretch">
        {/* On-screen Directional Floating Buttons */}
        {currentSlide > 1 && (
          <button
            onClick={handlePrev}
            className="fixed left-2 sm:left-3 top-1/2 -translate-y-1/2 z-40 p-2 sm:p-2.5 rounded-full bg-white/80 hover:bg-white text-slate-600 hover:text-sky-600 shadow-md border border-slate-200 backdrop-blur-xs transition-all hover:scale-110 opacity-40 hover:opacity-100 cursor-pointer group"
            title="Previous Slide (← / ↑ / Page Up)"
            aria-label="Previous Slide"
          >
            <ChevronLeft className="w-5 h-5 transition-transform group-hover:-translate-x-0.5" />
          </button>
        )}

        {currentSlide < SLIDES_LIST.length && (
          <button
            onClick={handleNext}
            className="fixed right-2 sm:right-3 top-1/2 -translate-y-1/2 z-40 p-2 sm:p-2.5 rounded-full bg-white/80 hover:bg-white text-slate-600 hover:text-sky-600 shadow-md border border-slate-200 backdrop-blur-xs transition-all hover:scale-110 opacity-40 hover:opacity-100 cursor-pointer group"
            title="Next Slide (→ / ↓ / Page Down / Space)"
            aria-label="Next Slide"
          >
            <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5" />
          </button>
        )}

        {renderSlideContent()}
      </main>

      {/* Slide Deck Grid Overview Modal */}
      <SlideOverviewModal
        slides={SLIDES_LIST}
        currentSlide={currentSlide}
        isOpen={isOverviewOpen}
        onClose={() => setIsOverviewOpen(false)}
        onSelectSlide={goToSlide}
      />
    </div>
  );
}
