import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Hijos del Océano",
  description: "Base viva de marca para Hijos del Océano.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
