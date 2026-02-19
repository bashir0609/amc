import type { Metadata } from "next";
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
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
