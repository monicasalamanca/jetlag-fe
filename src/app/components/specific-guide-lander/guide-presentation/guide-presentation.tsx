import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBook,
  faCheck,
  faDownload,
  faFilePdf,
  faStar,
} from "@fortawesome/free-solid-svg-icons";

import s from "./guide-presentation.module.scss";

const GuidePresentation = () => {
  return (
    <section className={s.guidePresentation}>
      <div className={s.wrapper}>
        <div className={s.guideMainInfo}>
          <div className={s.updated}>
            <FontAwesomeIcon className={s.icon} icon={faStar} />
            Updated for 2026
          </div>
          <h2>Which Thai Island Makes Sense In 2026?</h2>
          <p>
            What it really costs to live on Thailand&apos;s islands. Rent, food,
            transport, visas, and the hidden expenses that drain newcomers fast.
          </p>
          <div className={s.guideInfoBits}>
            <div className={s.infoBitWrapper}>
              <div className={s.iconWrapper}>
                <FontAwesomeIcon className={s.icon} icon={faFilePdf} />
              </div>
              <div>
                <div className={s.label}>Format</div>
                <div className={s.value}>PDF</div>
              </div>
            </div>
            <div className={s.infoBitWrapper}>
              <div className={s.iconWrapper}>
                <FontAwesomeIcon className={s.icon} icon={faBook} />
              </div>
              <div>
                <div className={s.label}>Pages</div>
                <div className={s.value}>87 Pages</div>
              </div>
            </div>
            <div className={s.infoBitWrapper}>
              <div className={s.iconWrapper}>
                <FontAwesomeIcon className={s.icon} icon={faDownload} />
              </div>
              <div>
                <div className={s.label}>Access</div>
                <div className={s.value}>Instant</div>
              </div>
            </div>
          </div>
          <div className={s.ctaWrapper}>
            <button className={s.ctaButton}>Flip through real pages</button>
            <button className={s.ctaButtonOptions}>View Bundle Options</button>
          </div>
        </div>
        <div className={s.guideCoverImage}>
          <Image
            className={s.image}
            src="https://res.cloudinary.com/jetlagchronicles/image/upload/v1769021373/small_pexels_itsehsanh_30944533_0fc7d7d8f5.jpg"
            alt="Guide Cover"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            loading="lazy"
          />
          <div className={s.imageGuideTag}>
            <FontAwesomeIcon className={s.icon} icon={faCheck} />
            <div>
              <p>One-Time purchase</p>
              <p>Lifetime access included</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GuidePresentation;
