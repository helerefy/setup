import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { listRoutes, loadPage, type HeadNode } from "@/lib/site";

export const dynamicParams = false;
export function generateStaticParams() {
  return listRoutes()
    .filter((slug) => slug.length > 0)
    .map((slug) => ({ slug }));
}

type Props = { params: Promise<{ slug: string[] }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const page = loadPage((await params).slug);
  return page ? { title: page.title, description: page.description } : {};
}

const RENAME: Record<string, string> = { crossorigin: "crossOrigin", fetchpriority: "fetchPriority" };

function Node({ n }: { n: HeadNode }) {
  const Tag = n.tag as "style";
  const props: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(n.attrs)) props[RENAME[k] ?? k] = k === "async" ? true : v;
  if (n.tag === "meta" || n.tag === "link") return <Tag {...props} />;
  return <Tag {...props} dangerouslySetInnerHTML={{ __html: n.html ?? "" }} />;
}

export default async function Page({ params }: Props) {
  const page = loadPage((await params).slug);
  if (!page) notFound();
  return (
    <>
      {page.head.map((n, i) => (
        <Node key={i} n={n} />
      ))}
      <div style={{ display: "contents" }} suppressHydrationWarning dangerouslySetInnerHTML={{ __html: page.body }} />
    </>
  );
}
