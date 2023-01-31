import React, { useEffect, useState } from "react";
import "./RightSideContent.css";

export default function RightSideContent({ newsObj, currentUrl, page }) {
  const [newsDescription, setNewsDescription] = useState([]);

  useEffect(() => {
    fetch(
      `https://hn.algolia.com/api/v1/search?tags=comment,story_${newsObj?.objectID}`
    )
      .then((response) => response.json())
      .then((data) => {
        setNewsDescription(data.hits);
      })

      .catch((error) => console.error(error));
  }, [newsObj?.objectID]);

  return (
    <div>
      {/* new content page */}

      {page === "contents" && (
        <>
          <h1>News Content</h1>
          {currentUrl && (
            <iframe
              src={`${currentUrl}`}
              // name="iframe_a"
              height="1000px"
              width="100%"
              title="Iframe"
              style={{ border: "none" }}
            ></iframe>
          )}
        </>
      )}

      {/* comments page */}
      {page === "comments" && (
        <>
          <h1>News Comments</h1>
          <div className="wrapper">
            {newsDescription.map((elm, i) => {
              return (
                <div key={i} className="desc-container">
                  <div
                    dangerouslySetInnerHTML={{ __html: elm?.comment_text }}
                  ></div>
                  ;
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
