import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faDesktop,
  faDollarSign,
  faFileLines,
  faHouse,
  faChartLine,
} from "@fortawesome/free-solid-svg-icons";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import s from "./mission-coverage.module.scss";

interface CoverageArea {
  icon: IconDefinition;
  title: string;
  description: string;
}

const coverageAreas: CoverageArea[] = [
  {
    icon: faLocationDot,
    title: "Destinations",
    description:
      "Real cost breakdowns, neighbourhood guides, and honest assessments of what living there actually looks like.",
  },
  {
    icon: faDesktop,
    title: "Visas & Residency",
    description:
      "Requirements, income thresholds, tax implications, and the processes that actually work from application to approval.",
  },
  {
    icon: faDollarSign,
    title: "Cost of Living",
    description:
      "Monthly budgets, rent ranges, food costs, and the hidden expenses that drain newcomers faster than they expect.",
  },
  {
    icon: faFileLines,
    title: "Tax Strategy",
    description:
      "What the territorial tax countries are. What being a tax resident means. What you should know before you move.",
  },
  {
    icon: faHouse,
    title: "Remote Work Life",
    description:
      "Coworking spaces, connectivity realities, timezone management, and finding the right base for your work style.",
  },
  {
    icon: faChartLine,
    title: "Practical Intel",
    description:
      "Banking abroad, health insurance, SIM cards, lease agreements, and all the operational stuff nobody tells you about.",
  },
];

const MissionCoverage = () => {
  return (
    <section className={s.section}>
      <div className={s.inner}>
        {/* ── Upper Block ── */}
        <div className={s.upperBlock}>
          {/* Left: Mission Statement */}
          <div className={s.missionLeft}>
            <p className={s.eyebrow}>What We&apos;re Here To Do</p>
            <h2 className={s.missionHeading}>
              HELPING YOU
              <br />
              BUILD A <span className={s.accent}>BETTER</span>
              <br />
              LIFE ABROAD
            </h2>
            <p className={s.paragraph}>
              Everything we publish is built for{" "}
              <strong>expats and digital nomads</strong> who are making real
              decisions, not daydreaming about them. We cover the destinations,
              visa pathways, tax structures, and daily realities that actually
              determine whether a move works.
            </p>
            <p className={s.paragraph}>
              <strong>
                We don&apos;t write for people planning a two-week vacation.
              </strong>{" "}
              We write for people who are asking: where can I actually build a
              sustainable, affordable, genuinely good life and how do I get
              there?
            </p>
          </div>

          {/* Right: Independence Disclaimer Card */}
          <div className={s.disclaimerCard}>
            <h3 className={s.disclaimerHeading}>⚡ A NOTE ON INDEPENDENCE</h3>
            <p className={s.disclaimerBody}>
              Look, we&amp;ve never turned down a sponsored campaign or a paid
              partnership… because absolutely nobody has offered! If a tourism
              board does want to throw cash our way (wink wink), we’re happy to
              take it, though we&amp;ll still give you our actual, unvarnished
              opinions. Until then, while our guides might feature a few
              strategic affiliate links and hotel commissions, we still actually
              bother to use, vet, or at least survive the stuff we recommend
              instead of just copy-pasting generic travel brochures.
            </p>
          </div>
        </div>

        {/* ── Lower Block: Coverage Grid ── */}
        <div className={s.coverageBlock}>
          <p className={s.coverageEyebrow}>What We Cover</p>
          <div className={s.coverageGrid}>
            {coverageAreas.map((area, i) => (
              <div key={i} className={s.coverageCard}>
                <div className={s.iconContainer} aria-hidden="true">
                  <FontAwesomeIcon icon={area.icon} />
                </div>
                <h4 className={s.cardTitle}>{area.title}</h4>
                <p className={s.cardDesc}>{area.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionCoverage;
