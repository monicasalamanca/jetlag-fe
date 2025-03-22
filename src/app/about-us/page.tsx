import Hero from "@/components/hero/hero";
import AboutUsContent from "@/components/about-us-content/about-us-content";
import OurMission from "@/components/our-mission/our-mission";
import MeetUs from "@/components/meet-us/meet-us";
import OurValues from "@/components/our-values/our-values";

export default function About() {
  return (
    <>
      <Hero
        srcImage={`${process.env.NEXT_PUBLIC_CLOUDINARY_URL}/v1739321851/blog-assets/aboutus-hero_vpxp49.jpg`}
        headline="About Jet Lag Chronicles"
        shortDescription="Empowering Expats and Digital Nomads to Find Their Perfect Destination"
      />
      <AboutUsContent />
      <OurMission />
      <MeetUs />
      <OurValues />
    </>
  );
}
