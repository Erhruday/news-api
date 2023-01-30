import { Container } from "@mui/system";
import React from "react";
import "./Header.css";

export default function Header() {
  return (
    <div className="header-wrapper">
      <Container maxWidth="lg" className="header-container">
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>News Api </div>
          <div>📰</div>
        </div>
      </Container>
    </div>
  );
}
