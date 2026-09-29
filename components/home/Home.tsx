import NavContainer from "./nav/NavContainer";
import HeroWrapper from "./hero/HeroWrapper";
import Partners from "./sections/Partners";
import PrefaceTop from "./sections/PrefaceTop";
import PrefaceTop2 from "./sections/PrefaceTop2";
import PrefaceTop3 from "./sections/PrefaceTop3";
import PrefaceGridSection from "./sections/PrefaceGridSection";
import PrefaceBottomQuote from "./sections/PrefaceBottomQuote";
import ChapterSlides from "./sections/ChapterSlides";
import CasesHighlight from "./sections/CasesHighlight";
import PageFill from "./sections/PageFill";
import Footer from "./sections/Footer";
import SvgTemplates from "@/components/SvgTemplates";
import HomeEffects from "./fx/HomeEffects";
import ScrollEffects from "./fx/ScrollEffects";

export default function Home() {
  return (
    <div id="main">
      <div className="framer-WgHH7 framer-1ti4ff8" style={{ minHeight: "100vh", width: "auto" }}>
        <div className="framer-HiGHW framer-72rtr7" style={{ minHeight: "100vh", width: "auto", display: "contents" }}>
          <NavContainer />
          <HeroWrapper />
          <Partners />
          <PrefaceTop />
          <PrefaceTop2 />
          <PrefaceTop3 />
          <PrefaceGridSection />
          <PrefaceBottomQuote />
          <ChapterSlides />
          <CasesHighlight />
        </div>
        <PageFill />
        <Footer />
      </div>
      <SvgTemplates />
      <HomeEffects />
      <ScrollEffects />
    </div>
  );
}
