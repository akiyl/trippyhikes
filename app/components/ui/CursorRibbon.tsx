"use client";
import React, { useEffect, useRef } from "react";

export default function CursorRibbon() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const pointsRef = useRef<Array<{ x: number; y: number; t: number }>>([]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced) return;

    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    const dpr = window.devicePixelRatio || 1;

    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = width + "px";
      canvas.style.height = height + "px";
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    resize();
    window.addEventListener("resize", resize);

    function onMove(e: MouseEvent) {
      pointsRef.current.push({
        x: e.clientX,
        y: e.clientY,
        t: performance.now(),
      });
      // keep last ~50 points
      if (pointsRef.current.length > 50) pointsRef.current.shift();
    }

    window.addEventListener("mousemove", onMove);

    function draw() {
      const pts = pointsRef.current;
      ctx!.clearRect(0, 0, width, height);

      if (pts.length < 2) {
        rafRef.current = requestAnimationFrame(draw);
        return;
      }

      // draw ribbon using fading strokes
      for (let i = 0; i < pts.length - 1; i++) {
        const p0 = pts[i];
        const p1 = pts[i + 1];
        const age = (performance.now() - p0.t) / 800; // normalized age
        const alpha = Math.max(0, 1 - age);
        const widthStroke = 12 * (1 - i / pts.length) + 2;

        ctx!.beginPath();
        ctx!.moveTo(p0.x, p0.y);
        // simple quadratic between points for smoothness
        const mx = (p0.x + p1.x) / 2;
        const my = (p0.y + p1.y) / 2;
        ctx!.quadraticCurveTo(mx, my, p1.x, p1.y);

        // gradient per segment
        const grad = ctx!.createLinearGradient(p0.x, p0.y, p1.x, p1.y);
        grad.addColorStop(0, `rgba(255,255,255,${(alpha * 0.9).toFixed(2)})`);
        grad.addColorStop(1, `rgba(100,150,255,${(alpha * 0.3).toFixed(2)})`);

        ctx!.strokeStyle = grad as any;
        ctx!.lineWidth = widthStroke;
        ctx!.lineCap = "round";
        ctx!.stroke();
      }

      // Remove old points
      const now = performance.now();
      while (pointsRef.current.length && now - pointsRef.current[0].t > 900) {
        pointsRef.current.shift();
      }

      rafRef.current = requestAnimationFrame(draw);
    }

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", resize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 9998,
        mixBlendMode: "screen",
      }}
      aria-hidden
    />
  );
}
