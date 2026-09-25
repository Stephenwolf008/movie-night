import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ArrowRight } from 'lucide-react';
import { usePlan } from '../hooks/usePlan';
import PrimaryButton from '../components/PrimaryButton';


const Landing = () => {
  const { setStep } = usePlan();
  const containerRef = useRef(null);
  const text1Ref = useRef(null);
  const text2Ref = useRef(null);
  const text3Ref = useRef(null);
  const btnRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline();
    
    tl.fromTo(text1Ref.current, 
      { y: 30, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 1.2, ease: 'power3.out', delay: 0.2 }
    )
    .fromTo(text2Ref.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power2.out' },
      "-=0.6"
    )
    .fromTo(text3Ref.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power2.out' },
      "+=0.4"
    )
    .fromTo(btnRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' },
      "+=0.4"
    );
  }, []);

  const handleNext = () => {
    gsap.to(containerRef.current, {
      y: -50,
      opacity: 0,
      duration: 0.6,
      ease: 'power2.in',
      onComplete: () => setStep('movies')
    });
  };

  return (
    <div ref={containerRef} className="flex-1 flex flex-col items-center justify-center text-center">
      <div className="flex-1 flex flex-col justify-center max-w-sm w-full">
        <h1 ref={text1Ref} className="text-4xl md:text-5xl font-serif text-primary mb-6 opacity-0">
          Hey, Vanshita 👋
        </h1>
        
        <p ref={text2Ref} className="text-secondary text-lg mb-8 opacity-0">
          I heard choosing a movie is harder than watching one.
        </p>
        
        <p ref={text3Ref} className="text-primary italic font-serif text-xl mb-12 opacity-0">
          So... I made this a little easier.
        </p>
      </div>

      <div ref={btnRef} className="w-full opacity-0">
        <PrimaryButton onClick={handleNext}>
          Help me choose <ArrowRight size={18} />
        </PrimaryButton>
        <p className="text-xs text-secondary/60 mt-6 font-medium tracking-widest uppercase">
          Just pick the one you'd actually watch.
        </p>
      </div>
    </div>
  );
};

export default Landing;
