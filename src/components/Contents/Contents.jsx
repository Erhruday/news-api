import { Grid } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
import LeftSideContent from "../LeftSideContent/LeftSideContent";

export default function Contents() {
  return (
    <div>
      <Container maxWidth="lg">
        <Grid container>
          <Grid item xs={6}>
            <LeftSideContent />
          </Grid>
          <Grid item xs={6}>
            Right
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
