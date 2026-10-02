import type { Locale } from "@/lib/i18n";

const partners = [
  { name: "Sorsx", image: "sorsx.webp", url: "https://sorsx.com" },
  { name: "ITIDA", image: "itida.png", url: "https://itida.gov.eg" },
  { name: "MCIT Egypt", image: "mcit.png", url: "https://mcit.gov.eg" },
  { name: "Odoo", image: "odoo-logo.webp", url: "https://www.odoo.com" },
  { name: "Creatio", image: "creatio.png", url: "https://www.creatio.com" },
] as const;

export default function VOAlliances({ l }: { l: Locale }) {
  const ar = l === "ar";
  return <section className="vo-alliances" aria-labelledby="vo-alliances-title">
    <div className="vo-alliances-heading"><h2 id="vo-alliances-title" style={{ font: '500 13px/1 "Poppins", monospace', letterSpacing: "normal", textTransform: "uppercase" }}>{ar ? "شركاؤنا" : "Our partners"}</h2></div>
    <div className="vo-alliances-window" dir="ltr">
      <div className="vo-alliances-track">
        <div className="vo-alliances-set">{partners.map((p) => <a key={p.name} href={p.url} target="_blank" rel="noopener noreferrer" aria-label={p.name}>
          <img src={`/vo/partners/${p.image}`} alt={p.name} />
        </a>)}</div>
        <div className="vo-alliances-set" aria-hidden="true">{partners.map((p) => <a key={p.name} href={p.url} target="_blank" rel="noopener noreferrer" tabIndex={-1}>
          <img src={`/vo/partners/${p.image}`} alt="" />
        </a>)}</div>
      </div>
    </div>
  </section>;
}
