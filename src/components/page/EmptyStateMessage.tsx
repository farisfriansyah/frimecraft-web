type EmptyStateMessageProps = {
  title?: string;
  message: string;
  className?: string;
};

export function EmptyStateMessage({ title, message, className = "" }: EmptyStateMessageProps) {
  return (
    <div className={`rounded-2xl border border-dashed border-black/25 bg-white/60 p-6 text-sm text-black/60 ${className}`.trim()}>
      {title ? <h2 className="text-4xl font-semibold tracking-tight text-black">{title}</h2> : null}
      <p className={title ? "mt-4" : undefined}>{message}</p>
    </div>
  );
}