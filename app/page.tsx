import fs from "node:fs";
import path from "node:path";
import Reveal from "./Reveal";

// Framer-exported markup (including its appear-animation + hydration scripts) rendered verbatim.
const body = fs.readFileSync(path.join(process.cwd(), "app/framer/body.html"), "utf8");

export default function Page() {
  return (
    <>
      <Reveal />
      <div style={{ display: "contents" }} suppressHydrationWarning dangerouslySetInnerHTML={{ __html: body }} />
    </>
  );
}
