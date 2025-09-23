"use client";

import { FC, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { fetchBlogsByCountry } from "@/api/client";
import { BlogPost } from "@/api/types";
import s from "./coming-soon-section.module.scss";

interface ComingSoonSectionProps {
  countryName: string;
}

const ComingSoonSection: FC<ComingSoonSectionProps> = ({ countryName }) => {
  const [thailandContent, setThailandContent] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadThailandBlogs = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const blogs = await fetchBlogsByCountry("thailand");
        if (blogs) {
          setThailandContent(blogs);
        } else {
          setError("No blogs found for Thailand");
        }
      } catch (error) {
        console.error("Error loading Thailand blogs:", error);
        setError(`Failed to load Thailand blogs: ${error}`);
      } finally {
        setIsLoading(false);
      }
    };

    loadThailandBlogs();
  }, []);

  return (
    <section id="coming-soon" className={s.comingSoonSection}>
      <div className={s.container}>
        <h2 className={s.headline}>
          Hey Jet Lagger, looks like we haven’t packed our bags for{" "}
          {countryName} yet. Don’t worry—we’re working on it and fresh stories
          are on the way!
        </h2>
        <p className={s.description}>
          In the meantime, why not take a detour through Thailand? From scams to
          avoid to expat life in Chiang Mai, we’ve got the inside scoop that’ll
          keep your wanderlust buzzing.
        </p>
        <div className={s.exploreSection}>
          <h3 className={s.exploreTitle}>
            In the meantime, why not explore Thailand?
          </h3>
        </div>

        <div className={s.content}>
          <div className={s.imageScroll}>
            {isLoading ? (
              <div className={s.loadingMessage}>Loading Thailand blogs...</div>
            ) : error ? (
              <div className={s.noContentMessage}>Error: {error}</div>
            ) : thailandContent.length > 0 ? (
              thailandContent.map((card) => {
                // Use the actual slug from the blog data
                const slug = `/thailand/${card.slug}`;
                return (
                  <Link key={card.id} href={slug} className={s.cardLink}>
                    <div className={s.card}>
                      <div className={s.imageWrapper}>
                        <Image
                          src={card.imageUrl || "/placeholder-image.jpg"}
                          alt={`${card.title} - Thailand travel guide`}
                          width={280}
                          height={200}
                          className={s.cardImage}
                        />
                      </div>
                      <div className={s.cardContent}>
                        <h4 className={s.cardTitle}>{card.title}</h4>
                        <p className={s.cardDescription}>{card.description}</p>
                      </div>
                    </div>
                  </Link>
                );
              })
            ) : (
              <div className={s.noContentMessage}>
                No Thailand blogs available at the moment.
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ComingSoonSection;
