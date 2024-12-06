import { Inter } from "next/font/google";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import "./global.css";
import { ProfileProvider } from "./context/ProfileContext";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  title: "Stay Connected",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ProfileProvider>
          <div className={`app-container ${inter.className}`}>
            <Header />
            <main>{children}</main>
            <Footer />
          </div>
        </ProfileProvider>
      </body>
    </html>
  );
}
