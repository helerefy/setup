import type { Locale } from "@/lib/i18n";
import NavContainer from "./nav/NavContainer";
import HeroWrapper from "./hero/HeroWrapper";
import Partners from "./sections/Partners";
import Frameworks from "@/components/vo/Frameworks";
import PrefaceTop from "./sections/PrefaceTop";
import PrefaceTop2 from "./sections/PrefaceTop2";
import PrefaceTop3 from "./sections/PrefaceTop3";
import PrefaceGridSection from "./sections/PrefaceGridSection";
import PrefaceBottomQuote from "./sections/PrefaceBottomQuote";
import ChapterSlides from "./sections/ChapterSlides";
import CasesHighlight from "./sections/CasesHighlight";
import VOFooter from "@/components/vo/VOFooter";
import SvgTemplates from "@/components/SvgTemplates";
import HomeEffects from "./fx/HomeEffects";
import ScrollEffects from "./fx/ScrollEffects";
import HoverEffects from "./fx/HoverEffects";

export default function Home({ l }: { l: Locale }) {
  return (
    <div id="main">
      <div className="framer-WgHH7 framer-1ti4ff8" style={{ minHeight: "100vh", width: "auto" }}>
        <div className="framer-HiGHW framer-72rtr7" style={{ minHeight: "100vh", width: "auto", display: "contents" }}>
          <NavContainer />
          <HeroWrapper />
          <Partners l={l} />
          <Frameworks l={l} />
          <PrefaceTop l={l} />
          <PrefaceTop2 l={l} />
          <PrefaceTop3 l={l} />
          <PrefaceGridSection l={l} />
          <PrefaceBottomQuote l={l} />
          <ChapterSlides l={l} />
          <CasesHighlight l={l} />
        </div>
        <VOFooter l={l} />
      </div>
      <SvgTemplates />
      <HomeEffects />
      <ScrollEffects />
      <HoverEffects />
    </div>
  );
}
