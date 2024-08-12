import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "./components/Navigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`flex ${inter.className}`}>
        <div className="w-80">
          <Navigation />
        </div>
        <div className="w-full bg-blue-200">{children}</div>
      </body>
    </html>
  );
}
