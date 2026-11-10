import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

export function Tag({
  children,
  tone = "muted",
}: {
  children: ReactNode;
  tone?: "muted" | "verified";
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs",
        tone === "verified"
          ? "border-cyan/30 bg-cyan/10 text-cyan"
          : "border-white/10 bg-white/[0.04] text-muted",
      )}
    >
      {tone === "verified" ? <span className="h-1.5 w-1.5 rounded-full bg-cyan" aria-hidden="true" /> : null}
      {children}
    </span>
  );
}
