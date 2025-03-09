import BestTimes from "../best-times/best-times";
import CountryInfo from "../country-info/country-info";
import Hero from "../hero/hero";
import Location from "../location/location";
import QuickFacts from "../quick-facts/quick-facts";
import TravelResources from "../travel-resources/travel-resources";
import WeatherOverview from "../weather-overview/weather-overview";

import s from "./country-lander.module.scss";

const CountryLander = () => {
  return (
    <main className={s.container}>
      <Hero
        srcImage={`${process.env.NEXT_PUBLIC_CLOUDINARY_URL}/v1740958385/blog-assets/japan-hero_iedol6.jpg`}
        headline={"Japan Travel & Living Guide"}
        description={
          "Your complete guide to exploring the Land of the Rising Sun"
        }
      />
      <section className={s.countryIntro}>
        <p>
          Experience the perfect blend of ancient traditions and cutting-edge
          technology in Japan. From serene templates to bustling metropolises,
          discover why Japan is a top destination for digital nomads and expats.
        </p>
      </section>
      <Location />
      <QuickFacts />
      <WeatherOverview />
      <BestTimes />
      <TravelResources />
      <CountryInfo />
    </main>
  );
};

export default CountryLander;
