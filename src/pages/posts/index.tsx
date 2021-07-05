import { GetStaticProps } from "next";
import Link from "next/link";
import styles from "./styles.module.scss";
import Prismic from "@prismicio/client";
import { RichText } from "prismic-dom";

import { getPrismicClient } from "../../services/prismic";

interface Posts {
  slug: string;
  title: string;
  excerpt: string;
  updated_at: string;
}

interface PostsProps {
  posts: Posts[];
}

export default function Posts({ posts }: PostsProps) {
  return (
    <>
      <head>
        <title>Posts | Ignews</title>
      </head>
      <main className={styles.container}>
        <div className={styles.posts}>
          {posts.map((post) => (
            <Link key={post.slug} href={`/posts/${post.slug}`}>
              <a>
                <time>{post.updated_at}</time>
                <strong>{post.title}</strong>
                <p>{post.excerpt}</p>
              </a>
            </Link>
          ))}
        </div>
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient();
  const response = await prismic.query(
    [
      Prismic.predicates.at("document.type", "posts"), // Nome do repositorio
    ],
    {
      fetch: ["posts.title", "posts.content"],
      pageSize: 100,
    }
  );

  const posts = response.results.map((post) => {
    return {
      slug: post.uid,
      title: RichText.asText(post.data.title),
      excerpt:
        post.data.content.find((content) => content.type === "paragraph")
          ?.text ?? "",
      update_at: new Date(post.last_publication_date).toLocaleDateString(
        "pt-BR",
        {
          day: "2-digit",
          month: "long",
          year: "numeric",
        }
      ),
    };
  });

  return {
    props: { posts },
    revalidate: 86400, // 24 hours
  };
};
