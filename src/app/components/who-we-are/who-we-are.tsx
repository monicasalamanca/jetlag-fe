import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHand } from "@fortawesome/free-solid-svg-icons";

import s from "./who-we-are.module.scss";

const WhoWeAre = () => {
  return (
    <section className={s.container}>
      <div className={s.wrapper}>
        <div className={s.iconWrapper}>
          <FontAwesomeIcon icon={faHand} className={s.handIcon} />
        </div>
        <h2>Who We Are</h2>
        {/* <p>
          We’re Moni and Dunny, aka The Jet Laggers. A Canadian-Colombian duo,
          deadset on wandering away from the beaten path to figure out where
          life actually treats us best. So far, we’ve lived in five cities
          across four countries—but that wasn’t enough. We’re on a lifelong
          mission to explore the highs, lows, and hidden hacks of the nomad
          lifestyle, all while searching for the perfect ‘home base.’
        </p>
        <p>
          Career-wise, we come from tech, sales backgrounds. Paired with our
          obsession for global exploration, that means everything you read here
          is either lived, tested, or researched with our own plans in mind.
        </p> */}
        <p>
          We’re Moni and Dunny — a Canadian–Colombian team behind The Jet Lag
          Chronicles. With backgrounds in technology and sales, we combine
          analytical insight with on-the-ground experience to explore the
          realities of modern nomad living.
        </p>
        <p>
          Between us, we’ve lived in five cities across four countries, gaining
          firsthand perspective on what it truly takes to build a life abroad.
          Our mission is to uncover the highs, lows, and hidden strategies of
          the digital nomad lifestyle — and to share practical,
          experience-driven guidance for anyone looking to find their own “home
          base.”
        </p>
        <p>
          Everything published here is the result of real research, lived
          experience, and a shared curiosity about how to make global living
          sustainable, rewarding, and financially sound.
        </p>
      </div>
    </section>
  );
};

export default WhoWeAre;
