import { useCallback, useEffect, useMemo, useRef } from 'react';
import { gsap } from 'gsap';
import { InertiaPlugin } from 'gsap/InertiaPlugin';
import './DotGrid.css';

// Plugin ini membuat titik terdorong dengan inertia lalu kembali secara elastis.
gsap.registerPlugin(InertiaPlugin);

const throttle = (func, limit) => {
  let lastCall = 0;

  return (...args) => {
    const now = performance.now();
    if (now - lastCall >= limit) {
      lastCall = now;
      func(...args);
    }
  };
};

function hexToRgb(hex) {
  const match = hex.match(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i);
  if (!match) return { r: 0, g: 0, b: 0 };

  return {
    r: parseInt(match[1], 16),
    g: parseInt(match[2], 16),
    b: parseInt(match[3], 16)
  };
}

function DotGrid({
  dotSize = 8,
  gap = 24,
  baseColor = '#111111',
  activeColor = '#ff66a3',
  proximity = 140,
  speedTrigger = 100,
  shockRadius = 220,
  shockStrength = 5,
  maxSpeed = 5000,
  resistance = 750,
  returnDuration = 1.5,
  className = '',
  style
}) {
  const wrapperRef = useRef(null);
  const canvasRef = useRef(null);
  const dotsRef = useRef([]);
  const pointerRef = useRef({ x: 0, y: 0, lastTime: 0, lastX: 0, lastY: 0 });
  const baseRgb = useMemo(() => hexToRgb(baseColor), [baseColor]);
  const activeRgb = useMemo(() => hexToRgb(activeColor), [activeColor]);

  const buildGrid = useCallback(() => {
    const wrapper = wrapperRef.current;
    const canvas = canvasRef.current;
    if (!wrapper || !canvas) return;

    const { width, height } = wrapper.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    const context = canvas.getContext('2d');
    if (!context) return;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    context.setTransform(dpr, 0, 0, dpr, 0, 0);

    const cell = dotSize + gap;
    const columns = Math.max(1, Math.floor((width + gap) / cell));
    const rows = Math.max(1, Math.floor((height + gap) / cell));
    const gridWidth = cell * columns - gap;
    const gridHeight = cell * rows - gap;
    const startX = (width - gridWidth) / 2 + dotSize / 2;
    const startY = (height - gridHeight) / 2 + dotSize / 2;

    dotsRef.current = Array.from({ length: columns * rows }, (_, index) => {
      const x = index % columns;
      const y = Math.floor(index / columns);
      return { cx: startX + x * cell, cy: startY + y * cell, xOffset: 0, yOffset: 0, moving: false };
    });
  }, [dotSize, gap]);

  useEffect(() => {
    buildGrid();
    const resizeObserver = new ResizeObserver(buildGrid);
    if (wrapperRef.current) resizeObserver.observe(wrapperRef.current);
    return () => resizeObserver.disconnect();
  }, [buildGrid]);

  useEffect(() => {
    let animationFrame;
    const draw = () => {
      const canvas = canvasRef.current;
      const context = canvas?.getContext('2d');
      if (!canvas || !context) return;

      const { width, height } = canvas.getBoundingClientRect();
      context.clearRect(0, 0, width, height);
      const { x: pointerX, y: pointerY } = pointerRef.current;
      const proximitySquared = proximity * proximity;

      dotsRef.current.forEach((dot) => {
        const distanceX = dot.cx - pointerX;
        const distanceY = dot.cy - pointerY;
        const distanceSquared = distanceX * distanceX + distanceY * distanceY;
        let color = baseColor;

        if (distanceSquared <= proximitySquared) {
          const intensity = 1 - Math.sqrt(distanceSquared) / proximity;
          const red = Math.round(baseRgb.r + (activeRgb.r - baseRgb.r) * intensity);
          const green = Math.round(baseRgb.g + (activeRgb.g - baseRgb.g) * intensity);
          const blue = Math.round(baseRgb.b + (activeRgb.b - baseRgb.b) * intensity);
          color = `rgb(${red}, ${green}, ${blue})`;
        }

        context.beginPath();
        context.fillStyle = color;
        context.arc(dot.cx + dot.xOffset, dot.cy + dot.yOffset, dotSize / 2, 0, Math.PI * 2);
        context.fill();
      });

      animationFrame = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(animationFrame);
  }, [activeRgb, baseColor, baseRgb, dotSize, proximity]);

  useEffect(() => {
    const movePointer = (event) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const now = performance.now();
      const pointer = pointerRef.current;
      const elapsed = pointer.lastTime ? now - pointer.lastTime : 16;
      const velocityX = ((event.clientX - pointer.lastX) / elapsed) * 1000;
      const velocityY = ((event.clientY - pointer.lastY) / elapsed) * 1000;
      let speed = Math.hypot(velocityX, velocityY);
      const scale = speed > maxSpeed ? maxSpeed / speed : 1;
      const vx = velocityX * scale;
      const vy = velocityY * scale;
      speed *= scale;
      const bounds = canvas.getBoundingClientRect();

      pointer.x = event.clientX - bounds.left;
      pointer.y = event.clientY - bounds.top;
      pointer.lastTime = now;
      pointer.lastX = event.clientX;
      pointer.lastY = event.clientY;

      dotsRef.current.forEach((dot) => {
        const distance = Math.hypot(dot.cx - pointer.x, dot.cy - pointer.y);
        if (speed > speedTrigger && distance < proximity && !dot.moving) {
          dot.moving = true;
          gsap.killTweensOf(dot);
          gsap.to(dot, {
            inertia: {
              xOffset: dot.cx - pointer.x + vx * 0.005,
              yOffset: dot.cy - pointer.y + vy * 0.005,
              resistance
            },
            onComplete: () => {
              gsap.to(dot, {
                xOffset: 0,
                yOffset: 0,
                duration: returnDuration,
                ease: 'elastic.out(1, 0.75)',
                onComplete: () => { dot.moving = false; }
              });
            }
          });
        }
      });
    };

    const shockwave = (event) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const bounds = canvas.getBoundingClientRect();
      const clickX = event.clientX - bounds.left;
      const clickY = event.clientY - bounds.top;

      dotsRef.current.forEach((dot) => {
        const distance = Math.hypot(dot.cx - clickX, dot.cy - clickY);
        if (distance < shockRadius && !dot.moving) {
          dot.moving = true;
          const falloff = Math.max(0, 1 - distance / shockRadius);
          gsap.killTweensOf(dot);
          gsap.to(dot, {
            inertia: {
              xOffset: (dot.cx - clickX) * shockStrength * falloff,
              yOffset: (dot.cy - clickY) * shockStrength * falloff,
              resistance
            },
            onComplete: () => {
              gsap.to(dot, {
                xOffset: 0,
                yOffset: 0,
                duration: returnDuration,
                ease: 'elastic.out(1, 0.75)',
                onComplete: () => { dot.moving = false; }
              });
            }
          });
        }
      });
    };

    const throttledMove = throttle(movePointer, 50);
    window.addEventListener('mousemove', throttledMove, { passive: true });
    window.addEventListener('click', shockwave);

    return () => {
      window.removeEventListener('mousemove', throttledMove);
      window.removeEventListener('click', shockwave);
      gsap.killTweensOf(dotsRef.current);
    };
  }, [maxSpeed, proximity, resistance, returnDuration, shockRadius, shockStrength, speedTrigger]);

  return (
    <section className={`dot-grid ${className}`} style={style} aria-hidden="true">
      <div ref={wrapperRef} className="dot-grid__wrap">
        <canvas ref={canvasRef} className="dot-grid__canvas" />
      </div>
    </section>
  );
}

export default DotGrid;
