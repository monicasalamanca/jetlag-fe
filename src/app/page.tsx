// import { fetchLatestBlogPosts } from "@/api/client";
import { BlogPost } from "@/api/types";
import HomeContent from "@/components/home-content/home-content";

const Home = async () => {
  // const latestPosts = await fetchLatestBlogPosts();
  const latestPosts: BlogPost[] | null = [];

  return <HomeContent latestBlogPosts={latestPosts} />;
};

export default Home;
