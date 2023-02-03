import { Box, Button, InputBase } from "@mui/material";
import { useState } from "react";

export default function MessageBox({ sendChatMessage }) {
  const [message, setMessage] = useState("");

  const sendMessage = () => {
    sendChatMessage(message);
    setMessage("");
  };

  return (
    <Box
      sx={{
        position: "fixed",
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
          onKeyPress={(ev) => {
            if (ev.key === 'Enter') {
              ev.preventDefault();
              sendMessage();
            }
          }}
        
        />
        <Button variant="contained" sx={{ mr: "1rem" }} onClick={sendMessage}>
          Send
        </Button>
      </Box>
    </Box>
  );
}
