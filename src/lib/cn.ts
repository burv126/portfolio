export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}

export function hostname(href: string): string {
  try {
    return new URL(href).host;
  } catch {
    return href;
  }
}
