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
        <p>
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
        </p>
      </div>
    </section>
  );
};

export default WhoWeAre;
