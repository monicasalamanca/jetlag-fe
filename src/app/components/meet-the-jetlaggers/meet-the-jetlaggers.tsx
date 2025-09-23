import React from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import styles from "./meet-the-jetlaggers.module.scss";

const MeetTheJetlaggers: React.FC = () => {
  const images = [
    {
      src: "https://res.cloudinary.com/jetlagchronicles/image/upload/v1758235019/blog-assets/d352e965-1f03-45a8-a06d-476f8713aa5b-1_all_810_tylvfa.jpg",
      alt: "the jetlaggeres traveling couple exploring new destination together",
    },
    {
      src: "https://res.cloudinary.com/jetlagchronicles/image/upload/v1758235015/blog-assets/d352e965-1f03-45a8-a06d-476f8713aa5b-1_all_331_zlt3rq.jpg",
      alt: "the jetlaggers traveling couple exploring new destination together",
    },
    {
      src: "https://res.cloudinary.com/jetlagchronicles/image/upload/v1758235018/blog-assets/d352e965-1f03-45a8-a06d-476f8713aa5b-1_all_809_kfaxvq.jpg",
      alt: "the jetlaggers traveling couple exploring new destination together",
    },
    {
      src: "https://res.cloudinary.com/jetlagchronicles/image/upload/v1758235018/blog-assets/d352e965-1f03-45a8-a06d-476f8713aa5b-1_all_808_jaee3f.jpg",
      alt: "the jetlaggers traveling couple exploring new destination together",
    },
    {
      src: "https://res.cloudinary.com/jetlagchronicles/image/upload/v1758235017/blog-assets/d352e965-1f03-45a8-a06d-476f8713aa5b-1_all_806_z8pmt1.jpg",
      alt: "the jetlaggers traveling couple exploring new destination together",
    },
  ];

  return (
    <section id="meet-jet-laggers" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.iconWrapper}>
            <FontAwesomeIcon icon={faCamera} className={styles.cameraIcon} />
          </div>
          <h2>Meet The Jet Laggers</h2>
        </div>
        <div className={styles.content}>
          <div className={styles.imageScroll}>
            {images.map((image, index) => (
              <div key={index} className={styles.imageWrapper}>
                <Image
                  className={styles.image}
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

export default MeetTheJetlaggers;
