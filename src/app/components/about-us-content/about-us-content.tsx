import s from "./about-us-content.module.scss";

const AboutUsContent = () => {
  return (
    <section className={s.aboutContent}>
      {/* <h2>Hello, fellow travellers!</h2> */}
      <p>
        Welcome to <b>The Jet Lag Chronicles</b>, where the world is your
        oyster, and we’re here to crack it open, spill it on our pants, and eat
        it off the floor. So, get your passport ready and join us as we learn
        and explore the highs and lows of life beyond borders.
      </p>
      <p>
        For us, this isn’t just another travel blog. It’s a means for change in
        our own lives.{" "}
        <b>A community for expats, digital nomads, and curious</b>
        travellers who want more than surface-level travel tips and two week
        vacation plans. This is about slow travel and finding the place(s) right
        for you. We’re here to help you{" "}
        <b>
          skip the tourist traps, uncover hidden gems, and truly live abroad.
        </b>
      </p>
      <p>
        So, whether it’s the chaos of Bangkok, the creative spark of Medellín,
        or the coastal energy of Da Nang, we dive deep into what makes each
        place unique and share the practical details that help you live smarter,
        cheaper, and happier.
      </p>
    </section>
  );
};

export default AboutUsContent;
