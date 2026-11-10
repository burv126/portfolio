import { IconBadge } from "@/components/ui/icons";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { whyPoints } from "@/data/content";

export function WhyMe() {
  return (
    <Section id="why">
      <SectionHeading index="08" icon="handshake" eyebrow="Сотрудничество" title="Почему стоит работать со мной" />
      <ol className="mt-12 divide-y divide-white/10 border-y border-white/10">
        {whyPoints.map((point, index) => (
          <li key={point.title} className="grid gap-3 py-6 md:grid-cols-12 md:gap-8">
            <div className="flex items-center gap-3 md:col-span-2">
              <IconBadge name={point.icon} size="sm" />
              <p className="font-mono text-sm text-cyan">{String(index + 1).padStart(2, "0")}</p>
            </div>
            <h3 className="text-xl text-foreground md:col-span-4">{point.title}</h3>
            <p className="text-sm leading-6 text-muted md:col-span-6">{point.text}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
