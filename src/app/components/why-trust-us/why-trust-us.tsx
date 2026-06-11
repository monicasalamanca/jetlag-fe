import s from "./why-trust-us.module.scss";

const pillars = [
  {
    number: "01",
    title: "Real Experience, Not Research",
    description:
      "We've lived and worked across multiple countries. We know the difference between a pipedream and reality.",
  },
  {
    number: "02",
    title: "No Sugarcoating",
    description:
      "Just because we like a place doesn’t mean it is free from criticism. Useful information isn't always flattering. We're on your side, not the tourism board's.",
  },
  {
    number: "03",
    title: "Zero Sponsorship Bias",
    description:
      "We're not paid by destinations to write positive content. If we love a place, it's because we actually love it. If we don't, we'll tell you that too.",
  },
  {
    number: "04",
    title: "Written With Our Own Skin In The Game",
    description:
      "Every guide is researched and written with our own decisions in mind. We're not writing for you in the abstract. We're writing for people wanting the same lifestyle.",
  },
];

const WhyTrustUs = () => {
  return (
    <section id="why-trust-us" className={s.section}>
      <div className={s.glowDecoration} aria-hidden="true" />

      <div className={s.upper}>
        <div className={s.headingCol}>
          <h2 className={s.heading}>
            WHY <span className={s.accent}>TRUST</span>
            <br />
            THIS?
          </h2>
        </div>
        <div className={s.introCol}>
          <p className={s.intro}>
            We aren’t relocation gurus handing down flawless wisdom from a
            mountain, but we have been around the block. Honestly, we’re out
            here experiencing, learning how to make this lifestyle a success.
            Signing the leases, navigating the immigration desks, and figuring
            out the banking systems so we can all map out where to go and why.
          </p>
        </div>
      </div>

      <div className={s.pillarsWrapper}>
        {pillars.map((pillar) => (
          <div key={pillar.number} className={s.pillar}>
            <span className={s.pillarNumber} aria-hidden="true">
              {pillar.number}
            </span>
            <h3 className={s.pillarTitle}>{pillar.title}</h3>
            <p className={s.pillarDescription}>{pillar.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyTrustUs;
