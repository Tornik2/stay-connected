"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useProfile } from "../context/ProfileContext";

export default function Login() {
  const { fetchProfile, profile } = useProfile();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  //Submit
  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const response = await fetch("/api/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });
      if (response.ok) {
        await fetchProfile();
        router.push("/questions");
      } else {
        setLoading(false);
        const errorData = await response.json();
        console.log(errorData.error);
        setMessage(errorData.error + ", Wrong Credentials ");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="global-padding-sides">
        <div className="container max-width">
          {loading ? (
            <>LOADING</>
          ) : (
            <>
              <div style={{ color: "red" }}>{message}</div>
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <button type="submit">Login</button>
              </form>
            </>
          )}
        </div>
      </div>
    </>
  );
}
