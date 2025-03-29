import UsCard from "./us-card/us-card";

import s from "./meet-us.module.scss";

const MeetUs = () => {
  return (
    <section className={s.container}>
      <h1>Meet Us</h1>
      <div className={s.wrapper}>
        <UsCard
          name="Monica Salamanca"
          role="IT & Innovation Jetlagger"
          desc="Programmer & Photographer"
        />
        <UsCard
          name="Justin Dunlop"
          role="Content & Marketing Jetlagger"
          desc="Writer & Marketer"
        />
      </div>
    </section>
  );
};

export default MeetUs;
