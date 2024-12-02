"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useProfile } from "../context/ProfileContext";
export default function Register() {
  const { fetchProfile } = useProfile();
  const [message, setMessage] = useState("Log in");
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
        fetchProfile();
        router.push("/questions");
      } else {
        const errorData = await response.json();
        console.log(errorData.detail);
        setMessage(errorData.detail);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {message}
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
  );
}
