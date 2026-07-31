import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from 'lucide-react';

interface ImageLightboxProps {
  images: string[];
  initialIndex?: number;
  isOpen: boolean;
  onClose: () => void;
}

export const ImageLightbox: React.FC<ImageLightboxProps> = ({
  images,
  initialIndex = 0,
  isOpen,
  onClose,
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isZoomed, setIsZoomed] = useState(false);

  if (!isOpen || images.length === 0) return null;

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsZoomed(false);
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsZoomed(false);
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col justify-between p-4 md:p-8 animate-fadeIn"
    >
      {/* TOP CONTROLS */}
      <div className="flex items-center justify-between text-white z-10">
        <span className="text-[13px] font-medium tracking-wide">
          {currentIndex + 1} / {images.length}
        </span>
        <div className="flex items-center gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsZoomed(!isZoomed);
            }}
            className="w-10 h-10 flex items-center justify-center hover:bg-white/10 text-white rounded-full transition-colors"
            title="Toggle Zoom"
          >
            {isZoomed ? <ZoomOut className="w-5 h-5" /> : <ZoomIn className="w-5 h-5" />}
          </button>
          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center hover:bg-white/10 text-white rounded-full transition-colors"
            title="Close"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* MAIN DISPLAY */}
      <div className="relative flex-1 flex items-center justify-center overflow-hidden my-4">
        
        {images.length > 1 && (
          <button
            onClick={handlePrev}
            className="absolute left-2 md:left-6 z-20 w-10 h-10 flex items-center justify-center bg-white/10 text-white hover:bg-white/20 rounded-full transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        )}

        <img
          src={images[currentIndex]}
          alt={`Room photo ${currentIndex + 1}`}
          onClick={(e) => e.stopPropagation()}
          className={`max-h-full max-w-full object-contain transition-transform duration-300 ${
            isZoomed ? 'scale-150 cursor-zoom-out' : 'scale-100 cursor-zoom-in'
          }`}
        />

        {images.length > 1 && (
          <button
            onClick={handleNext}
            className="absolute right-2 md:right-6 z-20 w-10 h-10 flex items-center justify-center bg-white/10 text-white hover:bg-white/20 rounded-full transition-colors"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        )}

      </div>

      {/* THUMBNAILS */}
      {images.length > 1 && (
        <div className="flex items-center justify-center gap-2 overflow-x-auto py-2">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={(e) => {
                e.stopPropagation();
                setIsZoomed(false);
                setCurrentIndex(idx);
              }}
              className={`w-16 h-12 overflow-hidden border-2 transition-all shrink-0 ${
                idx === currentIndex ? 'border-white scale-105' : 'border-transparent opacity-50 hover:opacity-100'
              }`}
            >
              <img src={img} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}

    </div>
  );
};
