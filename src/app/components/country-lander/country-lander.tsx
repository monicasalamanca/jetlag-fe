import { FC } from "react";
import BestTimes from "../best-times/best-times";
import CountryInfo from "../country-info/country-info";
import Hero from "../hero/hero";
import Location from "../location/location";
import QuickFacts from "../quick-facts/quick-facts";
import TravelResources from "../travel-resources/travel-resources";
import WeatherOverview from "../weather-overview/weather-overview";
import { Country } from "@/api/types";

import s from "./country-lander.module.scss";

const CountryLander: FC<{ country: Country }> = ({ country }) => {
  const {
    name,
    headline,
    description,
    mapLink,
    language,
    power,
    currency,
    timeZone,
    summerTemp,
    automnTemp,
    springTemp,
    winterTemp,
    springBestTimeToTravel,
    summerBestTimeToTravel,
    automnBestTimeToTravel,
    winterBestTimeToTravel,
    foodDishes,
    foodDescription,
    religions,
    religionDescription,
    cultureItems,
    cultureDescription,
    crimeAndSafetyIndex,
    crimeAndSafetyDescription,
  } = country;
  return (
    <main className={s.container}>
      <Hero
        srcImage="/japan-hero_iedol6.jpg"
        headline={`${name} Travel & Living Guide`}
        shortDescription={headline}
      />
      <section className={s.countryIntro}>
        <p>{description}</p>
      </section>
      <Location mapLink={mapLink} />
      <QuickFacts
        language={language}
        power={power}
        currency={currency}
        timeZone={timeZone}
      />
      <div className={s.weatherWrapper}>
        <WeatherOverview
          summerTemp={summerTemp}
          automnTemp={automnTemp}
          springTemp={springTemp}
          winterTemp={winterTemp}
        />
        <BestTimes
          springBestTimeTotravel={springBestTimeToTravel}
          summerBestTimeToTravel={summerBestTimeToTravel}
          automnBestTimeToTravel={automnBestTimeToTravel}
          winterBestTimeToTravel={winterBestTimeToTravel}
        />
      </div>
      <TravelResources />
      <CountryInfo
        foodDishes={foodDishes}
        foodDescription={foodDescription}
        religions={religions}
        religionDescription={religionDescription}
        cultureItems={cultureItems}
        cultureDescription={cultureDescription}
        crimeAndSafetyIndex={crimeAndSafetyIndex}
        crimeAndSafetyDescription={crimeAndSafetyDescription}
      />
    </main>
  );
};

export default CountryLander;
