import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { usePlan } from '../hooks/usePlan';

import { movies } from '../data/movies';
import MovieCard from '../components/MovieCard';
import MoodFilter from '../components/MoodFilter';
import TrailerModal from '../components/TrailerModal';

const Movies = () => {
  const { plan, updatePlan, setStep } = usePlan();
  const [filter, setFilter] = useState(plan.moodFilter);
  const [activeTrailer, setActiveTrailer] = useState(null);
  
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const listRef = useRef(null);
  
  const filteredMovies = filter === 'All' 
    ? movies 
    : movies.filter(m => m.mood.includes(filter));

  useEffect(() => {
    updatePlan('moodFilter', filter);
  }, [filter]);

  useEffect(() => {
    const tl = gsap.timeline();
    
    tl.fromTo(titleRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
    )
    .fromTo(subtitleRef.current,
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
      "-=0.5"
    );
    
    if (listRef.current) {
      const cards = listRef.current.children;
      tl.fromTo(cards,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.15, ease: 'power2.out' },
        "-=0.4"
      );
    }
  }, []);

  const handleSelect = (movie) => {
    updatePlan('selectedMovie', movie);
    
    gsap.to(containerRef.current, {
      opacity: 0,
      scale: 1.05,
      duration: 0.5,
      ease: 'power2.in',
      onComplete: () => setStep('confirmation')
    });
  };

  const openTrailer = (movie) => {
    updatePlan('trailerOpened', true);
    setActiveTrailer(movie);
  };

  return (
    <>
      <div ref={containerRef} className="flex-1 flex flex-col pt-8 pb-4">
        <div className="mb-6">
          <h2 ref={titleRef} className="text-3xl font-serif text-primary opacity-0 mb-2">Okay, Vanshita...</h2>
          <p ref={subtitleRef} className="text-secondary opacity-0">Which one are we watching?</p>
        </div>

        <MoodFilter current={filter} onChange={setFilter} />

        <div ref={listRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 flex-1 w-full mt-6">
          {filteredMovies.map((movie) => (
            <div key={movie.id} className="opacity-0">
              <MovieCard 
                movie={movie} 
                onSelect={handleSelect} 
                onWatchTrailer={openTrailer} 
              />
            </div>
          ))}
          {filteredMovies.length === 0 && (
            <p className="text-secondary text-center mt-12 opacity-50">Nothing matches this mood right now.</p>
          )}
        </div>
      </div>
      
      {activeTrailer && (
        <TrailerModal 
          movie={activeTrailer} 
          onClose={() => setActiveTrailer(null)} 
          onSelect={() => {
            setActiveTrailer(null);
            handleSelect(activeTrailer);
          }}
        />
      )}
    </>
  );
};

export default Movies;
