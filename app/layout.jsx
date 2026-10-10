import Script from "next/script";
import "./globals.css";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID || "";
const GSC_VERIFICATION = process.env.NEXT_PUBLIC_GSC_VERIFICATION || "";

export const metadata = {
  metadataBase: new URL("https://openappo.com"),
  ...(GSC_VERIFICATION ? { verification: { google: GSC_VERIFICATION } } : {}),
  title: "Openappo — منظومة إدارة وتطوير الأعمال الذكية",
  description: "نظام سحابي متكامل يجمع كل تفاصيل مشروعك من مبيعات، فواتير، ومخزون في مكان واحد.",
  applicationName: "Openappo",
  authors: [{ name: "Openappo Team" }],
  generator: "Next.js",
  keywords: ["Openappo", "ERP", "إدارة أعمال", "برنامج محاسبة", "إدارة مخازن", "فواتير سحابية"],
  openGraph: {
    title: "Openappo — منظومة إدارة وتطوير الأعمال الذكية",
    description: "نظام سحابي متكامل يجمع كل تفاصيل مشروعك من مبيعات، فواتير، ومخزون في مكان واحد.",
    url: "https://openappo.com",
    siteName: "Openappo",
    locale: "ar_EG",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Openappo — منظومة إدارة وتطوير الأعمال الذكية",
      },
      {
        url: "/og-square.png",
        width: 600,
        height: 600,
        alt: "Openappo Icon",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Openappo — منظومة إدارة وتطوير الأعمال الذكية",
    description: "نظام سحابي متكامل يجمع كل تفاصيل مشروعك من مبيعات، فواتير، ومخزون في مكان واحد.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
      { url: "/icon.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#000000",
};

const SITE = "https://openappo.com";

function orgJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE}/#org`,
        name: "Openappo",
        url: SITE,
        logo: `${SITE}/icon.png`,
        description:
          "تصميم وتطوير أنظمة إدارة الأعمال وتخطيط الموارد (ERP) السحابية المخصصة للشركات.",
        contactPoint: {
          "@type": "ContactPoint",
          telephone: "+201558282760",
          contactType: "customer service",
          areaServed: "EG",
          availableLanguage: ["ar", "en"],
        },
      },
      {
        "@type": "WebSite",
        "@id": `${SITE}/#website`,
        url: SITE,
        name: "Openappo",
        inLanguage: "ar",
        publisher: { "@id": `${SITE}/#org` },
      },
    ],
  };
}

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd()) }}
        />
        {/* GA4 stays fully inert (no script tags at all) until
            NEXT_PUBLIC_GA_ID is set in the environment — no placeholder
            tracking ID is ever shipped. */}
        {GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">
              {`window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_ID}');`}
            </Script>
          </>
        )}
        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`(function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "yvdtbr9sq1");`}
        </Script>
        {/* Apply the saved theme before the first paint — otherwise the page
            flashes dark, then repaints light. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{document.documentElement.dataset.pfTheme=localStorage.getItem('pf-theme')||'dark'}catch(e){document.documentElement.dataset.pfTheme='dark'}",
          }}
        />
        {/* First frame gates the whole hero — start it with the HTML, not after
            JS boots. type= makes browsers without AVIF skip these entirely, and
            media= matches the resolution split in ScrollSequence. */}
        <link
          rel="preload"
          as="image"
          type="image/avif"
          href="/frames/1280/frame-001.avif"
          media="(max-width: 500px)"
          fetchPriority="high"
        />
        <link
          rel="preload"
          as="image"
          type="image/avif"
          href="/frames/1920/frame-001.avif"
          media="(min-width: 501px)"
          fetchPriority="high"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
