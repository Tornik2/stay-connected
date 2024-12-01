"use client";
import { useState } from "react";

export default function Register() {
  const [message, setMessage] = useState("Message");
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
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
      const response = await fetch(
        "https://h5ck35.pythonanywhere.com/api/register/",
        {
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
        }
      );

      if (response.ok) {
        const result = await response.json();
        const token = result.tokens.access;
        document.cookie = `access_token=${token}`;
        console.log(result);
        setMessage(
          result.message || "Registration successful! And Youre Logged in"
        );
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
    <>
      <>{message}</>
      <br />
      <br />
      <br />
      <br />
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </>
  );
}
