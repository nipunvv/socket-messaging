import Box from "@mui/material/Box";
import { useState, useEffect } from "react";
import Header from "./Header";
import MessageBox from "./MessageBox";
import io from "socket.io-client";
import MessageList from "./MessageList";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const navigate = useNavigate();

  const accessToken = localStorage.getItem("access_token");
  if (!accessToken) navigate("/login");

  useEffect(() => {
    const newSocket = io(`http://localhost:3010`);
    setSocket(newSocket);
    return () => newSocket.close();
  }, [setSocket]);

  useEffect(() => {
    if (!socket) return;
    socket.on("connect", () => {
      console.log("Socket connected");
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnected");
    });

    socket.on("chat_message", (message) => {
      setMessages((prevMessages) => {
        const newMessages = [...prevMessages];
        newMessages.push(message);
        return newMessages;
      });
    });
  }, [socket]);

  const sendChatMessage = (message) => {
    if (!socket) {
      console.log("SOCKET IS NOT CONNECTED");
      return;
    }
    socket.emit("chat_message", message);
    const newMessages = [...messages];
    newMessages.push(message);
    setMessages(newMessages);
  };

  return (
    <Box sx={{ height: "100%" }}>
      <Header />
      <MessageList messages={messages} />
      <MessageBox socket={socket} sendChatMessage={sendChatMessage} />
    </Box>
  );
}
