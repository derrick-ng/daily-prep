import { Toaster } from "sonner";
import "./globals.css";
import NavBar from "./NavBar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body>
        <NavBar />
        {children}
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
