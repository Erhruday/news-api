import React, { useState, useEffect } from "react";
import "./LeftSideContent.css";

export default function LeftSideContent() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("https://hn.algolia.com/api/v1/search?tags=story&query=foo")
      .then((response) => response.json())
      .then((data) => setData(data))

      .catch((error) => console.error(error));
  }, []);
  console.log(data);

  function formatDate(dateStr) {
    const date = new Date(dateStr);
    const options = {
      month: "short",
      day: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    };
    return date.toLocaleDateString("en-US", options);
  }

  return (
    <div>
      <h1>News Titles</h1>

      {data?.hits?.map((elm, i) => {
        return (
          <div key={i} className="title-container">
            <span className="created-date">
              Created at: {formatDate(elm.created_at)}
            </span>
            <div className="title">{elm.title}</div>
            <p className="author">
              Author: {elm.author} |{" "}
              <span>
                {" "}
                <b> {elm.num_comments}</b> comments
              </span>
            </p>
          </div>
        );
      })}
    </div>
  );
}
