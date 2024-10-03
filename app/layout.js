import { Nunito } from "next/font/google";

export const nunito = Nunito({ subsets: ["latin"] });
import "./ui/globals.css";
export const metadata = {
  title: "List animation",
  description: "List animation when adding or deleting or updating",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={nunito.className}>{children}</body>
    </html>
  );
}
