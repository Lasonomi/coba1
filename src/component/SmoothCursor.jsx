import { useEffect, useRef } from 'react';
import './SmoothCursor.css';

function SmoothCursor() {
  const cursorRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (!cursor || !canHover) return undefined;

    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let currentX = targetX;
    let currentY = targetY;
    let animationFrame;

    const moveCursor = (event) => {
      targetX = event.clientX;
      targetY = event.clientY;
      cursor.classList.add('smooth-cursor--visible');
    };

    const animate = () => {
      currentX += (targetX - currentX) * 0.16;
      currentY += (targetY - currentY) * 0.16;
      cursor.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
      animationFrame = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', moveCursor, { passive: true });
    animationFrame = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return <span ref={cursorRef} className="smooth-cursor" aria-hidden="true" />;
}

export default SmoothCursor;
