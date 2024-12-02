"use client";
import { useState, useEffect } from "react";
import Question from "../Question/Question";
import AddQUestion from "../addQuestion/addQuestion";
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
      return <Question key={index} body={question.text} id={question.id} />;
    });
  } else {
    questionList = "";
  }

  return (
    <>
      <div className="padding-global-sides">
        {questionList ? questionList : "Loading"}
      </div>
    </>
  );
}
