import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ProjectCase } from "@/components/projects/ProjectCase";
import { projectJsonLd } from "@/components/seo/JsonLd";
import { siteConfig } from "@/config/site";
import { getProject, projects } from "@/data/projects";

type RouteParams = { slug: string };

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<RouteParams>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Проект не найден", robots: { index: false, follow: false } };

  const path = `/projects/${project.slug}`;
  return {
    title: project.title,
    description: project.summary,
    alternates: { canonical: path },
    openGraph: {
      title: project.title,
      description: project.summary,
      url: path,
      locale: siteConfig.locale,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: project.title,
      description: project.summary,
    },
  };
}

export default async function ProjectPage({ params }: { params: Promise<RouteParams> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const data = projectJsonLd({
    title: project.title,
    summary: project.summary,
    path: `/projects/${project.slug}`,
    url: project.url,
  });

  return (
    <main id="content" className="flex-1">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
      />
      <ProjectCase project={project} />
    </main>
  );
}
