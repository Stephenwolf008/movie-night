import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { usePlan } from '../hooks/usePlan';
import { HER_NAME } from '../config/personalization';
import PrimaryButton from '../components/PrimaryButton';
import { submitChoice } from '../services/submitChoice';

const Confirmation = () => {
  const { plan, setStep } = usePlan();
  const containerRef = useRef(null);
  const elementsRef = useRef([]);

  useEffect(() => {
    gsap.fromTo(elementsRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.15, ease: 'power2.out' }
    );
  }, []);

  const handleConfirm = () => {
    // Capture the choice
    submitChoice({
      sessionId: plan.sessionId,
      movieId: plan.selectedMovie.id,
      movieTitle: plan.selectedMovie.title,
      trailerOpened: plan.trailerOpened,
      moodFilter: plan.moodFilter
    });

    gsap.to(containerRef.current, {
      opacity: 0,
      y: -20,
      duration: 0.5,
      ease: 'power2.in',
      onComplete: () => setStep('final')
    });
  };

  const handleBack = () => {
    gsap.to(containerRef.current, {
      opacity: 0,
      scale: 0.95,
      duration: 0.4,
      ease: 'power2.in',
      onComplete: () => setStep('movies')
    });
  };

  const movie = plan.selectedMovie;

  return (
    <div ref={containerRef} className="flex-1 flex flex-col pt-8 pb-4 text-center">
      <div 
        ref={el => elementsRef.current[0] = el} 
        className="opacity-0 mb-8"
      >
        <h2 className="text-3xl font-serif text-primary">Good choice, {HER_NAME}. ✨</h2>
      </div>

      <div 
        ref={el => elementsRef.current[1] = el}
        className="opacity-0 mx-auto w-48 aspect-[2/3] rounded-2xl overflow-hidden mb-6 shadow-2xl border border-white/10"
      >
        <img src={movie?.posterUrl} alt={movie?.title} className="w-full h-full object-cover" />
      </div>

      <div 
        ref={el => elementsRef.current[2] = el}
        className="opacity-0 mb-8"
      >
        <h3 className="text-2xl font-serif text-white mb-2">{movie?.title}</h3>
        <p className="text-sm text-secondary italic">"{movie?.description}"</p>
      </div>
      
      <div 
        ref={el => elementsRef.current[3] = el}
        className="opacity-0 mb-8"
      >
        <p className="text-primary font-medium">I think that's the one.</p>
      </div>

      <div 
        ref={el => elementsRef.current[4] = el}
        className="opacity-0 mt-auto flex flex-col gap-4 w-full max-w-xs mx-auto"
      >
        <PrimaryButton onClick={handleConfirm}>
          Yep, that's my movie <ArrowRight size={18} />
        </PrimaryButton>
        <button 
          onClick={handleBack}
          className="flex items-center justify-center gap-2 py-3 text-secondary hover:text-primary transition-colors text-sm font-medium"
        >
          <ArrowLeft size={14} /> Let me reconsider
        </button>
      </div>
    </div>
  );
};

export default Confirmation;
