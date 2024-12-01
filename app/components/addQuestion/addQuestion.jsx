"use client";
import "./addQuestion.css";
import { useState } from "react";

export default function AddQUestion() {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [questionFormData, setQuestionFormData] = useState({
    title: "",
    body: "",
    tags: "",
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
      <div className={`form_container  ${isFormVisible && "active"}`}>
        <div className="add_question_header global-padding-sides">
          <button onClick={toggleForm}>
            <div className="arrow_wrapper">
              <img
                src="/go-back-arrow.png"
                alt="go back"
                className="go_back_arrow"
              />
            </div>
          </button>
          <h1 className="heading">add question</h1>
          <div></div>
        </div>
        <form className="Add_Question_Form">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            name="title"
            id="title"
            onChange={handleChange}
            value={questionFormData.title}
            required
          />
          <label htmlFor="body">Body:</label>
          <input
            type="text"
            name="body"
            id="body"
            onChange={handleChange}
            value={questionFormData.body}
            required
          />
          <label htmlFor="tag">Tags:</label>
          <input
            type="text"
            name="tag"
            id="tag"
            onChange={handleChange}
            value={questionFormData.body}
            required
          />
        </form>
      </div>
    </div>
  );
}
