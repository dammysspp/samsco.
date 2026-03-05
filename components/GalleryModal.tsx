import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { GalleryItem } from '../data';
import { X, ExternalLink, Filter } from 'lucide-react';

interface GalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: GalleryItem[];
  onItemClick: (item: GalleryItem) => void;
}

const GalleryModal: React.FC<GalleryModalProps> = ({ isOpen, onClose, items, onItemClick }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState<string>("All");

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // Reset filter when opening
      setActiveCategory("All");
      
      gsap.fromTo(modalRef.current, 
        { opacity: 0 }, 
        { opacity: 1, duration: 0.5 }
      );
      gsap.fromTo(contentRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, delay: 0.2, ease: "power3.out" }
      );
      
      // Animate items in
      gsap.fromTo(".gallery-modal-item", 
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.05, delay: 0.3 }
      );

    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isOpen]);

  // Derived state for filtered items
  const filteredItems = activeCategory === "All" 
    ? items 
    : items.filter(item => item.category === activeCategory);

  const categories: string[] = ["All", ...Array.from(new Set(items.map(i => i.category)))];

  if (!isOpen) return null;

  return (
    <div ref={modalRef} className="fixed inset-0 z-[50] bg-black/85 backdrop-blur-xl flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center p-6 md:p-8 border-b border-white/10 z-10">
        <div>
          <h2 className="text-2xl font-bold tracking-widest">VISUAL VAULT</h2>
          <div className="flex items-center gap-3 mt-1">
             <span className="text-xs text-blue-500 font-mono">{filteredItems.length} ITEMS</span>
             {activeCategory !== "All" && (
                <button 
                  onClick={() => setActiveCategory("All")}
                  className="text-[10px] border border-white/20 px-2 py-0.5 rounded hover:bg-white hover:text-black transition-colors"
                >
                  CLEAR FILTER: {activeCategory}
                </button>
             )}
          </div>
        </div>
        <button 
          onClick={onClose} 
          className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-all interactive"
        >
          <X size={24} />
        </button>
      </div>

      {/* Filter Bar (Horizontal Scroll on Mobile) */}
      <div className="w-full overflow-x-auto border-b border-white/5 bg-white/5 py-4 px-6 md:px-8">
         <div className="flex gap-4 min-w-max">
            {categories.map(cat => (
                <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`text-xs font-bold tracking-widest px-4 py-2 rounded-full border transition-all interactive ${
                        activeCategory === cat 
                        ? 'bg-blue-500 border-blue-500 text-white' 
                        : 'border-white/10 hover:border-white/40 text-gray-400'
                    }`}
                >
                    {cat.toUpperCase()}
                </button>
            ))}
         </div>
      </div>

      {/* Scrollable Grid */}
      <div className="flex-1 overflow-y-auto p-4 md:p-10 custom-scrollbar">
        <div ref={contentRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {filteredItems.map((item) => (
            <div 
              key={item.id} 
              className="gallery-modal-item group relative aspect-square bg-gray-900 rounded-xl overflow-hidden cursor-pointer border border-white/5 hover:border-blue-500/50 transition-all interactive"
              onClick={() => onItemClick(item)}
            >
              <img 
                src={item.imageUrl} 
                alt={item.title} 
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-70 group-hover:opacity-100"
              />
              
              {/* Overlay Content */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span 
                    onClick={(e) => {
                        e.stopPropagation();
                        setActiveCategory(item.category);
                    }}
                    className="self-start text-blue-400 text-xs font-bold tracking-widest mb-1 hover:text-white hover:underline cursor-pointer"
                >
                    {item.category.toUpperCase()}
                </span>
                <h3 className="text-xl font-bold text-white leading-tight">{item.title}</h3>
                <div className="mt-4 flex items-center gap-2 text-xs text-gray-300">
                    <span>View Project</span>
                    <ExternalLink size={12} />
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center py-10 text-gray-600 text-xs tracking-widest">
            {filteredItems.length === 0 ? "NO ITEMS FOUND IN THIS CATEGORY" : "END OF ARCHIVE"}
        </div>
      </div>
    </div>
  );
};

export default GalleryModal;