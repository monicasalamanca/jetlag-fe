"use client";

import Hero from "../hero/hero";
import CardOne from "../cards/card-one/card-one";
import blogs from "@/app/blogs.json";
import QuizContainer from "@/app/components/quiz/quiz-container";

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
            <CardOne mockData={blogs[7]} color="orange" />
          </div>
        </div>
      </section>
      <QuizContainer quizId={1} />
    </main>
  );
};

export default ChronicleContent;
