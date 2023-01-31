import { Grid } from "@mui/material";
import { Container } from "@mui/system";
import React, { useState } from "react";
import LeftSideContent from "../LeftSideContent/LeftSideContent";
import RightSideContent from "../RightSideContent/RightSideContent";

export default function Contents() {
  const [newsObj, setNewsObj] = useState(null);
  const [currentUrl, setCurrentUrl] = useState(null);
  const [page, setPage] = useState("");
  return (
    <div>
      <Container maxWidth="lg">
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <LeftSideContent
              setNewsObj={setNewsObj}
              setCurrentUrl={setCurrentUrl}
              setPage={setPage}
            />
          </Grid>
          <Grid item xs={6}>
            <RightSideContent
              newsObj={newsObj}
              currentUrl={currentUrl}
              page={page}
            />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
