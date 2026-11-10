export const projectTypes = [
  { value: "saas", label: "SaaS или веб-приложение" },
  { value: "ai", label: "AI-интеграция" },
  { value: "automation", label: "Автоматизация" },
  { value: "api", label: "API и интеграции" },
  { value: "other", label: "Другое" },
] as const;

export type ProjectTypeValue = (typeof projectTypes)[number]["value"];

export type ContactField = "name" | "contact" | "projectType" | "description" | "budget";

export type FieldErrors = Partial<Record<ContactField, string>>;

export type ContactMessage = {
  name: string;
  contact: string;
  projectType: ProjectTypeValue;
  projectTypeLabel: string;
  description: string;
  budget: string;
};

export type ContactDelivery =
  | { mode: "webhook" }
  | { mode: "mailto"; email: string }
  | { mode: "unconfigured" };

export type ValidationResult =
  | { ok: true; data: ContactMessage }
  | { ok: false; spam: true }
  | { ok: false; spam: false; message: string; fieldErrors: FieldErrors };

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const TELEGRAM_PATTERN = /^@?[a-zA-Z][a-zA-Z0-9_]{3,31}$/;
const MIN_FILL_MS = 800;
const MAX_AGE_MS = 1000 * 60 * 60 * 12;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function singleLine(value: unknown, max: number): string {
  if (typeof value !== "string") return "";
  return value.replace(/[<>]/g, "").replace(/\s+/g, " ").trim().slice(0, max);
}

function multiLine(value: unknown, max: number): string {
  if (typeof value !== "string") return "";
  return value.replace(/[<>]/g, "").replace(/\r\n/g, "\n").trim().slice(0, max);
}

export function validateContactPayload(input: unknown, now = Date.now()): ValidationResult {
  if (!isRecord(input)) {
    return {
      ok: false,
      spam: false,
      message: "Некорректные данные формы.",
      fieldErrors: {},
    };
  }

  const honeypot = singleLine(input.company_website, 200);
  const startedAt = typeof input.startedAt === "number" ? input.startedAt : Number.NaN;
  const age = now - startedAt;
  const clockSkewed = startedAt > now + 5 * 60 * 1000;

  if (honeypot || !Number.isFinite(startedAt) || age < MIN_FILL_MS || age > MAX_AGE_MS || clockSkewed) {
    return { ok: false, spam: true };
  }

  const name = singleLine(input.name, 80);
  const contact = singleLine(input.contact, 120);
  const projectType = singleLine(input.projectType, 40);
  const description = multiLine(input.description, 1500);
  const budget = singleLine(input.budget, 80);
  const fieldErrors: FieldErrors = {};

  if (name.length < 2) {
    fieldErrors.name = "Укажите имя — как к вам обращаться.";
  }

  if (!contact) {
    fieldErrors.contact = "Оставьте email или Telegram, чтобы я мог ответить.";
  } else if (!EMAIL_PATTERN.test(contact) && !TELEGRAM_PATTERN.test(contact)) {
    fieldErrors.contact = "Похоже, это не email и не имя пользователя Telegram.";
  }

  const selected = projectTypes.find((item) => item.value === projectType);
  if (!selected) {
    fieldErrors.projectType = "Выберите тип проекта.";
  }

  if (description.length < 20) {
    fieldErrors.description = "Опишите задачу подробнее: пара предложений о цели и контексте.";
  }

  if (typeof input.budget === "string" && input.budget.trim().length > 80) {
    fieldErrors.budget = "Сократите бюджет до пары слов или диапазона.";
  }

  if (Object.keys(fieldErrors).length > 0 || !selected) {
    return {
      ok: false,
      spam: false,
      message: "Проверьте поля формы.",
      fieldErrors,
    };
  }

  return {
    ok: true,
    data: {
      name,
      contact,
      projectType: selected.value,
      projectTypeLabel: selected.label,
      description,
      budget,
    },
  };
}

export function buildMailto(email: string, data: ContactMessage): { href: string; truncated: boolean } {
  const compose = (description: string) => {
    const lines = [
      `Имя: ${data.name}`,
      `Контакт: ${data.contact}`,
      `Тип проекта: ${data.projectTypeLabel}`,
      `Бюджет: ${data.budget || "не указан"}`,
      "",
      "Задача:",
      description,
    ];
    const subject = encodeURIComponent(`Заявка с сайта: ${data.projectTypeLabel}`);
    const body = encodeURIComponent(lines.join("\n"));
    return `mailto:${email}?subject=${subject}&body=${body}`;
  };

  let description = data.description;
  let href = compose(description);
  let truncated = false;

  while (href.length > 1800 && description.length > 140) {
    truncated = true;
    description = `${description.slice(0, description.length - 80).trim()}…`;
    href = compose(description);
  }

  return { href, truncated };
}
