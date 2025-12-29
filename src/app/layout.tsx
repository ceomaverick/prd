import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SpeckAI",
  description: "Generate technical specs in seconds with AI",
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
