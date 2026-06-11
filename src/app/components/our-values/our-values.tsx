import s from "./our-values.module.scss";

const values = [
  {
    number: "01",
    title: "Transparency",
    description:
      "We try to share the reality. Last thing we want to do is sell you a pipedream. The full picture involves uncomfortable truths that need to be discussed as much as the things we love.",
  },
  {
    number: "02",
    title: "Community First",
    description:
      "This platform exists because of the thousands of nomads and expats who've asked the same questions we ask. We build for them, not for SEO metrics.",
  },
  {
    number: "03",
    title: "Information > Influencer",
    description:
      "Gorgeous photography is nice. Knowing visa requirements or what your monthly budget is before you book a flight is better. We prioritize useful over beautiful.",
  },
  {
    number: "04",
    title: "Always Evolving",
    description:
      "Visa rules change. Costs shift. Cities rise and fall in the nomad rankings. We update relentlessly because outdated information has no value.",
  },
];

const OurValues = () => {
  return (
    <section id="our-values" className={s.section}>
      <div className={s.inner}>
        <div className={s.headerWrapper}>
          <p className={s.eyebrow}>What We Stand For</p>
          <h2 className={s.heading}>
            OUR <span className={s.accent}>VALUES</span>
          </h2>
        </div>

        <div className={s.grid}>
          {values.map((value) => (
            <div key={value.number} className={s.card}>
              <p className={s.cardLabel}>
                {value.number} &mdash; {value.title}
              </p>
              <h3 className={s.cardTitle}>{value.title}</h3>
              <p className={s.cardDescription}>{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurValues;
