import { InlineIcon } from "@/components/ui/icons";
import { architectureNodes } from "@/data/content";

export function ArchitectureDiagram() {
  return (
    <div className="surface rounded-[28px] p-5 sm:p-6">
      <div className="mb-5 flex items-center justify-between gap-4">
        <p className="inline-flex items-center gap-2 text-sm text-muted">
          <InlineIcon name="waypoints" className="text-cyan" />
          Схема контура
        </p>
        <p className="font-mono text-[11px] text-faint">Frontend → AI</p>
      </div>
      <div className="relative">
        <div
          aria-hidden="true"
          className="absolute bottom-8 left-[1.15rem] top-8 w-px bg-gradient-to-b from-cyan/0 via-cyan/70 to-violet/50"
        >
          <span className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 rounded-full bg-cyan shadow-[0_0_16px_#8aebff] motion-safe:animate-packet" />
        </div>
        <ol className="space-y-3" aria-label="Связь интерфейса, API, сервера, базы данных и AI">
          {architectureNodes.map((node) => (
            <li key={node.index} className="relative pl-12">
              <span className="absolute left-0 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full border border-cyan/30 bg-[#0c1526] font-mono text-[11px] text-cyan">
                {node.index}
              </span>
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3">
                <p className="flex items-center gap-2 text-sm font-medium text-foreground">
                  <InlineIcon name={node.icon} className="text-cyan" />
                  {node.title}
                </p>
                <p className="mt-1 text-sm leading-5 text-muted">{node.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
