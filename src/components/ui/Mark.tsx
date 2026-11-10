export function Mark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <rect x="4" y="4" width="11" height="11" rx="2.5" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <rect x="17" y="17" width="11" height="11" rx="2.5" fill="currentColor" />
      <path d="M15 9.5h5.5M9.5 15v5.5" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="23.5" cy="8.5" r="2" fill="#8aebff" />
    </svg>
  );
}
