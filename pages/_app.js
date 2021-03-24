import React from "react";
import "@css/main.css";
import { ThemeProvider } from "theme-ui";
import theme from "@components/theme";
import Nav from "@components/nav";
import { Section } from "@components/semantics";
import { useRouter } from "next/router";

function App({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <Section
        sx={{
          p: 0,
          overflowX: "hidden",
          width: "100vw",
          minHeight: "100vh",
        }}
      >
        <Nav />
        <Component {...pageProps} />
      </Section>
    </ThemeProvider>
  );
}

export default App;
