import { useState } from "react";
import { Flex, Heading } from "theme-ui";
import { Section, TextArea, Column, Inp, Clicker } from "@components/semantics";

export default function Home() {
  const [meetings, addMeet] = useState([]);

  const Meeting = ({ props }) => {
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
        <Heading>Name</Heading>
        <Inp bg="white" placeholder="Check In 1" />
        <Heading>Date</Heading>
        <Inp bg="white" type="date" placeholder="03/02/2005" />
        <Heading>Meeting Notes</Heading>
        <TextArea
          sx={{
            bg: "white",
            width: "94%",
            minHeight: "150px",
            m: "5px",
          }}
        />
      </Column>
    );
  };
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
          }}
        >
          Contacts
        </Heading>
        <Inp mx="auto" placeholder="Search..." />
      </Section>
      <Section>
        <Flex
          sx={{
            flexWrap: "wrap",
            mx: ["auto", "10vw", "10vw"],
            alignItems: "stretch",
          }}
        >
          <Column sx={{ flex: [null, null, 1] }} my="10px">
            <Heading mx="10px">Person</Heading>
            <Inp placeholder="John Doe" />
            <Heading mx="10px">Person Notes</Heading>
            <TextArea
              sx={{
                width: "300px",
                minHeight: "50px",
                m: "5px",
              }}
            />
            <Heading mx="10px">Email</Heading>
            <Inp type="email" placeholder="johndoe@neelr.dev" />
            <Heading mx="10px">Phone</Heading>
            <Inp placeholder="+1 (925)-448-5457" />
          </Column>
          <Column sx={{ flex: [null, null, 1] }} my="10px">
            {meetings}
            <Clicker onClick={() => addMeet([...meetings, <Meeting />])}>
              Add Meeting
            </Clicker>
          </Column>
        </Flex>
        <Clicker my="10px" mx="auto">
          Add Person
        </Clicker>
      </Section>
    </Section>
  );
}
