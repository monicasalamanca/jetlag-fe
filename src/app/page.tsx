import { notFound } from "next/navigation";
import { fetchLatestBlogPosts } from "@/api/client";
import Footer from "@/components/footer/footer";
import Header from "@/components/header/header";
import HomeContent from "@/components/home-content/home-content";

const Home = async () => {
  const latestPosts = await fetchLatestBlogPosts();
  if (!latestPosts) return notFound();
  return (
    <>
      <Header />
      <HomeContent latestBlogPosts={latestPosts} />
      <Footer />
    </>
  );
};

export default Home;
