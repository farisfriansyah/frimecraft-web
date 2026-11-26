type ArticleMetaProps = {
  createdAt: string;
};

export function ArticleMeta({ createdAt }: ArticleMetaProps) {
  return (
    <p className="text-xs uppercase text-black/50">
      {new Date(createdAt).toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      })}
    </p>
  );
}