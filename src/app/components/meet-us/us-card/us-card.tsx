import { FC } from "react";
import s from "./us-card.module.scss";
import Image from "next/image";

const UsCard: FC<{ name: string; role: string; desc: string }> = ({
  name,
  role,
  desc,
}) => {
  return (
    <div className={s.container}>
      <div className={s.imageWrapper}>
        {name.includes("Monica") ? (
          <Image
            src={`${process.env.NEXT_PUBLIC_CLOUDINARY_URL}/v1743283362/blog-assets/monica_jscnvj.jpg`}
            alt="Monica Salamanca"
            width={65}
            height={65}
            loading="lazy"
          />
        ) : (
          <Image
            src={`${process.env.NEXT_PUBLIC_CLOUDINARY_URL}/v1743283362/blog-assets/justin_fledos.jpg`}
            alt="Justin Dunlop"
            width={65}
            height={65}
            loading="lazy"
          />
        )}
      </div>
      <div className={s.wrapper}>
        <h3>{name}</h3>
        <h4 className={s.role}>{role}</h4>
        <p className={s.desc}>{desc}</p>
      </div>
    </div>
  );
};

export default UsCard;
