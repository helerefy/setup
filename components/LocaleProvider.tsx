"use client";

import { createContext, useContext } from "react";
import type { Locale } from "@/lib/i18n";

const Ctx = createContext<Locale>("en");
export const useLocale = () => useContext(Ctx);

export default function LocaleProvider({ locale, children }: { locale: Locale; children: React.ReactNode }) {
  return <Ctx.Provider value={locale}>{children}</Ctx.Provider>;
}
