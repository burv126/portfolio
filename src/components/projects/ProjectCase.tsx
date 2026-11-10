import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

import { Button } from "@/components/ui/Button";
import { InlineIcon } from "@/components/ui/icons";
import { Container } from "@/components/ui/Container";
import { Tag } from "@/components/ui/Tag";
import { ProjectArt } from "@/components/visuals/ProjectArt";
import { projects, type Project } from "@/data/projects";
import { hostname } from "@/lib/cn";

function ExternalAnchor({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1.5 text-foreground underline decoration-white/20 underline-offset-4 hover:decoration-cyan"
    >
      {children}
      <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
      <span className="sr-only">, {hostname(href)}, откроется в новой вкладке</span>
    </a>
  );
}

export function ProjectCase({ project }: { project: Project }) {
  const related = projects.filter((item) => item.slug !== project.slug).slice(0, 3);
  const paragraphs = project.description.split("\n\n");

  return (
    <article>
      <Container className="pt-28 md:pt-32">
        <nav aria-label="Хлебные крошки" className="text-sm text-muted">
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link href="/" className="hover:text-foreground">
                Главная
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link href="/#projects" className="hover:text-foreground">
                Проекты
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="text-foreground">{project.title}</li>
          </ol>
        </nav>
        <p className="mt-8 inline-flex items-center gap-2 text-sm text-cyan">
          <InlineIcon name="briefcase" className="h-3.5 w-3.5" />
          {project.category}
        </p>
        <h1 className="mt-3 max-w-4xl text-4xl leading-tight text-foreground md:text-6xl">{project.title}</h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-muted text-pretty">{project.summary}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button href="/#contact">Обсудить похожий проект</Button>
          {project.url ? (
            <Button href={project.url} variant="secondary">
              Открыть сайт
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Button>
          ) : null}
        </div>
      </Container>

      <Container className="mt-10">
        <div className="surface overflow-hidden rounded-[28px]">
          <ProjectArt variant={project.illustration} title={project.title} images={project.images} wide />
        </div>
      </Container>

      <Container className="grid gap-12 py-14 lg:grid-cols-12">
        <div className="space-y-10 lg:col-span-8">
          {paragraphs.map((paragraph) => (
            <p key={paragraph} className="text-base leading-7 text-muted text-pretty">
              {paragraph}
            </p>
          ))}
          {project.sections.map((section) => (
            <section key={section.title}>
              <h2 className="text-2xl text-foreground">{section.title}</h2>
              <div className="mt-4 space-y-4">
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph} className="text-base leading-7 text-muted text-pretty">
                    {paragraph}
                  </p>
                ))}
              </div>
              {section.bullets && section.bullets.length > 0 ? (
                <ul className="mt-4 space-y-2">
                  {section.bullets.map((bullet) => (
                    <li key={bullet} className="flex gap-3 text-sm leading-6 text-muted">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan" aria-hidden="true" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              ) : null}
            </section>
          ))}
          {project.pending.features.length > 0 ? (
            <section>
              <h2 className="text-2xl text-foreground">Функции</h2>
              <ul className="mt-4 space-y-2">
                {project.pending.features.map((item) => (
                  <li key={item} className="text-sm text-muted">
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          ) : null}
          {project.pending.outcomes.length > 0 ? (
            <section>
              <h2 className="text-2xl text-foreground">Результат</h2>
              <ul className="mt-4 space-y-2">
                {project.pending.outcomes.map((item) => (
                  <li key={item} className="text-sm text-muted">
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          ) : null}
        </div>
        <aside className="space-y-6 lg:col-span-4">
          {project.technologies.length > 0 || project.pending.technologies.length > 0 ? (
            <div className="surface rounded-[28px] p-6">
              <h2 className="flex items-center gap-2 text-lg text-foreground">
                <InlineIcon name="cpu" className="text-cyan" />
                Технологии
              </h2>
              <ul className="mt-4 flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <li key={tech}>
                    <Tag tone="verified">{tech}</Tag>
                  </li>
                ))}
                {project.pending.technologies.map((tech) => (
                  <li key={tech}>
                    <Tag>{tech}</Tag>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="surface rounded-[28px] p-6">
              <h2 className="flex items-center gap-2 text-lg text-foreground">
                <InlineIcon name="cpu" className="text-cyan" />
                Технологии
              </h2>
              <p className="mt-3 text-sm leading-6 text-muted">
                Стек появится здесь, когда он будет внесён в данные проекта. Пока карточка показывает только подтверждённые сведения.
              </p>
            </div>
          )}
          {project.links && project.links.length > 0 ? (
            <div className="surface rounded-[28px] p-6">
              <h2 className="text-lg text-foreground">Рабочие витрины</h2>
              <ul className="mt-4 space-y-3">
                {project.links.map((link) => (
                  <li key={link.href}>
                    <ExternalAnchor href={link.href}>{link.label}</ExternalAnchor>
                    <p className="mt-1 text-xs text-faint">{hostname(link.href)}</p>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </aside>
      </Container>

      <Container className="pb-20">
        <h2 className="flex items-center gap-2 text-2xl text-foreground">
          <InlineIcon name="folder" className="text-cyan" />
          Другие проекты
        </h2>
        <ul className="mt-6 grid gap-4 md:grid-cols-3">
          {related.map((item) => (
            <li key={item.slug}>
              <Link href={`/projects/${item.slug}`} className="surface block rounded-3xl p-5 hover:border-cyan/30">
                <p className="inline-flex items-center gap-2 text-sm text-cyan">
                  <InlineIcon name="briefcase" className="h-3.5 w-3.5" />
                  {item.category}
                </p>
                <p className="mt-2 text-lg text-foreground">{item.title}</p>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </article>
  );
}
