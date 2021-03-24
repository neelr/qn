import { useState } from "react";
import { Flex, Heading, Text, Image } from "theme-ui";
import { Section, TextArea, Column, Inp, Clicker } from "@components/semantics";
import { getServerSideProps as server } from "@utils/authServer";
import base from "@utils/airtable";

export default function Home({ people, ...props }) {
  const Meeting = ({ name, email, notes, phone, ...props }) => {
    return (
      <Column
        sx={{
          borderRadius: "5px",
          bg: "muted",
          p: "20px",
          my: "5px",
          mx: "10px",
        }}
        {...props}
      >
        <Heading>{name}</Heading>
        <Heading sx={{ fontSize: 2 }}>{phone}</Heading>
        <Heading sx={{ fontSize: 1 }}>{email}</Heading>
        <Heading>Notes</Heading>
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
  console.log(people);
  const [meetings, addMeet] = useState(people);
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
            fontSize: [4, 5, 6],
            m: "auto",
            my: "10px",
          }}
        >
          Contacts
        </Heading>
        <Flex mx="auto">
          <Inp id="searchBar" mx="5px" placeholder="Search..." />
          <Clicker
            sx={{
              py: 0,
            }}
            mx="5px"
            bg="secondary"
            onClick={(e) => {
              let search = document.getElementById("searchBar").value;
              if (search.length > 0) {
                addMeet(
                  people.filter((v) =>
                    JSON.stringify(Object.values(v))
                      .toLowerCase()
                      .includes(search.toLowerCase())
                  )
                );
              }
            }}
          >
            <Flex>
              <Image m="auto" src="/arrow.svg" />
            </Flex>
          </Clicker>
        </Flex>
      </Section>
      <Section>
        {meetings.map((v) => (
          <Meeting
            name={v.Name}
            notes={v.Notes}
            email={v.Email}
            phone={v.Phone}
          />
        ))}
      </Section>
    </Section>
  );
}
export async function getServerSideProps(ctx) {
  let payload = await server(ctx);
  if (payload.redirect) return payload;

  let people = await base("People").select().all();
  if (!people) {
    return { props: { people: [] } };
  }
  people = people.map((v) => v.fields);

  console.log(people);
  return { props: { people } };
}
