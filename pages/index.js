import { useState } from "react";
import { Flex, Heading, Text, Image } from "theme-ui";
import { Section, TextArea, Column, Inp, Clicker } from "@components/semantics";
import { getServerSideProps as server } from "@utils/authServer";
import base from "@utils/airtable";

export default function Home({ meets, ...props }) {
  const Meeting = ({ name, date, notes, pname, pnotes, ...props }) => {
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
        <Heading sx={{ fontSize: 2 }}>{pname}</Heading>
        <Heading sx={{ fontSize: 1 }}>{date}</Heading>
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
          {pnotes.split("\n").map((v) => (
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
  const [meetings, addMeet] = useState(meets);
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
                  meets.filter((v) =>
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
      <Flex
        sx={{
          backgroundImage: "url('/wave.svg')",
          height: "150px",
          backgroundSize: "cover",
          width: "100vw",
        }}
      />
      <Section>
        {meetings.map((v) => (
          <Meeting
            name={v.Name}
            date={new Date(v.Date).toString()}
            notes={v.Notes}
            pname={v.PersonName[0]}
            pnotes={v.PersonNotes[0]}
          />
        ))}
      </Section>
    </Section>
  );
}
export async function getServerSideProps(ctx) {
  let payload = await server(ctx);
  if (payload.redirect) return payload;

  let meets = await base("Meetings")
    .select({
      sort: [
        {
          field: "Date",
          direction: "asc",
        },
      ],
      filterByFormula: "NOT({Done})",
    })
    .all();
  if (!meets) {
    return { props: { meets: [] } };
  }
  meets = meets.map((v) => v.fields);
  return { props: { meets } };
}
