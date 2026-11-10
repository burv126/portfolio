import { ArrowRight, Building, Cable, Layers, Sparkles, Workflow, type LucideIcon } from "lucide-react";
import Link from "next/link";

import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Tag } from "@/components/ui/Tag";
import { services, type ServiceIcon } from "@/data/services";

const icons: Record<ServiceIcon, LucideIcon> = {
  layers: Layers,
  sparkles: Sparkles,
  building: Building,
  workflow: Workflow,
  cable: Cable,
};

export function Services() {
  return (
    <Section id="services">
      <Reveal>
        <SectionHeading
          index="03"
          icon="layers"
          eyebrow="Услуги"
          title="Чем я могу быть полезен вашему бизнесу"
          description="Пять форматов работы. Метки на карточках — инструменты направления. Что уже подтверждено кейсом, отмечено отдельно в разделе технологий."
        />
      </Reveal>
      <ul className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-12">
        {services.map((service, index) => {
          const Icon = icons[service.icon];
          const span = index === 0 ? "xl:col-span-7" : index === 1 ? "xl:col-span-5" : "xl:col-span-4";
          return (
            <li key={service.id} className={span}>
              <Reveal delay={index * 0.04} className="h-full">
                <article className="surface surface-interactive group flex h-full flex-col rounded-[28px] p-6">
                  <div className="grid h-11 w-11 place-items-center rounded-2xl border border-cyan/20 bg-cyan/10 text-cyan">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <h3 className="mt-6 text-xl text-foreground">{service.title}</h3>
                  <p className="mt-3 flex-1 text-sm leading-6 text-muted text-pretty">{service.description}</p>
                  <ul className="mt-5 flex flex-wrap gap-2" aria-label="Инструменты направления">
                    {service.technologies.map((tech) => (
                      <li key={tech}>
                        <Tag>{tech}</Tag>
                      </li>
                    ))}
                  </ul>
                  <Link href="/#contact" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-cyan">
                    Обсудить задачу
                    <ArrowRight className="h-4 w-4 transition-transform duration-200 motion-safe:group-hover:translate-x-0.5" aria-hidden="true" />
                  </Link>
                </article>
              </Reveal>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
