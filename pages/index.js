import { useState } from "react";
import { Flex, Heading, Text, Image } from "theme-ui";
import { Section, TextArea, Column, Inp, Clicker } from "@components/semantics";
import { getServerSideProps } from "@utils/authServer";

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
        <Flex mx="auto">
          <Clicker bg="muted" color="text" mx="5px" my="10px">
            Save
          </Clicker>
          <Clicker bg="secondary" mx="5px" my="10px">
            Done!
          </Clicker>
        </Flex>
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
          p: 0,
          pb: "10px",
        }}
      >
        <Heading
          sx={{
            fontSize: [6, 7, 8],
            m: "auto",
          }}
        >
          qn
        </Heading>
        <Text my="10px" mx="auto" as="b">
          Meetings, Calendar, Contacts.
        </Text>
        <Flex mx="auto">
          <Inp mx="5px" placeholder="Search..." />
          <Clicker
            sx={{
              py: 0,
            }}
            mx="5px"
            bg="secondary"
          >
            <Flex>
              <Image m="auto" src="/arrow.svg" />
            </Flex>
          </Clicker>
        </Flex>
      </Section>
      <Flex
        sx={{
          backgroundImage: "url('/wave.svg')",
          height: "150px",
          backgroundSize: "cover",
          width: "100vw",
        }}
      />
      <Section>{meetings}</Section>
    </Section>
  );
}
export { getServerSideProps };
