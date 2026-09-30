import type { Locale } from "@/lib/i18n";

const partners = [
  { name: "Sorsx", image: "sorsx.png", url: "https://sorsx.com" },
  { name: "ITIDA", image: "itida.png", url: "https://itida.gov.eg" },
  { name: "MCIT Egypt", image: "mcit.png", url: "https://mcit.gov.eg" },
  { name: "Odoo", image: "odoo.svg", url: "https://www.odoo.com" },
  { name: "Creatio", image: "creatio.png", url: "https://www.creatio.com" },
] as const;

export default function VOAlliances({ l }: { l: Locale }) {
  const ar = l === "ar";
  return <section className="vo-alliances" aria-labelledby="vo-alliances-title">
    <div className="vo-alliances-heading"><span className="vo-eyebrow">{ar ? "شركاؤنا" : "OUR PARTNERS"}</span><h2 id="vo-alliances-title">{ar ? "شراكات توسع إمكاناتنا." : "Partnerships that extend our capabilities."}</h2><p>{ar ? "نتعاون مع جهات تقنية ومؤسسات رائدة لتقديم حلول تلائم احتياجات أعمالك." : "We collaborate with organizations and technology partners to deliver solutions for the work ahead."}</p></div>
    <div className="vo-alliances-grid">{partners.map((p, i) => <a key={p.name} href={p.url} target="_blank" rel="noopener noreferrer" aria-label={p.name}>
      <span className="vo-eyebrow">{String(i + 1).padStart(2, "0")}</span>
      <img src={`/vo/partners/${p.image}`} alt={p.name} loading="lazy" />
      <span className="vo-alliances-name">{p.name}<span aria-hidden="true">↗</span></span>
    </a>)}</div>
  </section>;
}
