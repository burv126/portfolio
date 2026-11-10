import { ArrowRight } from "lucide-react";

import { InlineIcon } from "@/components/ui/icons";
import { EmphasisWords } from "@/components/visuals/EmphasisWords";
import { ArchitectureDiagram } from "@/components/visuals/ArchitectureDiagram";
import { Container } from "@/components/ui/Container";
import { heroChips } from "@/data/content";
import { projects } from "@/data/projects";
import Link from "next/link";

export function Hero() {
  return (
    <section id="top" className="relative scroll-mt-24 overflow-hidden pb-16 pt-28 md:pb-24 md:pt-36">
      <div className="pointer-events-none absolute -left-24 top-8 h-72 w-72 rounded-full bg-blue/20 blur-3xl motion-safe:animate-drift" aria-hidden="true" />
      <div className="pointer-events-none absolute right-0 top-24 h-64 w-64 rounded-full bg-cyan/10 blur-3xl" aria-hidden="true" />
      <Container className="relative grid items-center gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-7">
          <p className="inline-flex rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-sm text-cyan">
            Full-Stack & AI Developer
          </p>
          <div className="mt-5">
            <EmphasisWords />
          </div>
          <h1 className="mt-6 max-w-3xl text-[clamp(1.9rem,1rem+2.5vw,3.4rem)] leading-[1.12] text-foreground">
            Разрабатываю цифровые продукты, которые решают реальные задачи бизнеса
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-muted text-pretty">
            Создаю SaaS-платформы, веб-приложения и AI-решения: от архитектуры и backend-разработки до современного интерфейса и запуска продукта.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="#contact"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#dff7ff] px-5 text-sm font-semibold text-[#071018] transition-colors hover:bg-white"
            >
              Обсудить проект
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
            <a
              href="#projects"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-5 text-sm font-semibold text-foreground transition-colors hover:border-cyan/40"
            >
              <InlineIcon name="folder" />
              Смотреть проекты
            </a>
          </div>
          <ul className="mt-8 flex flex-wrap gap-2" aria-label="Направления">
            {heroChips.map((chip) => (
              <li key={chip.label} className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-sm text-muted">
                <InlineIcon name={chip.icon} className="h-3.5 w-3.5 text-cyan" />
                {chip.label}
              </li>
            ))}
          </ul>
          <div className="mt-10 border-t border-white/10 pt-5">
            <p className="text-sm text-faint">Избранные работы</p>
            <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
              {projects.map((project) => (
                <li key={project.slug}>
                  <Link href={`/projects/${project.slug}`} className="inline-flex items-center gap-1.5 text-sm text-foreground hover:text-cyan">
                    <InlineIcon name="folder" className="h-3.5 w-3.5 text-cyan" />
                    {project.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="lg:col-span-5">
          <ArchitectureDiagram />
        </div>
      </Container>
    </section>
  );
}
