import { fetchBlogPost } from "@/api/client";
import BlogContent from "@/components/blog-content/blog-content";
import NotFoundPage from "../../not-found";

const BlogPostPage = async ({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}) => {
  const { category, slug } = await params;
  const postArray = await fetchBlogPost(category, slug);

  if (!postArray || postArray.length === 0) return <NotFoundPage />;

  const post = postArray[0];

  return <BlogContent post={post} />;
};

export default BlogPostPage;

// // ✅ And here's your static params builder
// export async function generateStaticParams() {
//   const res = await fetch(
//     `${process.env.STRAPI_URL}/api/blogs?fields[0]=slug&populate[category][fields][0]=slug`
//   );
//   const data = await res.json();

//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   return data.data.map((post: any) => ({
//     category: post.attributes.category.data.attributes.slug,
//     slug: post.attributes.slug,
//   }));
// }
