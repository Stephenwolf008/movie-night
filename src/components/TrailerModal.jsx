import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { X, ArrowRight } from 'lucide-react';
import PrimaryButton from './PrimaryButton';

const TrailerModal = ({ movie, onClose, onSelect }) => {
  const overlayRef = useRef(null);
  const modalRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline();
    
    tl.fromTo(overlayRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.3, ease: 'power2.out' }
    )
    .fromTo(modalRef.current,
      { opacity: 0, scale: 0.95, y: 20 },
      { opacity: 1, scale: 1, y: 0, duration: 0.4, ease: 'power3.out' },
      "-=0.1"
    );
    
    // Prevent scrolling behind modal
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const handleClose = () => {
    const tl = gsap.timeline({ onComplete: onClose });
    
    tl.to(modalRef.current, { opacity: 0, scale: 0.95, y: 10, duration: 0.2, ease: 'power2.in' })
      .to(overlayRef.current, { opacity: 0, duration: 0.2 }, "-=0.1");
  };

  return (
    <div 
      ref={overlayRef} 
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto p-2 sm:p-4 bg-background/80 backdrop-blur-xl opacity-0"
    >
      <div 
        className="absolute inset-0"
        onClick={handleClose}
      />
      
      <div 
        ref={modalRef} 
        className="relative my-auto w-full max-w-2xl bg-surface border border-white/10 rounded-2xl sm:rounded-3xl overflow-y-auto overscroll-contain shadow-2xl opacity-0 flex flex-col max-h-[calc(100dvh-1rem)] sm:max-h-[90vh]"
      >
        <div className="sticky top-0 flex shrink-0 items-center justify-between p-3 sm:p-4 border-b border-white/5 bg-surface/95 backdrop-blur-md z-10">
          <div className="flex items-center gap-3">
            <div>
              <span className="text-xs font-medium tracking-widest text-accent uppercase">Official Trailer</span>
              <span className="block text-[11px] text-secondary/70 mt-1">Tap ▶ in the video to play</span>
            </div>
          </div>
          <button 
            onClick={handleClose}
            aria-label="Close trailer"
            className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-secondary hover:text-primary hover:bg-white/10 transition-colors"
          >
            <X size={18} />
          </button>
        </div>
        
        <div className="w-full shrink-0 aspect-video bg-black">
          <iframe 
            src={movie.trailerUrl} 
            title={`${movie.title} Trailer`}
            className="w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>
        
        <div className="p-4 sm:p-6 bg-surface flex flex-col gap-3 sm:gap-4">
          <div>
            <h3 className="font-serif text-2xl text-white mb-1">{movie.title}</h3>
            <p className="text-secondary text-sm">{movie.genre.join(' · ')}</p>
          </div>
          
          <PrimaryButton onClick={onSelect} className="mt-2 py-3">
            Choose this movie <ArrowRight size={18} />
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
};

export default TrailerModal;
