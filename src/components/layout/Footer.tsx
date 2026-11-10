import Link from "next/link";

import { CopyrightYear } from "@/components/layout/CopyrightYear";
import { ContactMethodIcon } from "@/components/ui/ContactMethodIcon";
import { InlineIcon } from "@/components/ui/icons";
import { Container } from "@/components/ui/Container";
import { getPublicContacts, navItems, siteConfig } from "@/config/site";
import { projects } from "@/data/projects";
import { hostname } from "@/lib/cn";

export function Footer() {
  const contacts = getPublicContacts();
  const projectLinks = projects.flatMap((project) => {
    if (project.url) return [{ label: project.title, href: project.url }];
    return (project.links ?? []).map((link) => ({ label: link.label, href: link.href }));
  });

  return (
    <footer className="border-t border-white/10 py-14">
      <Container>
        <div className="grid gap-10 md:grid-cols-2 xl:grid-cols-12">
          <div className="xl:col-span-4">
            <p className="text-lg font-semibold">{siteConfig.name}</p>
            <p className="mt-2 text-sm text-cyan">{siteConfig.role}</p>
            <p className="mt-4 max-w-sm text-sm leading-6 text-muted">
              Проектирую и разрабатываю SaaS, веб-приложения и AI-решения для бизнеса.
            </p>
          </div>

          <nav className="xl:col-span-2" aria-label="Навигация в подвале">
            <p className="inline-flex items-center gap-2 text-sm font-medium text-foreground">
              <InlineIcon name="compass" className="text-cyan" />
              Навигация
            </p>
            <ul className="mt-4 space-y-2">
              {navItems.map((item) => (
                <li key={item.id}>
                  <Link href={`/#${item.id}`} className="inline-flex items-center gap-2 text-sm text-muted hover:text-foreground">
                    <InlineIcon name={item.icon} className="h-3.5 w-3.5 text-cyan" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="xl:col-span-3">
            <p className="inline-flex items-center gap-2 text-sm font-medium text-foreground">
              <InlineIcon name="folder" className="text-cyan" />
              Проекты
            </p>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/projects/nexora-vision-360" className="inline-flex items-center gap-2 text-sm text-muted hover:text-foreground">
                  <InlineIcon name="folder" className="h-3.5 w-3.5 text-cyan" />
                  NEXORA Vision 360
                </Link>
              </li>
              {projectLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted hover:text-foreground"
                  >
                    {link.label}
                    <span className="sr-only"> (откроется в новой вкладке)</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="xl:col-span-3">
            <p className="inline-flex items-center gap-2 text-sm font-medium text-foreground">
              <InlineIcon name="mail" className="text-cyan" />
              Контакты
            </p>
            <ul className="mt-4 space-y-2">
              {contacts.map((contact) => {
                const external = contact.href.startsWith("http");
                return (
                  <li key={contact.id}>
                    <a
                      href={contact.href}
                      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      className="inline-flex items-center gap-2 text-sm text-muted hover:text-foreground"
                    >
                      <ContactMethodIcon id={contact.id} className="h-4 w-4 shrink-0 text-cyan" />
                      {contact.label}
                      {external ? <span className="sr-only"> (откроется в новой вкладке)</span> : null}
                    </a>
                    {external && contact.id !== "email" && contact.id !== "telegram" ? (
                      <span className="mt-0.5 block text-xs text-faint">{hostname(contact.href)}</span>
                    ) : null}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <p className="mt-12 border-t border-white/10 pt-6 text-sm text-faint">
          © <CopyrightYear fallback={siteConfig.copyrightYear} /> {siteConfig.name}. Все права защищены.
        </p>
      </Container>
    </footer>
  );
}
