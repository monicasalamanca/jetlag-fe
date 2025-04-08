"use client";

import Hero from "../hero/hero";
import CardOne from "../cards/card-one/card-one";
import CardTwo from "../cards/card-two/card-two";

import s from "./chronicle-content.module.scss";
import CardThree from "../cards/card-three/card-three";
import CardFour from "../cards/card-four/card-four";
import CardFive from "../cards/card-five/card-five";

const ChronicleContent = () => {
  return (
    <main className={s.container}>
      <Hero
        srcImage="/grocerytime_ihgtnt.jpg"
        headline="Discover inpiring travel stories, tips and guides"
        shortDescription="Find your perfect destination tailored to your lifestyle"
      />
      <section className={s.latestChronicles}>
        <div className={s.wrapper}>
          <h2>Latest Stories</h2>
          <div className={s.cardWrapper}>
            <CardOne color="blue" />
            <CardOne color="green" />
            <CardOne color="purple" />
            <CardOne color="orange" />
          </div>
        </div>
      </section>
      <section className={s.trending}>
        <div className={s.wrapper}>
          <h2>Trending</h2>
          <div className={s.cardWrapper}>
            <CardTwo color="red" />
            <CardTwo color="green" />
            <CardTwo color="purple" />
            <CardTwo color="orange" />
          </div>
        </div>
      </section>
      <section className={s.mostPopular}>
        <div className={s.wrapper}>
          <h2>Most Popular</h2>
          <div className={s.cardWrapper}>
            <CardThree color="purple" />
            <CardThree color="blue" />
            <CardThree color="red" />
            <CardThree color="green" />
          </div>
        </div>
      </section>
      <section className={s.mostLiked}>
        <div className={s.wrapper}>
          <h2>Most Liked</h2>
          <div className={s.cardWrapper}>
            <CardFour />
            <CardFour />
          </div>
        </div>
      </section>
      <section className={s.mostViewed}>
        <div className={s.wrapper}>
          <h2>Most Viewed</h2>
          <div className={s.cardWrapper}>
            <CardFive />
            <CardFive />
          </div>
        </div>
      </section>
    </main>
  );
};

export default ChronicleContent;
