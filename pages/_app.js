import React from "react";
import "../css/main.css";
import { ThemeProvider } from "theme-ui";
import theme from "../components/theme";

export default function App({ Component, props }) {
  return (
    <ThemeProvider theme={theme}>
      <Component {...props} />
    </ThemeProvider>
  );
}
