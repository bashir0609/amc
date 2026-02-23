import type { Metadata } from "next";
import Script from "next/script";
import JsonLd from "@/components/JsonLd";
import "./globals.css";

export const metadata: Metadata = {
  title: "Auto MOT Centre | Car Garage Service in Manor Park, London",
  description: "Auto MOT Centre Ltd is a family owned well established independent garage in Manor Park, London. We do all types of MOT for vehicles up to class 4, servicing, and repairs at competitive prices.",
  keywords: "MOT, car service, garage, Manor Park, London, vehicle servicing, car repairs, MOT testing",
  authors: [{ name: "Auto MOT Centre" }],
  openGraph: {
    title: "Auto MOT Centre | Car Garage Service in Manor Park",
    description: "Family owned independent garage offering MOT testing, servicing, and repairs in Manor Park, London.",
    type: "website",
    locale: "en_GB",
  },
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "AutoRepair",
    "name": "Auto MOT Centre Ltd",
    "image": "https://automotcentre.com/favicon.png", // Assuming favicon serves as a basic logo
    "@id": "https://automotcentre.com",
    "url": "https://automotcentre.com",
    "telephone": "+4402085539112",
    "priceRange": "££",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "4 Rectory Rd",
      "addressLocality": "London",
      "postalCode": "E12 6JA",
      "addressCountry": "UK"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 51.54642890785191,
      "longitude": 0.055298276320609185
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday"
        ],
        "opens": "09:00",
        "closes": "18:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": "Sunday",
        "opens": "10:00",
        "closes": "16:00"
      }
    ]
  };

  return (
    <html lang="en" data-scroll-behavior="smooth">
      <head>
        <JsonLd data={localBusinessSchema} />
      </head>
      <body className="antialiased">
        {children}
        
        {/* Start of HubSpot Embed Code */}
        <Script
          id="hs-script-loader"
          strategy="lazyOnload"
          src="//js-eu1.hs-scripts.com/147845093.js"
        />
        {/* End of HubSpot Embed Code */}
      </body>
    </html>
  );
}
