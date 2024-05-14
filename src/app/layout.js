import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar/navbar";
import Background from "@/../public/backgrounds/background3.jpg";

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
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
          height: "100vh",
          backgroundColor: "#0A0722",
          backgroundImage: `url(${Background.src})`,
          backgroundPositionX: "100px",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
