import { Flex, Text } from "theme-ui";
import { Clicker } from "@components/semantics";
import Link from "next/link";
import { useRouter } from "next/router";
import { parseCookies, setCookie, destroyCookie } from "nookies";

export default function Nav() {
  const router = useRouter();

  const NavItem = ({ href, ...props }) => {
    return (
      <Link href={href}>
        <Text
          sx={{
            fontWeight: "900",
            mt: "10px",
            opacity: router.asPath == href ? "1" : "0.6",
            mx: "10px",
            transition: "all 0.3s",
            ":hover": {
              opacity: "1",
              cursor: "pointer",
            },
          }}
          {...props}
        />
      </Link>
    );
  };
  return (
    <Flex bg="primary">
      <Flex mx="auto">
        <NavItem href="/">Home</NavItem>
        <NavItem href="/add">Add</NavItem>
        <NavItem href="/people">People</NavItem>
        <NavItem href="/invite">Invite</NavItem>
      </Flex>
      <Text
        sx={{
          position: "absolute",
          right: 10,
          fontWeight: "900",
          m: "10px",
          opacity: "0.6",
          transition: "all 0.3s",
          ":hover": {
            opacity: "1",
            cursor: "pointer",
          },
        }}
        onClick={() => {
          document.cookie = `loginToken=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;`;

          router.push("/");
        }}
      >
        Sign Out
      </Text>
    </Flex>
  );
}
