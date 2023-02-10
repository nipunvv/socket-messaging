import { Box, Card, Typography } from "@mui/material";
import { useEffect } from "react";

export default function ChatList({ conversations }) {
  useEffect(() => {
    console.log("conversations: ", conversations);
  }, []);
  return (
    <Box sx={{ height: "100%", width: "20%", backgroundColor: "#efefef" }}>
      <Box sx={{ backgroundColor: "#1976d2" }}>
        <Typography
          sx={{
            fontWeight: "bold",
            fontSize: "30",
            mt: "4rem",
            padding: "0.5rem 1.5rem",
            color: "white",
          }}
        >
          Chats
        </Typography>
      </Box>
      {conversations.map((conversation) => {
        return (
          <Box
            key={conversation.id}
            sx={{ display: "flex", flexDirection: "column" }}
          >
            <Card
              sx={{ padding: "1rem 0.5rem", margin: "0.5rem" }}
              elevation={1}
            >
              <Typography>{conversation.user_name}</Typography>
            </Card>
          </Box>
        );
      })}
    </Box>
  );
}
