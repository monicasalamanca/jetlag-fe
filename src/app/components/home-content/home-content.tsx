"use client";

import blogs from "@/app/blogs.json";
import Hero from "@/components/hero/hero";
import CardOne from "@/components/cards/card-one/card-one";
import CardTwo from "@/components/cards/card-two/card-two";
import CardThree from "@/components/cards/card-three/card-three";
import CardFive from "@/components/cards/card-five/card-five";
import QuizContainer from "@/components/quiz/quiz-container";

import s from "./home-content.module.scss";

const HomeContent = () => {
  return (
    <main className={s.container}>
      <Hero
        srcImage="/home-hero_apo3zo.jpg"
        headline={"Find Your Perfect City for Your Nomadic Lifestyle!"}
        shortDescription={
          "Discover your next destination with our curated guides for digital nomads and expats"
        }
      />
      <section className={s.latestChronicles}>
        <div className={s.wrapper}>
          <h2>Latest Stories</h2>
          <div className={s.cardWrapper}>
            <CardOne mockData={blogs[0]} color="blue" />
            <CardOne mockData={blogs[1]} color="green" />
          </div>
        </div>
      </section>
      <section className={s.mostViewed}>
        <div className={s.wrapper}>
          <h2>Most Viewed</h2>
          <div className={s.cardWrapper}>
            <CardFive mockData={blogs[2]} />
            <CardFive mockData={blogs[3]} />
          </div>
        </div>
      </section>
      <QuizContainer quizId={2} />
      <section className={s.trending}>
        <div className={s.wrapper}>
          <h2>Trending</h2>
          <div className={s.cardWrapper}>
            <CardTwo mockData={blogs[4]} color="red" />
            <CardTwo mockData={blogs[5]} color="green" />
            {/* <CardTwo mockData={blogs[4]} color="purple" />
            <CardTwo mockData={blogs[3]} color="orange" /> */}
          </div>
        </div>
      </section>
      <section className={s.mostPopular}>
        <div className={s.wrapper}>
          <h2>Most Popular</h2>
          <div className={s.cardWrapper}>
            <CardThree mockData={blogs[6]} color="purple" />
            <CardThree mockData={blogs[7]} color="blue" />
            {/* <CardThree mockData={blogs[0]} color="red" />
            <CardThree mockData={blogs[11]} color="green" /> */}
          </div>
        </div>
      </section>
    </main>
  );
};

export default HomeContent;
