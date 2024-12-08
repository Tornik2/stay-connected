"use client";
import { useState, useEffect } from "react";
export default function UserList() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch("/api/users");
      const users = await response.json();
      setUsers(users);
    };
    fetchUsers();
  }, []);
  let userList;
  if (users) {
    const sortedUsers = users.sort((a, b) => {
      return a.score - b.score;
    });
    userList = sortedUsers.map((user) => {
      return "";
    });
  }

  return <div></div>;
}
