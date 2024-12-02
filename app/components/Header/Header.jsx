"use client";

import Link from "next/link";
import "./Header.css";
import AddQUestion from "../addQuestion/addQuestion";
import { useProfile } from "../../context/ProfileContext";

export default function Header() {
  const { profile, loading, error } = useProfile();

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
          {!profile ? (
            <div className="auth_panel">
              <Link href="/login" className="nav_login">
                Log in
              </Link>
              <span>/</span>
              <Link href="/register" className="nav_register">
                Register
              </Link>
            </div>
          ) : (
            <Link href="/login" className="nav_login">
              Log out
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
