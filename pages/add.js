import { useState } from "react";
import { Flex, Heading } from "theme-ui";
import {
  Section,
  TextArea,
  Column,
  Inp,
  Clicker,
  Selector,
} from "@components/semantics";
import { getServerSideProps as server } from "@utils/authServer";
import base from "@utils/airtable";
import Router from "next/router";

function removeItem(array, n) {
  return array.filter((elem, i) => i !== n);
}

export default function Home({ people }) {
  const [meetings, addMeet] = useState([]);
  let [personData, setPerson] = useState({
    name: "",
    notes: "",
    email: "",
    phone: "",
  });
  let [personId, setId] = useState("");

  const Meeting = ({ name, date, notes, k, ...props }) => {
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
            addMeet(removeItem(meetings, k));
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
        <Inp
          bg="white"
          placeholder="Check In 1"
          defaultValue={name.str}
          onChange={(e) => (name.str = e.target.value)}
        />
        <Heading>Date</Heading>
        <Inp
          sx={{
            width: "200px",
          }}
          bg="white"
          type="datetime-local"
          placeholder="03/02/2005"
          defaultValue={date.str}
          onChange={(e) => (date.str = e.target.value)}
        />
        <Heading>Meeting Notes</Heading>
        <TextArea
          sx={{
            bg: "white",
            width: "94%",
            minHeight: "150px",
            m: "5px",
          }}
          onInput={(e) => (notes.str = e.target.innerHTML)}
        >
          {notes.str}
        </TextArea>
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
            my: "10px",
          }}
        >
          Add New
        </Heading>
        <Selector
          mx="auto"
          onChange={(e) => {
            people.forEach((v) => {
              if (v.Name == e.target.value) {
                setId(v.id);
                setPerson({
                  name: v.Name,
                  notes: v.Notes,
                  email: v.Email,
                  phone: v.Phone,
                });
                if (v.Meetings && v.Meetings.length > 0) {
                  addMeet(
                    v.Meetings.map((v) => {
                      return {
                        name: {
                          str: v.Name,
                        },
                        notes: {
                          str: v.Notes,
                        },
                        date: {
                          str: v.Date ? v.Date.split(":00.000Z")[0] : "",
                        },
                        id: v.id,
                      };
                    })
                  );
                }
              }
            });
          }}
        >
          <option>Load Person...</option>
          {people.map((v) => (
            <option>{v.Name}</option>
          ))}
        </Selector>
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
            <Inp
              placeholder="John Doe"
              value={personData.name}
              onChange={(e) =>
                setPerson({
                  name: e.target.value,
                  notes: personData.date,
                  phone: personData.phone,
                  email: personData.email,
                })
              }
            />
            <Heading mx="10px">Person Notes</Heading>
            <TextArea
              sx={{
                width: "300px",
                minHeight: "50px",
                m: "5px",
              }}
              onInput={(e) => (personData.notes = e.target.innerHTML)}
            >
              {personData.notes}
            </TextArea>
            <Heading mx="10px">Email</Heading>
            <Inp
              type="email"
              placeholder="johndoe@neelr.dev"
              value={personData.email}
              onChange={(e) =>
                setPerson({
                  name: personData.name,
                  notes: personData.date,
                  phone: personData.phone,
                  email: e.target.value,
                })
              }
            />
            <Heading mx="10px">Phone</Heading>
            <Inp
              placeholder="+1 (925)-448-5457"
              value={personData.phone}
              onChange={(e) =>
                setPerson({
                  name: personData.name,
                  notes: personData.date,
                  phone: e.target.value,
                  email: personData.email,
                })
              }
            />
          </Column>
          <Column sx={{ flex: [null, null, 1] }} my="10px">
            {meetings.map((v, i) => (
              <Meeting k={i} {...v} />
            ))}
            <Clicker
              onClick={() =>
                addMeet([
                  ...meetings,
                  {
                    name: { str: "" },
                    date: { str: "" },
                    notes: { str: "" },
                  },
                ])
              }
            >
              Add Meeting
            </Clicker>
          </Column>
        </Flex>
        <Clicker
          my="10px"
          mx="auto"
          onClick={async () => {
            let meets = meetings.map((v) => {
              return {
                id: v.id,
                name: v.name.str,
                notes: v.notes.str,
                date: v.date.str,
              };
            });
            await fetch("/api/addMeeting", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                ...personData,
                id: personId == "" ? null : personId,
                meetings: [...meets],
              }),
            });
            Router.reload(window.location.pathname);
          }}
        >
          Add Person
        </Clicker>
      </Section>
    </Section>
  );
}

export async function getServerSideProps(ctx) {
  let payload = server(ctx);
  if (payload.redirect) return payload;

  let people = await base("People").select().all();
  if (people) {
    people = await Promise.all(
      people.map(async (v) => {
        let fields = v.fields;
        if (!fields.Meetings) return { ...fields, id: v.id };
        fields.Meetings = await Promise.all(
          fields.Meetings.map(async (id) => {
            let record = await base("Meetings").find(id);
            return { ...record.fields, id };
          })
        );

        return { ...fields, id: v.id };
      })
    );
  } else {
    return { props: { people: [] } };
  }
  return { props: { people } };
}
