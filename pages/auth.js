import { useState } from "react";
import { Flex, Heading, Image, Text } from "theme-ui";
import { Section, TextArea, Column, Inp, Clicker } from "@components/semantics";

export default function Home() {
  return (
    <Section sx={{ p: 0, flex: 1, bg: "primary" }}>
      <Section>
        <Heading
          sx={{
            fontSize: [5, 6, 7],
            m: "auto",
          }}
        >
          Authorize
        </Heading>
        <Text my="10px" mx="auto" as="b">
          Verify theeselfy and expose thy truest nature!
        </Text>
        <Clicker
          sx={{
            bg: "black",
            mx: "auto",
            ":hover": {
              cursor: "pointer",
              boxShadow: "4px 4px #272838",
            },
          }}
          as="a"
          href={`https://github.com/login/oauth/authorize?client_id=${process.env.CLIENT_ID}`}
        >
          <Flex>
            <Image
              sx={{
                color: "white",
                my: "auto",
                mr: "10px",
              }}
              src="/github.svg"
            />{" "}
            Take the
            <Text
              as="span"
              sx={{
                textDecorationStyle: "wavy",
                textDecoration: "underline",
                fontStyle: "italic",
                ml: "5px",
              }}
            >
              Leap of Faith
            </Text>
          </Flex>
        </Clicker>
      </Section>
      <Flex m="auto" sx={{ flexDirection: "column" }}>
        <Image
          src="/sans.gif"
          sx={{
            m: "auto",
            borderRadius: "5px",
            boxShadow: "4px 4px #272838",
            bg: "black",
            pt: "10px",
            pl: "8px",
          }}
        />
        <Text as="i" my="10px">
          {
            [
              <>
                "You feel like you're going to have a <strong>bad time.</strong>
                "
              </>,
              <>
                "You feel your <strong>sins</strong> crawling on your back."
              </>,
              <>
                "The REAL <strong>battle</strong> finally begins."{" "}
              </>,
              <>
                "Do you wanna have <strong>bad time?</strong>"
              </>,
            ][Math.floor(Math.random() * 4)]
          }
        </Text>
      </Flex>
    </Section>
  );
}
