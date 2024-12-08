import Link from "next/link";
export default function NotFound() {
  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h1 style={{ fontSize: "3rem", color: "red" }}>Page Not Found</h1>
      <Link
        href="/questions"
        style={{
          maxWidth: "300px",
          display: "block",
          padding: "10px 20px",
          margin: "30px auto 0",
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
