import React, { useEffect } from 'react';
import gsap from 'gsap';
import { PlanProvider, usePlan } from './hooks/usePlan';
import Landing from './pages/Landing';
import Movies from './pages/Movies';
import Confirmation from './pages/Confirmation';
import Final from './pages/Final';
import CinematicBackground from './components/CinematicBackground';

const AppContent = () => {
  const { plan } = usePlan();
  const { step } = plan;

  useEffect(() => {
    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updateMotion = () => gsap.globalTimeline.timeScale(motionPreference.matches ? 1000 : 1);
    updateMotion();
    motionPreference.addEventListener('change', updateMotion);
    return () => {
      motionPreference.removeEventListener('change', updateMotion);
      gsap.globalTimeline.timeScale(1);
    };
  }, []);

  return (
    <main className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-x-hidden">
      <CinematicBackground step={step} />
      <div className="grain pointer-events-none"></div>
      
      <div className="relative z-10 w-full max-w-5xl mx-auto min-h-screen flex flex-col pt-12 pb-12 px-6 md:px-10 shadow-2xl bg-background/20 md:border-x md:border-white/5 backdrop-blur-sm">
        {step === 'landing' && <Landing />}
        {step === 'movies' && <Movies />}
        {step === 'confirmation' && <Confirmation />}
        {step === 'final' && <Final />}
      </div>
    </main>
  );
};

function App() {
  return (
    <PlanProvider>
      <AppContent />
    </PlanProvider>
  );
}

export default App;
