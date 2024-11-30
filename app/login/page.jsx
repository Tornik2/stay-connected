"use client"
import { useState } from "react";

export default function Register () {
    const [message, setMessage] = useState('Log in')
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    const handleChange = (e)=> {
        const {name, value} = e.target
        setFormData(prev => {
            return {...prev, [name]: value}
        })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("https://h5ck35.pythonanywhere.com/api/token/", {
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
                const result = await response.json();

                console.log(result)
                document.cookie = `access_token=${result.access}`
              }
        } catch (error) {
            console.log(error)
        }
    }
    return (<>
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
    </>)
}