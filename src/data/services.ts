export type ServiceIcon = "layers" | "sparkles" | "building" | "workflow" | "cable";

export type Service = {
  id: string;
  icon: ServiceIcon;
  title: string;
  description: string;
  technologies: string[];
};

export const services: Service[] = [
  {
    id: "fullstack",
    icon: "layers",
    title: "Full-Stack разработка",
    description:
      "Собираю веб-приложение целиком: API, кабинет, панель управления и публичный интерфейс. Формат уместен, когда продукту нужен один контур ответственности — от структуры данных до экрана, с которым работает человек.",
    technologies: ["TypeScript", "React", "Next.js", "Java", "Spring Boot"],
  },
  {
    id: "ai",
    icon: "sparkles",
    title: "AI и LLM-интеграции",
    description:
      "Подключаю ассистентов, диалоговые сценарии, LLM API, интеллектуальный поиск, RAG и агентные цепочки к операциям компании. RAG и агенты — это способ закрыть задачу. Готовыми внедрениями они здесь не заявлены.",
    technologies: ["Gemini AI", "LLM API", "RAG", "Поиск"],
  },
  {
    id: "saas",
    icon: "building",
    title: "SaaS, CRM и ERP-системы",
    description:
      "Делаю мультиарендные сервисы и внутренние системы, где сходятся клиенты, сотрудники, роли и ежедневные операции. Основа рассчитана на то, чтобы компания росла без переписывания продукта с нуля.",
    technologies: ["Multi-tenant", "RBAC", "JWT", "MySQL"],
  },
  {
    id: "automation",
    icon: "workflow",
    title: "Автоматизация бизнес-процессов",
    description:
      "Перевожу ручные цепочки в устойчивый сценарий: статусы, фоновые шаги, обмен между сервисами и понятные точки, где решение остаётся за человеком.",
    technologies: ["REST API", "Интеграции", "Фоновые задачи"],
  },
  {
    id: "api",
    icon: "cable",
    title: "API и системная интеграция",
    description:
      "Проектирую REST API, вход в систему, роли и обмен со сторонними сервисами. Данные остаются в базе, а доступ к ним задаётся правилами, а не договорённостью на словах.",
    technologies: ["REST API", "Spring Security", "JWT", "MySQL"],
  },
];
