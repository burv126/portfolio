import { IconBadge } from "@/components/ui/icons";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { aboutLead, aboutPoints } from "@/data/content";

export function About() {
  return (
    <Section id="about">
      <div className="grid items-start gap-12 lg:grid-cols-12">
        <Reveal className="lg:col-span-5">
          <SectionHeading
            index="02"
            icon="user"
            eyebrow="Обо мне"
            title="Не просто пишу код — создаю решения для бизнеса"
          />
          <div className="mt-6 space-y-4 text-base leading-7 text-muted">
            {aboutLead.map((paragraph) => (
              <p key={paragraph} className="text-pretty">
                {paragraph}
              </p>
            ))}
          </div>
        </Reveal>
        <ul className="grid gap-3 sm:grid-cols-2 lg:col-span-7">
          {aboutPoints.map((point, index) => (
            <li key={point.title}>
              <Reveal delay={index * 0.04} className="h-full">
                <article className="surface h-full rounded-3xl p-5">
                  <div className="flex items-center justify-between gap-3">
                    <IconBadge name={point.icon} size="sm" />
                    <p className="font-mono text-xs text-cyan">{String(index + 1).padStart(2, "0")}</p>
                  </div>
                  <h3 className="mt-3 text-lg text-foreground">{point.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted">{point.text}</p>
                </article>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
