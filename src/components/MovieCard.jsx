import React, { useRef } from 'react';
import gsap from 'gsap';
import { Play, ArrowRight } from 'lucide-react';

const MovieCard = ({ movie, onSelect, onWatchTrailer }) => {
  const cardRef = useRef(null);
  const imageRef = useRef(null);
  const gradientRef = useRef(null);

  const handleMouseEnter = () => {
    // Only animate on devices that support hover
    if (window.matchMedia('(hover: hover)').matches) {
      gsap.to(imageRef.current, { scale: 1.05, duration: 0.6, ease: 'power2.out' });
      gsap.to(cardRef.current, { y: -4, duration: 0.4, ease: 'power2.out' });
      gsap.to(gradientRef.current, { opacity: 0.8, duration: 0.4 });
    }
  };

  const handleMouseLeave = () => {
    if (window.matchMedia('(hover: hover)').matches) {
      gsap.to(imageRef.current, { scale: 1, duration: 0.6, ease: 'power2.out' });
      gsap.to(cardRef.current, { y: 0, duration: 0.4, ease: 'power2.out' });
      gsap.to(gradientRef.current, { opacity: 0.5, duration: 0.4 });
    }
  };

  return (
    <div 
      ref={cardRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="glass-card rounded-3xl overflow-hidden flex flex-col h-full bg-surface-highlight/40 border-white/5"
    >
      <div className="relative aspect-[2/3] overflow-hidden bg-surface-highlight">
        <img 
          ref={imageRef}
          src={movie.posterUrl} 
          alt={movie.title} 
          className="w-full h-full object-cover origin-center transition-transform duration-700"
          loading="lazy"
        />
        <div ref={gradientRef} className="absolute inset-0 bg-gradient-to-t from-surface via-surface/40 to-transparent opacity-50 transition-opacity duration-500" />
        
        <div className="absolute bottom-0 left-0 w-full p-5">
          <div className="flex flex-wrap gap-2 mb-3">
            <span className="text-[10px] font-medium px-2 py-1 rounded-md bg-black/40 backdrop-blur-md border border-white/10 text-primary uppercase tracking-wider">
              {movie.language}
            </span>
            <span className="text-[10px] font-medium px-2 py-1 rounded-md bg-black/40 backdrop-blur-md border border-white/10 text-primary uppercase tracking-wider">
              {movie.certification}
            </span>
          </div>
          <h3 className="font-serif text-2xl font-medium text-white leading-tight mb-1">
            {movie.title}
          </h3>
          <p className="text-xs text-accent">
            {movie.genre.join(' · ')}
          </p>
        </div>
      </div>
      
      <div className="p-5 flex flex-col gap-5 flex-1">
        <p className="text-sm text-secondary/90 italic leading-relaxed">
          "{movie.description}"
        </p>
        
        <div className="mt-auto flex flex-col gap-3">
          <button 
            onClick={() => onWatchTrailer(movie)}
            className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 text-primary text-sm font-medium transition-colors group"
          >
            <Play size={14} className="group-hover:text-accent transition-colors" /> Watch trailer
          </button>
          
          <button 
            onClick={() => onSelect(movie)}
            className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-accent text-background hover:bg-white text-sm font-medium transition-colors"
          >
            Choose this <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
