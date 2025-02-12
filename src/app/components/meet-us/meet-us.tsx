import UsCard from "./us-card/us-card";

import s from "./meet-us.module.scss";

const MeetUs = () => {
  return (
    <section className={s.container}>
      <h1>Meet Us</h1>
      <UsCard
        name="Monica Salamanca"
        role="IT & Innovation Lead"
        desc="Programmer & Photographer"
      />
      <UsCard
        name="Justin Dunlop"
        role="Content & Marketing Lead"
        desc="Writer & Marketer"
      />
    </section>
  );
};

export default MeetUs;
