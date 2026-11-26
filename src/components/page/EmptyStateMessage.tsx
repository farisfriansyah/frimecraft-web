type EmptyStateMessageProps = {
  title?: string;
  message: string;
  className?: string;
};

export function EmptyStateMessage({ title, message, className = "" }: EmptyStateMessageProps) {
  return (
    <div className={`border-t border-[color:var(--line)] py-6 text-sm text-[color:var(--muted)] ${className}`.trim()}>
      {title ? <h2 className="text-4xl font-semibold text-[color:var(--ink)]">{title}</h2> : null}
      <p className={title ? "mt-4" : undefined}>{message}</p>
    </div>
  );
}