"use client";

import { useEffect, useId, useRef, useState, type FormEvent } from "react";

import { Button } from "@/components/ui/Button";
import { InlineIcon } from "@/components/ui/icons";
import {
  buildMailto,
  projectTypes,
  validateContactPayload,
  type ContactDelivery,
  type ContactField,
  type FieldErrors,
} from "@/lib/contact";
import { cn } from "@/lib/cn";

type Status =
  | { type: "idle" }
  | { type: "error"; message: string }
  | { type: "mailto"; message: string }
  | { type: "success"; message: string };

const fieldOrder: ContactField[] = ["name", "contact", "projectType", "description", "budget"];

export function ContactForm({ delivery }: { delivery: ContactDelivery }) {
  const formId = useId();
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>({ type: "idle" });
  const [pending, setPending] = useState(false);
  const [attempted, setAttempted] = useState(false);
  const [values, setValues] = useState({
    name: "",
    contact: "",
    projectType: "",
    description: "",
    budget: "",
    company_website: "",
  });
  const nameRef = useRef<HTMLInputElement>(null);
  const contactRef = useRef<HTMLInputElement>(null);
  const typeRef = useRef<HTMLSelectElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const budgetRef = useRef<HTMLInputElement>(null);

  const startedAtRef = useRef<number | null>(null);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      startedAtRef.current = Date.now();
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  const refs: Record<ContactField, { current: HTMLElement | null }> = {
    name: nameRef,
    contact: contactRef,
    projectType: typeRef,
    description: descriptionRef,
    budget: budgetRef,
  };

  function update(field: keyof typeof values, value: string) {
    const next = { ...values, [field]: value };
    setValues(next);
    if (!attempted) return;
    const result = validateContactPayload({
      ...next,
      startedAt: startedAtRef.current ?? Date.now() - 2000,
    });
    setErrors(result.ok || result.spam ? {} : result.fieldErrors);
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setAttempted(true);
    setStatus({ type: "idle" });

    const startedAt = startedAtRef.current;
    if (startedAt === null) {
      setStatus({ type: "error", message: "Форма ещё готовится. Отправьте её ещё раз." });
      return;
    }

    const result = validateContactPayload({ ...values, startedAt });
    if (!result.ok) {
      if (result.spam) {
        setStatus({ type: "error", message: "Заявку не удалось отправить. Напишите напрямую по контактам ниже." });
        return;
      }
      setErrors(result.fieldErrors);
      setStatus({ type: "error", message: result.message });
      const first = fieldOrder.find((field) => result.fieldErrors[field]);
      if (first) refs[first].current?.focus();
      return;
    }

    setErrors({});

    if (delivery.mode === "unconfigured") {
      setStatus({
        type: "error",
        message:
          "TODO: заявка не отправлена. Укажите CONTACT_WEBHOOK_URL или NEXT_PUBLIC_CONTACT_EMAIL в .env.local и перезапустите сервер. Сообщение об успехе появляется только после реальной доставки.",
      });
      return;
    }

    if (delivery.mode === "mailto") {
      const mail = buildMailto(delivery.email, result.data);
      window.location.href = mail.href;
      setStatus({
        type: "mailto",
        message: mail.truncated
          ? "Открылось почтовое приложение. Письмо уйдёт после ручной отправки. Текст задачи в письме сокращён из-за ограничения почтовой ссылки — полный вариант можно дописать вручную."
          : "Открылось почтовое приложение с текстом заявки. Письмо уйдёт только после того, как вы отправите его вручную.",
      });
      return;
    }

    setPending(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, startedAt }),
      });
      const payload: unknown = await response.json().catch(() => null);
      const message =
        payload && typeof payload === "object" && "message" in payload && typeof payload.message === "string"
          ? payload.message
          : "Не удалось отправить заявку.";
      const ok = payload && typeof payload === "object" && "ok" in payload && payload.ok === true;

      if (!response.ok || !ok) {
        const fieldErrors =
          payload && typeof payload === "object" && "fieldErrors" in payload && payload.fieldErrors && typeof payload.fieldErrors === "object"
            ? (payload.fieldErrors as FieldErrors)
            : {};
        setErrors(fieldErrors);
        setStatus({ type: "error", message });
        return;
      }

      setStatus({ type: "success", message });
      setValues({ name: "", contact: "", projectType: "", description: "", budget: "", company_website: "" });
      setAttempted(false);
    } catch {
      setStatus({
        type: "error",
        message: "Не удалось передать заявку. Попробуйте ещё раз или напишите напрямую.",
      });
    } finally {
      setPending(false);
    }
  }

  const inputClass = (field: ContactField) =>
    cn(
      "min-h-12 w-full rounded-2xl border bg-white/[0.04] px-4 text-base text-foreground placeholder:text-faint",
      errors[field] ? "border-rose-300/70" : "border-white/10",
    );

  return (
    <form id={formId} className="relative space-y-5" onSubmit={onSubmit} noValidate aria-labelledby="contact-title">
      <div className="absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor={`${formId}-company`}>Company website</label>
        <input
          id={`${formId}-company`}
          name="company_website"
          tabIndex={-1}
          autoComplete="off"
          value={values.company_website}
          onChange={(event) => update("company_website", event.target.value)}
        />
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label htmlFor={`${formId}-name`} className="mb-2 flex items-center gap-2 text-sm font-medium">
            <InlineIcon name="user" className="text-cyan" />
            Имя <span className="sr-only">(обязательно)</span>
          </label>
          <input
            ref={nameRef}
            id={`${formId}-name`}
            name="name"
            autoComplete="name"
            value={values.name}
            onChange={(event) => update("name", event.target.value)}
            className={inputClass("name")}
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={errors.name ? `${formId}-name-error` : undefined}
            required
          />
          {errors.name ? (
            <p id={`${formId}-name-error`} className="mt-2 text-sm text-rose-200">
              {errors.name}
            </p>
          ) : null}
        </div>
        <div>
          <label htmlFor={`${formId}-contact`} className="mb-2 flex items-center gap-2 text-sm font-medium">
            <InlineIcon name="atSign" className="text-cyan" />
            Email или Telegram(@burv_vlad) <span className="sr-only">(обязательно)</span>
          </label>
          <input
            ref={contactRef}
            id={`${formId}-contact`}
            name="contact"
            autoComplete="on"
            placeholder="name@company.ru или @username"
            value={values.contact}
            onChange={(event) => update("contact", event.target.value)}
            className={inputClass("contact")}
            aria-invalid={errors.contact ? true : undefined}
            aria-describedby={errors.contact ? `${formId}-contact-error` : undefined}
            required
          />
          {errors.contact ? (
            <p id={`${formId}-contact-error`} className="mt-2 text-sm text-rose-200">
              {errors.contact}
            </p>
          ) : null}
        </div>
      </div>

      <div>
        <label htmlFor={`${formId}-type`} className="mb-2 flex items-center gap-2 text-sm font-medium">
          <InlineIcon name="briefcase" className="text-cyan" />
          Тип проекта <span className="sr-only">(обязательно)</span>
        </label>
        <select
          ref={typeRef}
          id={`${formId}-type`}
          name="projectType"
          value={values.projectType}
          onChange={(event) => update("projectType", event.target.value)}
          className={inputClass("projectType")}
          aria-invalid={errors.projectType ? true : undefined}
          aria-describedby={errors.projectType ? `${formId}-type-error` : undefined}
          required
        >
          <option value="">Выберите тип</option>
          {projectTypes.map((type) => (
            <option key={type.value} value={type.value}>
              {type.label}
            </option>
          ))}
        </select>
        {errors.projectType ? (
          <p id={`${formId}-type-error`} className="mt-2 text-sm text-rose-200">
            {errors.projectType}
          </p>
        ) : null}
      </div>

      <div>
        <label htmlFor={`${formId}-description`} className="mb-2 flex items-center gap-2 text-sm font-medium">
          <InlineIcon name="fileText" className="text-cyan" />
          Описание задачи <span className="sr-only">(обязательно)</span>
        </label>
        <textarea
          ref={descriptionRef}
          id={`${formId}-description`}
          name="description"
          rows={6}
          placeholder="Что нужно запустить, для кого система и какой результат считаете успехом"
          value={values.description}
          onChange={(event) => update("description", event.target.value)}
          className={cn(inputClass("description"), "min-h-36 py-3")}
          aria-invalid={errors.description ? true : undefined}
          aria-describedby={errors.description ? `${formId}-description-error` : undefined}
          required
        />
        {errors.description ? (
          <p id={`${formId}-description-error`} className="mt-2 text-sm text-rose-200">
            {errors.description}
          </p>
        ) : null}
      </div>

      <div>
        <label htmlFor={`${formId}-budget`} className="mb-2 flex items-center gap-2 text-sm font-medium">
          <InlineIcon name="wallet" className="text-cyan" />
          Ориентировочный бюджет (необязательно)
        </label>
        <input
          ref={budgetRef}
          id={`${formId}-budget`}
          name="budget"
          value={values.budget}
          onChange={(event) => update("budget", event.target.value)}
          placeholder="Например, диапазон или «пока не определён»"
          className={inputClass("budget")}
          aria-invalid={errors.budget ? true : undefined}
          aria-describedby={errors.budget ? `${formId}-budget-error` : `${formId}-budget-hint`}
        />
        <p id={`${formId}-budget-hint`} className="mt-2 text-sm text-faint">
          Поле можно оставить пустым.
        </p>
        {errors.budget ? (
          <p id={`${formId}-budget-error`} className="mt-2 text-sm text-rose-200">
            {errors.budget}
          </p>
        ) : null}
      </div>

      {status.type !== "idle" ? (
        <p
          role={status.type === "error" ? "alert" : "status"}
          className={cn(
            "rounded-2xl border px-4 py-3 text-sm leading-6",
            status.type === "success" && "border-cyan/30 bg-cyan/10 text-foreground",
            status.type === "mailto" && "border-white/15 bg-white/[0.04] text-foreground",
            status.type === "error" && "border-rose-300/40 bg-rose-300/10 text-rose-50",
          )}
        >
          {status.message}
        </p>
      ) : null}

      <Button type="submit" disabled={pending} aria-busy={pending}>
        <InlineIcon name="send" className="h-3.5 w-3.5" />
        {pending ? "Отправляю…" : "Отправить заявку"}
      </Button>
    </form>
  );
}
