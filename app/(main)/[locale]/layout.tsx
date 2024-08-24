import { ModalProvider } from "@/providers/modal-provider";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { Outfit } from "next/font/google";
import { Metadata } from "next";
import "../../globals.css";

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

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body style={outfit.style}>
        <NextIntlClientProvider messages={messages}>
          <ModalProvider />
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
