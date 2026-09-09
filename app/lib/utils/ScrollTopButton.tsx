"use client";

import { useEffect, useState, useCallback } from "react";
import { HiOutlineArrowUp } from "react-icons/hi2";

const RADIUS = 18;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export function ScrollTopButton() {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);
  const [pressed, setPressed] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(scrollHeight > 0 ? scrollTop / scrollHeight : 0);
      setVisible(scrollTop > 240);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = useCallback(() => {
    setPressed(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
    setTimeout(() => setPressed(false), 500);
  }, []);

  const offset = CIRCUMFERENCE * (1 - progress);

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label="Back to top"
      className="fixed bottom-13 right-2 z-40 grid h-10 w-10 place-items-center rounded-full bg-accent shadow-lg transition-[opacity,transform] duration-[380ms] ease-[cubic-bezier(.22,1,.36,1)] hover:bg-accent-hover sm:h-11 sm:w-11"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible
          ? `translateY(0) scale(${pressed ? 0.92 : 1})`
          : "translateY(12px) scale(0.85)",
        pointerEvents: visible ? "auto" : "none",
      }}
    >
      <svg width="44" height="44" viewBox="0 0 44 44" className="absolute inset-0">
        <circle
          cx="22"
          cy="22"
          r={RADIUS}
          fill="none"
          stroke="rgba(255,255,255,0.25)"
          strokeWidth="2"
        />
        <circle
          cx="22"
          cy="22"
          r={RADIUS}
          fill="none"
          stroke="#ffffff"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={offset}
          transform="rotate(-90 22 22)"
          className="transition-[stroke-dashoffset] duration-100 ease-linear"
        />
      </svg>
      <HiOutlineArrowUp
        size={16}
        className="text-white"
        strokeWidth={2.25}
        style={{
          transform: pressed ? "translateY(-2px)" : "translateY(0)",
          transition: "transform 220ms cubic-bezier(.34,1.56,.64,1)",
        }}
      />
    </button>
  );
}