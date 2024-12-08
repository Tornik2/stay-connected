import Link from "next/link";
export default function NotFound() {
  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h1 style={{ fontSize: "3rem", color: "red" }}>Oops! Page Not Found</h1>
      <Link
        href="/questions"
        style={{
          display: "block",
          padding: "10px 20px",
          marginTop: "30px",
          backgroundColor: "blue",
          color: "white",
          borderRadius: "5px",
          textDecoration: "none",
        }}
      >
        Back to Home
      </Link>
    </div>
  );
}
