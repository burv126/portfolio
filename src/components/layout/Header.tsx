"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";

import { InlineIcon } from "@/components/ui/icons";
import { Mark } from "@/components/ui/Mark";
import { navItems, siteConfig } from "@/config/site";
import { cn } from "@/lib/cn";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const menuId = useId();
  const firstName = siteConfig.name.split(" ")[0] ?? siteConfig.name;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const elements = navItems
      .map((item) => document.getElementById(item.id))
      .filter((element): element is HTMLElement => element !== null);

    if (elements.length === 0) return;

    const visible = new Map<string, number>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.set(entry.target.id, entry.intersectionRatio);
          else visible.delete(entry.target.id);
        }
        const best = [...visible.entries()].sort((a, b) => b[1] - a[1])[0];
        if (best) setActive(best[0]);
      },
      { rootMargin: "-20% 0px -55% 0px", threshold: [0.1, 0.25, 0.5] },
    );

    for (const element of elements) observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const panel = panelRef.current;
    const focusable = panel?.querySelectorAll<HTMLElement>("a[href], button:not([disabled])");
    const nodes = focusable ? Array.from(focusable) : [];
    nodes[0]?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        menuButtonRef.current?.focus();
        return;
      }
      if (event.key !== "Tab" || nodes.length === 0) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };

    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 1280px)");
    const onChange = () => {
      if (media.matches) setOpen(false);
    };
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  const close = () => setOpen(false);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        scrolled || open ? "border-b border-white/10 bg-[#060910]/80 backdrop-blur-xl" : "border-b border-transparent",
      )}
    >
      <div className="mx-auto flex h-16 w-full max-w-[1180px] items-center gap-3 px-5 sm:px-8">
        <Link href="/#top" className="flex min-w-0 items-center gap-2.5 rounded-full" onClick={close}>
          <Mark className="h-8 w-8 shrink-0 text-foreground" />
          <span className="truncate text-sm font-semibold tracking-tight sm:text-base">
            <span className="sm:hidden">{firstName}</span>
            <span className="hidden sm:inline">{siteConfig.name}</span>
          </span>
        </Link>

        <nav className="ml-auto hidden items-center gap-1 xl:flex" aria-label="Основная навигация">
          {navItems.map((item) => {
            const current = active === item.id;
            return (
              <Link
                key={item.id}
                href={`/#${item.id}`}
                aria-current={current ? "true" : undefined}
                className={cn(
                  "relative rounded-full px-3 py-2 text-sm text-muted transition-colors hover:text-foreground",
                  current && "text-foreground",
                )}
              >
                {item.label}
                {current ? (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-x-3 -bottom-0.5 h-px bg-cyan"
                  />
                ) : null}
              </Link>
            );
          })}
        </nav>

        <Link
          href="/#contact"
          className="ml-auto hidden min-h-11 items-center gap-2 rounded-full bg-[#dff7ff] px-4 text-sm font-semibold text-[#071018] transition-colors hover:bg-white md:inline-flex xl:ml-3"
        >
          <InlineIcon name="send" className="h-3.5 w-3.5" />
          Обсудить проект
        </Link>

        <button
          ref={menuButtonRef}
          type="button"
          className="ml-auto inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-foreground md:ml-2 xl:hidden"
          aria-expanded={open}
          aria-controls={menuId}
          onClick={() => setOpen((value) => !value)}
        >
          <span className="sr-only">{open ? "Закрыть меню" : "Открыть меню"}</span>
          {open ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
        </button>
      </div>

      <AnimatePresence>
        {open ? (
          <>
            <button
              type="button"
              className="fixed inset-0 top-16 bg-black/70 xl:hidden"
              aria-label="Закрыть меню"
              onClick={close}
            />
            <motion.div
              id={menuId}
              ref={panelRef}
              key="mobile-nav"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-x-0 top-full z-50 border-b border-white/10 bg-[#060910] shadow-[0_24px_80px_rgba(0,0,0,0.55)] xl:hidden"
            >
              <nav className="mx-auto flex max-h-[calc(100dvh-4rem)] w-full max-w-[1180px] flex-col gap-1 overflow-auto px-5 py-4 sm:px-8" aria-label="Мобильная навигация">
                {navItems.map((item) => (
                  <Link
                    key={item.id}
                    href={`/#${item.id}`}
                    onClick={close}
                    className="flex items-center gap-3 rounded-2xl px-3 py-3 text-lg text-foreground hover:bg-white/[0.04]"
                    aria-current={active === item.id ? "true" : undefined}
                  >
                    <InlineIcon name={item.icon} className="text-cyan" />
                    {item.label}
                  </Link>
                ))}
                <Link
                  href="/#contact"
                  onClick={close}
                  className="mt-3 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#dff7ff] px-5 text-sm font-semibold text-[#071018]"
                >
                  <InlineIcon name="send" className="h-3.5 w-3.5" />
                  Обсудить проект
                </Link>
              </nav>
            </motion.div>
          </>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
