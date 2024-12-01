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
        <AddQUestion />
      </div>
    </header>
  );
}
