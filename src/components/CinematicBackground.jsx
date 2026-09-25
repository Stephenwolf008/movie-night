import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const CinematicBackground = ({ step }) => {
  const bgRef = useRef(null);
  const glow1Ref = useRef(null);
  const glow2Ref = useRef(null);

  useEffect(() => {
    // Continuous subtle movement
    gsap.to(glow1Ref.current, {
      x: '10vw',
      y: '5vh',
      duration: 15,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });
    
    gsap.to(glow2Ref.current, {
      x: '-10vw',
      y: '-5vh',
      duration: 20,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });
  }, []);

  useEffect(() => {
    // Change colors slightly based on step
    const colors = {
      landing: { g1: '#1f1a10', g2: '#0f1115' },
      mood: { g1: '#2a1b1b', g2: '#0f1515' },
      language: { g1: '#151c24', g2: '#1f1a10' },
      time: { g1: '#1a1f10', g2: '#10111f' },
      movies: { g1: '#261b11', g2: '#10191f' },
      after: { g1: '#1f1015', g2: '#15101f' },
      walk: { g1: '#151f15', g2: '#1f1510' },
      final: { g1: '#241a0e', g2: '#0e1215' }
    };
    
    const targetColors = colors[step] || colors.landing;
    
    gsap.to(glow1Ref.current, {
      backgroundColor: targetColors.g1,
      duration: 2,
      ease: 'power2.out'
    });
    
    gsap.to(glow2Ref.current, {
      backgroundColor: targetColors.g2,
      duration: 2,
      ease: 'power2.out'
    });
  }, [step]);

  return (
    <div ref={bgRef} className="fixed inset-0 overflow-hidden z-0 bg-background pointer-events-none">
      <div 
        ref={glow1Ref}
        className="absolute -top-[20%] -left-[10%] w-[70vw] h-[70vw] md:w-[40vw] md:h-[40vw] rounded-full blur-[100px] opacity-60"
        style={{ backgroundColor: '#1f1a10' }}
      />
      <div 
        ref={glow2Ref}
        className="absolute -bottom-[10%] -right-[10%] w-[80vw] h-[80vw] md:w-[50vw] md:h-[50vw] rounded-full blur-[120px] opacity-50"
        style={{ backgroundColor: '#0f1115' }}
      />
    </div>
  );
};

export default CinematicBackground;
