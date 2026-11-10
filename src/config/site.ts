/**
 * Public site configuration.
 * Change the name, URL, and contact channels here or via environment variables.
 * A few supplied headlines use masculine grammar ("полезен") — update them with the name if needed.
 */

function readSiteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (!raw) return "http://localhost:3000";
  try {
    return new URL(raw).origin;
  } catch {
    return "http://localhost:3000";
  }
}

function readHttpsUrl(value: string | undefined): string {
  const raw = value?.trim() ?? "";
  if (!raw) return "";
  try {
    const url = new URL(raw);
    if (url.protocol !== "https:" && url.protocol !== "http:") return "";
    return url.toString();
  } catch {
    return "";
  }
}

function readEmail(value: string | undefined): string {
  const raw = value?.trim() ?? "";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(raw)) return "";
  return raw;
}

function readTelegram(value: string | undefined): string {
  const handle = value?.trim().replace(/^@/, "") ?? "";
  if (!/^[a-zA-Z][a-zA-Z0-9_]{3,31}$/.test(handle)) return "";
  return handle;
}

export const siteConfig = {
  name: "Владислав Буров",
  role: "Full-Stack & AI Developer",
  title: "Владислав Буров — Full-Stack и AI-разработчик",
  description:
    "Разрабатываю SaaS-платформы, веб-приложения и AI-решения для бизнеса: архитектура, backend, интерфейс и запуск продукта.",
  url: readSiteUrl(),
  locale: "ru_RU",
  contentUpdated: "2026-11-05",
  copyrightYear: 2026,
  email: readEmail(process.env.NEXT_PUBLIC_CONTACT_EMAIL || "burv-vlad@mail.ru"),
  telegram: readTelegram(process.env.NEXT_PUBLIC_TELEGRAM || "burv_vlad"),
  freelanceUrl: readHttpsUrl(process.env.NEXT_PUBLIC_FREELANCE_URL),
  knowsAbout: ["Full-Stack разработка", "SaaS", "Интеграция AI", "Проектирование API"],
} as const;

export const navItems = [
  { id: "top", label: "Главная", icon: "house" },
  { id: "about", label: "Обо мне", icon: "user" },
  { id: "services", label: "Услуги", icon: "layers" },
  { id: "projects", label: "Проекты", icon: "folder" },
  { id: "stack", label: "Технологии", icon: "cpu" },
  { id: "process", label: "Процесс работы", icon: "route" },
  { id: "contact", label: "Контакты", icon: "mail" },
] as const;

export type PublicContact = {
  id: string;
  label: string;
  href: string;
};

export function getPublicContacts(): PublicContact[] {
  const items: PublicContact[] = [];

  if (siteConfig.freelanceUrl) {
    items.push({
      id: "freelance",
      label: "Профиль на freelance.ru",
      href: siteConfig.freelanceUrl,
    });
  }

  if (siteConfig.telegram) {
    items.push({
      id: "telegram",
      label: "Telegram",
      href: `https://t.me/${siteConfig.telegram}`,
    });
  }

  if (siteConfig.email) {
    items.push({
      id: "email",
      label: siteConfig.email,
      href: `mailto:${siteConfig.email}`,
    });
  }

  return items;
}

export function getMissingContactEnv(): string[] {
  const missing: string[] = [];
  if (!siteConfig.freelanceUrl) missing.push("NEXT_PUBLIC_FREELANCE_URL");
  if (!siteConfig.telegram) missing.push("NEXT_PUBLIC_TELEGRAM");
  if (!siteConfig.email) missing.push("NEXT_PUBLIC_CONTACT_EMAIL");
  return missing;
}
