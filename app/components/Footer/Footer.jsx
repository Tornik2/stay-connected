import "./Footer.css";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="global-padding-sides">
      <div className="container max-width">
        <div>
          <Link href="/questions">
            <img className="logo" src="/android-chrome-192x192.png" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
