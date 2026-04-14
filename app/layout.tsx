import type { Metadata } from "next";
import { ThemeProvider } from "@/providers/theme.provider";
import { DM_Sans } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

const font = DM_Sans({
  variable: "--font-DM_Sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Fuzzie",
  description: "Automate Your Work with Fuzzie",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
    >
      <html
        lang="en"
        suppressHydrationWarning
        className={`${font.variable} ${font.variable} h-full antialiased`}
      >
        <body className="min-h-full flex flex-col">
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
