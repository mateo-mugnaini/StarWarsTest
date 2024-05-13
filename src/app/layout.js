import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar/navbar";
import Background from "@/../public/backgrounds/background1.jpg";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Star Wars",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body
        className={inter.className}
        style={{
          backgroundImage: `url(${Background.src})`,
        }}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
