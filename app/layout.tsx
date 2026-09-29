import type { Viewport } from "next";

export const viewport: Viewport = { width: "device-width" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html dir="ltr" suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
