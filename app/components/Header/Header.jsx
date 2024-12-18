"use client";

import Link from "next/link";
import "./Header.css";
import { useProfile } from "../../context/ProfileContext";
import LogoutBtn from "../LogoutBtn/LogoutBtn";

export default function Header() {
  const { profile, loading, error } = useProfile();
  return (
    <header className="global-padding-sides">
      <div className="container max-width">
        <div>
          <Link href="/questions">
            <img className="logo" src="/android-chrome-192x192.png" />
          </Link>
        </div>
        <div className="header-right-side">
          {
            <Link href={"/addNewQuestion"} className="nav_login">
              Add New Question
            </Link>
          }
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
            <LogoutBtn />
          )}
        </div>
      </div>
    </header>
  );
}
