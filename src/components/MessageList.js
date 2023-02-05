import { Box } from "@mui/material";

export default function MessageList({ messages, user }) {
  const isMyMessage = (message) => message.from === user.id;

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
      {messages.map((message, index) => {
        return (
          <Box
            sx={{
              display: "flex",
              justifyContent: isMyMessage(message) ? "end" : "start",
            }}
          >
            <Box
              sx={{
                padding: "10px 20px",
                backgroundColor: isMyMessage(message) ? "navy" : "cadetblue",
                color: "white",
                fontWeight: "bold",
                borderRadius: "20px",
                margin: "1rem",
                width: "fit-content",
              }}
              key={index}
            >
              {message.message}
            </Box>
          </Box>
        );
      })}
    </Box>
  );
}
