import { IconBadge } from "@/components/ui/icons";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Tag } from "@/components/ui/Tag";
import { technologyGroups, verifiedTechnologies } from "@/data/technologies";

export function Technologies() {
  return (
    <Section id="stack">
      <Reveal>
        <SectionHeading
          index="06"
          icon="cpu"
          eyebrow="Стек"
          title="Технологии, с которыми я работаю"
          description="Отметка «в проекте» стоит только у того, что уже есть в кейсах на этом сайте. Остальное — навыки, с которыми берусь за задачу. Сервисы, которые в России не работают, в список не входят."
        />
      </Reveal>
      <div className="mt-10">
        <h3 className="text-sm font-medium text-foreground">Уже есть в кейсах</h3>
        <ul className="mt-4 flex flex-wrap gap-2">
          {verifiedTechnologies.map((item) => (
            <li key={`${item.name}-${item.source ?? ""}`}>
              <Tag>
                {item.name}
                <span className="sr-only">, подтверждено{item.source ? `: ${item.source}` : " в проекте"}</span>
              </Tag>
            </li>
          ))}
        </ul>
      </div>
      <ul className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {technologyGroups.map((group) => (
          <li key={group.id} className="surface h-full rounded-[28px] p-6">
            <h3 className="flex items-center gap-3 text-lg text-foreground">
              <IconBadge name={group.icon} size="sm" />
              {group.title}
            </h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {group.items.map((item) => (
                <li key={item.name}>
                  <Tag>
                    {item.name}
                    {item.verified ? (
                      <span className="text-[10px] tracking-normal text-faint">в проекте</span>
                    ) : null}
                    {item.verified ? (
                      <span className="sr-only">{item.source ? `, ${item.source}` : ""}</span>
                    ) : null}
                  </Tag>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </Section>
  );
}
