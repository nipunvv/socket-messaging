import { Box, Button, InputBase } from "@mui/material";
import { useEffect, useState } from "react";

export default function MessageBox({ socket }) {
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!socket) return;
    socket.on("connect", () => {
      console.log("Socket connected");
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnected");
    });

    socket.on("chat_message", (message) => {
      console.log("Received message :", message);
    });
  }, [socket]);

  const sendChatMessage = () => {
    if (!socket) {
      console.log("SOCKET IS NOT CONNECTED");
      return;
    }
    socket.emit("chat_message", message);
    setMessage('');
  };

  return (
    <Box
      sx={{
        position: "absolute",
        bottom: "0%",
        backgroundColor: "#efefef",
        width: "100vw",
        py: "1rem",
      }}
    >
      <Box display={"flex"}>
        <InputBase
          sx={{
            width: "calc(100% - 2rem)",
            backgroundColor: "white",
            mx: "1rem",
            borderRadius: "1rem",
            px: "1rem",
          }}
          onChange={(e) => setMessage(e.target.value)}
          value={message}
        />
        <Button
          variant="contained"
          sx={{ mr: "1rem" }}
          onClick={sendChatMessage}
        >
          Send
        </Button>
      </Box>
    </Box>
  );
}
