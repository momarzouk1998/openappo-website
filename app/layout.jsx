import "./globals.css";

export const metadata = {
  title: "Openappo — منظومة إدارة وتطوير الأعمال الذكية",
  description: "نظام سحابي متكامل يجمع كل تفاصيل مشروعك من مبيعات، فواتير، ومخزون في مكان واحد.",
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
