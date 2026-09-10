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
        {/* First frame gates the whole hero — start it with the HTML, not after JS boots. */}
        <link
          rel="preload"
          as="image"
          href="/frames/frame-001.jpg"
          fetchPriority="high"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
