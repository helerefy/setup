// Ported from the captured stateofaidesign.com home page markup.
import { m, ms } from "@/lib/media";
import CountUp from "../fx/CountUp";
import { tr, hr, type Locale } from "@/lib/i18n";
import PrefaceGrid from "../preface/PrefaceGrid";

export default function PrefaceGridSection({ l }: { l: Locale }) {
  return (
    <div className="framer-t1rymp" data-framer-name="wrapper">
      <div className="framer-fwat8b" data-framer-name="triggers">
        <div className="framer-10qwzqx" data-framer-name="preface-target-2" id="preface-target-2" />
        <div className="framer-1l94yuy" data-framer-name="preface-target" id="preface-target" />
      </div>
      <div className="framer-64wnia" data-framer-name="Sticky">
        <div className="framer-d3wv3q" data-framer-name="px-global">
          <div className="framer-1dr4dtr" data-framer-name="container">
            <div className="ssr-variant hidden-t69d6d hidden-12sschj">
              <div className="framer-tpj2n2-container">
                <PrefaceGrid bp="dsk" />
              </div>
            </div>
            <div className="ssr-variant hidden-72rtr7 hidden-12sschj hidden-miin9m">
              <div className="framer-tpj2n2-container">
                <PrefaceGrid bp="tab" />
              </div>
            </div>
            <div className="ssr-variant hidden-t69d6d hidden-72rtr7 hidden-miin9m">
              <div className="framer-tpj2n2-container">
                <PrefaceGrid bp="mob" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
