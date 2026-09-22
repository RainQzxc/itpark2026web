import { useEffect, useRef } from "react";

const random = (min, max) => min + Math.random() * (max - min);

export default function GlobalParticleBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d", { alpha: true });
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mobile = window.matchMedia("(max-width: 767px), (pointer: coarse)").matches;
    let width = 0;
    let height = 0;
    let dpr = 1;
    let frame;
    let particles = [];
    let mouseX = -1000;
    let mouseY = -1000;
    let mouseActive = false;
    let scrollTarget = window.scrollY;
    let scrollPosition = scrollTarget;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 1.6);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = mobile ? 260 : Math.min(760, Math.max(520, Math.round(width * 0.48)));
      particles = Array.from({ length: count }, (_, index) => {
        const x = random(0, width);
        const y = random(0, height);
        return {
        x,
        y,
        homeX: x,
        homeY: y,
        vx: random(-0.04, 0.04),
        vy: random(-0.04, 0.04),
        size: random(0.5, index % 14 === 0 ? 1.9 : 1.3),
        opacity: random(0.28, index % 11 === 0 ? 0.82 : 0.62),
        speed: random(0.025, 0.1),
        drift: random(-0.08, 0.08),
        phase: random(0, Math.PI * 2),
        depth: random(0.25, 1),
        index,
      }});
    };

    const draw = (time = 0) => {
      context.clearRect(0, 0, width, height);
      scrollPosition += (scrollTarget - scrollPosition) * 0.045;
      const seconds = time * 0.001;

      particles.forEach((particle) => {
        if (!reducedMotion) {
          particle.vx += (particle.homeX - particle.x) * 0.0012;
          particle.vy += (particle.homeY - particle.y) * 0.0012;
          particle.vx = (particle.vx + Math.sin(seconds * 0.16 + particle.phase) * particle.drift * 0.04) * 0.985;
          particle.vy = (particle.vy - particle.speed * 0.035) * 0.985;

          if (mouseActive) {
            const dx = particle.x - mouseX;
            const dy = particle.y - mouseY;
            const distanceSquared = dx * dx + dy * dy;
            const radius = 105;
            if (distanceSquared > 0 && distanceSquared < radius * radius) {
              const distance = Math.sqrt(distanceSquared);
              const force = (1 - distance / radius) * 0.72;
              particle.vx += (dx / distance) * force;
              particle.vy += (dy / distance) * force;
            }
          }

          particle.x += particle.vx;
          particle.y += particle.vy;
        }

        const x = particle.x;
        const scrollOffset = (scrollPosition % height) * 0.018 * particle.depth;
        const y = (particle.y - scrollOffset + height) % height;
        context.beginPath();
        context.fillStyle = particle.index % 4 === 0
          ? `rgba(248, 252, 255, ${particle.opacity * 0.9})`
          : `rgba(0, 255, 237, ${particle.opacity})`;
        context.arc(x, y, particle.size, 0, Math.PI * 2);
        context.fill();
      });

      if (!reducedMotion) frame = requestAnimationFrame(draw);
    };

    const onPointerMove = (event) => {
      mouseX = event.clientX;
      mouseY = event.clientY;
      mouseActive = true;
    };
    const onPointerLeave = () => { mouseActive = false; };
    const onScroll = () => {
      scrollTarget = window.scrollY;
    };

    resize();
    onScroll();
    draw();
    window.addEventListener("resize", resize, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    if (!mobile && !reducedMotion) window.addEventListener("pointermove", onPointerMove, { passive: true });
    if (!mobile && !reducedMotion) document.documentElement.addEventListener("pointerleave", onPointerLeave);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointermove", onPointerMove);
      document.documentElement.removeEventListener("pointerleave", onPointerLeave);
    };
  }, []);

  return <canvas ref={canvasRef} className="global-particle-background" aria-hidden="true" />;
}
