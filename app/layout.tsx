import type { Metadata, Viewport } from "next";
import headNodes from "./framer/head.json";

export const metadata: Metadata = {
  title: "VO for Technology 2026",
  description:
    "The second annual report by VO Technology and MCIT on how technology teams are adapting to AI across tooling, craft, and org.",
};
export const viewport: Viewport = { width: "device-width" };

type Node = { tag: string; attrs: Record<string, string>; html?: string };
const RENAME: Record<string, string> = { crossorigin: "crossOrigin", fetchpriority: "fetchPriority" };

function toProps(attrs: Record<string, string>) {
  const p: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(attrs)) p[RENAME[k] ?? k] = k === "async" ? true : v;
  return p;
}

function HeadNode({ n }: { n: Node }) {
  const Tag = n.tag as "style";
  const props = toProps(n.attrs);
  if (n.tag === "meta" || n.tag === "link") return <Tag {...props} />;
  return <Tag {...props} dangerouslySetInnerHTML={{ __html: n.html ?? "" }} />;
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html dir="ltr" suppressHydrationWarning>
      <head>
        {(headNodes as Node[])
          .filter((n) => !(n.tag === "meta" && (n.attrs.name === "description")))
          .map((n, i) => <HeadNode key={i} n={n} />)}
      </head>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
