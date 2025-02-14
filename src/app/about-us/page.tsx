import Header from "@/components/header/header";
import Hero from "@/components/hero/hero";
import AboutUsContent from "@/components/about-us-content/about-us-content";
import OurMission from "@/components/our-mission/our-mission";
import MeetUs from "@/components/meet-us/meet-us";
import OurValues from "@/components/our-values/our-values";
import Footer from "@/components/footer/footer";

export default function About() {
  return (
    <>
      <Header />
      <Hero
        srcImage="https://res.cloudinary.com/jetlagchronicles/image/upload/v1739321851/aboutus-hero_vpxp49.jpg"
        headline="About Jet Lag Chronicles"
        description="Empowering Expats and Digital Nomads to Find Their Perfect Destination"
      />
      <AboutUsContent />
      <OurMission />
      <MeetUs />
      <OurValues />
      <Footer />
    </>
  );
}
