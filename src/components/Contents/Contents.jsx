import { Grid } from "@mui/material";
import { Container } from "@mui/system";
import React, { useState } from "react";
import LeftSideContent from "../LeftSideContent/LeftSideContent";
import RightSideContent from "../RightSideContent/RightSideContent";

export default function Contents() {
  const [newsId, setNewsId] = useState(null);
  return (
    <div>
      <Container maxWidth="lg">
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <LeftSideContent setNewsId={setNewsId} />
          </Grid>
          <Grid item xs={6}>
            <RightSideContent newsId={newsId} />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
