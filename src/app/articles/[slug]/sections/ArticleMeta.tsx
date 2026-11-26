type ArticleMetaProps = {
  createdAt: string;
  locale?: "id" | "en";
};

export function ArticleMeta({ createdAt, locale = "id" }: ArticleMetaProps) {
  return (
    <p className="text-xs font-medium uppercase text-[color:var(--muted)]">
      {new Date(createdAt).toLocaleDateString(locale === "en" ? "en-US" : "id-ID", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      })}
    </p>
  );
}