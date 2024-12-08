"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import "./question.css";
export default function QuestionPage({ question }) {
  const [token, setToken] = useState("");
  const [answerText, setAnswerText] = useState("");
  const [fetchedAnswers, setFetchedAnswers] = useState(question.answers);
  const [users, setUsers] = useState([]);
  // get user list to get user avatar in answers
  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch("/api/users");
      const fetchedUsers = await response.json();
      setUsers(fetchedUsers);
    };
    fetchUsers();
  }, []);

  //get cookie from server side
  useEffect(() => {
    const fetchCookie = async () => {
      try {
        const response = await fetch("/api/cookies");
        if (response.ok) {
          const result = await response.json();
          const { accessToken } = result;
          setToken(accessToken);
        }
      } catch (error) {
        console.error("Error fetching cookie:", err);
      }
    };
    fetchCookie();
  }, []);
  const {
    id,
    answers,
    subject,
    text,
    user,
    user_id,
    created_at,
    views_count,
    votes,
  } = question;

  const date = new Date(created_at);
  const formatedDate = date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
  });

  //to display answers
  let answersList;
  if (fetchedAnswers.length > 0) {
    answersList = fetchedAnswers.map((answer, index) => {
      const { user, text, id, created_at } = answer;
      const date = new Date(created_at);
      const formatedDate = date.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "numeric",
        year: "numeric",
      });
      // to find an author of the answer
      const answerer = users.find((u) => {
        return u.username === answer.user;
      });
      // users Profile Picture if it has one
      const profilePic = answerer?.profile_picture
        ? answerer.profile_picture
        : "/assets/profile-pic.jpg";

      return (
        <div key={index}>
          <div className="answer-info-wrapper">
            <img className="profile-picture" src={profilePic} />
            <div className="answer-info">
              <p className="answer-user">{user}</p>
              <p className="answer-date">{formatedDate}</p>
            </div>
          </div>
          <p className="single-answer">{text}</p>
        </div>
      );
    });
  }
  const handleAnswerSubmit = async () => {
    if (!answerText) {
      return;
    }
    try {
      const response = await fetch("http://164.90.165.135/api/answers/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ question: id, text: answerText }),
      });
      if (!response.ok) {
        console.log("Failed to post answer");
      }
      const result = await response.json();
      setAnswerText("");
      setFetchedAnswers((prev) => [result, ...prev]);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="question-page global-padding-sides">
      <div className="max-width">
        <div className="section-heading">
          <Link className="go-back-link" href={"/questions"}>
            <svg
              className="go-back-arrow"
              data-v-562b0aec=""
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="rgb(0, 0, 0)"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                data-v-562b0aec=""
                d="M9.7987 2.86675L14.4654 7.53341C14.732 7.80008 14.732 8.20008 14.4654 8.46675L9.7987 13.1334C9.53203 13.4001 9.13203 13.4001 8.86537 13.1334C8.5987 12.8667 8.5987 12.4667 8.86537 12.2001L12.3987 8.66675H1.9987C1.5987 8.66675 1.33203 8.40008 1.33203 8.00008C1.33203 7.60008 1.5987 7.33341 1.9987 7.33341H12.3987L8.86537 3.80008C8.73203 3.66675 8.66536 3.53341 8.66536 3.33341C8.66536 3.13341 8.73203 3.00008 8.86537 2.86675C9.13203 2.60008 9.53203 2.60008 9.7987 2.86675Z"
              ></path>
            </svg>
            <p>Back To Questions</p>
          </Link>
        </div>
        <div className="question-container">
          <div className="question-heading">
            <h2 className="question-title">{subject}</h2>
            <div className="question-details">
              <p className="likes">Likes: {votes}</p>/
              <p className="author">{user}</p>/
              <p className="created-at">{formatedDate}</p>
            </div>
          </div>
          <div className="question-description">{text}</div>
        </div>
        <div className="add-answer">
          <textarea
            className="answer-textarea"
            type="text"
            placeholder="Write Your Answer..."
            value={answerText}
            onChange={(e) => {
              setAnswerText(e.target.value);
            }}
          ></textarea>
          <button
            disabled={answerText ? false : true}
            className="add-answer-btn"
            onClick={handleAnswerSubmit}
          >
            Send
          </button>
        </div>
        <div className="answers">
          <h2 className="heading">Answers</h2>
          <div className="answers-list">{answersList}</div>
        </div>
      </div>
    </div>
  );
}
