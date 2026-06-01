import { TheJetLaggersPickCard } from "@/api/types";
import JustinsPickCard from "./justins-pick-card";
import s from "./justins-picks-section.module.scss";

interface JustinsPicksSectionProps {
  cards: TheJetLaggersPickCard[];
}

const JustinsPicksSection = ({ cards }: JustinsPicksSectionProps) => {
  if (!cards || cards.length === 0) {
    return null;
  }

  return (
    <section
      className={s.section}
      aria-label="Handpicked by The Jetlaggers – Justin's Picks"
    >
      <div className={s.container}>
        <div className={s.header}>
          <p className={s.eyebrow}>HANDPICKED BY THE JETLAGGERS</p>
          <h2 className={s.heading}>
            JUSTIN&apos;S <span className={s.headingHighlight}>PICKS</span>
          </h2>
        </div>

        <ul className={s.list} role="list">
          {cards.map((card, index) => (
            <li key={card.id}>
              <JustinsPickCard card={card} position={index} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default JustinsPicksSection;
