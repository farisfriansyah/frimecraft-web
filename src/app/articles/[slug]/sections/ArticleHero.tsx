type ArticleHeroProps = {
  title: string;
  excerpt: string | null;
  featuredImage: string | null;
};

export function ArticleHero({ title, excerpt, featuredImage }: ArticleHeroProps) {
  return (
    <>
      <h1 className="mt-4 text-4xl leading-[1.08] font-semibold text-[color:var(--ink)] md:text-5xl">{title}</h1>
      {excerpt ? <p className="mt-5 text-lg leading-relaxed text-[color:var(--muted)]">{excerpt}</p> : null}

      {featuredImage ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={featuredImage}
          alt={title}
          className="mt-8 h-auto max-h-[34rem] w-full rounded-2xl object-cover"
        />
      ) : null}
    </>
  );
}