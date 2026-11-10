import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost";

const variants: Record<Variant, string> = {
  primary:
    "bg-[#dff7ff] text-[#071018] hover:bg-white shadow-[0_10px_40px_rgba(138,235,255,0.12)]",
  secondary: "border border-white/15 bg-white/[0.04] text-foreground hover:border-cyan/40 hover:bg-white/[0.07]",
  ghost: "text-foreground hover:text-cyan",
};

type Props = {
  variant?: Variant;
  className?: string;
  children: ReactNode;
  href?: string;
} & Omit<ComponentProps<"button">, "className" | "children">;

export function Button({ variant = "primary", className, children, href, type, ...rest }: Props) {
  const classes = cn(
    "inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-5 py-3 text-center text-sm font-semibold transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-50",
    variants[variant],
    className,
  );

  if (href) {
    const external = /^https?:\/\//.test(href);
    const internal = href.startsWith("/") && !href.includes("#");
    const content = (
      <>
        {children}
        {external ? <span className="sr-only"> (откроется в новой вкладке)</span> : null}
      </>
    );

    if (internal) {
      return (
        <Link href={href} className={classes}>
          {content}
        </Link>
      );
    }

    return (
      <a
        href={href}
        className={classes}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {content}
      </a>
    );
  }

  return (
    <button type={type ?? "button"} className={classes} {...rest}>
      {children}
    </button>
  );
}
