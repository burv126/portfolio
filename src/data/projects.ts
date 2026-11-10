export type ProjectLink = {
  label: string;
  href: string;
};

export type ProjectSection = {
  title: string;
  paragraphs: string[];
  bullets?: string[];
};

export type Project = {
  slug: string;
  title: string;
  category: string;
  summary: string;
  description: string;
  illustration: "nexora" | "ratchet";
  images?: { src: string; alt: string }[];
  layout: "feature" | "compact";
  technologies: string[];
  highlights: string[];
  url?: string;
  links?: ProjectLink[];
  sections: ProjectSection[];
  /**
   * Unverified details. The page renders a list only when it contains items.
   * Do not fill these with guesses.
   */
  pending: {
    features: string[];
    technologies: string[];
    outcomes: string[];
  };
};

export const projects: Project[] = [
  {
    slug: "nexora-vision-360",
    title: "NEXORA Vision 360",
    category: "Полевой сервис / SaaS",
    summary:
      "Платформа полевого сервиса: клиенты и объекты, оборудование, заявки, наряды, склад, счета и оплаты, плюс AI-подсказки технику.",
    description:
      "NEXORA Vision 360 собирает операционный контур компании, которая обслуживает объекты на выезде. В одной системе живут клиенты, площадки, оборудование, заявки, наряды, склад, счета и оплаты. Ниже — архитектура и функции, которые в продукте есть. Число клиентов, нагрузку и эффект от внедрения я не указываю: этих цифр для публикации нет.",
    illustration: "nexora",
    layout: "feature",
    technologies: [
      "Java",
      "Spring Boot",
      "Spring Security",
      "JWT",
      "Angular",
      "MySQL",
      "Gemini AI",
    ],
    highlights: [
      "API с изоляцией по организации",
      "Аутентификация и ролевой доступ",
      "Клиенты, объекты и оборудование",
      "Заявки, наряды, склад, счета и оплаты",
      "AI-подсказки технику и сводки заявок",
    ],
    sections: [
      {
        title: "Как устроена система",
        paragraphs: [
          "Серверная часть написана на Java и Spring Boot. API учитывает организацию: пользователь действует в рамках своей компании и своей роли. Вход и права собраны на Spring Security и JWT.",
          "Клиентское приложение — Angular. Операционные данные хранятся в MySQL. Контур обычный для бизнес-системы и от этого надёжный: экран, контракт API, правила на сервере, база.",
        ],
      },
      {
        title: "Рабочие сценарии",
        paragraphs: [
          "Платформа закрывает путь заявки от появления клиента до оплаты. Каждый пункт ниже — подтверждённая функция, не пожелание к следующей версии.",
        ],
        bullets: [
          "Мультиарендные API: данные и действия ограничены организацией",
          "Аутентификация и разграничение доступа по ролям",
          "Ведение клиентов и объектов обслуживания",
          "Учёт оборудования",
          "Заявки и наряды",
          "Складской учёт",
          "Счета и оплаты",
          "Подсказки технику при разборе проблемы",
          "Сводки сервисных заявок, собранные моделью",
        ],
      },
      {
        title: "Где в процессе стоит AI",
        paragraphs: [
          "Gemini подключён к двум прикладным сценариям. Первый помогает технику разобрать проблему на объекте. Второй собирает краткую сводку по сервисной заявке, чтобы не перечитывать всю историю вручную.",
          "Модель стоит рядом с заявкой и ролью сотрудника. Это часть продукта, а не отдельная витрина с чатом.",
        ],
      },
    ],
    pending: { features: [], technologies: [], outcomes: [] },
  },
  {
    slug: "avtocentr",
    title: "АвтоЦентр",
    category: "SaaS-платформа",
    summary: "Самостоятельный SaaS-продукт. Публичная версия доступна онлайн.",
    description:
      "АвтоЦентр — SaaS, который я разработал и опубликовал. Открыть продукт можно по ссылке. Функции, технологический стек и бизнес-результаты на этой странице не перечислены: подтверждённого описания для них нет, и я не заполняю карточку общими словами.",
    illustration: "ratchet",
    images: [
      {
        src: "/projects/avtocentr-hero.jpg",
        alt: "Главный экран АвтоЦентр: сервисный бокс, автомобиль и название продукта",
      },
      {
        src: "/projects/avtocentr-features.png",
        alt: "Экран АвтоЦентр с блоками приёма клиентов, записей, маркетинга и базы знаний",
      },
    ],
    layout: "feature",
    technologies: [],
    highlights: [],
    url: "https://ratchethub-production.up.railway.app",
    sections: [],
    pending: {
      features: [],
      technologies: [],
      outcomes: [],
    },
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function projectPath(slug: string): string {
  return `/projects/${slug}`;
}
