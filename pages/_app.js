import React from "react";
import "../css/main.css";
import { ThemeProvider } from "theme-ui";
import theme from "../components/theme";

export default ({ Component, props }) => (
  <ThemeProvider theme={theme}>
    <Component {...props} />
  </ThemeProvider>
);
