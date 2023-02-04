import { Box } from "@mui/material";

export default function MessageList({ messages }) {
  return (
    <Box
      sx={{
        WebkitBoxSizing: "border-box",
        MozBoxSizing: "border-box",
        boxSizing: "border-box",
        height: "100%",
        padding: "4rem 1rem",
      }}
    >
      {messages.map((message) => {
        console.log('MESSAGE: ', message);
        return <Box>{message}</Box>;
      })}
    </Box>
  );
}
