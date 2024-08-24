import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { QClientProvider } from "@/providers/QueryClientProvider";
import { Toaster } from "sonner";

const outfit = Outfit({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Gallilou Immobilier",
  description: "Discover Your Dream Home",
  icons: [
    {
      url: "/logo.png",
      href: "/logo.png",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={outfit.className}>
          <QClientProvider>
            {children}
            <Toaster richColors />
          </QClientProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
