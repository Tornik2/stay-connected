"use client";
import { useState, useEffect } from "react";
import Question from "./Question";

export default function Questions({ questionData }) {
  const [questions, setQuestions] = useState(questionData);

  const questionList = questions.map((question, index) => {
    return <Question key={index} body={question.body} />;
  });

  return <>{questionList}</>;
}
