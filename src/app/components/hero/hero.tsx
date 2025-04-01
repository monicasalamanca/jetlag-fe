"use client";

import { FC, useEffect, useState } from "react";
import Image from "next/image";

import s from "./hero.module.scss";

const Hero: FC<{
  srcImage: string;
  headline: string;
  shortDescription: string;
}> = ({ srcImage, headline, shortDescription }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Run once on mount
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section className={s.hero}>
      <Image
        className={s.heroImage}
        src={`${process.env.NEXT_PUBLIC_CLOUDINARY_URL}/f_auto,q_auto,w_${
          isMobile ? "800" : "1200"
        }/blog-assets${srcImage}`}
        alt="Hero Image"
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1600px"
        priority
        placeholder="blur"
        blurDataURL={`${process.env.NEXT_PUBLIC_CLOUDINARY_URL}/e_blur:100,q_10,w_10/blog-assets${srcImage}`}
      />
      <div className={s.heroContent}>
        <h1>{headline}</h1>
        <p>{shortDescription}</p>
      </div>
    </section>
  );
};

export default Hero;
