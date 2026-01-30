"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

import s from "./hero-thank-you.module.scss";

interface HeroProps {
  srcImage: string;
}

const HeroThankYou = ({ srcImage }: HeroProps) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Run once on mount
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section className={s.hero}>
      <Image
        className={s.heroImage}
        src={`${process.env.NEXT_PUBLIC_CLOUDINARY_URL}/f_auto,q_auto,w_${
          isMobile ? "800" : "1200"
        }/blog-assets${srcImage}`}
        alt="Hero Image"
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1600px"
        priority
        placeholder="blur"
        blurDataURL={`${process.env.NEXT_PUBLIC_CLOUDINARY_URL}/e_blur:100,q_10,w_10/blog-assets${srcImage}`}
      />
      <div className={s.heroContent}>
        <div className={s.wrapper}>
          <h1>Thanks for your purchase. You&apos;re all set.</h1>
          <p>
            Your order was successful. <br />
            You’ll receive an email from Lemon Squeezy with your receipt and a
            secure download link for your guide. This usually arrives within a
            few minutes.
          </p>
          <p>If you don’t see it, check your spam or promotions folder.</p>
          <div>
            <p>
              Still nothing after 10 minutes? <br /> Email us at
              info@thejetlagchronicles.com using the email you used at checkout.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroThankYou;
