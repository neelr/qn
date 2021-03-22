import React from "react";
import "@css/main.css";
import { ThemeProvider } from "theme-ui";
import theme from "@components/theme";
import Nav from "@components/nav";

export default function App({ Component, props }) {
  return (
    <ThemeProvider theme={theme}>
      <Nav />
      <Component {...props} />
    </ThemeProvider>
  );
}
