import React, { useEffect, useRef } from "react";

interface Firefly {
  x: number;
  y: number;
  radius: number;
  vx: number;
  vy: number;
  alpha: number;
  glowColor: string;
  phase: number;
}

interface MovingStar {
  x: number;
  y: number;
  radius: number;
  alpha: number;
  twinkleSpeed: number;
  vx: number;
  vy: number;
}

interface ShootingStar {
  x: number;
  y: number;
  length: number;
  speed: number;
  angle: number;
  alpha: number;
  active: boolean;
}

export const JugnuBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initMovingStars();
      initFireflies();
    };

    window.addEventListener("resize", handleResize);

    // 1. Initialize Moving Stars
    const starCount = Math.floor((width * height) / 8000);
    let movingStars: MovingStar[] = [];
    const initMovingStars = () => {
      movingStars = [];
      for (let i = 0; i < starCount; i++) {
        movingStars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius: Math.random() * 1.3 + 0.3,
          alpha: Math.random() * 0.7 + 0.3,
          twinkleSpeed: Math.random() * 0.02 + 0.005,
          vx: (Math.random() - 0.5) * 0.15 - 0.05, // slow cosmic drift
          vy: Math.random() * 0.1 + 0.04,          // gentle downward cosmic drift
        });
      }
    };

    // 2. Shooting Stars (Meteors)
    const shootingStars: ShootingStar[] = [];
    const spawnShootingStar = () => {
      if (shootingStars.length < 2 && Math.random() < 0.015) {
        shootingStars.push({
          x: Math.random() * width * 0.8 + width * 0.1,
          y: Math.random() * height * 0.4,
          length: Math.random() * 80 + 50,
          speed: Math.random() * 6 + 6,
          angle: Math.PI / 4 + (Math.random() - 0.5) * 0.2, // ~45 degrees
          alpha: 1,
          active: true,
        });
      }
    };

    // 3. Initialize "Jugnu" (Bioluminescent Fireflies)
    const fireflyCount = Math.min(36, Math.max(20, Math.floor(width / 45)));
    let fireflies: Firefly[] = [];
    const glowColors = [
      { r: 0, g: 242, b: 254 },   // Cyan glow
      { r: 52, g: 211, b: 153 },  // Emerald green
      { r: 250, g: 204, b: 21 },  // Golden amber
      { r: 168, g: 85, b: 247 },  // Cyber purple
    ];

    const initFireflies = () => {
      fireflies = [];
      for (let i = 0; i < fireflyCount; i++) {
        const color = glowColors[Math.floor(Math.random() * glowColors.length)];
        fireflies.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius: Math.random() * 2.2 + 1.2,
          vx: (Math.random() - 0.5) * 0.6,
          vy: (Math.random() - 0.5) * 0.5 - 0.18, // upward floating drift
          alpha: Math.random() * 0.8 + 0.2,
          glowColor: `${color.r}, ${color.g}, ${color.b}`,
          phase: Math.random() * Math.PI * 2,
        });
      }
    };

    initMovingStars();
    initFireflies();

    let time = 0;

    const render = () => {
      time += 0.02;
      ctx.clearRect(0, 0, width, height);

      // Render Moving Stars
      for (let i = 0; i < movingStars.length; i++) {
        const s = movingStars[i];
        s.x += s.vx;
        s.y += s.vy;

        // Wrap around screen
        if (s.x < 0) s.x = width;
        if (s.x > width) s.x = 0;
        if (s.y < 0) s.y = height;
        if (s.y > height) s.y = 0;

        const currentAlpha = s.alpha + Math.sin(time * 30 * s.twinkleSpeed) * 0.25;
        ctx.fillStyle = `rgba(226, 232, 240, ${Math.max(0.15, Math.min(1, currentAlpha))})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      // Spawn & Render Shooting Stars
      spawnShootingStar();
      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const ss = shootingStars[i];
        if (!ss.active) continue;

        ss.x += Math.cos(ss.angle) * ss.speed;
        ss.y += Math.sin(ss.angle) * ss.speed;
        ss.alpha -= 0.015;

        if (ss.alpha <= 0 || ss.x > width || ss.y > height) {
          shootingStars.splice(i, 1);
          continue;
        }

        // Draw meteor trail
        const tailX = ss.x - Math.cos(ss.angle) * ss.length;
        const tailY = ss.y - Math.sin(ss.angle) * ss.length;

        const gradient = ctx.createLinearGradient(tailX, tailY, ss.x, ss.y);
        gradient.addColorStop(0, "rgba(0, 242, 254, 0)");
        gradient.addColorStop(0.7, `rgba(168, 85, 247, ${ss.alpha * 0.6})`);
        gradient.addColorStop(1, `rgba(255, 255, 255, ${ss.alpha})`);

        ctx.strokeStyle = gradient;
        ctx.lineWidth = 1.8;
        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(ss.x, ss.y);
        ctx.stroke();

        // Meteor head bright dot
        ctx.fillStyle = `rgba(255, 255, 255, ${ss.alpha})`;
        ctx.beginPath();
        ctx.arc(ss.x, ss.y, 1.5, 0, Math.PI * 2);
        ctx.fill();
      }

      // Render Floating "Jugnu" (Fireflies)
      for (let i = 0; i < fireflies.length; i++) {
        const f = fireflies[i];

        // Organic wandering motion
        f.x += f.vx + Math.sin(time + f.phase) * 0.45;
        f.y += f.vy + Math.cos(time + f.phase) * 0.35;

        // Wrap around screen
        if (f.x < -20) f.x = width + 20;
        if (f.x > width + 20) f.x = -20;
        if (f.y < -20) f.y = height + 20;
        if (f.y > height + 20) f.y = -20;

        // Firefly pulsation
        f.alpha = 0.35 + 0.55 * (0.5 + 0.5 * Math.sin(time * 2 + f.phase));

        // Firefly halo glow
        const glowGrad = ctx.createRadialGradient(
          f.x,
          f.y,
          0,
          f.x,
          f.y,
          f.radius * 7
        );
        glowGrad.addColorStop(0, `rgba(${f.glowColor}, ${f.alpha * 0.9})`);
        glowGrad.addColorStop(0.35, `rgba(${f.glowColor}, ${f.alpha * 0.4})`);
        glowGrad.addColorStop(1, `rgba(${f.glowColor}, 0)`);

        ctx.fillStyle = glowGrad;
        ctx.beginPath();
        ctx.arc(f.x, f.y, f.radius * 7, 0, Math.PI * 2);
        ctx.fill();

        // Firefly core
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.min(1, f.alpha + 0.25)})`;
        ctx.beginPath();
        ctx.arc(f.x, f.y, f.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none -z-10 w-full h-full"
      style={{ opacity: 0.95 }}
    />
  );
};
