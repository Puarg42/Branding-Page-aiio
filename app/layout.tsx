import type { Metadata } from "next";
import "./globals.css";
import { SiteFooter } from "./site-footer";

export const metadata: Metadata = {
  title:
    "aiio | Organizational Intelligence mit System",
  description:
    "aiio verbindet Wissen, Recognition und Activation in einem integrierten Organizational Intelligence System.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body>
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
