import AboutUsContent from "app/components/about-us-content/about-us-content";
import Footer from "app/components/footer/footer";
import Header from "app/components/header/header";
import Hero from "app/components/hero/hero";
import MeetUs from "app/components/meet-us/meet-us";
import OurMission from "app/components/our-mission/our-mission";

export default function About() {
  return (
    <>
      <Header />
      <Hero
        srcImage="https://res.cloudinary.com/jetlagchronicles/image/upload/v1739321851/aboutus-hero_vpxp49.jpg"
        headline="About Jet Lag Chronicles"
        description="Empowering Epxats and Digital Nomads to Find Their Perfect Destination"
      />
      <AboutUsContent />
      <OurMission />
      <MeetUs />
      <Footer />
    </>
  );
}
