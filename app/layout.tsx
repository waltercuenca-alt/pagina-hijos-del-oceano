import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Hijos del Océano",
  description:
    "Movimiento oceánico, bitácora emocional y experiencia editorial premium conectada con el mar.",
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
