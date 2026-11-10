import type { ReactNode } from "react";

import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/cn";

export function Section({
  id,
  children,
  className,
}: {
  id?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={cn("scroll-mt-24 py-20 md:py-28", className)}>
      <Container>{children}</Container>
    </section>
  );
}
