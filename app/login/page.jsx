"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useProfile } from "../context/ProfileContext";
import "./login.css";
import Link from "next/link";
export default function Login() {
  const { fetchProfile, profile } = useProfile();
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
      } else {
        setLoading(false);
        const errorData = await response.json();
        console.log(errorData.error);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (profile) {
      window.location.href = "/questions";
    }
  }, [profile]);

  return (
    <>
      <div className="global-padding-sides">
        <div className="container max-width">
          {loading ? (
            <>LOADING</>
          ) : (
            <>
              <form onSubmit={handleSubmit} className="login-form">
                <h1> Log in</h1>
                <div className="input-div">
                  <label htmlFor="email">Email</label>
                  <input
                    placeholder="Enter Your Email"
                    type="text"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="input-div">
                  <div className="password-labels">
                    <label htmlFor="password">Password</label>
                    <label>
                      <p className="forgot-password">Forgot Password ?</p>
                    </label>
                  </div>
                  <input
                    className="password"
                    placeholder="••••••••"
                    type="password"
                    name="password"
                    id="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="btns">
                  <button type="submit" className="btn login-btn">
                    Login
                  </button>
                  <Link href={"/register"}>
                    <button className="btn register-link">Register</button>
                  </Link>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </>
  );
}
