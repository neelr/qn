import { Flex, Text } from "theme-ui";
import Link from "next/link";
import { useRouter } from "next/router";

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
        <NavItem href="/upcoming">Upcoming</NavItem>
        <NavItem href="/people">People</NavItem>
      </Flex>
    </Flex>
  );
}
