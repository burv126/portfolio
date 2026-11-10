import { InlineIcon } from "@/components/ui/icons";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { processSteps } from "@/data/process";

export function Process() {
  return (
    <Section id="process">
      <div className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <SectionHeading
            index="07"
            icon="route"
            eyebrow="Процесс"
            title="Как проходит работа над проектом"
            description="Шесть этапов с понятным результатом. Сроки согласуем по объёму задачи, а не по шаблону «за две недели любой продукт»."
          />
        </div>
        <ol className="relative lg:col-span-8">
          <span className="absolute bottom-4 left-[1.15rem] top-4 w-px bg-white/10" aria-hidden="true" />
          {processSteps.map((step) => (
            <li key={step.index} className="relative pb-8 pl-16 last:pb-0">
              <span className="absolute left-0 top-0 grid h-10 w-10 place-items-center rounded-full border border-cyan/30 bg-[#0c1526] font-mono text-xs text-cyan">
                {step.index}
              </span>
              <h3 className="flex items-center gap-2 text-xl text-foreground">
                <InlineIcon name={step.icon} className="text-cyan" />
                {step.title}
              </h3>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-muted text-pretty">{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
