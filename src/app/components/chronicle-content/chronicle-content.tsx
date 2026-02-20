import { CardProps } from "@/components/cards/card.types";
import Hero from "../hero/hero";
import CardThree from "../cards/card-three/card-three";

import s from "./chronicle-content.module.scss";

interface ChronicleContentProps {
  blogs: CardProps[];
}

const ChronicleContent = ({ blogs }: ChronicleContentProps) => {
  const colors = ["blue", "green", "purple", "orange"];

  return (
    <main className={s.container}>
      <Hero
        srcImage="/grocerytime_ihgtnt.jpg"
        headline={"Which Thai Island Makes Sense In 2026?"}
        shortDescription={
          "What it really costs to live on Thailand’s islands. Rent, food, transport, visas, and the hidden expenses that drain newcomers fast."
        }
        ctaProps={{
          buttonText: "Download the Free Guide",
          tags: ["free guide", "thailand"],
        }}
      />
      <section className={s.latestChronicles}>
        <div className={s.wrapper}>
          <h2>Latest Stories</h2>
          {blogs.length === 0 ? (
            <div className={s.emptyState}>
              <p>No stories found. Please check back soon.</p>
            </div>
          ) : (
            <div className={s.cardWrapper}>
              {blogs.slice(0, 8).map((blog, index) => (
                <CardThree
                  key={blog.slug}
                  blog={blog}
                  color={colors[index % colors.length]}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default ChronicleContent;
