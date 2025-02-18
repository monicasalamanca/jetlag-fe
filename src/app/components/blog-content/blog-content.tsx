"use client";

import { FC } from "react";
import { notFound } from "next/navigation";
import { fetchBlogPost } from "../../../api/client";

import s from "./blog-content.module.scss";

// eslint-disable-next-line @next/next/no-async-client-component
const BlogContent: FC<{ category: string; slug: string }> = async ({
  category,
  slug,
}) => {
  const post = await fetchBlogPost(category, slug);

  if (!post) return notFound();

  return (
    <div className={s.container}>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </div>
  );
};

export default BlogContent;
