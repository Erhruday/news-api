import React, { useEffect, useState } from "react";
import "./RightSideContent.css";

// https://hn.algolia.com/api/v1/search?tags=comment,story_28621412

export default function RightSideContent({ newsId }) {
  const [newsDescription, setNewsDescription] = useState([]);

  useEffect(() => {
    fetch(`https://hn.algolia.com/api/v1/search?tags=comment,story_${newsId}`)
      .then((response) => response.json())
      .then((data) => {
        // console.log(data?.hits, "DDADADADAD");
        setNewsDescription(data.hits);
      })

      .catch((error) => console.error(error));
  }, [newsId]);

  return (
    <div>
      <h1>News Content</h1>
      {newsDescription.map((elm, i) => {
        return (
          <div key={i} className="desc-container">
            <div dangerouslySetInnerHTML={{ __html: elm?.comment_text }}></div>;
          </div>
        );
      })}
    </div>
  );
}
