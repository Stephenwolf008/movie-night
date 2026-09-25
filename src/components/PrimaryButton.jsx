import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ArrowRight } from 'lucide-react';

const PrimaryButton = ({ children, onClick, className = '', disabled = false, secondary = false }) => {
  const btnRef = useRef(null);

  useEffect(() => {
    if (!btnRef.current || disabled) return;
    
    const btn = btnRef.current;
    
    const handleMouseEnter = () => {
      gsap.to(btn, { scale: 1.02, duration: 0.3, ease: 'power2.out' });
    };
    
    const handleMouseLeave = () => {
      gsap.to(btn, { scale: 1, duration: 0.3, ease: 'power2.out' });
    };
    
    const handleMouseDown = () => {
      gsap.to(btn, { scale: 0.98, duration: 0.1, ease: 'power2.out' });
    };
    
    const handleMouseUp = () => {
      gsap.to(btn, { scale: 1.02, duration: 0.2, ease: 'power2.out' });
    };

    btn.addEventListener('mouseenter', handleMouseEnter);
    btn.addEventListener('mouseleave', handleMouseLeave);
    btn.addEventListener('mousedown', handleMouseDown);
    btn.addEventListener('mouseup', handleMouseUp);
    
    return () => {
      btn.removeEventListener('mouseenter', handleMouseEnter);
      btn.removeEventListener('mouseleave', handleMouseLeave);
      btn.removeEventListener('mousedown', handleMouseDown);
      btn.removeEventListener('mouseup', handleMouseUp);
    };
  }, [disabled]);

  const baseStyles = "relative flex items-center justify-center gap-2 w-full py-4 px-6 rounded-2xl font-medium transition-colors overflow-hidden group";
  
  const primaryStyles = "bg-primary text-background hover:bg-white";
  const secondaryStyles = "bg-surface-highlight text-primary hover:bg-surface-highlight/80 border border-white/5";
  const disabledStyles = "opacity-50 cursor-not-allowed";
  
  return (
    <button
      ref={btnRef}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${secondary ? secondaryStyles : primaryStyles} ${disabled ? disabledStyles : ''} ${className}`}
    >
      <span className="relative z-10">{children}</span>
    </button>
  );
};

export default PrimaryButton;
