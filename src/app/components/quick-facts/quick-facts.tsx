import QuickFactCard from "./quick-fact-card/quick-fact-card";
import {
  faCoins,
  faClock,
  faLanguage,
  faPlug,
} from "@fortawesome/free-solid-svg-icons";

import s from "./quick-facts.module.scss";

const QuickFacts = () => {
  return (
    <section className={s.container}>
      <h1>Quick Facts</h1>
      <div className={s.wrapper}>
        <QuickFactCard
          icon={faLanguage}
          color="#3A78FC"
          title="Language"
          description="Japanese"
        />
        <QuickFactCard
          icon={faPlug}
          color="#1BC4F3"
          title="Power"
          description="100V, Type A/B"
        />
        <QuickFactCard
          icon={faCoins}
          color="#ACF877"
          title="Currency"
          description="Japanese Yen"
        />
        <QuickFactCard
          icon={faClock}
          color="#FCF48B"
          title="Time Zone"
          description="UTC+9"
        />
      </div>
    </section>
  );
};

export default QuickFacts;
