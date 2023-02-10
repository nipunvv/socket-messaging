import { Box, Typography } from "@mui/material";

export default function ChatList() {
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
    </Box>
  );
}
