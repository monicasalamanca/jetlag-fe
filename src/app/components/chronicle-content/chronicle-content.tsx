"use client";

import Hero from "../hero/hero";
import CardOne from "../cards/card-one/card-one";
// import CardTwo from "../cards/card-two/card-two";
// import CardThree from "../cards/card-three/card-three";
// import CardFive from "../cards/card-five/card-five";
import blogs from "@/app/blogs.json";

import s from "./chronicle-content.module.scss";

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
            <CardOne mockData={blogs[0]} color="blue" />
            <CardOne mockData={blogs[1]} color="green" />
            <CardOne mockData={blogs[2]} color="purple" />
            <CardOne mockData={blogs[3]} color="orange" />
            <CardOne mockData={blogs[4]} color="blue" />
            <CardOne mockData={blogs[5]} color="green" />
            <CardOne mockData={blogs[6]} color="purple" />
            <CardOne mockData={blogs[1]} color="orange" />
          </div>
        </div>
      </section>
      {/* <section className={s.trending}>
        <div className={s.wrapper}>
          <h2>Trending</h2>
          <div className={s.cardWrapper}>
            <CardTwo mockData={blogs[4]} color="red" />
            <CardTwo mockData={blogs[5]} color="green" />
            <CardTwo mockData={blogs[6]} color="purple" />
            <CardTwo mockData={blogs[7]} color="orange" />
          </div>
        </div>
      </section> */}
      {/* <section className={s.mostPopular}>
        <div className={s.wrapper}>
          <h2>Most Popular</h2>
          <div className={s.cardWrapper}>
            <CardThree mockData={blogs[0]} color="purple" />
            <CardThree mockData={blogs[1]} color="blue" />
            <CardThree mockData={blogs[2]} color="red" />
            <CardThree mockData={blogs[3]} color="green" />
          </div>
        </div>
      </section> */}
      {/* <section className={s.mostLiked}>
        <div className={s.wrapper}>
          <h2>Most Liked</h2>
          <div className={s.cardWrapper}>
            <CardFour mockData={blogs[12]} />
            <CardFour mockData={blogs[13]} />
            <CardFour mockData={blogs[14]} />
          </div>
        </div>
      </section> */}
      {/* <section className={s.mostViewed}>
        <div className={s.wrapper}>
          <h2>Most Viewed</h2>
          <div className={s.cardWrapper}>
            <CardFive mockData={blogs[0]} />
            <CardFive mockData={blogs[1]} />
            <CardFive mockData={blogs[2]} />
            <CardFive mockData={blogs[3]} />
            <CardFive mockData={blogs[4]} />
            <CardFive mockData={blogs[5]} />
            <CardFive mockData={blogs[6]} />
            <CardFive mockData={blogs[7]} />
          </div>
        </div>
      </section> */}
    </main>
  );
};

export default ChronicleContent;
