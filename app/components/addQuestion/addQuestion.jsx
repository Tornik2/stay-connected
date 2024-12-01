"use client";
import "./addQuestion.css";
import { add } from "./utils";
import { useState, useEffect } from "react";

export default function AddQUestion() {
  const [token, setToken] = useState("");
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [questionFormData, setQuestionFormData] = useState({
    subject: "",
    text: "",
    tags: { name: "Front-End", name: "Back-End" },
  });

  useEffect(() => {
    const storedToken = localStorage.getItem("access_token");
    setToken(storedToken);
  }, []);
  const url = "http://7051-138-199-7-236.ngrok-free.app/api/questions/";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setQuestionFormData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  /////droebit accestokeni ase
  const handleSubmit = (e) => {
    e.preventDefault();
    // submit logic here
    add(url, token, questionFormData);

    console.log(isFormVisible);
  };

  const toggleForm = () => {
    setIsFormVisible((prev) => !prev);
  };
  return (
    <div>
      <button className="add_question" onClick={() => toggleForm()}>
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
          <label htmlFor="subject">subject:</label>
          <input
            type="text"
            name="subject"
            id="subject"
            onChange={handleChange}
            value={questionFormData.subject}
            required
          />
          <label htmlFor="text">subject:</label>
          <input
            type="text"
            name="text"
            id="text"
            onChange={handleChange}
            value={questionFormData.text}
            required
          />
          <label htmlFor="tag">Tags:</label>
          <input
            type="text"
            name="tag"
            id="tag"
            onChange={handleChange}
            value={questionFormData.tags}
            required
          />
          <button onClick={handleSubmit}>ADd</button>
        </form>
      </div>
    </div>
  );
}
