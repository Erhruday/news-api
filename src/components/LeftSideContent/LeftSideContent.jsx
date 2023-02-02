import {
  Button,
  Dialog,
  DialogActions,
  Pagination,
  TextField,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import "./LeftSideContent.css";

export default function LeftSideContent({
  setNewsObj,
  setCurrentUrl,
  setPage,
}) {
  const useDebounce = (value, delay) => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);

      return () => {
        clearTimeout(handler);
      };
    }, [value, delay]);

    return debouncedValue;
  };

  const [data, setData] = useState([]);

  const [searchQuery, setSearchQuery] = useState("");
  // const [searchResult, setSearchResult] = useState(data?.hits);

  const [pageNumber, setPageNumber] = useState(1);

  const [open, setOpen] = useState(false);
  const [savedDataFromDB, setsavedDataFromDB] = useState(null);
  const handleClose = () => {
    setOpen(false);
  };

  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  useEffect(() => {
    fetch(
      `https://hn.algolia.com/api/v1/search?tags=story&query=${debouncedSearchQuery}&page=${pageNumber}`
    )
      .then((response) => response.json())
      .then((data) => setData(data))

      .catch((error) => console.error(error));
  }, [pageNumber, debouncedSearchQuery]);
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

  const paginationOnChange = (event, newPage) => {
    setPageNumber(newPage);
    console.log(newPage);
  };

  const saveToDBBtnOnClick = () => {
    let newsData = [];
    data?.hits?.map((elm, i) => {
      newsData.push({
        title: elm.title,
        author: elm.author,
        created_at: elm.created_at,
      });
      return console.log(elm.title, elm.author, elm.created_at);
    });

    const payload = JSON.stringify(newsData);

    fetch("https://puffy-temporal-quiet.glitch.me/post-data", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: payload,
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
  };

  const getDataBtnOnClick = () => {
    setOpen(true);

    fetch("https://puffy-temporal-quiet.glitch.me/get-data")
      .then((response) => response.json())
      .then((data) => setsavedDataFromDB(data))
      .catch((error) => console.error(error));
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

      {data?.hits?.map((elm, i) => {
        return (
          <a
            target={"_blank"}
            rel="noreferrer"
            href={elm.url}
            key={i}
            style={{ textDecoration: "none" }}
            onClick={(e) => {
              e.stopPropagation();
              setPage("contents");
              // setCurrentUrl(elm.url);
            }}
          >
            <div className="title-container">
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
                    if (e.stopPropagation) {
                      e.stopPropagation();
                      e.preventDefault();
                    }
                    e.cancelBubble = true;
                    e.returnValue = false;
                    return false;
                  }}
                  className="comments"
                >
                  {" "}
                  <b> {elm.num_comments}</b> comments
                </span>
              </p>
            </div>
          </a>
        );
      })}

      <Button variant="contained" color="success" onClick={saveToDBBtnOnClick}>
        Save to DB
      </Button>

      <Button
        sx={{ ml: 3 }}
        variant="contained"
        color="success"
        onClick={getDataBtnOnClick}
      >
        Get Data
      </Button>

      <Dialog
        maxWidth="lg"
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <div style={{ padding: "10px" }}>
          <h1>DB Data</h1>
          <div style={{ minWidth: "600px", minHeight: "200px" }}>
            {savedDataFromDB?.map((elm, i) => {
              return (
                <div
                  key={i}
                  style={{
                    backgroundColor: "rgb(234, 234, 255)",
                    marginBottom: "10px",
                    padding: "15px",
                    borderRadius: "5px",
                  }}
                >
                  <b style={{ color: "red", marginBottom: "10px" }}>
                    <u>No:{i + 1}</u>
                  </b>{" "}
                  <br />
                  <span>Author : {elm.author}</span> |&nbsp;
                  <span>Created Date: {elm.created_at}</span>
                  <h2>Title : {elm.news_title}</h2>
                </div>
              );
            })}
          </div>
        </div>
        <DialogActions>
          <Button variant="contained" autoFocus onClick={() => setOpen(false)}>
            Close
          </Button>
        </DialogActions>
      </Dialog>

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

// DATABASE_HOST=aws.connect.psdb.cloud
// DATABASE_USERNAME=93lztfp46u8mafn9aa04
// DATABASE_PASSWORD=pscale_pw_jpB3WIoDoOMSPLekZKRqyOhp5i9RLgtuK2yUg6QC7oL
