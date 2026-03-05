import React, { useState, useEffect } from 'react';

interface HoverLoopTextProps {
  mainText: string;
  alternates: string[];
}

const HoverLoopText: React.FC<HoverLoopTextProps> = ({ mainText, alternates }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [index, setIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let interval: number;
    
    if (isHovered) {
      // Small delay to make it feel organic, or immediate. Let's do immediate fade in.
      setIsVisible(true);
      
      interval = window.setInterval(() => {
        setIndex((prev) => (prev + 1) % alternates.length);
      }, 2000); 
    } else {
      setIsVisible(false);
      setIndex(0);
    }
    
    return () => clearInterval(interval);
  }, [isHovered, alternates.length]);

  return (
    <span 
      className="relative inline-block cursor-help text-blue-500 border-b-2 border-blue-500/30 hover:border-blue-500 transition-colors"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {mainText}
      
      <div 
        className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-4 transition-all duration-300 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'}`}
      >
         <div className="bg-white text-black text-xs font-bold px-4 py-2 rounded-xl whitespace-nowrap shadow-[0_0_20px_rgba(37,99,235,0.3)] relative">
            {alternates[index]}
            {/* Speech bubble triangle */}
            <div className="absolute top-full left-1/2 -translate-x-1/2 border-[6px] border-transparent border-t-white"></div>
         </div>
      </div>
    </span>
  );
};

export default HoverLoopText;