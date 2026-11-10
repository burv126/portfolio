import { ContactForm } from "@/components/sections/ContactForm";
import { ContactMethodIcon } from "@/components/ui/ContactMethodIcon";
import { InlineIcon } from "@/components/ui/icons";
import { Section } from "@/components/ui/Section";
import { getMissingContactEnv, getPublicContacts } from "@/config/site";
import type { ContactDelivery } from "@/lib/contact";
import { hostname } from "@/lib/cn";

export function Contact({ delivery }: { delivery: ContactDelivery }) {
  const contacts = getPublicContacts();
  const missing = getMissingContactEnv();

  return (
    <Section id="contact">
      <div className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <p className="inline-flex items-center gap-2 text-sm font-medium text-cyan">
            <InlineIcon name="mail" className="h-3.5 w-3.5" />
            09 — Контакты
          </p>
          <h2 id="contact-title" className="mt-3 text-3xl leading-tight text-foreground sm:text-4xl md:text-[2.6rem]">
            Есть идея? Давайте превратим её в работающий продукт.
          </h2>
          <p className="mt-5 text-lg leading-8 text-muted text-pretty">
            Расскажите о вашей задаче — обсудим требования, возможные решения и следующие шаги.
          </p>
          <ul className="mt-8 space-y-3">
            {contacts.map((contact) => {
              const external = contact.href.startsWith("http");
              return (
                <li key={contact.id}>
                  <a
                    href={contact.href}
                    {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="surface flex items-center gap-3 rounded-2xl px-4 py-3 text-sm hover:border-cyan/30"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cyan/10 text-cyan">
                      <ContactMethodIcon id={contact.id} className="h-5 w-5" />
                    </span>
                    <span>
                      <span className="block text-foreground">{contact.label}</span>
                      {external && contact.id !== "telegram" ? <span className="text-xs text-faint">{hostname(contact.href)}</span> : null}
                      {external ? <span className="sr-only"> (откроется в новой вкладке)</span> : null}
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
          {missing.length > 0 ? (
            <p className="mt-4 text-sm leading-6 text-faint">
              Профиль freelance.ru подключается отдельно. Пока не задан: {missing.join(", ")}.
            </p>
          ) : null}
        </div>
        <div className="surface rounded-[32px] p-5 sm:p-8 lg:col-span-7">
          {delivery.mode === "unconfigured" ? (
            <aside className="mb-6 rounded-2xl border border-amber-200/30 bg-amber-200/10 p-4 text-sm leading-6 text-amber-50" aria-label="Настройка формы">
              <p className="font-medium">TODO: подключите доставку заявок</p>
              <p className="mt-2 text-amber-50/90">
                Форма проверяет поля, но письмо само не уйдёт. Добавьте CONTACT_WEBHOOK_URL или NEXT_PUBLIC_CONTACT_EMAIL в .env.local и перезапустите сервер. Успешная отправка показывается только после реального ответа сервиса.
              </p>
            </aside>
          ) : (
            <p className="mb-6 text-sm leading-6 text-muted">
              Имя, контакт, тип проекта и описание обязательны. Бюджет можно не указывать. Данные заявки используются только чтобы ответить по проекту.
            </p>
          )}
          <ContactForm delivery={delivery} />
        </div>
      </div>
    </Section>
  );
}
