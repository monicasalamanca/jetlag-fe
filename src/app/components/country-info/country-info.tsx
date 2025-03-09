import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHandsPraying,
  faMasksTheater,
  faShieldCat,
  faUtensils,
} from "@fortawesome/free-solid-svg-icons";
import InfoCard from "./info-card/info-card";

import s from "./country-info.module.scss";

const CountryInfo = () => {
  return (
    <section className={s.container}>
      <h1>Country Information</h1>
      <div className={s.wrapper}>
        <InfoCard
          icon={faUtensils}
          iconColor="#3A78FC"
          contrastColor="#EEF6FF"
          title="Food"
          list={["Sushi", "Ramen", "Tempura", "Takoyaki"]}
          imageSrc="https://res.cloudinary.com/jetlagchronicles/image/upload/v1741477967/blog-assets/japanese-food_wkydzj.jpg"
          imageAltText="Japanese Food Image"
          description="Japanese cuisine is a masterpiece of tradition and innovation. From world-famous sushi and ramen to regional specialties like Osaka's takoyaki and Hokkaido's seafood, every city offers unique culinary experiences. Street food markets and Michelin-starred restaurants coexist, making Japan a food lover's paradise."
        />
        <InfoCard
          icon={faHandsPraying}
          iconColor="#1BC4F3"
          contrastColor="#EEF6FF"
          title="Religion"
          list={["Shinto", "Buddhism"]}
          imageSrc="https://res.cloudinary.com/jetlagchronicles/image/upload/v1741481408/blog-assets/japanese-religion_g03h0b.jpg"
          imageAltText="Japanese religion Image"
          description="Shinto and Buddhism harmoniously shape Japan's spiritual landscape. Ancient temples and serene shrines dot both cities and countryside, offering peaceful retreats. Religious customs influence daily life through festivals, ceremonies, and architectural marvels that attract millions of visitors annually."
        />
        <InfoCard
          icon={faMasksTheater}
          iconColor="#ACF877"
          contrastColor="#ECFCF4"
          title="Culture"
          list={["Anime", "J-Pop", "Arts", "Tech"]}
          imageSrc="https://res.cloudinary.com/jetlagchronicles/image/upload/v1741481814/blog-assets/japanese-culture_clexsv.jpg"
          imageAltText="Japanese culture Image"
          description="Japan seamlessly blends ancient traditions with modern innovation. Experience centuries-old tea ceremonies and traditional arts alongside vibrant anime culture and cutting-edge technology. From peaceful zen gardens to electric Akihabara, Japan's cultural diversity offers something for everyone."
        />
        <div className={s.safety}>
          <div className={s.title}>
            <FontAwesomeIcon
              icon={faShieldCat}
              className={s.icon}
              style={{ color: "#FCF48B" }}
            />
            <h2>Crime & Safety</h2>
          </div>
          <div className={s.progressBarWrapper}>
            <div className={s.top}>
              <h2>Safety Index</h2>
              <p>98/100</p>
            </div>
            <div className={s.progressBar}>
              <div className={s.fill} style={{ width: "95%" }}></div>
            </div>
          </div>
          <p>
            Japan ranks among the world&apos;s safest countries, with
            exceptionally low crime rates and a culture of respect and order.
            While normal precautions apply, travelers can feel secure exploring
            any time of day. Lost items are commonly returned, and public
            transportation is reliable and safe.
          </p>
        </div>
      </div>
    </section>
  );
};

export default CountryInfo;
