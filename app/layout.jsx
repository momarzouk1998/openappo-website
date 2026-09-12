import "./globals.css";

export const metadata = {
  metadataBase: new URL("https://openappo.com"),
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

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl">
      <head>
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
