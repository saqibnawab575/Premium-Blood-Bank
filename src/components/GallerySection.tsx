import React, { useState, useEffect, useRef } from 'react';
import { GalleryItem } from '../types';
import {
  Image as ImageIcon,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  ZoomIn,
  X,
  Tag,
  Sparkles,
} from 'lucide-react';

interface GallerySectionProps {
  items: GalleryItem[];
}

export const GallerySection: React.FC<GallerySectionProps> = ({ items }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [activePhoto, setActivePhoto] = useState<GalleryItem | null>(null);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  const categories = [
    'All',
    'Blood Donation',
    'Blood Bank',
    'Facilities',
    'Events',
  ];

  const sortedItems = [...items].sort((a, b) => a.order - b.order);

  const filteredItems = sortedItems.filter((item) =>
    selectedCategory === 'All' ? true : item.category === selectedCategory
  );

  const totalSlides = filteredItems.length;

  // Reset index if category changes
  useEffect(() => {
    setCurrentIndex(0);
  }, [selectedCategory]);

  // Auto-play timer (slides one by one every 3.8 seconds)
  useEffect(() => {
    if (!isPlaying || totalSlides <= 1) return;

    autoPlayRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalSlides);
    }, 3800);

    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [isPlaying, totalSlides, currentIndex]);

  const handleNext = () => {
    if (totalSlides <= 1) return;
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  };

  const handlePrev = () => {
    if (totalSlides <= 1) return;
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const currentSlide = filteredItems[currentIndex] || filteredItems[0];

  return (
    <section id="gallery" className="py-16 md:py-24 bg-white dark:bg-slate-900 transition-colors duration-300 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-100 dark:bg-red-950/60 text-red-700 dark:text-red-300 text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-red-600" />
            <span>Interactive Visual Showcase</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0c2e59] dark:text-white tracking-tight">
            Clinical Photo Gallery &amp; Facilities
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            Take a visual tour inside our medical laboratories, refrigerated cold-chain suites,
            and voluntary blood donation camps in Rawalpindi.
          </p>

          {/* Filter Categories */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#c4122f] text-white shadow-md shadow-red-500/20'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {totalSlides === 0 ? (
          <div className="text-center py-16 bg-slate-50 dark:bg-slate-800/50 rounded-3xl border border-dashed border-slate-300 dark:border-slate-700">
            <ImageIcon className="w-10 h-10 text-slate-400 mx-auto mb-3" />
            <p className="text-sm text-slate-500 dark:text-slate-400">
              No photos currently listed under “{selectedCategory}”.
            </p>
          </div>
        ) : (
          <div
            className="relative max-w-5xl mx-auto"
            onMouseEnter={() => setIsPlaying(false)}
            onMouseLeave={() => setIsPlaying(true)}
          >
            {/* Main Cinema Slider Frame */}
            <div className="relative w-full h-[320px] sm:h-[440px] md:h-[520px] rounded-3xl overflow-hidden shadow-2xl bg-slate-950 border border-slate-200 dark:border-slate-800 group">
              {/* Image Transition */}
              <div className="relative w-full h-full">
                <img
                  src={currentSlide.imageUrl}
                  alt={currentSlide.title}
                  className="w-full h-full object-cover transition-all duration-700 ease-out transform scale-100"
                />
                {/* Vignette & Gradients */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-slate-950/20" />
              </div>

              {/* Top Controls Bar */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-20">
                {/* Category & Counter Badge */}
                <div className="flex items-center gap-2">
                  <div className="px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5 border border-white/10">
                    <Tag className="w-3 h-3 text-red-400" />
                    <span>{currentSlide.category}</span>
                  </div>
                  <div className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-xs font-mono font-bold text-slate-200 border border-white/10">
                    {String(currentIndex + 1).padStart(2, '0')} / {String(totalSlides).padStart(2, '0')}
                  </div>
                </div>

                {/* Right controls: Play/Pause & Fullscreen Zoom */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="p-2.5 rounded-full bg-slate-900/80 hover:bg-slate-900 text-white backdrop-blur-md border border-white/10 transition-transform active:scale-95 cursor-pointer"
                    title={isPlaying ? 'Pause Auto-slide' : 'Resume Auto-slide'}
                    aria-label="Toggle Auto Play"
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white" />}
                  </button>
                  <button
                    onClick={() => setActivePhoto(currentSlide)}
                    className="p-2.5 rounded-full bg-slate-900/80 hover:bg-slate-900 text-white backdrop-blur-md border border-white/10 transition-transform active:scale-95 cursor-pointer"
                    title="View Full Size"
                    aria-label="Zoom Photo"
                  >
                    <ZoomIn className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Prev / Next Arrows */}
              <button
                onClick={handlePrev}
                className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/50 hover:bg-red-600 text-white backdrop-blur-md flex items-center justify-center transition-all duration-200 opacity-90 hover:opacity-100 hover:scale-110 active:scale-95 z-20 cursor-pointer border border-white/15"
                aria-label="Previous Slide"
              >
                <ChevronLeft className="w-6 h-6 -ml-0.5" />
              </button>

              <button
                onClick={handleNext}
                className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/50 hover:bg-red-600 text-white backdrop-blur-md flex items-center justify-center transition-all duration-200 opacity-90 hover:opacity-100 hover:scale-110 active:scale-95 z-20 cursor-pointer border border-white/15"
                aria-label="Next Slide"
              >
                <ChevronRight className="w-6 h-6 -mr-0.5" />
              </button>

              {/* Bottom Caption Overlay */}
              <div className="absolute bottom-0 inset-x-0 p-6 sm:p-8 z-20">
                <div className="max-w-2xl animate-in fade-in duration-300">
                  <h3 className="text-xl sm:text-2xl font-black text-white drop-shadow-md">
                    {currentSlide.title}
                  </h3>
                  <p className="mt-1.5 text-xs sm:text-sm text-slate-200 drop-shadow line-clamp-2 leading-relaxed">
                    {currentSlide.caption}
                  </p>
                </div>

                {/* Progress Indicators */}
                <div className="mt-5 flex items-center gap-2">
                  {filteredItems.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentIndex(idx)}
                      className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                        currentIndex === idx
                          ? 'w-8 bg-red-500'
                          : 'w-2 bg-white/40 hover:bg-white/70'
                      }`}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Thumbnail Strip (Click to Jump) */}
            <div className="mt-4 flex items-center justify-center gap-2.5 overflow-x-auto py-2 px-1">
              {filteredItems.map((item, idx) => (
                <button
                  key={item.id}
                  onClick={() => setCurrentIndex(idx)}
                  className={`relative shrink-0 w-20 h-14 sm:w-24 sm:h-16 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                    currentIndex === idx
                      ? 'border-red-600 scale-105 shadow-md shadow-red-500/30 ring-2 ring-red-400/50'
                      : 'border-slate-200 dark:border-slate-700 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Lightbox Zoom Modal */}
        {activePhoto && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md animate-in fade-in duration-200"
            onClick={() => setActivePhoto(null)}
          >
            <div
              className="relative max-w-4xl w-full bg-slate-900 rounded-3xl overflow-hidden border border-slate-700 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setActivePhoto(null)}
                className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-black/60 text-white hover:bg-red-600 transition-colors cursor-pointer"
                aria-label="Close Preview"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="max-h-[75vh] w-full bg-black flex items-center justify-center overflow-hidden">
                <img
                  src={activePhoto.imageUrl}
                  alt={activePhoto.title}
                  className="w-full max-h-[75vh] object-contain"
                />
              </div>

              <div className="p-6 bg-slate-900 text-white">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-red-600 text-[10px] font-bold uppercase tracking-wider">
                    {activePhoto.category}
                  </span>
                </div>
                <h3 className="text-xl font-bold">{activePhoto.title}</h3>
                <p className="text-sm text-slate-300 mt-1">{activePhoto.caption}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
