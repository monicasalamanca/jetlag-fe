import { fetchLatestBlogPosts } from "@/api/client";
import HomeContent from "@/components/home-content/home-content";

const Home = async () => {
  const latestPosts = await fetchLatestBlogPosts();

  return <HomeContent latestBlogPosts={latestPosts} />;
};

export default Home;
