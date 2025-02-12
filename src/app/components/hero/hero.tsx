import { FC } from "react";
import Image from "next/image";

import s from "./hero.module.scss";

const Hero: FC<{
  srcImage: string;
  headline: string;
  description: string;
}> = ({ srcImage, headline, description }) => {
  return (
    <section className={s.hero}>
      <Image
        className={s.heroImage}
        src={srcImage}
        alt="Hero Image"
        layout="responsive"
        width={1920}
        height={1080}
      />
      <div className={s.heroContent}>
        <h1>{headline}</h1>
        <p>{description}</p>
      </div>
    </section>
  );
};

export default Hero;
