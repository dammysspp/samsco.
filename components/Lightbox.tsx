import React, { useEffect } from 'react';
import { GalleryItem } from '../data';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface LightboxProps {
  item: GalleryItem | null;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

const Lightbox: React.FC<LightboxProps> = ({ item, onClose, onNext, onPrev }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!item) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNext();
      if (e.key === 'ArrowLeft') onPrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [item, onClose, onNext, onPrev]);

  if (!item) return null;

  return (
    <div className="fixed inset-0 z-[60] bg-black/85 backdrop-blur-xl flex items-center justify-center p-4">
      {/* Controls */}
      <button onClick={onClose} className="absolute top-6 right-6 z-20 text-white/50 hover:text-white transition-colors interactive">
        <X size={40} />
      </button>

      <button onClick={onPrev} className="absolute left-4 md:left-10 z-20 text-white/30 hover:text-white transition-colors interactive">
        <ChevronLeft size={60} />
      </button>

      <button onClick={onNext} className="absolute right-4 md:right-10 z-20 text-white/30 hover:text-white transition-colors interactive">
        <ChevronRight size={60} />
      </button>

      {/* Main Content */}
      <div className="max-w-7xl w-full h-full flex flex-col md:flex-row gap-8 items-center justify-center">
        {/* Image Container */}
        <div className="relative w-full md:w-2/3 h-[50vh] md:h-[80vh] flex items-center justify-center">
          <img 
            src={item.imageUrl} 
            alt={item.title} 
            className="max-w-full max-h-full object-contain rounded-md shadow-2xl border border-white/10"
          />
        </div>

        {/* Info Container */}
        <div className="w-full md:w-1/3 text-left">
           <div className="border-l-2 border-blue-500 pl-6">
                <span className="text-blue-500 font-bold tracking-[0.2em] text-xs mb-2 block">{item.category.toUpperCase()}</span>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">{item.title}</h2>
                
                <div className="grid grid-cols-2 gap-4 mb-6 border-y border-white/10 py-4">
                    <div>
                        <h4 className="text-xs text-gray-500 font-bold mb-1">CLIENT</h4>
                        <p className="text-sm">{item.client}</p>
                    </div>
                    <div>
                        <h4 className="text-xs text-gray-500 font-bold mb-1">YEAR</h4>
                        <p className="text-sm">{item.year}</p>
                    </div>
                </div>

                <p className="text-gray-400 leading-relaxed font-light mb-6 text-lg">
                    {item.description}
                </p>

                <div className="flex flex-wrap gap-2">
                    {item.tags.map(tag => (
                        <span key={tag} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-gray-400">
                            {tag}
                        </span>
                    ))}
                </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Lightbox;