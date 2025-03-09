import s from "./location.module.scss";

const Location = () => {
  return (
    <section className={s.location}>
      <h1>Location</h1>
      <div>
        <iframe
          className={s.googleMaps}
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13336183.942623166!2d128.5996038141055!3d37.04966344939213!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x34674e0fd77f192f%3A0xf54275d47c665244!2sJapan!5e0!3m2!1sen!2sca!4v1741469702645!5m2!1sen!2sca"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </section>
  );
};

export default Location;
