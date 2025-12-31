"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
// import { faDownload } from "@fortawesome/free-solid-svg-icons";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
// import SubscribeForm from "../subscribe-form/subscribe-form";
import { trackLinkClick } from "@/app/utils/analytics";

import s from "./hero.module.scss";

interface ctaProps {
  tags?: string[];
  buttonText: string;
  customIcon?: IconDefinition;
  subscribeConfig?: {
    apiEndpoint: string;
    modal: {
      title: string;
      description: string;
    };
  };
}

interface HeroProps {
  srcImage: string;
  headline: string;
  shortDescription: string;
  ctaProps?: ctaProps;
}

const Hero = ({
  srcImage,
  headline,
  shortDescription,
  ctaProps,
}: HeroProps) => {
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
          {ctaProps && ctaProps.tags && (
            <div className={s.tags}>
              {ctaProps.tags.slice(0, 2).map((tag, index) => (
                <span key={index} className={s.tag}>
                  {tag}
                </span>
              ))}
            </div>
          )}
          <h1>{headline}</h1>
          <p>{shortDescription}</p>
          {ctaProps && (
            <Link
              href="https://thejetlagchronicles.kit.com/subscribe"
              target="_blank"
              rel="noopener noreferrer"
              className={s.ctaButton}
              onClick={() => {
                trackLinkClick({
                  url: "https://thejetlagchronicles.kit.com/subscribe",
                  text: ctaProps.buttonText,
                  location: window.location.pathname,
                  link_type: "external",
                });
              }}
            >
              {ctaProps.buttonText}
            </Link>
            // <div className={s.ctaButton}>
            //   <SubscribeForm
            //     buttonName={ctaProps.buttonText}
            //     showName={true}
            //     showIcon={true}
            //     trackEventName="hero-download-guide"
            //     variant="link-style"
            //     config={
            //       ctaProps.subscribeConfig || {
            //         apiEndpoint: "/api/subscribe-to-download",
            //         modal: {
            //           title: "Get Your Free Guide",
            //           description:
            //             "Enter your email to download your Thailand Island guide instantly",
            //         },
            //       }
            //     }
            //     customIcon={ctaProps.customIcon || faDownload}
            //   />
            // </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Hero;
