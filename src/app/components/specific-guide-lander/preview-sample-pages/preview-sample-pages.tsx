import Image from "next/image";

import s from "./preview-sample-pages.module.scss";

const PreviewSamplePages = () => {
  const images = [
    {
      src: "https://res.cloudinary.com/jetlagchronicles/image/upload/v1769460458/eguides/Screenshot_2026-01-26_at_3.34.00_PM_wbx60j.png",
      alt: "Our guide sample page showing the content",
    },
    {
      src: "https://res.cloudinary.com/jetlagchronicles/image/upload/v1769460459/eguides/Screenshot_2026-01-26_at_3.36.12_PM_zij4y0.png",
      alt: "Our guide sample page showing the content",
    },
    {
      src: "https://res.cloudinary.com/jetlagchronicles/image/upload/v1769460459/eguides/Screenshot_2026-01-26_at_3.39.40_PM_iqrp0b.png",
      alt: "Our guide sample page showing the content",
    },
    {
      src: "https://res.cloudinary.com/jetlagchronicles/image/upload/v1769460458/eguides/Screenshot_2026-01-26_at_3.43.11_PM_vbyycy.png",
      alt: "Our guide sample page showing the content",
    },
  ];

  return (
    <section className={s.previewSamplePages}>
      <div className={s.wrapper}>
        <h2>Preview Samples</h2>
        <div className={s.content}>
          <div className={s.imageScroll}>
            {images.map((image, index) => (
              <div key={index} className={s.imageWrapper}>
                <Image
                  className={s.image}
                  src={image.src}
                  alt={image.alt}
                  width={320}
                  height={320}
                  priority={index < 2}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PreviewSamplePages;
