"use client";
import "./Tags.css";
import { useState, useEffect } from "react";

export default function Tags({ tags }) {
  const [newTags, setNewTags] = useState([]);
  useEffect(() => {
    setNewTags(tags);
  }, [tags]);
  let tagList;
  if (tags.length !== 0) {
    tagList = newTags.map((tag, index) => {
      const capitalizedTag = tag.charAt(0).toUpperCase() + tag.slice(1);
      return (
        <p key={index} className="tag">
          {capitalizedTag}
        </p>
      );
    });
  }
  return (
    <>
      <div className="tags">{tags.length > 0 && tagList}</div>
    </>
  );
}
