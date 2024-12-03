"use client";

import "./addQuestion.css";
import { add } from "./utils";
import Tags from "../Tags/Tags";
import { useState, useEffect } from "react";

export default function AddQUestion() {
  const [token, setToken] = useState("");
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [tags, setTags] = useState([]);
  const [questionFormData, setQuestionFormData] = useState({
    subject: "",
    text: "",
    tag: "",
  });
  useEffect(() => {
    //get cookie from server side
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
  const url = "https://h5ck35.pythonanywhere.com/api/questions/";

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

    const questionData = { ...questionFormData, tags };
    setQuestionFormData({
      subject: "",
      text: "",
      tag: "",
    });
    add(url, token, questionData);
  };

  const toggleForm = () => {
    setIsFormVisible((prev) => !prev);
  };
  return (
    <div className="">
      <button className="add_question" onClick={() => toggleForm()}>
        <img src="/add-question.png" />
      </button>
      <div className={`form_container ${isFormVisible && "active"}`}>
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
          <div style={{ width: "30px" }}></div>
        </div>
        <form className="Add_Question_Form global-padding-sides">
          <div className="form-input">
            <label htmlFor="subject">Question Title:</label>
            <input
              type="text"
              name="subject"
              id="subject"
              onChange={handleChange}
              value={questionFormData.subject}
              required
            />
          </div>
          <div className="form-input">
            <label htmlFor="text">Question Description:</label>
            <textarea
              id="text"
              name="text"
              rows="5"
              placeholder="Type your question here..."
              value={questionFormData.text}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          <div className="form-input">
            <label htmlFor="tag">Tags:</label>
            <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
              <Tags tags={tags} />
              <div className="add-tag-input">
                <input
                  type="text"
                  name="tag"
                  id="tag"
                  onChange={handleChange}
                  value={questionFormData.tag}
                  required
                />
                <p
                  className="cta-add-tag"
                  onClick={() => {
                    setTags((prev) => {
                      console.log(tags);
                      return [...prev, questionFormData.tag];
                    });
                    setQuestionFormData((prev) => {
                      return { ...prev, tag: "" };
                    });
                  }}
                >
                  +
                </p>
              </div>
            </div>
          </div>
          <button className="create-question-btn" onClick={handleSubmit}>
            Create Question
          </button>
        </form>
      </div>
    </div>
  );
}
