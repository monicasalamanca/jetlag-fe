import { FC } from "react";
import s from "./location.module.scss";

const Location: FC<{ mapLink: string }> = ({ mapLink }) => {
  return (
    <section className={s.location}>
      <h1>Location</h1>
      <div>
        <iframe
          className={s.googleMaps}
          src={mapLink}
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
