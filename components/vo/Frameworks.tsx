import type { Locale } from "@/lib/i18n";

const frameworks = [
  { name: ".Net Core", image: "dotnet.svg", url: "https://dotnet.microsoft.com/" },
  { name: "NodeJs", image: "node.svg", url: "https://nodejs.org/" },
  { name: "Laravel", image: "laravel.svg", url: "https://laravel.com/" },
  { name: "Creatio", image: "creatio.svg", url: "https://www.creatio.com/" },
  { name: "Odoo", image: "odoo.svg", url: "https://www.odoo.com/" },
  { name: "Cybersecurity", image: "cybersecurity.svg", url: "https://www.cisa.gov/" },
  { name: "Cloud", image: "cloud.svg", url: "https://aws.amazon.com/" },
  { name: "Mobile development", image: "mobile.svg", url: "https://reactnative.dev/" },
] as const;
const wordmarks = new Set([".Net Core", "Creatio", "Odoo"]);

const imageFor = (item: typeof frameworks[number]) => item.name === "Odoo" ? "/vo/partners/odoo-logo.webp" : `/vo/frameworks/${item.image}`;

export default function Frameworks({ l }: { l: Locale }) {
  return <section className="vo-frameworks" aria-label={l === "ar" ? "تصفح أطر العمل" : "Browse Our Frameworks"}>
    <div className="vo-frameworks-heading">
      <div><h2>{l === "ar" ? "تصفح أطر العمل" : "Browse Our Frameworks"}</h2></div>
      <div className="vo-frameworks-heading-end"><p>{l === "ar" ? "استكشف خبراتنا عبر أكثر من ١٨٠٠ مهارة" : "Explore the technologies behind 1800+ skills"}</p></div>
    </div>
    <div className="vo-frameworks-window" dir="ltr">
      <div className="vo-frameworks-track">
        <div className="vo-frameworks-set">{frameworks.map((item) => <a key={item.name} href={item.url} target="_blank" rel="noreferrer" className={`vo-framework${wordmarks.has(item.name) ? " vo-framework-wordmark" : ""}`}><img src={imageFor(item)} alt={wordmarks.has(item.name) ? item.name : ""} />{!wordmarks.has(item.name) && <span>{item.name}</span>}</a>)}</div>
        <div className="vo-frameworks-set" aria-hidden="true">{frameworks.map((item) => <div key={item.name} className={`vo-framework${wordmarks.has(item.name) ? " vo-framework-wordmark" : ""}`}><img src={imageFor(item)} alt="" />{!wordmarks.has(item.name) && <span>{item.name}</span>}</div>)}</div>
      </div>
    </div>
  </section>;
}
