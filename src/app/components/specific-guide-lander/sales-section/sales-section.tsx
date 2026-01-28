// generate a simple component that displays a sales section with a title, description, and a call-to-action button using React and TypeScript.
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faDownload,
  faFilePdf,
  faLock,
  faRotate,
  faTag,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";

import s from "./sales-section.module.scss";

const SalesSection: React.FC = () => {
  return (
    <section className={s.saleSection}>
      <div className={s.wrapper}>
        <div className={s.saleInfo}>
          <h2>Get your Bangkok Living Guide Today</h2>
          <p>Everything you need to confidently move to and live in Bangkok.</p>
          <div className={s.guideInfoBits}>
            <div className={s.infoBitWrapper}>
              <div className={s.iconWrapper}>
                <FontAwesomeIcon className={s.icon} icon={faFilePdf} />
              </div>
              <div>
                <div className={s.label}>87 pages of actionable content</div>
                <div className={s.value}>Real insights and practical tips</div>
              </div>
            </div>
            <div className={s.infoBitWrapper}>
              <div className={s.iconWrapper}>
                <FontAwesomeIcon icon={faDownload} className={s.icon} />
              </div>
              <div>
                <div className={s.label}>Instant PDF Download</div>
                <div className={s.value}>Access Immediately After Purchase</div>
              </div>
            </div>
            <div className={s.infoBitWrapper}>
              <div className={s.iconWrapper}>
                <FontAwesomeIcon icon={faRotate} className={s.icon} />
              </div>
              <div>
                <div className={s.label}>Free Lifetime Updates</div>
                <div className={s.value}>Always get the latest Information</div>
              </div>
            </div>
          </div>
          <div className={s.bottom}>
            <p>
              <FontAwesomeIcon icon={faLock} className={s.icon} />
              Secure Checkout
            </p>
            <p>
              <FontAwesomeIcon icon={faTag} className={s.icon} />
              Clear, Upfront Pricing
            </p>
          </div>
        </div>
        <div className={s.pricingCard}>
          <div className={s.priceTag}>
            <p>One-Time Payment</p>
            <h3>$29</h3>
            <p>No subscription, pay once, own forever</p>
          </div>
          <div className={s.whatsIncluded}>
            <h3>What&apos;s Included</h3>
            <p>
              <FontAwesomeIcon icon={faCircleCheck} className={s.icon} />
              87 pages of actionable content
            </p>
            <p>
              <FontAwesomeIcon icon={faCircleCheck} className={s.icon} />
              Instant PDF Download
            </p>
            <p>
              <FontAwesomeIcon icon={faCircleCheck} className={s.icon} />
              Free Lifetime Updates
            </p>
            <p>
              <FontAwesomeIcon icon={faCircleCheck} className={s.icon} />
              Works Offline on all devices
            </p>
          </div>
          <button className={s.ctaButton}>Buy This Guide - $29</button>
          <p className={s.communityText}>
            <FontAwesomeIcon icon={faUsers} className={s.icon} />
            Join our community of expats and digital nomads who&apos;ve used our
            guides
          </p>
        </div>
      </div>
    </section>
  );
};

export default SalesSection;
