import Link from "next/link";
import { products, local } from "@/content/vo";
import type { Locale } from "@/lib/i18n";

export default function ProductShowcase({ l }: { l: Locale }) {
  const ar = l === "ar";
  return <section className="vo-showcase" id="case-studies" aria-labelledby="vo-showcase-title">
    <div className="vo-showcase-intro">
      <div><span className="vo-eyebrow">{ar ? "المنتجات / ٠١-٠٨" : "PRODUCTS / 01-08"}</span><h2 id="vo-showcase-title">{ar ? "برمجيات للمواقع والعمليات والمشاريع." : "Software for places, operations and projects."}</h2></div>
      <div className="vo-showcase-side"><p>{ar ? "من البيانات الجغرافية إلى إدارة المشاريع، اكتشف مجموعة منتجات فو." : "From spatial intelligence to project delivery, explore VO's product portfolio."}</p><Link href={`/${l}/solutions-products#products`}>{ar ? "عرض جميع المنتجات" : "Explore all products"}<span aria-hidden="true">↗</span></Link></div>
    </div>
    <div className="vo-showcase-grid">{products.map((p, i) => <Link key={p.id} href={`/${l}/solutions-products/${p.id}`} className={`vo-showcase-item${i === 0 ? " vo-showcase-feature" : ""}`}>
      <div className="vo-showcase-image"><img src={p.image} alt="" loading="lazy" /></div>
      <div className="vo-showcase-meta"><span>{String(i + 1).padStart(2, "0")} / {String(products.length).padStart(2, "0")}</span><span aria-hidden="true">↗</span></div>
      <h3>{local(l, p.name)}</h3><p>{local(l, p.subtitle)}</p>
    </Link>)}</div>
  </section>;
}
