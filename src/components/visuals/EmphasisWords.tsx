"use client";

import { useEffect, useState } from "react";

import { cn } from "@/lib/cn";

const words = ["Full-Stack", "SaaS", "AI"] as const;

export function EmphasisWords() {
  const [index, setIndex] = useState(0);
  const [motionOk, setMotionOk] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setMotionOk(!media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (!motionOk) return;
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % words.length);
    }, 2200);
    return () => window.clearInterval(timer);
  }, [motionOk]);

  return (
    <p className="flex flex-wrap gap-2" aria-label="Фокус: полная разработка, SaaS и искусственный интеллект">
      {words.map((word, wordIndex) => {
        const active = !motionOk || wordIndex === index;
        return (
          <span
            key={word}
            className={cn(
              "rounded-full border px-3 py-1 text-sm transition-colors duration-500",
              active ? "border-cyan/50 bg-cyan/10 text-cyan" : "border-white/10 text-faint",
            )}
          >
            {word}
          </span>
        );
      })}
    </p>
  );
}
