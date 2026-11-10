import Image from "next/image";
import type { ReactNode } from "react";

import type { Project } from "@/data/projects";

function WindowChrome({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="flex h-full flex-col bg-[#0b1322]">
      <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
        <span className="h-2 w-2 rounded-full bg-white/20" />
        <span className="h-2 w-2 rounded-full bg-white/15" />
        <span className="h-2 w-2 rounded-full bg-white/10" />
        <span className="ml-2 truncate text-xs text-faint">{title}</span>
      </div>
      <div className="min-h-0 flex-1 p-3 sm:p-4">{children}</div>
    </div>
  );
}

function NexoraArt() {
  const modules = ["Клиенты", "Заявки", "Склад"];
  return (
    <WindowChrome title="NEXORA Vision 360">
      <div className="grid h-full grid-cols-1 gap-3 sm:grid-cols-[1fr_132px]">
        <div className="flex min-h-0 flex-col gap-3">
          <div className="grid grid-cols-3 gap-2">
            {modules.map((module) => (
              <div key={module} className="rounded-xl border border-white/10 bg-white/[0.03] px-2 py-2">
                <p className="truncate text-[11px] text-muted">{module}</p>
                <div className="mt-2 h-1.5 rounded-full bg-cyan/40" />
              </div>
            ))}
          </div>
          <div className="space-y-2">
            {["Объект · заявка", "Наряд · техник", "Склад · позиция", "Счёт · оплата"].map((row) => (
              <div key={row} className="flex items-center justify-between rounded-xl border border-white/10 px-3 py-2">
                <span className="text-[11px] text-muted">{row}</span>
                <span className="h-1.5 w-10 rounded-full bg-white/15" />
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-xl border border-cyan/25 bg-cyan/[0.06] p-3">
          <p className="text-[11px] font-medium text-cyan">Gemini</p>
          <p className="mt-2 text-[11px] leading-4 text-muted">Сводка заявки и подсказка технику</p>
          <div className="mt-3 space-y-1.5">
            <div className="h-1.5 w-full rounded-full bg-white/10" />
            <div className="h-1.5 w-4/5 rounded-full bg-white/10" />
            <div className="h-1.5 w-2/3 rounded-full bg-cyan/40" />
          </div>
        </div>
      </div>
    </WindowChrome>
  );
}

function RatchetArt() {
  return (
    <WindowChrome title="АвтоЦентр">
      <div className="flex h-full flex-col justify-between rounded-xl border border-white/10 bg-white/[0.02] p-4">
        <div>
          <p className="text-sm font-medium text-foreground">АвтоЦентр</p>
          <p className="mt-1 text-[11px] text-faint">SaaS</p>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {["A", "B", "C"].map((block) => (
            <div key={block} className="aspect-[4/3] rounded-lg border border-white/10 bg-gradient-to-br from-white/[0.05] to-transparent" />
          ))}
        </div>
        <div className="h-8 rounded-lg bg-cyan/15" />
      </div>
    </WindowChrome>
  );
}

export function ProjectArt({
  variant,
  title,
  wide = false,
  images,
}: {
  variant: Project["illustration"];
  title: string;
  wide?: boolean;
  images?: Project["images"];
}) {
  const shots = images ?? [];
  if (shots.length > 0) {
    const shown = wide ? shots : shots.slice(0, 1);
    return (
      <figure className="relative bg-[#0b1322]">
        <div className={shown.length > 1 ? "grid gap-px bg-white/10" : undefined}>
          {shown.map((image, index) => (
            <Image
              key={image.src}
              src={image.src}
              alt={image.alt}
              width={1024}
              height={509}
              priority={index === 0}
              className="h-auto w-full"
            />
          ))}
        </div>
        <figcaption className="absolute bottom-3 left-3 rounded-full border border-white/10 bg-black/55 px-2.5 py-1 text-[11px] text-muted backdrop-blur">
          Скриншот продукта
        </figcaption>
      </figure>
    );
  }

  return (
    <figure className="relative overflow-hidden bg-[#0b1322]">
      <div aria-hidden="true" className="h-full">
        {variant === "nexora" ? <NexoraArt /> : null}
        {variant === "ratchet" ? <RatchetArt /> : null}
      </div>
      <figcaption className="absolute bottom-3 left-3 rounded-full border border-white/10 bg-black/55 px-2.5 py-1 text-[11px] text-muted backdrop-blur">
        Иллюстрация, не скриншот
      </figcaption>
      <span className="sr-only">Схематичная иллюстрация интерфейса {title}. Это не скриншот продукта.</span>
    </figure>
  );
}
