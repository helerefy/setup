// Ported from the captured stateofaidesign.com home page markup.
import { m, ms } from "@/lib/media";
import { tr, hr, type Locale } from "@/lib/i18n";

export default function PrefaceTop3({ l }: { l: Locale }) {
  return (
    <div className="ssr-variant hidden-t69d6d hidden-72rtr7 hidden-miin9m">
      <div className="framer-zdgfz8-container">
        <div className="framer-WGVmM framer-9td1d framer-PJhgy framer-iduj5 framer-r21rmf framer-v-1afyo6u" data-framer-name="Phone" style={{ backgroundColor: "var(--token-0d9c52bb-4346-4afb-b8ae-283673444b3f, rgb(255, 255, 255))", width: "100%" }}>
          <div className="framer-h91ujm" data-framer-name="px-global">
            <div className="framer-1ot19t3" data-framer-name="container">
              <div className="framer-4wihjp" data-border="true" data-framer-name="eyebrow-wrapper" style={{ "--border-bottom-width": "0px", "--border-color": "var(--token-a228bc56-904d-4a09-b7f8-6b60e0221982, rgb(0, 0, 0))", "--border-left-width": "0px", "--border-right-width": "0px", "--border-style": "solid", "--border-top-width": "1px" }}>
                <div className="framer-1e9l96h" data-framer-name="eyebrow-title" style={{ "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", transform: "none" }}>
                  <p className="framer-text framer-styles-preset-1o7iizc" dir="auto">{tr(l, "An Inflection Point")}</p>
                </div>
              </div>
              <div className="framer-1k0ra6p" data-framer-name="grid">
                <div className="framer-1k477hd" data-framer-name="title" style={{ "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", transform: "none" }}>
                  <h1 className="framer-text framer-styles-preset-x66gw0" dir="auto">{tr(l, "In 2025, designers were experimenting with AI. In 2026, they’re rebuilding around it.")}</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
