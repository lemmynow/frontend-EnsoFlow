import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/lib/providers";
import { MockModeIndicator } from "@/components/MockModeIndicator";

export const metadata: Metadata = {
  title: "EnsoFlow - Visual PaaS Platform",
  description: "Build and deploy applications with a visual drag-and-drop interface",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <Providers>
          {children}
          <MockModeIndicator />
        </Providers>
      </body>
    </html>
  );
}
