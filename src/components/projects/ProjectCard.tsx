import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/Button";
import { InlineIcon } from "@/components/ui/icons";
import { Tag } from "@/components/ui/Tag";
import { ProjectArt } from "@/components/visuals/ProjectArt";
import type { Project } from "@/data/projects";
import { hostname } from "@/lib/cn";

export function ProjectCard({ project, featured = false }: { project: Project; featured?: boolean }) {
  const caseHref = `/projects/${project.slug}`;

  return (
    <article className="surface surface-interactive flex h-full flex-col overflow-hidden rounded-[28px]">
      <div className={featured ? "grid lg:items-start lg:grid-cols-12" : "flex h-full flex-col"}>
        <Link href={caseHref} className={featured ? "block lg:col-span-7" : "block"} aria-label={`${project.title}: подробнее`}>
          <ProjectArt variant={project.illustration} title={project.title} images={project.images} />
        </Link>
        <div className={featured ? "flex flex-col p-6 md:p-8 lg:col-span-5" : "flex flex-1 flex-col p-6"}>
          <p className="inline-flex items-center gap-2 text-sm text-cyan">
            <InlineIcon name="briefcase" className="h-3.5 w-3.5" />
            {project.category}
          </p>
          <h3 className="mt-2 text-2xl text-foreground">
            <Link href={caseHref} className="hover:text-cyan">
              {project.title}
            </Link>
          </h3>
          <p className="mt-3 text-sm leading-6 text-muted text-pretty">{project.summary}</p>
          {project.highlights.length > 0 ? (
            <ul className="mt-4 space-y-2 text-sm text-muted">
              {project.highlights.slice(0, 4).map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-cyan" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          ) : null}
          {project.technologies.length > 0 ? (
            <ul className="mt-4 flex flex-wrap gap-2" aria-label="Технологии">
              {project.technologies.map((tech) => (
                <li key={tech}>
                  <Tag>{tech}</Tag>
                </li>
              ))}
            </ul>
          ) : null}
          {project.links && project.links.length > 0 ? (
            <ul className="mt-4 space-y-2">
              {project.links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm text-foreground underline decoration-white/20 underline-offset-4 hover:decoration-cyan"
                  >
                    {link.label}
                    <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                    <span className="sr-only">, {hostname(link.href)}, откроется в новой вкладке</span>
                  </a>
                </li>
              ))}
            </ul>
          ) : null}
          <div className="mt-6 flex flex-wrap gap-3">
            <Button href={caseHref} variant="secondary">
              Подробнее
            </Button>
            {project.url ? (
              <Button href={project.url} variant="ghost">
                Открыть сайт
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </Button>
            ) : null}
          </div>
        </div>
      </div>
    </article>
  );
}
