import Link from "next/link";
import s from "./about-us-hero.module.scss";

const stats = [
  { value: "5", suffix: "+", label: "Cities Lived In" },
  { value: "4", suffix: "+", label: "Countries Called Home" },
  { value: "0", suffix: "", label: "Tourism Board Deals" },
  { value: "", suffix: "∞", label: "Plans to Keep Moving" },
];

const AboutUsHero = () => {
  return (
    <section className={s.hero}>
      <div className={s.glowDecoration} aria-hidden="true" />
      <div className={s.bottomLine} aria-hidden="true" />

      <div className={s.inner}>
        <div className={s.content}>
          <p className={s.eyebrow}>About The Jet Lag Chronicles</p>

          <h1 className={s.headline}>
            WE&apos;RE NOT
            <br />
            <span className={s.accentWord}>TRAVEL</span>
            <br />
            BLOGGERS
          </h1>

          <p className={s.deck}>
            We&apos;re a <strong>Canadian-Colombian</strong> digital nomads
            mapping out our next international relocatio. We decided to learn in
            public. Visa requirements, tax and financial risk, cost of living,
            and everything you need to know to make location freedom possible.
          </p>

          <div className={s.ctaRow}>
            <Link href="#our-story" className={s.ctaPrimary}>
              Read Our Story
            </Link>
            <Link href="/blog" className={s.ctaGhost}>
              Explore the Platform
            </Link>
          </div>
        </div>

        <div className={s.statStrip}>
          {stats.map((stat, i) => (
            <div key={i} className={s.stat}>
              <div className={s.statNumber}>
                {stat.value}
                {stat.suffix && (
                  <span className={s.statSuffix}>{stat.suffix}</span>
                )}
              </div>
              <div className={s.statLabel}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutUsHero;
