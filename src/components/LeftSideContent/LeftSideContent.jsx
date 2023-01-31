import { Pagination, TextField } from "@mui/material";
import React, { useState, useEffect } from "react";
import "./LeftSideContent.css";

export default function LeftSideContent({
  setNewsObj,
  setCurrentUrl,
  setPage,
}) {
  const [data, setData] = useState([]);

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResult, setSearchResult] = useState(data?.hits);

  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    fetch("https://hn.algolia.com/api/v1/search?tags=story&query=foo")
      .then((response) => response.json())
      .then((data) => setData(data))

      .catch((error) => console.error(error));
  }, []);
  console.log(data, "DATA");

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

  const titleOnClick = (elm) => {
    setNewsObj(elm);
    // console.log(newsId, "news Id");
  };

  useEffect(() => {
    const filteredResults = data?.hits?.filter((item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setSearchResult(filteredResults);
  }, [searchQuery, data?.hits]);

  const paginationOnChange = (event, newPage) => {
    setPageNumber(newPage);
    console.log(newPage);
  };

  return (
    <div>
      <h1>News Titles</h1>

      <TextField
        fullWidth
        id="outlined-basic"
        label="Search News Headlines"
        variant="outlined"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={{ marginBottom: "20px" }}
      />

      {searchResult?.map((elm, i) => {
        return (
          <div
            key={i}
            className="title-container"
            onClick={(e) => {
              e.stopPropagation();
              setPage("contents");
              setCurrentUrl(elm.url);
            }}
          >
            <span className="created-date">
              Created at: {formatDate(elm.created_at)}
            </span>
            <div className="title">{elm.title}</div>
            <p className="author">
              Author: {elm.author} |{" "}
              <span
                onClick={(e) => {
                  e.stopPropagation();
                  setPage("comments");
                  titleOnClick(elm);
                }}
              >
                {" "}
                <b> {elm.num_comments}</b> comments
              </span>
            </p>
          </div>
        );
      })}
      <div style={{ margin: "50px 0" }}>
        <Pagination
          variant="outlined"
          count={data?.nbPages}
          page={pageNumber}
          color="secondary"
          onChange={paginationOnChange}
        />
      </div>
    </div>
  );
}
