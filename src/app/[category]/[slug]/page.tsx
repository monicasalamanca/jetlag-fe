import { notFound } from "next/navigation";
import { fetchBlogPost } from "../../../api/client";

type Props = {
  params: {
    category: string;
    slug: string;
  };
};

export default async function BlogPostPage({ params }: Props) {
  const { category, slug } = await params;
  const post = await fetchBlogPost(category, slug);

  if (!post) return notFound();

  return (
    <main>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </main>
  );
}
