import HomePage from "./page";
import Header from "./components/Header/Header";
import "./global.css";

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
        <Header />
        {children}
      </body>
    </html>
  );
}
