import { NextResponse } from "next/server";

import { validateContactPayload } from "@/lib/contact";

function requestHost(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-host");
  const host = forwarded ?? request.headers.get("host") ?? "";
  return host.split(",")[0]?.trim() ?? "";
}

function isSameOrigin(request: Request): boolean {
  const origin = request.headers.get("origin");
  const host = requestHost(request);
  if (!origin || !host) return false;
  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

export async function POST(request: Request) {
  if (!isSameOrigin(request)) {
    return NextResponse.json({ ok: false, message: "Запрос отклонён." }, { status: 403 });
  }

  const webhook = process.env.CONTACT_WEBHOOK_URL?.trim() ?? "";
  if (!webhook.startsWith("https://") && !webhook.startsWith("http://")) {
    return NextResponse.json(
      {
        ok: false,
        code: "UNCONFIGURED",
        message: "TODO: укажите CONTACT_WEBHOOK_URL. Заявка не отправлена.",
      },
      { status: 503 },
    );
  }

  let payload: unknown;
  try {
    const text = await request.text();
    if (text.length > 20_000) {
      return NextResponse.json({ ok: false, message: "Слишком большое сообщение." }, { status: 413 });
    }
    payload = JSON.parse(text) as unknown;
  } catch {
    return NextResponse.json({ ok: false, message: "Некорректный запрос." }, { status: 400 });
  }

  const result = validateContactPayload(payload);
  if (!result.ok) {
    if (result.spam) {
      return NextResponse.json({ ok: false, message: "Заявку не удалось отправить." }, { status: 400 });
    }
    return NextResponse.json(
      { ok: false, message: result.message, fieldErrors: result.fieldErrors },
      { status: 422 },
    );
  }

  const headers: Record<string, string> = { "Content-Type": "application/json" };
  const secret = process.env.CONTACT_WEBHOOK_SECRET?.trim();
  if (secret) headers.Authorization = `Bearer ${secret}`;

  try {
    const upstream = await fetch(webhook, {
      method: "POST",
      headers,
      body: JSON.stringify({
        name: result.data.name,
        contact: result.data.contact,
        projectType: result.data.projectType,
        projectTypeLabel: result.data.projectTypeLabel,
        description: result.data.description,
        budget: result.data.budget || undefined,
        source: "portfolio",
        submittedAt: new Date().toISOString(),
      }),
      cache: "no-store",
      redirect: "error",
      signal: AbortSignal.timeout(10_000),
    });

    if (!upstream.ok) {
      return NextResponse.json(
        { ok: false, message: "Сервис заявок временно недоступен. Напишите напрямую." },
        { status: 502 },
      );
    }
  } catch {
    return NextResponse.json(
      { ok: false, message: "Не удалось передать заявку. Попробуйте ещё раз или напишите напрямую." },
      { status: 502 },
    );
  }

  return NextResponse.json({
    ok: true,
    message: "Заявка отправлена. Я свяжусь с вами по указанным контактам.",
  });
}
