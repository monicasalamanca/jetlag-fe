import Image from "next/image";

import s from "./not-found.module.scss";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCompass, faHouse } from "@fortawesome/free-solid-svg-icons";

const NotFound = () => {
  return (
    <div className={s.container}>
      <Image
        className={s.image}
        src={`${process.env.NEXT_PUBLIC_CLOUDINARY_URL}/v1740796290/blog-assets/404-not-found_xkffvl.jpg`}
        alt="image of a lost man"
        width={640}
        height={427}
        priority
      />
      <h1>404</h1>
      <p className={s.semiHeadline}>
        Oops! Looks like you&apos;re lost in the travel world
      </p>
      <p className={s.description}>
        This page has gone on an adventure... but don&apos;t worry, we&apos;ve
        got plenty more to explore!
      </p>
      <section className={s.buttonsSection}>
        <Link className={s.goHomeBtn} href="/">
          <FontAwesomeIcon icon={faHouse} className={s.icon} />
          <span>Go to Homepage</span>
        </Link>
        <Link className={s.readLatestArticles} href="/">
          <FontAwesomeIcon icon={faCompass} className={s.icon} />
          <span>Read Latest Articles</span>
        </Link>
      </section>
    </div>
  );
};

export default NotFound;
