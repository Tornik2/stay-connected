import Link from "next/link";
import { useProfile } from "../../context/ProfileContext";
export default function LogoutBtn() {
  const { logout } = useProfile();

  const logOut = async () => {
    try {
      await fetch("/api/logout");
      logout();
    } catch (error) {}
  };
  return (
    <button onClick={logOut}>
      <Link href="/login" className="nav_login">
        Log out
      </Link>
    </button>
  );
}
