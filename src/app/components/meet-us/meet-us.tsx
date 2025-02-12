import UsCard from "./us-card/us-card";

import s from "./meet-us.module.scss";

const MeetUs = () => {
  return (
    <section className={s.container}>
      <h1>Meet Us</h1>
      <UsCard
        name="Monica Salamanca"
        role="Head of Innovation"
        desc="Programmer and Photographer"
      />
      <UsCard
        name="Justin Dunlop"
        role="Head of Content & Marketing"
        desc="Writer and Marketer"
      />
    </section>
  );
};

export default MeetUs;
