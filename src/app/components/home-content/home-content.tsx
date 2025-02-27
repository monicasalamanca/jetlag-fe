// import { FC } from "react";
import Hero from "../hero/hero";

import s from "./home-content.module.scss";

const HomeContent = () => {
  return (
    <main className={s.container}>
      <Hero
        srcImage={
          "https://res.cloudinary.com/jetlagchronicles/image/upload/v1739143592/blog-assets/home-hero_apo3zo.jpg"
        }
        headline={"Find Your Perfect City for Your Nomadic Lifestyle!"}
        description={
          "Discover your next destination with our curated guides for digital nomads and expats"
        }
      />
    </main>
  );
};

export default HomeContent;
