import { Box, Button, Card, TextField, Typography } from "@mui/material";
import { useState } from "react";
import ApiUtils from "../utils/ApiUitils";
import Header from "./Header";
import { BASE_URL } from "../constants";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const login = async () => {
    const url = `${BASE_URL}/api/auth/signin`;
    const data = { username, password };
    const response = await ApiUtils.post(url, data);
    if (response?.status === 200) {
      const accessToken = response?.data?.accessToken;
      localStorage.setItem("access_token", accessToken);
      navigate("/");
    }
  };

  return (
    <Box sx={{ height: "100%" }}>
      <Header />
      <Box
        sx={{
          WebkitBoxSizing: "border-box",
          MozBoxSizing: "border-box",
          boxSizing: "border-box",
          height: "100%",
          padding: "4rem 1rem",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100%",
          }}
        >
          <Card
            sx={{
              borderRadius: "2rem",
              width: "30%",
              mt: "2rem",
              boxShadow: "0 8px 16px 0 #BDC9D7",
            }}
          >
            <Typography
              sx={{
                textAlign: "center",
                fontWeight: "600",
                fontSize: "2rem",
                mt: "1rem",
              }}
            >
              Login
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                marginTop: "2rem",
              }}
            >
              <TextField
                id="outlined-basic"
                label="username"
                variant="outlined"
                color="secondary"
                sx={{ width: "60%" }}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                marginTop: "2rem",
              }}
            >
              <TextField
                id="outlined-basic"
                type="password"
                label="password"
                variant="outlined"
                color="secondary"
                sx={{ width: "60%" }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Box>
            <Box sx={{ display: "flex", justifyContent: "center", my: "2rem" }}>
              <Button onClick={login} variant="contained">
                Login
              </Button>
            </Box>
          </Card>
        </Box>
      </Box>
    </Box>
  );
}
