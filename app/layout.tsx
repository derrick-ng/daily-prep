import ServiceWorkerRegister from "./components/ServiceWorkerRegister";
import "./globals.css";
import NavBar from "./NavBar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <NavBar />
        {children}
        <ServiceWorkerRegister />
      </body>
    </html>
  );
}
