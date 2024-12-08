"use client";
import Link from "next/link";
import { useState } from "react";
import "./register.css";
import { useRouter } from "next/navigation";

export default function Register() {
  const [message, setMessage] = useState("Message");
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const router = useRouter();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    try {
      const response = await fetch("http://164.90.165.135/api/register/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password,
          password_confirm: formData.confirmPassword,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        const token = result.tokens.access;
        document.cookie = `access_token=${token}`;
        console.log(result);
        setMessage(
          result.message || "Registration successful! And Youre Logged in"
        );
        router.push("/questions");
      } else {
        const errorData = await response.json();
        console.log(errorData);
        setMessage(errorData.message || "Registration failed. check console");
      }
    } catch (error) {
      console.error("Error submitting registration:", error);
      setMessage("An error occurred.");
    }
  };

  return (
    <div className="global-padding-sides">
      <form onSubmit={handleSubmit} className="register-form">
        <h1>Sign Up</h1>
        <div className="input-div">
          <label htmlFor="username">Username</label>
          <input
            placeholder="Username"
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-div">
          <label htmlFor="email">Email</label>
          <input
            placeholder="Email"
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-div">
          <label htmlFor="password">Enter Password</label>
          <input
            placeholder="Password"
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-div">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            placeholder="Confirm Password"
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>
        <div className="btns">
          <Link href={"/login"}>
            <button className="btn login-link">Login</button>
          </Link>
          <button type="submit" className="btn register-btn">
            Register
          </button>
        </div>
      </form>
    </div>
  );
}
