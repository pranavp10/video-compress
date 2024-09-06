import { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "~/components/Navbar";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const viewport: Viewport = {
  themeColor: "#616161",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_URL!),
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/en-US",
    },
  },
  title:
    "Compress & Convert Videos Like a Pro - Free, High-Quality offline Tool",
  description:
    "Say goodbye to bulky video files! Compress and convert videos effortlessly with our free offline tool. Enjoy high-quality results without sacrificing clarity, perfect for sharing, uploading, or editing. Convert like a pro, for free!",
  keywords: [
    "Free Video Compressor",
    "Online Video Converter",
    "Video Compression Tool",
    "Image Compression Tool",
    "Compress Video Online",
    "Convert Video Online",
    "High-Quality Video Compression",
    "Shrink Video File Size",
  ],
  robots: "index, follow",
  openGraph: {
    title:
      "Compress & Convert Videos Like a Pro - Free, High-Quality Online Tool",
    description:
      "Say goodbye to bulky video files! Compress and convert videos effortlessly with our free offline tool. Enjoy high-quality results without sacrificing clarity, perfect for sharing, uploading, or editing. Convert like a pro, for free!",
    url: process.env.NEXT_PUBLIC_URL,
    type: "website",
    images: "/og-image.jpg",
    siteName: "Video Compression Hub",
  },
  twitter: {
    card: "summary_large_image",
    site: "@ThatsPranav",
    creator: "@ThatsPranav",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#616161" />
        <meta name="msapplication-TileColor" content="#616161" />
        <meta name="theme-color" content="#616161" />
      </head>
      <body
        className={`bg-gray-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] h-full w-full ${inter.className}`}
      >
        <div className="fixed w-full h-full top-0 bg-[radial-gradient(100%_50%_at_50%_0%,rgba(0,163,255,0.13)_0,rgba(0,163,255,0)_50%,rgba(0,163,255,0)_100%)]" />
        <div className="relative">
          <Navbar />
          {children}
        </div>
        <Toaster />
      </body>
    </html>
  );
}
