import SiteNav from "../SiteNav";
import ScrollSequence from "../ScrollSequence";

const SITE = "https://openappo.com";

export const metadata = {
  metadataBase: new URL(SITE),
  title: "Openappo — Smart Business Management & ERP Platform",
  description:
    "An integrated cloud system that brings every detail of your business — sales, invoicing, and inventory — into one place.",
  alternates: { canonical: "/en", languages: { ar: "/", en: "/en" } },
  openGraph: {
    title: "Openappo — Smart Business Management & ERP Platform",
    description:
      "An integrated cloud system that brings every detail of your business — sales, invoicing, and inventory — into one place.",
    url: `${SITE}/en`,
    siteName: "Openappo",
    locale: "en_US",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Openappo" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Openappo — Smart Business Management & ERP Platform",
    description:
      "An integrated cloud system that brings every detail of your business — sales, invoicing, and inventory — into one place.",
    images: ["/og-image.png"],
  },
};

export default function EnglishHomePage() {
  return (
    <>
      <span id="top" />
      <SiteNav current="/" lang="en" />
      <ScrollSequence lang="en" />
    </>
  );
}
