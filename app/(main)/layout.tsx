import { Metadata } from "next";
import React from "react";

import "../globals.css";

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

function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <main>
      <div>{children}</div>
    </main>
  );
}

export default MainLayout;
