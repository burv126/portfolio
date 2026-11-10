export type Technology = {
  name: string;
  /** True only when the item is present in a confirmed project on this site. */
  verified: boolean;
  source?: string;
};

export type TechnologyGroup = {
  id: string;
  title: string;
  icon:
    | "monitor"
    | "server"
    | "smartphone"
    | "database"
    | "globe"
    | "gauge"
    | "brain"
    | "network"
    | "workflow"
    | "palette"
    | "megaphone"
    | "flask";
  items: Technology[];
};

const skill = (name: string): Technology => ({ name, verified: false });

export const technologyGroups: TechnologyGroup[] = [
  {
    id: "frontend",
    title: "Фронтенд",
    icon: "monitor",
    items: [
      { name: "Angular", verified: true, source: "NEXORA Vision 360" },
      skill("Frontend Development"),
      skill("React.js"),
      skill("Next.js"),
      skill("Vue.js"),
      skill("TypeScript"),
      skill("JavaScript"),
      skill("HTML5"),
      skill("CSS3"),
      skill("Tailwind CSS"),
      skill("Bootstrap"),
      skill("jQuery"),
      skill("AJAX"),
      skill("Three.js"),
      skill("D3.js"),
    ],
  },
  {
    id: "backend",
    title: "Бэкенд",
    icon: "server",
    items: [
      { name: "Java", verified: true, source: "NEXORA Vision 360" },
      { name: "Spring Boot", verified: true, source: "NEXORA Vision 360" },
      { name: "Spring Security", verified: true, source: "NEXORA Vision 360" },
      { name: "JWT", verified: true, source: "NEXORA Vision 360" },
      skill("Backend Development"),
      skill("Full Stack Development"),
      skill("PHP"),
      skill("Python"),
      skill("Node.js"),
      skill("Golang"),
      skill("Laravel"),
      skill("Nest.js"),
      skill("Lua"),
      skill("JSON"),
      skill("RESTful API"),
      skill("API Development"),
      skill("API Integration"),
      skill("MEAN Stack"),
      skill("MERN Stack"),
    ],
  },
  {
    id: "mobile",
    title: "Мобильные приложения",
    icon: "smartphone",
    items: [skill("Android"), skill("React Native"), skill("Ionic React")],
  },
  {
    id: "databases",
    title: "Базы данных",
    icon: "database",
    items: [
      { name: "MySQL", verified: true, source: "NEXORA Vision 360" },
      { name: "SQL", verified: true, source: "NEXORA Vision 360" },
      skill("PostgreSQL"),
      skill("MongoDB"),
      skill("Database Design"),
      skill("Database Development"),
      skill("Database Administration"),
    ],
  },
  {
    id: "sites",
    title: "Сайты и CMS",
    icon: "globe",
    items: [
      skill("Web Development"),
      skill("Web Design"),
      skill("WordPress"),
      skill("WordPress Design"),
      skill("WordPress Plugin"),
      skill("Elementor"),
      skill("CMS"),
      skill("Website Management"),
      skill("Web Hosting"),
    ],
  },
  {
    id: "performance",
    title: "Поиск и скорость",
    icon: "gauge",
    items: [
      skill("SEO"),
      skill("Website Optimization"),
      skill("Page Speed Optimization"),
      skill("Website Audit"),
      skill("Web Scraping"),
    ],
  },
  {
    id: "ai",
    title: "Искусственный интеллект",
    icon: "brain",
    items: [
      { name: "Gemini AI", verified: true, source: "NEXORA Vision 360" },
      { name: "Интеграция LLM API", verified: true, source: "NEXORA Vision 360" },
      { name: "AI-сценарии", verified: true, source: "NEXORA Vision 360" },
      skill("Artificial Intelligence"),
      skill("AI Development"),
      skill("AI Integration"),
      skill("Generative AI"),
      skill("Large Language Models (LLMs)"),
      skill("Prompt Engineering"),
      skill("AI Chatbot Development"),
      skill("Chatbot Integration"),
      skill("Chatbot"),
    ],
  },
  {
    id: "architecture",
    title: "Архитектура и инфраструктура",
    icon: "network",
    items: [
      { name: "Мультиарендный SaaS", verified: true, source: "NEXORA Vision 360" },
      { name: "Ролевой доступ", verified: true, source: "NEXORA Vision 360" },
      { name: "Аутентификация", verified: true, source: "NEXORA Vision 360" },
      skill("Software Architecture"),
      skill("Docker"),
      skill("Linux"),
      skill("Git"),
      skill("GitHub"),
      skill("Cloud Computing"),
      skill("Web Security"),
      skill("Security"),
      skill("Debugging"),
    ],
  },
  {
    id: "automation",
    title: "Автоматизация",
    icon: "workflow",
    items: [skill("Automation"), skill("Workflow Automation"), skill("n8n")],
  },
  {
    id: "design",
    title: "Дизайн",
    icon: "palette",
    items: [skill("Graphic Design"), skill("Illustration"), skill("Digital Art"), skill("Book Cover Design")],
  },
  {
    id: "marketing",
    title: "Маркетинг и почта",
    icon: "megaphone",
    items: [
      skill("Digital Marketing"),
      skill("Email Marketing"),
      skill("Email Campaign"),
      skill("Email Handling"),
      skill("Email Developer"),
      skill("Account Management"),
    ],
  },
  {
    id: "quality",
    title: "Тестирование и поддержка",
    icon: "flask",
    items: [skill("Testing / QA"), skill("Web Testing"), skill("Technical Support")],
  },
];

export const verifiedTechnologies = technologyGroups.flatMap((group) =>
  group.items.filter((item) => item.verified),
);
