import { ProjectCard } from "@/components/projects/ProjectCard";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { projects, type Project } from "@/data/projects";

function rowsOf(items: Project[]): Project[][] {
  const rows: Project[][] = [];
  let compact: Project[] = [];

  for (const project of items) {
    if (project.layout === "feature") {
      if (compact.length > 0) {
        rows.push(compact);
        compact = [];
      }
      rows.push([project]);
      continue;
    }
    compact.push(project);
    if (compact.length === 2) {
      rows.push(compact);
      compact = [];
    }
  }

  if (compact.length > 0) rows.push(compact);
  return rows;
}

export function Projects() {
  const rows = rowsOf(projects);

  return (
    <Section id="projects">
      <Reveal>
        <SectionHeading
          index="04"
          icon="folder"
          eyebrow="Кейсы"
          title="Избранные проекты"
          description="Реальные решения, архитектура и технологии"
        />
      </Reveal>
      <div className="mt-12 space-y-6">
        {rows.map((row) =>
          row.length === 1 ? (
            <ProjectCard key={row[0]?.slug} project={row[0] as Project} featured={row[0]?.layout === "feature"} />
          ) : (
            <div key={row.map((item) => item.slug).join("-")} className="grid gap-6 lg:grid-cols-12">
              {row.map((project, index) => (
                <div key={project.slug} className={index === 0 ? "lg:col-span-7" : "lg:col-span-5"}>
                  <ProjectCard project={project} />
                </div>
              ))}
            </div>
          ),
        )}
      </div>
    </Section>
  );
}
