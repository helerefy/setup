import fs from "node:fs";
import path from "node:path";

// Shared SVG symbols referenced via <use href="#id"> by icons across the site.
const templates = fs.readFileSync(path.join(process.cwd(), "lib/svg-templates.html"), "utf8");

export default function SvgTemplates() {
  return (
    <div
      id="svg-templates"
      aria-hidden="true"
      style={{ position: "absolute", overflow: "hidden", bottom: 0, left: 0, width: 0, height: 0, zIndex: 0, contain: "strict" }}
      dangerouslySetInnerHTML={{ __html: templates }}
    />
  );
}
