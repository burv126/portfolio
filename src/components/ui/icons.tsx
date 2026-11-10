import {
  AppWindow,
  AtSign,
  Blocks,
  BookOpen,
  Bot,
  Boxes,
  Brain,
  Briefcase,
  Bug,
  Building,
  Cable,
  ClipboardList,
  Clock,
  CodeXml,
  Compass,
  Container,
  Cpu,
  Database,
  Eye,
  FileSearch,
  FileText,
  FlaskConical,
  FolderKanban,
  Gauge,
  GitBranch,
  Globe,
  Handshake,
  House,
  Layers,
  LayoutDashboard,
  LifeBuoy,
  ListChecks,
  Lock,
  Mail,
  Megaphone,
  MessagesSquare,
  Monitor,
  Network,
  Paintbrush,
  Palette,
  PenLine,
  Phone,
  Puzzle,
  Rocket,
  Route,
  ScanText,
  Search,
  Send,
  Server,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Target,
  Terminal,
  UserRound,
  Users,
  Wallet,
  Waypoints,
  Workflow,
  Wrench,
  type LucideIcon,
} from "lucide-react";

import { cn } from "@/lib/cn";

export const icons = {
  house: House,
  user: UserRound,
  users: Users,
  layers: Layers,
  folder: FolderKanban,
  cpu: Cpu,
  route: Route,
  mail: Mail,
  sparkles: Sparkles,
  workflow: Workflow,
  cable: Cable,
  building: Building,
  monitor: Monitor,
  server: Server,
  database: Database,
  brain: Brain,
  smartphone: Smartphone,
  globe: Globe,
  gauge: Gauge,
  network: Network,
  palette: Palette,
  megaphone: Megaphone,
  flask: FlaskConical,
  shield: ShieldCheck,
  lock: Lock,
  bot: Bot,
  search: Search,
  fileSearch: FileSearch,
  scan: ScanText,
  target: Target,
  puzzle: Puzzle,
  phone: Phone,
  clipboard: ClipboardList,
  pen: PenLine,
  code: CodeXml,
  lifeBuoy: LifeBuoy,
  eye: Eye,
  clock: Clock,
  handshake: Handshake,
  rocket: Rocket,
  wallet: Wallet,
  briefcase: Briefcase,
  send: Send,
  atSign: AtSign,
  fileText: FileText,
  boxes: Boxes,
  appWindow: AppWindow,
  git: GitBranch,
  terminal: Terminal,
  wrench: Wrench,
  bug: Bug,
  list: ListChecks,
  book: BookOpen,
  paint: Paintbrush,
  compass: Compass,
  messages: MessagesSquare,
  layout: LayoutDashboard,
  container: Container,
  blocks: Blocks,
  waypoints: Waypoints,
} as const satisfies Record<string, LucideIcon>;

export type IconName = keyof typeof icons;

export function IconBadge({
  name,
  size = "md",
  className,
}: {
  name: IconName;
  size?: "sm" | "md";
  className?: string;
}) {
  const Icon = icons[name];
  return (
    <span
      className={cn(
        "grid shrink-0 place-items-center border border-cyan/20 bg-cyan/10 text-cyan",
        size === "sm" ? "h-9 w-9 rounded-xl" : "h-11 w-11 rounded-2xl",
        className,
      )}
    >
      <Icon className={size === "sm" ? "h-4 w-4" : "h-5 w-5"} aria-hidden="true" />
    </span>
  );
}

export function InlineIcon({ name, className }: { name: IconName; className?: string }) {
  const Icon = icons[name];
  return <Icon className={cn("h-4 w-4 shrink-0", className)} aria-hidden="true" />;
}
