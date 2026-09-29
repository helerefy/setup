import type { Metadata } from "next";
import Home from "@/components/home/Home";
import "@/styles/fonts.css";
import "@/styles/home.css";

export const metadata: Metadata = {
  title: "AI in Design Report 2026",
  description:
    "The second annual report by Designer Fund and Foundation Capital on how design teams are adapting to AI across tooling, craft, and org.",
};

export default function Page() {
  return <Home />;
}
