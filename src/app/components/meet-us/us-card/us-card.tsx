import { FC } from "react";
import s from "./us-card.module.scss";

const UsCard: FC<{ name: string; role: string; desc: string }> = ({
  name,
  role,
  desc,
}) => {
  return (
    <div className={s.container}>
      <div className={s.image}></div>
      <div className={s.wrapper}>
        <h3>{name}</h3>
        <p className={s.role}>{role}</p>
        <p className={s.desc}>{desc}</p>
      </div>
    </div>
  );
};

export default UsCard;
