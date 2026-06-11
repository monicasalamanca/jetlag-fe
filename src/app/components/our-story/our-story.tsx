import Image from "next/image";
import s from "./our-story.module.scss";

const CLOUDINARY = process.env.NEXT_PUBLIC_CLOUDINARY_URL;

const cities = ["Bogota", "Manila", "Bangkok", "Hamburg", "Montreal"];

const OurStory = () => {
  return (
    <section id="our-story" className={s.section}>
      <div className={s.inner}>
        <div className={s.leftCol}>
          <p className={s.eyebrow}>Who We Are</p>

          <h2 className={s.heading}>
            THE
            <br />
            <span className={s.accent}>JET</span>
            <br />
            LAGGERS
          </h2>

          <div className={s.imageStack}>
            <div className={s.imageBg}>
              {CLOUDINARY && (
                <Image
                  src={`${CLOUDINARY}/v1758235019/blog-assets/d352e965-1f03-45a8-a06d-476f8713aa5b-1_all_810_tylvfa.jpg`}
                  alt="Moni and Dunny, co-founders of The Jet Lag Chronicles"
                  fill
                  style={{ objectFit: "cover" }}
                  sizes="280px"
                />
              )}
            </div>
            <div className={s.imageFg}>
              {CLOUDINARY && (
                <Image
                  src={`${CLOUDINARY}/v1758235015/blog-assets/d352e965-1f03-45a8-a06d-476f8713aa5b-1_all_331_zlt3rq.jpg`}
                  alt="Moni and Dunny exploring a new destination"
                  fill
                  style={{ objectFit: "cover" }}
                  sizes="220px"
                />
              )}
            </div>
          </div>
        </div>

        <div className={s.rightCol}>
          <p className={s.para}>
            We are <strong>Moni and Dunny</strong> the faces behind The Jet Lag
            Chronicles. A Canadian-Colombian seeking answers to the important
            question: where does life acutally treat you best? So far, we&amp:ve
            lived across five cities and four countries. That wasn&amp;t enough.
          </p>

          <div className={s.callout}>
            <p>
              <strong>Why we started this:</strong> Most travel content is built
              for two-week vacations. We needed something built for people
              making real moves — visas, leases, bank accounts, tax residency.
              We couldn&apos;t find it, so we built it.
            </p>
          </div>

          <p className={s.para}>
            Career-wise, we come from tech and salesand found our way into
            remote earning positions. We also happen to have an obsession for
            travel and nomadic lifestyle. That means everything here is either
            lived, tested, or researched with our own decisions in mind.{" "}
            <em>We built the resource we wish had existed when we started</em>.
          </p>

          <div className={s.cities}>
            <span className={s.citiesLabel}>Places we&apos;ve called home</span>
            <div className={s.tags}>
              {cities.map((city) => (
                <span key={city} className={s.tag}>
                  {city}
                </span>
              ))}
              <span className={s.tagGold}>+ More ↗</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurStory;
