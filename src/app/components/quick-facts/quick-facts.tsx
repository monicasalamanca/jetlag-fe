import QuickFactCard from "./quick-fact-card/quick-fact-card";
import {
  faCoins,
  faClock,
  faLanguage,
  faPlug,
} from "@fortawesome/free-solid-svg-icons";

import s from "./quick-facts.module.scss";
import { FC } from "react";

const QuickFacts: FC<{
  language: string;
  power: string;
  currency: string;
  timeZone: string;
}> = ({ language, power, currency, timeZone }) => {
  return (
    <section className={s.container}>
      <h1>Quick Facts</h1>
      <div className={s.wrapper}>
        <QuickFactCard
          icon={faLanguage}
          color="#3A78FC"
          title="Language"
          description={language}
        />
        <QuickFactCard
          icon={faPlug}
          color="#1BC4F3"
          title="Power"
          description={power}
        />
        <QuickFactCard
          icon={faCoins}
          color="#ACF877"
          title="Currency"
          description={currency}
        />
        <QuickFactCard
          icon={faClock}
          color="#FCF48B"
          title="Time Zone"
          description={timeZone}
        />
      </div>
    </section>
  );
};

export default QuickFacts;
