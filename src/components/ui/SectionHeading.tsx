import { cn } from "@/lib/cn";
import { InlineIcon, type IconName } from "@/components/ui/icons";

export function SectionHeading({
  index,
  eyebrow,
  title,
  description,
  icon,
  className,
}: {
  index?: string;
  eyebrow?: string;
  title: string;
  description?: string;
  icon?: IconName;
  className?: string;
}) {
  return (
    <div className={cn("max-w-3xl", className)}>
      {eyebrow ? (
        <p className="inline-flex items-center gap-2 text-sm font-medium text-cyan">
          {icon ? <InlineIcon name={icon} className="h-3.5 w-3.5" /> : null}
          {index ? `${index} — ${eyebrow}` : eyebrow}
        </p>
      ) : null}
      <h2 className="mt-3 text-3xl leading-tight text-foreground sm:text-4xl md:text-[2.75rem]">{title}</h2>
      {description ? <p className="mt-5 text-lg leading-8 text-muted text-pretty">{description}</p> : null}
    </div>
  );
}
