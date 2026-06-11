import s from "./what-we-are-not.module.scss";

const rows = [
  {
    notThis: "A travel inspiration blog",
    yes: "A relocation intelligence platform",
  },
  {
    notThis: "A sponsored destination guide",
    yes: "Independent, unsponsored reporting",
  },
  {
    notThis: "An influencer platform",
    yes: "Lived, tested, first-person research",
  },
  {
    notThis: 'A "best of" listicle factory',
    yes: "Practical data: visas, taxes, costs",
  },
  {
    notThis: "A two-week vacation planner",
    yes: "Long-term slow travel and expat life",
  },
  {
    notThis: "AI-generated filler content",
    yes: "Written by people with skin in the game",
  },
];

const WhatWeAreNot = () => {
  return (
    <section id="what-we-are-not" className={s.section}>
      <div className={s.inner}>
        <div className={s.leftCol}>
          <p className={s.eyebrow}>Let&apos;s Be Clear</p>
          <h2 className={s.heading}>
            WHAT
            <br />
            WE&apos;RE
            <br />
            <span className={s.accent}>NOT</span>
          </h2>
          <p className={s.description}>
            We know what we are and what we are not. No cornball influencer
            fantasies. No tourism-board money. Just the reality of life abroad
            for people who are actually building one.
          </p>
        </div>

        <div className={s.rightCol}>
          <div className={s.notCol}>
            <p className={s.colHeaderNot}>Not This</p>
            <ul className={s.rowList}>
              {rows.map((row, i) => (
                <li key={i} className={s.row}>
                  <span className={s.prefixNot} aria-hidden="true">
                    ✕
                  </span>
                  {row.notThis}
                </li>
              ))}
            </ul>
          </div>

          <div className={s.thisCol}>
            <p className={s.colHeaderThis}>This</p>
            <ul className={s.rowList}>
              {rows.map((row, i) => (
                <li key={i} className={s.row}>
                  <span className={s.prefixThis} aria-hidden="true">
                    ✓
                  </span>
                  {row.yes}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatWeAreNot;
