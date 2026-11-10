export function ContactMethodIcon({ id, className }: { id: string; className?: string }) {
  if (id === "telegram") return <TelegramIcon className={className} />;
  if (id === "email") return <MailIcon className={className} />;
  return <BriefcaseIcon className={className} />;
}

function MailIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4 6.5h16v11H4v-11Z"
      />
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m4.5 7 7.5 6 7.5-6"
      />
    </svg>
  );
}

function TelegramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        fill="currentColor"
        d="M20.7 4.4 3.4 11c-1.2.5-1.2 1.1-.2 1.4l4.4 1.4 1.7 5.2c.2.6.1.9.7.9.4 0 .6-.2.9-.4l2.1-2 4.4 3.3c.8.4 1.4.2 1.6-.8l2.8-13.2c.3-1.2-.4-1.7-1.1-1.4ZM9.2 13.4l8.6-5.4c.4-.3.8-.1.5.2l-7.1 6.4-.3 3-1.7-4.2Z"
      />
    </svg>
  );
}

function BriefcaseIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8 7V6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1M4.5 7.5h15v10a2 2 0 0 1-2 2h-11a2 2 0 0 1-2-2v-10Z"
      />
    </svg>
  );
}
