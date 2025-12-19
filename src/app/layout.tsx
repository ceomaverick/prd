import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PRD Generator",
  description: "Generate technical product requirement documents in minutes for solo developers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen bg-background font-sans text-foreground">
        {children}
      </body>
    </html>
  );
}
