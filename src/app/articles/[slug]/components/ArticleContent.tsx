import styles from "../article-detail.module.css";

type ArticleContentProps = {
  content: string;
};

export function ArticleContent({ content }: ArticleContentProps) {
  return (
    <article
      className={`prose prose-zinc mt-10 ${styles.content}`}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}