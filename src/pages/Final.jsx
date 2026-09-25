import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { RefreshCcw } from 'lucide-react';
import { usePlan } from '../hooks/usePlan';
import { HER_NAME } from '../config/personalization';

const Final = () => {
  const { plan, setStep } = usePlan();
  const containerRef = useRef(null);
  const elementsRef = useRef([]);

  useEffect(() => {
    gsap.fromTo(elementsRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.2, ease: 'power3.out', delay: 0.2 }
    );
  }, []);

  const handleReset = () => {
    gsap.to(containerRef.current, {
      opacity: 0,
      duration: 0.4,
      onComplete: () => setStep('movies')
    });
  };

  return (
    <div ref={containerRef} className="flex-1 flex flex-col items-center justify-center text-center pb-12">
      <h2 
        ref={el => elementsRef.current[0] = el}
        className="text-6xl font-serif text-primary mb-12 opacity-0"
      >
        Done. 🎬
      </h2>
      
      <div 
        ref={el => elementsRef.current[1] = el}
        className="opacity-0 mb-8"
      >
        <img src={plan.selectedMovie?.posterUrl} alt={plan.selectedMovie?.title} className="w-44 aspect-[2/3] object-cover rounded-2xl mx-auto mb-6 shadow-2xl border border-white/10" />
        <p className="text-xl font-serif text-white mb-2">{plan.selectedMovie?.title}</p>
        <p className="text-secondary">Looks like we have a movie.</p>
      </div>

      <div 
        ref={el => elementsRef.current[2] = el}
        className="opacity-0 mb-16"
      >
        <p className="text-lg text-primary italic">See you soon, {HER_NAME}. :)</p>
      </div>

      <button 
        ref={el => elementsRef.current[3] = el}
        onClick={handleReset}
        className="opacity-0 flex items-center justify-center gap-2 py-3 text-secondary/60 hover:text-primary transition-colors text-sm font-medium"
      >
        <RefreshCcw size={14} /> Pick another movie
      </button>
    </div>
  );
};

export default Final;
