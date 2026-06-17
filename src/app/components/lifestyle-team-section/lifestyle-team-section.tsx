import Link from "next/link";
import s from "./lifestyle-team-section.module.scss";

interface ProfileData {
  name: string;
  initial: string;
  role: string;
  currentCity: string;
  countries: { flag: string; code: string }[];
  avatarGradient: string;
}

const PROFILES: ProfileData[] = [
  {
    name: "Dunny",
    initial: "D",
    role: "Co-founder · Strategy",
    currentCity: "Chiang Mai",
    countries: [
      { flag: "🇹🇭", code: "TH" },
      { flag: "🇻🇳", code: "VN" },
      { flag: "🇵🇹", code: "PT" },
      { flag: "🇯🇵", code: "JP" },
    ],
    avatarGradient: "linear-gradient(135deg, #119CE8 0%, #0d6daa 100%)",
  },
  {
    name: "Moni",
    initial: "M",
    role: "Co-founder · Editorial",
    currentCity: "Montréal",
    countries: [
      { flag: "🇰🇭", code: "KH" },
      { flag: "🇮🇩", code: "ID" },
      { flag: "🇪🇸", code: "ES" },
      { flag: "🇨🇦", code: "CA" },
    ],
    avatarGradient: "linear-gradient(135deg, #2B3A52 0%, #1a2535 100%)",
  },
];

function ProfileCard({
  name,
  initial,
  role,
  currentCity,
  countries,
  avatarGradient,
}: ProfileData) {
  return (
    <div className={s.profileCard}>
      <div
        className={s.avatar}
        style={{ background: avatarGradient }}
        aria-hidden="true"
      >
        {initial}
      </div>
      <p className={s.profileName}>{name}</p>
      <p className={s.profileRole}>{role}</p>
      <p className={s.profileLoc}>
        <span className={s.pinIcon} aria-hidden="true">
          📍
        </span>
        {currentCity}
      </p>
      <div
        className={s.countryChips}
        aria-label={`Countries ${name} has lived in`}
      >
        {countries.map(({ flag, code }) => (
          <span key={code} className={s.countryChip}>
            {flag} {code}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function LifestyleTeamSection() {
  return (
    <section className={s.section} aria-label="About the team">
      <div className={s.inner}>
        {/* Left — editorial text */}
        <div className={s.teamText}>
          <p className={s.eyebrow}>From The Jetlaggers</p>

          <h2 className={s.title}>
            Written by <span className={s.titleAccent}>People</span>
            <br />
            Who Actually Live This
          </h2>

          <p className={s.subtitle}>
            We&apos;re Moni and Dunny — a Canadian-Colombian duo who traded
            permanent addresses for a life built around slow travel, honest
            intel, and actual relocation moves. Everything you read here comes
            from first-hand experience. No agency pitches. No tourism board
            deals.
          </p>

          <blockquote className={s.blockquote}>
            <p className={s.quoteText}>
              &ldquo;We don&rsquo;t write about places we&apos;ve visited. We
              write about places we&apos;ve lived in — every visa run, lease
              negotiation, and late-night cost-of-living spreadsheet.&rdquo;
            </p>
            <footer className={s.quoteAttribution}>— Moni &amp; Dunny</footer>
          </blockquote>

          <Link href="/about-us" className={s.storyLink}>
            Read our story →
          </Link>
        </div>

        {/* Right — profile cards */}
        <div className={s.teamProfiles}>
          {PROFILES.map((profile) => (
            <ProfileCard key={profile.name} {...profile} />
          ))}
        </div>
      </div>
    </section>
  );
}
