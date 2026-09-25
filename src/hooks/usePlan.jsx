import React, { createContext, useContext, useState, useEffect } from 'react';

const PlanContext = createContext();

const createDefaultState = (sessionId) => ({
  step: 'landing',
  selectedMovie: null,
  moodFilter: 'All',
  trailerOpened: false,
  sessionId
});

const getSessionId = () => {
  let id = sessionStorage.getItem('moviePickerSessionId');
  if (!id) {
    id = crypto.randomUUID();
    sessionStorage.setItem('moviePickerSessionId', id);
  }
  return id;
};

export const PlanProvider = ({ children }) => {
  const [plan, setPlan] = useState(() => {
    const sessionId = getSessionId();
    try {
      const saved = sessionStorage.getItem('tonightPlan');
      if (saved) return { ...createDefaultState(sessionId), ...JSON.parse(saved), sessionId };
    } catch {
      sessionStorage.removeItem('tonightPlan');
    }
    return createDefaultState(sessionId);
  });

  useEffect(() => {
    sessionStorage.setItem('tonightPlan', JSON.stringify(plan));
  }, [plan]);

  const updatePlan = (key, value) => {
    setPlan(prev => ({ ...prev, [key]: value }));
  };

  const setStep = (step) => {
    window.history.pushState({ moviePickerStep: step }, '', window.location.pathname + window.location.search + window.location.hash);
    setPlan(prev => ({ ...prev, step }));
  };

  useEffect(() => {
    window.history.replaceState({ moviePickerStep: plan.step }, '', window.location.href);
    const handlePopState = (event) => {
      const step = event.state?.moviePickerStep || 'landing';
      setPlan(prev => ({ ...prev, step }));
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);
  
  const resetPlan = () => {
    setPlan({
      ...createDefaultState(plan.sessionId),
      sessionId: plan.sessionId // maintain session
    });
  };

  return (
    <PlanContext.Provider value={{ plan, updatePlan, setStep, resetPlan }}>
      {children}
    </PlanContext.Provider>
  );
};

export const usePlan = () => {
  const context = useContext(PlanContext);
  if (!context) {
    throw new Error('usePlan must be used within a PlanProvider');
  }
  return context;
};
