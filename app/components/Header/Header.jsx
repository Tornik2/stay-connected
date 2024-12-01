import Link from "next/link";
import "./Header.css";
import AddQUestion from "../addQuestion/addQuestion";

export default function Header() {
  return (
    <header className="global-padding-sides">
      <div className="container">
        <div>
          <Link href="/questions">
            <img className="logo" src="/android-chrome-192x192.png" />
          </Link>
        </div>
        <div className="header-right-side">
          <AddQUestion />
          <div className="auth_panel">
            <Link href="/login" className="nav_login">
              Log in
            </Link>
            <span>/</span>
            <Link href="/register" className="nav_login">
              Register
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
