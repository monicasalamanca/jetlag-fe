import { CardProps } from "@/components/cards/card.types";
import CardTwo from "@/components/cards/card-two/card-two";

import s from "./latest-blogs-section.module.scss";

const LatestBlogsSection = ({ blogs }: { blogs: CardProps[] }) => {
  if (blogs.length < 4) return null;

  return (
    <section className={s.latestBlogs}>
      <div className={s.wrapper}>
        <h2>Keep exploring</h2>
        <div className={s.cardWrapper}>
          <CardTwo blog={blogs[0]} color="blue" />
          <CardTwo blog={blogs[1]} color="green" />
          <CardTwo blog={blogs[2]} color="red" />
          <CardTwo blog={blogs[3]} color="purple" />
        </div>
      </div>
    </section>
  );
};

export default LatestBlogsSection;
