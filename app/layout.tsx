import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://openappo.com"),
  title: {
    default: "OPENAPPO — Future-Grade Digital Ecosystem & AI Systems",
    template: "%s | OPENAPPO",
  },
  description: "المظلة الرقمية الرئيسية لمنظومة OPENAPPO — تطوير أنظمة الذكاء الاصطناعي، البنية السحابية، والحلول البرمجية المستقبلية بأعلى معايير الأداء والـ 3D Motion.",
  keywords: [
    "OPENAPPO", "Openappo", "أوبن أوبو", "تطوير مواقع 3D", "أنظمة الذكاء الاصطناعي",
    "DigitalOcean Apps", "Next.js 3D Website", "Three.js Animation", "تطوير برمجيات مصر",
    "Full Stack Architecture", "AI Web Applications"
  ],
  authors: [{ name: "OPENAPPO Architecture Team", url: "https://openappo.com" }],
  creator: "OPENAPPO",
  publisher: "OPENAPPO Ecosystem",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "ar_EG",
    url: "https://openappo.com",
    siteName: "OPENAPPO Ecosystem",
    title: "OPENAPPO — Future-Grade Digital Ecosystem & AI Systems",
    description: "المظلة الرقمية الرئيسية لمنظومة OPENAPPO — أنظمة رقمية مستقبلية ثلاثية الأبعاد بذكاء اصطناعي وأداء فائق السرعة.",
    images: [
      {
        url: "/Openappo_02_Dark_Background_Logo.png",
        width: 1200,
        height: 630,
        alt: "OPENAPPO Digital Ecosystem Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "OPENAPPO — Future-Grade Digital Ecosystem & AI Systems",
    description: "تطوير أنظمة الذكاء الاصطناعي والحلول الرقمية المستقبلية.",
    images: ["/Openappo_02_Dark_Background_Logo.png"],
  },
  icons: {
    icon: "/app_icon_square.png",
    shortcut: "/app_icon_square.png",
    apple: "/Openansparent_Icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "OPENAPPO",
    "url": "https://openappo.com",
    "logo": "https://openappo.com/Openappo_04_Transparent_Logo.png",
    "description": "Next-Gen Digital Ecosystem, AI Systems, Cloud Infrastructure & 3D Web Applications",
    "telephone": "+201558282760",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+201558282760",
      "contactType": "customer service",
      "availableLanguage": ["Arabic", "English"]
    },
    "sameAs": [
      "https://openappo.com"
    ]
  };

  return (
    <html lang="ar" dir="rtl" className="dark scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-[#05070B] text-slate-100 antialiased cyber-grid min-h-screen selection:bg-[#00F0FF] selection:text-[#05070B]">
        {children}
      </body>
    </html>
  );
}
