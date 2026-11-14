import usePageMeta from "../hooks/usePageMeta";
import Hero from "../components/sections/Hero";
import AboutStory from "../components/sections/AboutStory";
import HomeServices from "../components/sections/HomeServices";
import PinnedProcess from "../components/sections/PinnedProcess";
import KeywordMarquees from "../components/sections/KeywordMarquees";
import FeaturedWork from "../components/sections/FeaturedWork";
import TestimonialsCarousel from "../components/sections/TestimonialsCarousel";
import ContactTeaser from "../components/sections/ContactTeaser";

export default function Home() {
  usePageMeta({
    title: "Creative Chaos — Web, Marketing & Creative Agency Birmingham",
    description:
      "e2e Cyber Solutions is an integrated web development, digital marketing and creative agency in Birmingham. Disruptive ideas, strategically executed.",
  });

  return (
    <>
      <Hero />
      <AboutStory />
      <HomeServices />
      <PinnedProcess />
      <KeywordMarquees />
      <FeaturedWork />
      <TestimonialsCarousel />
      <ContactTeaser />
    </>
  );
}
