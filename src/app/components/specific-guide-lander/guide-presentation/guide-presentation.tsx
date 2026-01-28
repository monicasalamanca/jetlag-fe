import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBook,
  faCheck,
  faDownload,
  faFilePdf,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import { DetailedGuide } from "@/api/types";

import s from "./guide-presentation.module.scss";

interface GuidePresentationProps {
  guide: DetailedGuide;
}

const GuidePresentation = ({ guide }: GuidePresentationProps) => {
  return (
    <section className={s.guidePresentation}>
      <div className={s.wrapper}>
        <div className={s.guideMainInfo}>
          <div className={s.updated}>
            <FontAwesomeIcon className={s.icon} icon={faStar} />
            Updated for 2026
          </div>
          <h2>{guide.title}</h2>
          <p>{guide.description || "No description available."}</p>
          <div className={s.guideInfoBits}>
            <div className={s.infoBitWrapper}>
              <div className={s.iconWrapper}>
                <FontAwesomeIcon className={s.icon} icon={faFilePdf} />
              </div>
              <div>
                <div className={s.label}>Format</div>
                <div className={s.value}>
                  {guide.format[0].type.toUpperCase() || "N/A"}
                </div>
              </div>
            </div>
            <div className={s.infoBitWrapper}>
              <div className={s.iconWrapper}>
                <FontAwesomeIcon className={s.icon} icon={faBook} />
              </div>
              <div>
                <div className={s.label}>Pages</div>
                <div className={s.value}>{guide.pageCount} Pages</div>
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
            {guide.type === "single" && (
              <button className={s.ctaButtonOptions}>
                View Bundle Options
              </button>
            )}
          </div>
        </div>
        <div className={s.guideCoverImage}>
          <Image
            className={s.image}
            src={guide.coverImage?.url || "/placeholder-guide.jpg"}
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
