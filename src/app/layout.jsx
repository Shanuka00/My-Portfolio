import "../index.css";
import "react-vertical-timeline-component/style.min.css";
import StyledComponentsRegistry from "../lib/styled-components-registry";
import { site } from "../data/site";

export const metadata = {
  metadataBase: new URL(site.url),
  title: site.title,
  description: site.description,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  icons: { icon: "/mylogo.png", apple: "/mylogo.png" },
  manifest: "/manifest.json",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: `${site.name} Portfolio`,
    title: site.title,
    description: site.description,
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: site.title }],
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
    images: ["/opengraph-image"],
  },
};

export const viewport = { themeColor: "#000000" };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
      </body>
    </html>
  );
}
