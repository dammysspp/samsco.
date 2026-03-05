import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    // Only enable on non-touch devices
    if (window.matchMedia("(pointer: fine)").matches) {
        const onMouseMove = (e: MouseEvent) => {
            gsap.to(cursor, { 
                x: e.clientX, 
                y: e.clientY, 
                duration: 0.1, 
                ease: "power2.out" 
            });
        };

        const onHoverStart = () => {
            gsap.to(cursor, { 
                width: 50, 
                height: 50, 
                backgroundColor: 'rgba(0, 240, 255, 0.2)', 
                borderColor: 'transparent',
                backdropFilter: 'blur(2px)',
                duration: 0.3 
            });
        };

        const onHoverEnd = () => {
            gsap.to(cursor, { 
                width: 20, 
                height: 20, 
                backgroundColor: 'transparent', 
                borderColor: 'var(--neon-blue)',
                backdropFilter: 'none',
                duration: 0.3 
            });
        };

        document.addEventListener('mousemove', onMouseMove);
        
        // Add listeners to interactive elements
        const interactiveSelectors = 'a, button, .interactive, input, textarea, .glass-card';
        const addListeners = () => {
            document.querySelectorAll(interactiveSelectors).forEach(el => {
                el.addEventListener('mouseenter', onHoverStart);
                el.addEventListener('mouseleave', onHoverEnd);
            });
        };

        // Initial add
        addListeners();

        // Re-add listeners periodically for dynamic content (simple approach)
        const observer = new MutationObserver(addListeners);
        observer.observe(document.body, { childList: true, subtree: true });

        return () => {
            document.removeEventListener('mousemove', onMouseMove);
            observer.disconnect();
        };
    }
  }, []);

  return (
    <div 
        ref={cursorRef} 
        className="fixed top-0 left-0 w-5 h-5 border-2 border-cyan-400 rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 mix-blend-difference hidden md:block"
        style={{ borderColor: 'var(--neon-blue)' }}
    />
  );
};

export default CustomCursor;