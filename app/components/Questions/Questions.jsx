"use client";
import Question from "../Question/Question";
import "./Questions.css";
import { useState, useEffect } from "react";
import { useProfile } from "../../context/ProfileContext";

export default function Questions({ questionData }) {
  const { profile, loading, error } = useProfile();
  const [questions, setQuestions] = useState("");
  let questionList = "";
  useEffect(() => {
    setQuestions(questionData);
  }, [questionData]);

  if (questions) {
    questionList = questions.map((question, index) => {
      return <Question key={index} question={question} />;
    });
  } else {
    questionList = "";
  }

  return (
    <div style={{ width: "100%" }}>
      <div className="section_heading">
        <img src="/assets/go-back-arrow.svg" alt="breadcrums-arrow" />
        <h2 className="section_name">Questions</h2>
      </div>
      <div className="filter-questions">
        <div className="filter-by-author">
          <div className="general-questions">General</div>
          <div className="personal-questions">Personal</div>
        </div>
        <div className="search-input">
          <input
            className="search"
            type="text"
            placeholder="Search..."
            aria-label="Search input"
            maxLength={100}
            name="search"
          />
        </div>
        <div className="filter-by-tags">{"tags here"}</div>
      </div>
      <div className="questions-list">
        {questionList ? questionList : "Loading"}
      </div>
    </div>
  );
}
