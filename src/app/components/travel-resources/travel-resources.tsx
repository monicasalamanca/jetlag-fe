import TravelResourceCard from "./travel-resource-card/travel-resource-card";
import {
  faHotel,
  faBed,
  faCar,
  faPlane,
  faHeartPulse,
  faTicket,
  faTrain,
  faPassport,
} from "@fortawesome/free-solid-svg-icons";

import s from "./travel-resources.module.scss";

const TravelResources = () => {
  return (
    <section className={s.container}>
      <h1>Travel Resources</h1>
      <div className={s.wrapper}>
        <TravelResourceCard
          icon={faHotel}
          color="#3A78FC"
          title="Find Hotels"
        />
        <TravelResourceCard icon={faBed} color="#1BC4F3" title="Find Hostels" />
        <TravelResourceCard icon={faCar} color="#ACF877" title="Rental Cars" />
        <TravelResourceCard
          icon={faPlane}
          color="#FCF48B"
          title="Find Flights"
        />
        <TravelResourceCard
          icon={faHeartPulse}
          color="#F77171"
          title="Travel Insurance"
        />
        <TravelResourceCard
          icon={faTicket}
          color="#A78BFA"
          title="Tours & Activities"
        />
        <TravelResourceCard icon={faTrain} color="#FB923C" title="Transport" />
        <TravelResourceCard
          icon={faPassport}
          color="#818CF8"
          title="Visa Info"
        />
      </div>
    </section>
  );
};

export default TravelResources;
