import Image from "next/image";
import s from "./meet-the-crew.module.scss";

const CLOUDINARY = process.env.NEXT_PUBLIC_CLOUDINARY_URL;

interface TeamStat {
  value: string;
  suffix: string;
  label: string;
}

interface TeamMember {
  role: string;
  name: string;
  nameFirst: string;
  bio: string;
  stats: TeamStat[];
  image: string;
  imageAlt: string;
}

const moni: TeamMember = {
  role: "Co-Founder · The Programmer",
  name: "ONI",
  nameFirst: "M",
  bio: "From Colombia to Montreal and beyond. Two passports and a laptop. The code pusher. The site builder. Monica has relocated to 3 continents and has traveled 25+ countries. She is the organized one who brings some order to the madness of our nomadic life.",
  stats: [
    { value: "3", suffix: "+", label: "Countries Lived" },
    { value: "2x", suffix: "x", label: "Expat Moves" },
    { value: "∞", suffix: "", label: "Coffee Required" },
  ],
  image: `${CLOUDINARY}/v1780958749/blog-assets/20260404_122442_xbgpx8.jpg`,
  imageAlt: "Moni, co-founder of The Jet Lag Chronicles",
};

const dunny: TeamMember = {
  role: "Co-Founder · The Mounthpiece",
  name: "UNNY",
  nameFirst: "D",
  bio: "The writer. The mouth piece. The one who talks and negotiates. Dunny brings a sales background, a brutal honesty, and a genuine hatred for vague travel advice and bubbly influencers. If there's a whisper of a new destination, a weird visa workaround or a hidden cost buried in the fine print, he'll find it.",
  stats: [
    { value: "4", suffix: "+", label: "Countries Lived" },
    { value: "25", suffix: "+", label: "Guides Written" },
    { value: "0", suffix: "", label: "Regrets" },
  ],
  image: `${CLOUDINARY}/v1780958748/blog-assets/20260216_180348_rosiin.jpg`,
  imageAlt: "Dunny, co-founder of The Jet Lag Chronicles",
};

const manifestoItems = [
  "The world doesn't owe you adventure. You have to go get it.",
  "Bad information costs people real money and real time.",
  "There's a better version of your life waiting in a different timezone.",
  "Independence is worth building carefully and deliberately.",
];

const socialLinks = [
  { label: "X", href: "https://x.com/thejetLaggers_X" },
  { label: "IG", href: "https://www.instagram.com/thejetlaggers_ig" },
  { label: "FB", href: "https://www.facebook.com/thejetlaggersfb" },
];

const TeamCard = ({ member }: { member: TeamMember }) => (
  <article className={s.teamCard}>
    <div className={s.cardImage}>
      {CLOUDINARY && (
        <Image
          src={member.image}
          alt={member.imageAlt}
          fill
          style={{ objectFit: "cover" }}
          sizes="(max-width: 1024px) 100vw, 420px"
        />
      )}
      <div className={s.imageOverlay} />
    </div>
    <div className={s.cardBody}>
      <p className={s.cardRole}>{member.role}</p>
      <h3 className={s.cardName}>
        <span className={s.nameAccent}>{member.nameFirst}</span>
        {member.name}
      </h3>
      <p className={s.cardBio}>{member.bio}</p>
      <div className={s.cardStats}>
        {member.stats.map((stat, i) => (
          <div key={i} className={s.stat}>
            <div className={s.statNumber}>
              {stat.value}
              {stat.suffix && (
                <span className={s.statSuffix}>{stat.suffix}</span>
              )}
            </div>
            <div className={s.statLabel}>{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  </article>
);

const MeetTheCrew = () => {
  return (
    <section className={s.section}>
      <div className={s.sectionHeader}>
        <div className={s.headerLeft}>
          <p className={s.eyebrow}>The People Behind It</p>
          <h2 className={s.heading}>
            MEET
            <br />
            THE <span className={s.accent}>CREW</span>
          </h2>
        </div>
        <p className={s.headerIntro}>
          Two people. One mission. We&apos;re not influencers. We&apos;re not
          sponsored. We&apos;re just deeply obsessed with figuring out how to
          live better abroad and sharing everything we find.
        </p>
      </div>

      <div className={s.cardsGrid}>
        <TeamCard member={moni} />
        <TeamCard member={dunny} />

        <div className={s.sharedCol}>
          <div className={s.manifestoBanner}>
            <div className={s.manifestoGlow} aria-hidden="true" />
            <h3 className={s.manifestoTitle}>
              WHAT DRIVES <span className={s.accent}>BOTH</span> OF US
            </h3>
            <ul className={s.manifestoList}>
              {manifestoItems.map((item, i) => (
                <li key={i} className={s.manifestoItem}>
                  <span className={s.manifestoArrow}>→</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className={s.socialCard}>
            <p className={s.socialLabel}>Follow the Journey</p>
            <div className={s.socialLinks}>
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className={s.socialLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MeetTheCrew;
