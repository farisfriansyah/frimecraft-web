type ArticleMetaProps = {
  createdAt: string;
  locale?: "id" | "en";
};

export function ArticleMeta({ createdAt, locale = "id" }: ArticleMetaProps) {
  return (
    <p className="text-xs uppercase tracking-[0.18em] text-black/50">
      {new Date(createdAt).toLocaleDateString(locale === "en" ? "en-US" : "id-ID", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      })}
    </p>
  );
}