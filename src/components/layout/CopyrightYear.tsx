"use client";

export function CopyrightYear({ fallback }: { fallback: number }) {
  const year = typeof window === "undefined" ? fallback : new Date().getFullYear();
  return <span suppressHydrationWarning>{year}</span>;
}
