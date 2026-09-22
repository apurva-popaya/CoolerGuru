import type { ReactNode } from "react";

export default function AdminAuthLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return <>{children}</>;
}
