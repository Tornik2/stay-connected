import HomePage from "./page";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import "./global.css";
import { ProfileProvider } from "./context/ProfileContext";

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
          <div className="app-container">
            <Header />
            <main>{children}</main>
            <Footer />
          </div>
        </ProfileProvider>
      </body>
    </html>
  );
}
