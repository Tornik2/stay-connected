"use client";
import Question from "../Question/Question";
import "./Questions.css";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useProfile } from "../../context/ProfileContext";
import { filterQuestions } from "./utils.js";
import UserList from "../UserList/UserList.jsx";
// static tags
const tags = ["one", "Phyton", "Front", "Back", "This", "one", "TWO", "Front"];

export default function Questions({ questionData }) {
  const { profile, loading, error } = useProfile();
  const [questions, setQuestions] = useState("");
  const [newTags, setNewTags] = useState([]);
  const [filter, setFilter] = useState({
    user: "",
    tags: [],
    search: "",
  });
  let questionList = "";

  //initialize Questions
  useEffect(() => {
    setQuestions(questionData);
  }, [questionData]);

  // Initialize Tags
  useEffect(() => {
    const initializedTags = tags.map((tag) => ({
      tag,
      isChosen: false,
    }));
    setNewTags(initializedTags);
  }, [tags]);

  // Tags List
  const tagList = newTags.map((tag, index) => {
    const capitalizedTag = tag.tag.charAt(0).toUpperCase() + tag.tag.slice(1);
    return (
      <p
        key={index}
        onClick={() => {
          setNewTags((prevTags) =>
            prevTags.map((t, i) => {
              return i === index ? { ...t, isChosen: !t.isChosen } : t;
            })
          );
        }}
        className={`tag ${tag.isChosen ? "chosen" : ""}`}
      >
        {capitalizedTag}
      </p>
    );
  });

  // Update filter with selected tags
  useEffect(() => {
    const selectedTags = newTags
      .filter((tag) => tag.isChosen)
      .map((tag) => tag.tag);
    setFilter((prev) => ({
      ...prev,
      tags: selectedTags,
    }));
  }, [newTags]);
  //Questions List
  if (questions) {
    const filteredQuestions = filterQuestions(
      questions,
      filter,
      profile?.username
    );
    questionList = filteredQuestions.map((question, index) => {
      return (
        <Link
          className="question-link"
          key={index}
          href={`questions/${question.id}`}
        >
          <Question question={question} />
        </Link>
      );
    });
  } else {
    questionList = "";
  }

  const handleSearchChange = (e) => {
    setFilter((prev) => {
      return {
        ...prev,
        search: e.target.value,
      };
    });
  };

  return (
    <div style={{ width: "100%" }}>
      <div className="section_heading">
        <img src="/assets/go-back-arrow.svg" alt="breadcrums-arrow" />
        <h2 className="section_name">Questions</h2>
      </div>
      <div className="filter-questions">
        <div className="filter-by-author">
          <div
            style={
              filter.user !== profile?.username
                ? { backgroundColor: "#4e53a2" }
                : undefined
            }
            className="general-questions"
            onClick={() =>
              setFilter((prev) => {
                return { ...prev, user: "" };
              })
            }
          >
            General
          </div>
          <div
            style={
              filter.user === profile?.username
                ? { backgroundColor: "#4e53a2" }
                : undefined
            }
            onClick={() =>
              setFilter((prev) => {
                return { ...prev, user: profile.username };
              })
            }
            className="personal-questions"
          >
            Personal
          </div>
        </div>
        <div className="search-input">
          <input
            className="search"
            type="text"
            placeholder="Search..."
            aria-label="Search input"
            maxLength={100}
            name="search"
            onChange={handleSearchChange}
          />
        </div>
        <div className="filter-by-tags">
          <div className="tags">{tagList}</div>
        </div>
      </div>
      <div className="questions-users-wrapper">
        <div className="questions-list">
          {questionList ? questionList : "Loading"}
        </div>
        <UserList />
      </div>
    </div>
  );
}
