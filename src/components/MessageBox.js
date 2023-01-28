import { Box, Button, InputBase, TextField, Typography } from "@mui/material";

export default function MessageBox() {
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
        />
        <Button variant="contained" sx={{ mr: "1rem" }}>
          Send
        </Button>
      </Box>
    </Box>
  );
}
