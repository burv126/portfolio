import type { Metadata } from "next";

import { Button } from "@/components/ui/Button";
import { IconBadge } from "@/components/ui/icons";

export const metadata: Metadata = {
  title: "Страница не найдена",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main id="content" className="flex flex-1 flex-col items-center justify-center px-6 py-32 text-center">
      <IconBadge name="fileSearch" />
      <p className="mt-6 text-sm font-medium text-cyan">404</p>
      <h1 className="mt-3 text-4xl text-foreground">Страница не найдена</h1>
      <p className="mt-4 max-w-md text-muted">Такой страницы нет. Вернитесь на главную или откройте проекты.</p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button href="/">На главную</Button>
        <Button href="/#projects" variant="secondary">
          Смотреть проекты
        </Button>
      </div>
    </main>
  );
}
