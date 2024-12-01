import HomePage from "./page";
import Header from "./components/Header/Header";
export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
