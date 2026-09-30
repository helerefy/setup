import { events, news } from "@/content/creatio";
import type { Locale } from "@/lib/i18n";
import { PageShell } from "./Pages";

export default function CreatioPage({ l }: { l: Locale }) {
  const ar = l === "ar";
  return <PageShell l={l}>
    <section className="vo-creatio-hero" aria-labelledby="creatio-heading">
      <img src="/vo/creatio/hero.jpg" alt="" />
      <div className="vo-creatio-hero-title"><span className="vo-eyebrow">CREATIO / NO-CODE</span><h1 id="creatio-heading">{ar ? <>عصر جديد<br />للمهارات الرقمية</> : <>New Era<br />of Digital Talent</>}</h1></div>
    </section>
    <section className="vo-creatio-events" aria-labelledby="events-heading">
      <div className="vo-creatio-section-label"><span className="vo-eyebrow">01 / CREATIO</span><h2 id="events-heading">{ar ? "فعاليات الـ No-Code" : "NO-CODE EVENTS"}</h2></div>
      <div className="vo-creatio-divider"><span className="vo-eyebrow">{ar ? "القادمة" : "UPCOMING"}</span><span className="vo-eyebrow">2025 {ar ? "· الأرشيف" : "· ARCHIVE"}</span></div>
      <div className="vo-creatio-event-grid">{events.map((event, i) => <article className={`vo-creatio-event ${i === 0 ? "vo-creatio-featured" : ""}`} key={event.image}>
        <div className="vo-creatio-event-image"><img src={`/vo/creatio/${event.image}`} alt="" loading="lazy" /><span>{event.type[l]}</span></div>
        <div className="vo-creatio-event-copy"><p className="vo-eyebrow">{event.date}{event.location && `  |  ${event.location}`}</p><h3>{event.title[l]}</h3><a href="https://www.creatio.com/events" target="_blank" rel="noreferrer">{ar ? "عرض المزيد" : "Show more"} <span>↗</span></a></div>
      </article>)}</div>
    </section>
    <section className="vo-creatio-news" aria-labelledby="news-heading"><div className="vo-creatio-section-label"><span className="vo-eyebrow">02 / CREATIO</span><h2 id="news-heading">{ar ? "آخر الأخبار" : "Latest News"}</h2></div>
      <div className="vo-creatio-news-list">{news.map((item) => <article className="vo-creatio-news-item" key={item.image}><img src={`/vo/creatio/${item.image}`} alt="" loading="lazy" /><div><span className="vo-eyebrow">{item.date}</span><h3>{item.title[l]}</h3><p>{item.summary[l]}</p></div></article>)}</div>
    </section>
    <section className="vo-creatio-cta"><span className="vo-eyebrow">CREATIO / NO-CODE</span><h2>{ar ? "دليل No-Code من Creatio" : "Creatio No-Code Playbook"}</h2><a href="https://www.creatio.com/no-code-playbook?partner=votechnologies" target="_blank" rel="noreferrer" className="vo-action">{ar ? "استكشف الدليل" : "Explore the playbook"}<span aria-hidden="true">↗</span></a></section>
  </PageShell>;
}
