"use client";
import "./addQuestion.css";
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
    console.log(isFormVisible);
  };

  const toggleForm = () => {
    setIsFormVisible((prev) => !prev);
  };
  return (
    <div>
      <button className="add_question" onClick={handleSubmit}>
        <img src="/add-question.png" />
      </button>
      <form className={`Add_Question_Form ${isFormVisible && "active"}`}>
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
    </div>
  );
}
