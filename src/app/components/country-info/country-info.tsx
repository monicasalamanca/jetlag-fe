import { FC } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHandsPraying,
  faMasksTheater,
  faShieldCat,
  faUtensils,
} from "@fortawesome/free-solid-svg-icons";
import InfoCard from "./info-card/info-card";

import s from "./country-info.module.scss";

const CountryInfo: FC<{
  foodDishes: string;
  foodDescription: string;
  religions: string;
  religionDescription: string;
  cultureItems: string;
  cultureDescription: string;
  crimeAndSafetyIndex: number;
  crimeAndSafetyDescription: string;
}> = ({
  foodDishes,
  foodDescription,
  religions,
  religionDescription,
  cultureItems,
  cultureDescription,
  crimeAndSafetyIndex,
  crimeAndSafetyDescription,
}) => {
  const foodDishesArray = foodDishes.split(",").map((dish) => dish.trim());
  const religionsArray = religions
    .split(",")
    .map((religion) => religion.trim());
  const cultureItemsArray = cultureItems.split(",").map((item) => item.trim());
  return (
    <section className={s.container}>
      <h1>Country Information</h1>
      <div className={s.wrapper}>
        <InfoCard
          icon={faUtensils}
          iconColor="#3A78FC"
          contrastColor="#EEF6FF"
          title="Food"
          list={foodDishesArray}
          imageSrc="https://res.cloudinary.com/jetlagchronicles/image/upload/v1741477967/blog-assets/japanese-food_wkydzj.jpg"
          imageAltText="Japanese Food Image"
          description={foodDescription}
        />
        <InfoCard
          icon={faHandsPraying}
          iconColor="#1BC4F3"
          contrastColor="#EEF6FF"
          title="Religion"
          list={religionsArray}
          imageSrc="https://res.cloudinary.com/jetlagchronicles/image/upload/v1741481408/blog-assets/japanese-religion_g03h0b.jpg"
          imageAltText="Japanese religion Image"
          description={religionDescription}
        />
        <InfoCard
          icon={faMasksTheater}
          iconColor="#ACF877"
          contrastColor="#ECFCF4"
          title="Culture"
          list={cultureItemsArray}
          imageSrc="https://res.cloudinary.com/jetlagchronicles/image/upload/v1741481814/blog-assets/japanese-culture_clexsv.jpg"
          imageAltText="Japanese culture Image"
          description={cultureDescription}
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
              <p>{crimeAndSafetyIndex}/100</p>
            </div>
            <div className={s.progressBar}>
              <div
                className={s.fill}
                style={{ width: `${crimeAndSafetyIndex}%` }}
              ></div>
            </div>
          </div>
          <p>{crimeAndSafetyDescription}</p>
        </div>
      </div>
    </section>
  );
};

export default CountryInfo;
