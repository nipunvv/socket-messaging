import Box from "@mui/material/Box";
import { useState, useEffect } from "react";
import Header from "./Header";
import MessageBox from "./MessageBox";
import io from "socket.io-client";
import MessageList from "./MessageList";
import { useNavigate } from "react-router-dom";
import ApiUtils from "../utils/ApiUitils";
import { BASE_URL } from "../constants";
import ChatList from "./ChatList";

export default function Home() {
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [user, setUser] = useState({});
  const [users, setUsers] = useState([]);
  const [conversations, setConversations] = useState([]);
  const navigate = useNavigate();

  const accessToken = localStorage.getItem("access_token");

  useEffect(() => {
    if (!accessToken) {
      navigate("/login");
      return;
    }
  }, [accessToken]);

  useEffect(() => {
    const newSocket = io(`http://localhost:3010`, {
      auth: { token: accessToken },
    });
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

    socket.on("close_reason", (reason) => {
      if (reason === "Unauthorized") {
        navigate("/login");
      }
    });
  }, [socket]);

  useEffect(() => {
    async function fetchUserDetails() {
      const url = `${BASE_URL}/api/me`;
      const response = await ApiUtils.get(url);
      if (response?.status === 200) {
        setUser(response?.data);
      }
    }
    fetchUserDetails();

    async function fetchAllUsers() {
      const url = `${BASE_URL}/api/users`;
      const response = await ApiUtils.get(url);
      if (response?.status === 200) {
        setUsers(response?.data);
      }
    }
    fetchAllUsers();

    async function fetchAllConversations() {
      const url = `${BASE_URL}/api/conversations`;
      const response = await ApiUtils.get(url);
      if (response?.status === 200) {
        setConversations(response?.data);
      }
    }
    fetchAllConversations();
  }, []);

  const sendChatMessage = (messageText) => {
    if (!socket) {
      console.log("SOCKET IS NOT CONNECTED");
      return;
    }
    const message = {
      from: user?.id,
      message: messageText,
    };
    socket.emit("chat_message", message);
    const newMessages = [...messages];
    newMessages.push(message);
    setMessages(newMessages);
  };

  const addNewChatToConversationList = async (conversationDetails) => {
    const url = `${BASE_URL}/api/conversations`;
    const response = await fetch(url, {
      method: "POST",
      body: { to: conversationDetails.to.id },
      headers: { "x-access-token": accessToken },
    });
    if (response?.status === 201) {
      conversationDetails.__id = response?.data?.id;
      const updatedConversations = [...conversations];
      if (!isConversationExists(conversationDetails.__id)) {
        updatedConversations.push(conversationDetails);
        setConversations(updatedConversations);
      }
    }
  };

  const isConversationExists = (conversationId) => {
    return (
      conversations.findIndex(
        (conversation) => conversation.__id === conversationId
      ) !== -1
    );
  };

  return (
    <Box sx={{ height: "100%" }}>
      <Header />
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          height: "100%",
        }}
      >
        <ChatList
          conversations={conversations}
          users={users}
          updateConversations={addNewChatToConversationList}
          currentUser={user}
        />
        <Box sx={{width: "80%"}}>
          <MessageList messages={messages} user={user} />
          <MessageBox socket={socket} sendChatMessage={sendChatMessage} />
        </Box>
      </Box>
    </Box>
  );
}
