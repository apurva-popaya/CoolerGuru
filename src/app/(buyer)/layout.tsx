import type { ReactNode } from "react";

import { BuyerFooter } from "@/components/buyer/layout/buyer-footer";
import { BuyerNavbar } from "@/components/buyer/layout/buyer-navbar";
import { FavoritesProvider } from "@/context/favorites-context";

export default function BuyerLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <FavoritesProvider>
      <div className="flex min-h-screen flex-col bg-white">
        <BuyerNavbar />

        <main className="flex-1">{children}</main>

        <BuyerFooter />
      </div>
    </FavoritesProvider>
  );
}
