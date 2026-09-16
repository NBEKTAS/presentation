import React, { useState, useEffect, useRef } from 'react';

interface SlideContainerProps {
  children: React.ReactNode;
}

export const SlideContainer: React.FC<SlideContainerProps> = ({ children }) => {
  // Define reference design dimensions (standard 16:9 laptop slide)
  const targetWidth = 1440;
  const targetHeight = 810;
  const targetRatio = targetWidth / targetHeight;

  const wrapperRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      if (!wrapperRef.current) return;

      const rect = wrapperRef.current.getBoundingClientRect();
      const parentWidth = rect.width;
      const parentHeight = rect.height;
      
      if (parentWidth === 0 || parentHeight === 0) return;

      const currentRatio = parentWidth / parentHeight;
      let newScale = 1;

      if (currentRatio > targetRatio) {
        // The screen/parent is extra wide -> HEIGHT is the limiting factor
        newScale = parentHeight / targetHeight;
      } else {
        // The screen/parent is extra tall/narrow -> WIDTH is the limiting factor
        newScale = parentWidth / targetWidth;
      }

      // Add a slight safety margin to prevent edge cutting
      setScale(newScale * 0.98);
    };

    const observer = new ResizeObserver(() => {
      handleResize();
    });

    if (wrapperRef.current) {
      observer.observe(wrapperRef.current);
    }

    handleResize();

    return () => observer.disconnect();
  }, [targetRatio]);

  return (
    <div
      ref={wrapperRef}
      className="w-full h-full flex items-center justify-center overflow-hidden"
    >
      <div
        ref={containerRef}
        style={{
          width: `${targetWidth}px`,
          height: `${targetHeight}px`,
          transform: `scale(${scale})`,
          transformOrigin: 'center center',
          flexShrink: 0,
          position: 'relative',
        }}
      >
        {children}
      </div>
    </div>
  );
};
