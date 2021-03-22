import { useState } from "react";
import { Flex, Heading } from "theme-ui";
import { Section, TextArea, Column, Inp, Clicker } from "@components/semantics";

export default function Home() {
  const Meeting = ({ name, date, notes, ...props }) => {
    return (
      <Column
        sx={{
          borderRadius: "5px",
          bg: "muted",
          p: "10px",
          my: "5px",
          mx: "10px",
        }}
        {...props}
      >
        <Flex
          onClick={() => {
            console.log(meetings);
            meetings.shift();
            addMeet(meetings);
            console.log(meetings);
          }}
          sx={{
            transition: "all 0.3s",
            width: 0,
            bg: "primary",
            p: "10px",
            ml: "auto",
            ":hover": {
              bg: "red",
              cursor: "pointer",
            },
          }}
        />
        <Heading>{name}</Heading>
        <Heading sx={{ fontSize: 2 }}>{date}</Heading>
        <Heading>Meeting Notes</Heading>
        <TextArea
          sx={{
            bg: "white",
            width: "94%",
            minHeight: "150px",
            m: "5px",
          }}
        >
          {notes.split("\n").map((v) => (
            <>
              {v}
              <br />
            </>
          ))}
        </TextArea>
        <Heading>Person Notes</Heading>
        <TextArea
          sx={{
            bg: "white",
            width: "94%",
            minHeight: "150px",
            m: "5px",
          }}
        >
          {notes.split("\n").map((v) => (
            <>
              {v}
              <br />
            </>
          ))}
        </TextArea>
        <Clicker bg="secondary" mx="auto" my="10px">
          Done!
        </Clicker>
      </Column>
    );
  };
  const [meetings, addMeet] = useState([
    <Meeting
      name="Neel Redkar"
      date="09-09-09"
      notes={`James Logan High School	CA/US	Bhasin & Menotti Punishment
      James Logan High School	CA/US	Shaikh & Rawat  PredPol
      Sonoma Academy	CA/	Jannes & Stewart Green Criminology
      Lowell High School	CA/	Satovsky & Tsan DNA
      James Logan High School	CA/US	Hui & Ayyala Pretexualw`}
    />,
    <Meeting
      name="Neel Redkar"
      date="09-09-09"
      notes={`James Logan High School	CA/US	Bhasin & Menotti Punishment
      James Logan High School	CA/US	Shaikh & Rawat  PredPol
      Sonoma Academy	CA/	Jannes & Stewart Green Criminology
      Lowell High School	CA/	Satovsky & Tsan DNA
      James Logan High School	CA/US	Hui & Ayyala Pretexualw`}
    />,
    <Meeting
      name="Neel Redkar"
      date="09-09-09"
      notes={`James Logan High School	CA/US	Bhasin & Menotti Punishment
    James Logan High School	CA/US	Shaikh & Rawat  PredPol
    Sonoma Academy	CA/	Jannes & Stewart Green Criminology
    Lowell High School	CA/	Satovsky & Tsan DNA
    James Logan High School	CA/US	Hui & Ayyala Pretexualw`}
    />,
  ]);
  return (
    <Section sx={{ p: 0 }}>
      <Section
        sx={{
          bg: "primary",
        }}
      >
        <Heading
          sx={{
            fontSize: [4, 5, 6],
            m: "auto",
            my: "10px",
          }}
        >
          Upcoming
        </Heading>
        <Inp mx="auto" placeholder="Search..." />
      </Section>
      <Section>{meetings}</Section>
    </Section>
  );
}
