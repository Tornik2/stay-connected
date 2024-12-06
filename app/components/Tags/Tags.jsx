"use client";
import "./Tags.css";
import { useState, useEffect } from "react";

export default function Tags({ tags, tagStyle }) {
  const [newTags, setNewTags] = useState([]);

  // Initialize tags state
  useEffect(() => {
    const initializedTags = tags.map((tag) => ({
      tag,
      isChosen: false,
    }));
    setNewTags(initializedTags);
  }, [tags]);

  // Render the tag list
  const tagList = newTags.map((tag, index) => {
    const capitalizedTag = tag.tag.charAt(0).toUpperCase() + tag.tag.slice(1);
    return (
      <p
        key={index}
        onClick={(e) => {
          setNewTags((prevTags) =>
            prevTags.map((t, i) => {
              return i === index ? { ...t, isChosen: !t.isChosen } : t;
            })
          );
        }}
        className={`tag ${tag.isChosen ? "chosen" : ""}`}
        style={tagStyle}
      >
        {capitalizedTag}
      </p>
    );
  });
  return <div className="tags">{tagList}</div>;
}
