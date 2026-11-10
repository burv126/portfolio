import { IconBadge, InlineIcon } from "@/components/ui/icons";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AiFlow } from "@/components/visuals/AiFlow";
import { aiConsiderations, aiFeatures } from "@/data/content";

export function AiExpertise() {
  return (
    <Section id="ai">
      <Reveal>
        <SectionHeading
          index="05"
          icon="sparkles"
          eyebrow="AI"
          title="Искусственный интеллект, встроенный в реальные бизнес-процессы"
          description="Подключаю модели там, где они сокращают ручную работу: в заявках, поиске, сводках и внутренних сценариях. Ниже — направления, которые беру в разработку. Подтверждённый пример отмечен отдельно. Остальные пункты описывают возможности, а не список уже сданных проектов."
        />
      </Reveal>
      <div className="surface mt-12 rounded-[32px] p-5 md:p-8">
        <AiFlow />
        <ul className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {aiFeatures.map((feature) => (
            <li key={feature.title} className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <IconBadge name={feature.icon} size="sm" />
              <h3 className="mt-4 text-lg text-foreground">{feature.title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted">{feature.text}</p>
            </li>
          ))}
        </ul>
      </div>
      <aside className="mt-6 rounded-[28px] border border-cyan/20 bg-cyan/[0.05] p-6 md:p-8">
        <p className="inline-flex items-center gap-2 text-sm font-medium text-cyan">
          <InlineIcon name="sparkles" className="h-3.5 w-3.5" />
          Пример из продукта
        </p>
        <h3 className="mt-3 text-2xl text-foreground">Gemini в NEXORA Vision 360</h3>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-muted text-pretty">
          В платформе полевого сервиса Gemini помогает технику разобрать проблему и собирает сводку сервисной заявки. Это описанная функция продукта. Масштаб внедрения и экономический эффект здесь не заявлены.
        </p>
      </aside>
      <div className="mt-8">
        <h3 className="flex items-center gap-2 text-xl text-foreground">
          <InlineIcon name="shield" className="text-cyan" />
          Что закладываю в реализацию
        </h3>
        <ul className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {aiConsiderations.map((item) => (
            <li key={item.title} className="rounded-2xl border border-white/10 p-4">
              <p className="flex items-center gap-2 text-sm font-medium text-foreground">
                <InlineIcon name={item.icon} className="text-cyan" />
                {item.title}
              </p>
              <p className="mt-2 text-sm leading-6 text-muted">{item.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
