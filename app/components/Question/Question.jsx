import { useState } from "react";
import "./Question.css";
import Tags from "../Tags/Tags";

export default function Question({ question }) {
  const [isHovered, setIsHovered] = useState(false); // to change tags style while hovering

  const {
    answers,
    created_at,
    id,
    subject,
    text,
    user,
    user_id,
    votes,
    views_count,
    tag_list,
  } = question;

  const answerCount = answers.length; // Answer Count

  // Format Date Created
  const date = new Date(created_at);
  const formatedDate = date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
  });

  //Create Array of Tags to Pass to Tags Component
  const tagList = tag_list
    .map((tag) => {
      return tag.name;
    })
    .slice(0, 3);

  const tagStyle = {
    padding: "5px 10px",
    fontWeight: "500",
    fontSize: "14px",
    backgroundColor: isHovered && "#eef2ff",
    color: isHovered && "#4c4fe8",
  };

  return (
    <div className="question">
      <div className="top-third">
        <p className="question-title">{subject}</p>
        <p className="author">{user}</p>
      </div>
      <div className="middle-third">
        <p className="question-description ellipsis">{text}</p>
      </div>
      <div className="bottom-third">
        <div
          className="question-tags"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <Tags tags={tagList} tagStyle={tagStyle} />
        </div>
        <div className="answer-count-date">
          <p className="answer-count">replies: {answerCount}</p>
          <p className="date">{formatedDate}</p>
        </div>
      </div>
    </div>
  );
}
