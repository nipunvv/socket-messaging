import Box from "@mui/material/Box";
import { useState, useEffect } from "react";
import Header from "./Header";
import MessageBox from "./MessageBox";
import io from "socket.io-client";
import MessageList from "./MessageList";

export default function Home() {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io(`http://localhost:3010`);
    setSocket(newSocket);
    return () => newSocket.close();
  }, [setSocket]);

  return (
    <Box sx={{height: '100%'}}>
      <Header />
      <MessageList />
      <MessageBox socket={socket} />
    </Box>
  );
}
