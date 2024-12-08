"use client";
import "./UserList.css";
import { useState, useEffect } from "react";

export default function UserList() {
  const [windowWidth, setWindowWidth] = useState(0);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch("/api/users");
      const fetchedUsers = await response.json();
      setUsers(fetchedUsers);
    };
    fetchUsers();
  }, []);
  let userList;
  if (users) {
    let sortedUsers = users.sort((a, b) => {
      return a.score - b.score;
    });
    if (windowWidth < 800) {
      sortedUsers = sortedUsers.slice(0, 3);
    }
    userList = sortedUsers.map((user, index) => {
      const { username, email, profile_picture, score } = user;
      const profilePic = profile_picture
        ? profile_picture
        : "/assets/profile-pic.jpg";
      return (
        <div className="user-info-wrapper" key={index}>
          <div className="avatar-div">
            <p className="leaderboard-place">{index + 1}.</p>
            <img className="profile-picture" src={profilePic} />
          </div>
          <div className="user-details">
            <p className="username">Username: {username}</p>
            <p className="score">Score: {score}</p>
          </div>
        </div>
      );
    });
  }

  return (
    <div className="leaderboard-wrapper">
      <h2>Leaderboard</h2>
      <div className="leaderboard-list">{userList}</div>
    </div>
  );
}
