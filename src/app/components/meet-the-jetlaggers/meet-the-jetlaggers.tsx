import React from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import styles from "./meet-the-jetlaggers.module.scss";

const MeetTheJetlaggers: React.FC = () => {
  const images = [
    {
      src: "https://res.cloudinary.com/jetlagchronicles/image/upload/v1758235019/blog-assets/d352e965-1f03-45a8-a06d-476f8713aa5b-1_all_810_tylvfa.jpg",
      alt: "couple digital nomads working on laptops in tropical setting, professional photo",
    },
    {
      src: "https://res.cloudinary.com/jetlagchronicles/image/upload/v1758235015/blog-assets/d352e965-1f03-45a8-a06d-476f8713aa5b-1_all_331_zlt3rq.jpg",
      alt: "nomad couple exploring vibrant street market in Southeast Asia",
    },
    {
      src: "https://res.cloudinary.com/jetlagchronicles/image/upload/v1758235018/blog-assets/d352e965-1f03-45a8-a06d-476f8713aa5b-1_all_809_kfaxvq.jpg",
      alt: "digital nomads working from modern cafe with city skyline view",
    },
    {
      src: "https://res.cloudinary.com/jetlagchronicles/image/upload/v1758235018/blog-assets/d352e965-1f03-45a8-a06d-476f8713aa5b-1_all_808_jaee3f.jpg",
      alt: "couple backpacking through colorful Latin American city street",
    },
    {
      src: "https://res.cloudinary.com/jetlagchronicles/image/upload/v1758235017/blog-assets/d352e965-1f03-45a8-a06d-476f8713aa5b-1_all_806_z8pmt1.jpg",
      alt: "nomads working on beach with laptops during golden hour sunset",
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
