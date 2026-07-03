type ArticleHeroProps = {
  title: string;
  excerpt: string | null;
  featuredImage: string | null;
};

export function ArticleHero({ title, excerpt, featuredImage }: ArticleHeroProps) {
  return (
    <>
      <h1 className="mt-3 text-4xl leading-tight font-semibold tracking-tight">{title}</h1>
      {excerpt ? <p className="mt-4 text-lg text-black/65">{excerpt}</p> : null}

      {featuredImage ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={featuredImage}
          alt={title}
          className="mt-8 h-auto w-full rounded-2xl border border-black/10 object-cover"
        />
      ) : null}
    </>
  );
}