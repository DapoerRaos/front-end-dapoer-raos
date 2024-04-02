import { Providers } from "./providers";
import "./globals.css";

export const metadata = {
  title: "Dapoer Raos",
  description: "An online store for Dapoer Raos",
  category: "ecommerce",
  authors: { name: "bhanurz" },
  keywords: ["Next.js", "React", "JavaScript", "Food", "Snack"],
  creator: "Aswangga Bhanu Rizqullah",
  publisher: "Aswangga Bhanu Rizqullah",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/images/dapoer-raos-logo.png" />
      </head>
      <body suppressHydrationWarning={true}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
