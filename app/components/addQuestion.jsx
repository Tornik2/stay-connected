"use client";

import { useState } from "react";

export default function AddQUestion() {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [questionFormData, setQuestionFormData] = useState({
    title: "",
    body: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setQuestionFormData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // submit logic here
    toggleForm();
    console.log(questionFormData.title, questionFormData.body);
  };

  const toggleForm = () => {
    setIsFormVisible((prev) => !prev);
  };
  return (
    <>
      <button onClick={handleSubmit}>add question</button>
      <form className="Add_Question_Form">
        <input
          type="text"
          name="title"
          id="title"
          onChange={handleChange}
          value={questionFormData.title}
          required
        />
        <input
          type="text"
          name="body"
          id="body"
          onChange={handleChange}
          value={questionFormData.body}
          required
        />
      </form>
    </>
  );
}
