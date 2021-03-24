import { Flex, Heading, Image, Text } from "theme-ui";
import { Section, TextArea, Column, Inp, Clicker } from "@components/semantics";
import { useRouter } from "next/router";
export default function Home() {
  const router = useRouter();

  return (
    <Section sx={{ p: 0 }}>
      <Section
        sx={{
          bg: "primary",
          p: 0,
          pt: "30px",
        }}
      >
        <Heading
          sx={{
            fontSize: [4, 5, 6],
            m: "auto",
          }}
        >
          Schedule a Meet!
        </Heading>
        <Text my="10px" mx="auto" as="b">
          Enter your info, and I'll get back to you!
        </Text>
      </Section>
      <Flex
        sx={{
          bg: "primary",
          clipPath: "polygon(0 0, 0% 100%, 100% 0)",
          height: "50px",
          width: "100vw",
          m: 0,
        }}
      />
      <Section>
        <Inp mx="auto" placeholder="Name" value={router.query.name} />
        <Inp mx="auto" placeholder="Email" value={router.query.email} />
        <Inp
          sx={{
            width: "225px",
          }}
          mx="auto"
          type="datetime-local"
          placeholder="Date"
        />
        <Text mx="auto" as="strong">
          Meeting Notes/Agenda
        </Text>
        <TextArea
          sx={{
            width: "250px",
            height: "150px",
            mx: "auto",
          }}
        >
          {router.query.notes}
        </TextArea>
        <Clicker mx="auto" my="10px">
          Check In!
        </Clicker>
      </Section>
    </Section>
  );
}
