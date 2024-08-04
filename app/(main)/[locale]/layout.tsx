import { ModalProvider } from "@/providers/modal-provider";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { Outfit } from "next/font/google";

const outfit = Outfit({ subsets: ["latin"] });
import "../../globals.css";

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
