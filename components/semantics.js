import { Flex, Input, Textarea, Button } from "theme-ui";

export const Section = ({ sx, ...props }) => (
  <Flex
    sx={{
      flexDirection: "column",
      width: "100vw",
      p: "20px",
      ...sx,
    }}
    {...props}
  />
);

export const Column = ({ sx, ...props }) => (
  <Flex
    sx={{
      flexDirection: "column",
      ...sx,
    }}
    {...props}
  />
);

export const TextArea = ({ sx, ...props }) => (
  <Textarea
    sx={{
      transition: "all 0.3s",
      boxShadow: "2px 2px",
      fontSize: 0,
      bg: "muted",
      display: "block",
      overflow: "hidden",
      width: "100%",
      resize: "both",
      ":focus": {
        bg: "background",
        boxShadow: "4px 4px",
        outline: "none",
      },
      ...sx,
    }}
    {...props}
    as="div"
    role="textbox"
    contentEditable={!props?.editable}
    {...props}
  />
);

export const Clicker = ({ sx, ...props }) => (
  <Button
    sx={{
      boxShadow: "2px 2px #272838",
      transition: "all 0.3s",
      ":hover": {
        boxShadow: "4px 4px #272838",
        cursor: "pointer",
      },
      ...sx,
    }}
    {...props}
  />
);

export const Inp = ({ sx, ...props }) => (
  <Input
    sx={{
      transition: "all 0.3s",
      boxShadow: "2px 2px",
      fontSize: 0,
      bg: "muted",
      ":focus": {
        bg: "background",
        boxShadow: "4px 4px",
        outline: "none",
      },
      my: "5px",
      width: "200px",
      ...sx,
    }}
    {...props}
  />
);
