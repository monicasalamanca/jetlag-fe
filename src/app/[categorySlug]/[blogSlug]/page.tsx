import { fetchBlogPost } from "@/api/client";
import BlogContent from "@/components/blog-content/blog-content";
import NotFoundPage from "../../not-found";

type Params = {
  categorySlug: string;
  blogSlug: string;
};

const BlogPostPage = async ({ params }: { params: Params }) => {
  const { categorySlug, blogSlug } = params;
  const postArray = await fetchBlogPost(categorySlug, blogSlug);
  console.log("postArray", postArray);

  if (!postArray || postArray.length === 0) return <NotFoundPage />;

  const post = postArray[0];

  return <BlogContent post={post} />;
};

export default BlogPostPage;
