import Image from "next/image";

import s from "./home-content.module.scss";

const HomeContent = () => {
  return (
    <main className={s.container}>
      <section className={s.hero}>
        <Image
          className={s.heroImage}
          src="https://res.cloudinary.com/jetlagchronicles/image/upload/v1739143592/home-hero_apo3zo.jpg"
          alt="Hero Image"
          layout="responsive"
          width={1920}
          height={1080}
        />
        <div className={s.heroContent}>
          <h1>Find Your Perfect City for Your Nomadic Lifestyle!</h1>
          <p>
            Discover your next destination with our curated guides for digital
            nomads and expats
          </p>
        </div>
      </section>
    </main>
  );
};

export default HomeContent;
