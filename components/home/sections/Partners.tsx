// Ported from the captured stateofaidesign.com home page markup.
import { tr, type Locale } from "@/lib/i18n";

const clients = [
  { name: "B.Tech", url: "https://btech.com/en" },
  { name: "Royal Commission for Riyadh City", url: "https://www.rcrc.gov.sa/" },
  { name: "Taif Municipality", url: "https://www.taifcity.gov.sa/" },
  { name: "Holy Makkah Municipality", url: "https://hmm.gov.sa/" },
  { name: "Kuwait Municipality", url: "https://www.baladia.gov.kw/" },
  { name: "KACST", url: "https://kacst.gov.sa/en" },
  { name: "Central Bank of Libya (CBL Care)", url: "https://cbl.gov.ly/" },
  { name: "Ministry of Environment, Water and Agriculture", url: "https://www.mewa.gov.sa/en/" },
  { name: "Ministry of Hajj and Umrah", url: "https://haj.gov.sa/en" },
  { name: "Libyan Ministry of Interior", url: "https://moi.gov.ly/" },
  { name: "Ministry of Municipalities and Housing", url: "https://momah.gov.sa/en" },
] as const;

/** Enterprise and private-sector clients named in the 2025 company profile (no logos supplied). */
const enterprise = ["Bin Dalbah Trading", "AlDahayan Trading", "Saleh Cars Group", "Three S", "AlHamidi Cars", "AlSharaf Cars", "Rotana Cars", "Class Cars", "Dagmal"] as const;

export default function Partners({ l }: { l: Locale }) {
  return (
    <div className="framer-kz3ldf" data-framer-name="Partners">
      <div className="framer-1y7ezc5" data-framer-name="trg-nav swap" id="swap" />
      <div className="framer-1tmdroh" data-framer-name="px-global" id="partners">
        <div className="framer-1ttescu" data-framer-name="container">
          <div className="framer-rqiyv6" data-border="true" data-framer-name="eyebrow-wrapper">
            <div className="ssr-variant hidden-miin9m">
              <div className="framer-16o5y5r" data-framer-name="eyebrow-text" style={{ transform: "none" }}>
                <p dir="auto" style={{ "--font-selector": "R0Y7R2Vpc3QgTW9uby01MDA=", "--framer-font-family": "\"Poppins\", monospace", "--framer-font-size": "13px", "--framer-font-weight": "500", "--framer-line-height": "100%", "--framer-text-color": "var(--token-a228bc56-904d-4a09-b7f8-6b60e0221982, rgb(11, 31, 58))", "--framer-text-transform": "uppercase" }} className="framer-text">{tr(l, "Our partners")}</p>
              </div>
            </div>
            <div className="ssr-variant hidden-t69d6d hidden-72rtr7 hidden-12sschj">
              <div className="framer-16o5y5r" data-framer-name="eyebrow-text" style={{ transform: "none" }}>
                <h2 dir="auto" style={{ "--font-selector": "R0Y7R2Vpc3QgTW9uby01MDA=", "--framer-font-family": "\"Poppins\", monospace", "--framer-font-size": "13px", "--framer-font-weight": "500", "--framer-line-height": "100%", "--framer-text-color": "var(--token-a228bc56-904d-4a09-b7f8-6b60e0221982, rgb(11, 31, 58))", "--framer-text-transform": "uppercase" }} className="framer-text">{tr(l, "Our partners")}</h2>
              </div>
            </div>
          </div>
          <div className="framer-9dpxa0" data-framer-name="logos-wrapper">
            {clients.map((client, i) => <a className="vo-client-link" href={client.url} target="_blank" rel="noopener noreferrer" aria-label={client.name} key={client.name}>
              <img className="vo-client-logo" src={`/vo/clients/c${i + 1}.webp`} alt="" />
            </a>)}
          </div>
          <div className="vo-enterprise" aria-labelledby="vo-enterprise-title">
            <div className="vo-enterprise-head"><h3 id="vo-enterprise-title">{l === "ar" ? "عملاء آخرون في ملف 2025" : "Also named in the 2025 profile"}</h3><span>{l === "ar" ? "المؤسسات والقطاع الخاص" : "Enterprise & private sector"}</span></div>
            <ul className="vo-enterprise-list">{enterprise.map((name) => <li key={name}>{name}</li>)}</ul>
          </div>
        </div>
      </div>
    </div>
  );
}
