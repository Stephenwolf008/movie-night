import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';

const MoodFilter = ({ current, onChange }) => {
  const containerRef = useRef(null);

  const moods = [
    { id: 'All', label: 'All' },
    { id: 'Fun', label: '😂 Fun' },
    { id: 'Feel-good', label: '❤️ Feel-good' },
    { id: 'Action', label: '🔥 Action' },
    { id: 'Interesting', label: '🧠 Interesting' },
    { id: 'Thriller', label: '😱 Thriller' }
  ];

  useEffect(() => {
    gsap.fromTo(containerRef.current,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.6, delay: 0.2, ease: 'power2.out' }
    );
  }, []);

  return (
    <div ref={containerRef} className="opacity-0">
      <p className="text-xs text-secondary/60 mb-2 uppercase tracking-widest font-medium">What's your mood?</p>
      <div className="flex flex-wrap gap-2">
        {moods.map(mood => (
          <button
            key={mood.id}
            onClick={() => onChange(mood.id)}
            className={`px-3 py-1.5 rounded-full text-sm transition-all duration-300 ${
              current === mood.id 
                ? 'bg-accent text-background font-medium' 
                : 'bg-surface-highlight text-secondary hover:text-primary hover:bg-white/10'
            }`}
          >
            {mood.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MoodFilter;
