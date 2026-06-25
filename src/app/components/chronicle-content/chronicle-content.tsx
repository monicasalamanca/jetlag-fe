import { CardProps } from "@/components/cards/card.types";
import { LifestyleGuide } from "@/api/types";
import BlogHero from "../blog-hero/blog-hero";
import EditorsBrief from "../editors-brief/editors-brief";
import BlogFilterBar from "../blog-filter-bar/blog-filter-bar";
import BlogGuidesBand from "../blog-guides-band/blog-guides-band";

import s from "./chronicle-content.module.scss";

interface ChronicleContentProps {
  blogs: CardProps[];
  guides: LifestyleGuide[];
}

const ChronicleContent = ({ blogs, guides }: ChronicleContentProps) => {
  return (
    <main className={s.container}>
      <BlogHero blogs={blogs} />
      <EditorsBrief articles={blogs.slice(0, 5)} />
      <BlogFilterBar articles={blogs} />
      <BlogGuidesBand guides={guides} />
    </main>
  );
};

export default ChronicleContent;
