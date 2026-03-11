import { TheJetLaggersPickCard } from "@/api/types";
import JustinsPickCard from "./justins-pick-card";
import s from "./justins-picks-section.module.scss";

interface JustinsPicksSectionProps {
  cards: TheJetLaggersPickCard[];
}

/**
 * Server Component for the "Handpicked by The Jetlaggers – Justin's Picks" section.
 * Displays up to 4 full-width horizontal cards.
 *
 * Layout:
 * - Section header: gradient eyebrow + black subtitle, left-aligned
 * - Cards: full-width, stacked vertically, each with a number, thumbnail, title, description
 *
 * Hidden automatically when no cards are provided.
 *
 * @param cards - Array of up to 4 TheJetLaggersPickCard items
 */
const JustinsPicksSection = ({ cards }: JustinsPicksSectionProps) => {
  if (!cards || cards.length === 0) {
    return null;
  }

  return (
    <section
      className={s.section}
      aria-label="Handpicked by The Jetlaggers – Justin's Picks"
    >
      <div className={s.header}>
        <p className={s.eyebrow}>HANDPICKED BY THE JETLAGGERS</p>
        <h2 className={s.subtitle}>Justin&apos;s Picks</h2>
      </div>

      <ul className={s.list} role="list">
        {cards.map((card, index) => (
          <li key={card.id}>
            <JustinsPickCard card={card} position={index} />
          </li>
        ))}
      </ul>
    </section>
  );
};

export default JustinsPicksSection;
