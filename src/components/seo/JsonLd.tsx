import { siteConfig } from "@/config/site";

export function JsonLd() {
  const sameAs = [
    siteConfig.freelanceUrl,
    siteConfig.telegram ? `https://t.me/${siteConfig.telegram}` : "",
  ].filter(Boolean);

  const person: Record<string, unknown> = {
    "@type": "Person",
    name: siteConfig.name,
    jobTitle: siteConfig.role,
    url: siteConfig.url,
    knowsAbout: siteConfig.knowsAbout,
  };

  if (sameAs.length > 0) person.sameAs = sameAs;

  if (siteConfig.email) person.email = siteConfig.email;

  const data = {
    "@context": "https://schema.org",
    "@graph": [
      person,
      {
        "@type": "WebSite",
        name: siteConfig.name,
        url: siteConfig.url,
        inLanguage: "ru",
        description: siteConfig.description,
        author: { "@type": "Person", name: siteConfig.name },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

export function projectJsonLd(input: {
  title: string;
  summary: string;
  path: string;
  url?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: input.title,
    description: input.summary,
    inLanguage: "ru",
    mainEntityOfPage: `${siteConfig.url}${input.path}`,
    author: {
      "@type": "Person",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    ...(input.url ? { url: input.url } : {}),
  };
}
