import { InlineIcon } from "@/components/ui/icons";
import { aiFlow } from "@/data/content";

export function AiFlow() {
  return (
    <ol className="grid gap-3 md:grid-cols-5" aria-label="Путь запроса: от пользователя до полезного ответа">
      {aiFlow.map((step) => (
        <li key={step.index} className="rounded-2xl border border-white/10 bg-[#0c1526]/80 p-4">
          <p className="flex items-center justify-between gap-2">
            <InlineIcon name={step.icon} className="text-cyan" />
            <span className="font-mono text-xs text-cyan">{step.index}</span>
          </p>
          <p className="mt-3 text-sm font-medium text-foreground">{step.title}</p>
          <p className="mt-2 text-sm leading-5 text-muted">{step.text}</p>
        </li>
      ))}
    </ol>
  );
}
