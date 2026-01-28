import Image from "next/image";
import { DetailedGuide } from "@/api/types";

import s from "./preview-sample-pages.module.scss";

interface PreviewSamplePagesProps {
  guide: DetailedGuide;
}

const PreviewSamplePages = ({ guide }: PreviewSamplePagesProps) => {
  // Hide section if samplePages is empty or missing
  if (!guide.samplePages || guide.samplePages.length === 0) {
    return null;
  }

  return (
    <section className={s.previewSamplePages}>
      <div className={s.wrapper}>
        <h2>Preview Samples</h2>
        <div className={s.content}>
          <div className={s.imageScroll}>
            {guide.samplePages.map((page, index) => (
              <div key={page.id} className={s.imageWrapper}>
                <Image
                  className={s.image}
                  src={page.attributes.url}
                  alt={
                    page.attributes.alternativeText ||
                    `Guide sample page ${index + 1}`
                  }
                  width={page.attributes.width}
                  height={page.attributes.height}
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
