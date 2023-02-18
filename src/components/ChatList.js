import { Box, Card, Icon, IconButton, Modal, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "none",
  borderRadius: "1rem",
  boxShadow: 24,
  p: 4,
};

export default function ChatList({
  conversations,
  users,
  updateConversations,
  currentUser,
}) {
  const [open, setOpen] = useState(false);

  const handleClose = () => setOpen(false);

  const addNewChat = (userDetails) => {
    updateConversations(userDetails);
    handleClose();
  }

  return (
    <Box sx={{ height: "100%", width: "20%", backgroundColor: "#efefef" }}>
      <Box sx={{ backgroundColor: "#1976d2" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mt: "4rem",
            padding: "0.5rem 1rem",
          }}
        >
          <Typography
            sx={{
              fontWeight: "bold",
              fontSize: "1rem",
              color: "white",
            }}
          >
            Chats
          </Typography>
          <IconButton
            children={<AddIcon sx={{ color: "white" }} />}
            onClick={() => {
              setOpen(true);
            }}
          />
        </Box>
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
              <Typography>{conversation.username}</Typography>
            </Card>
          </Box>
        );
      })}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            mb="1rem"
          >
            Select a user to start the chat
          </Typography>
          {users.map((user, index) => {
            const bgColor = index % 2 == 0 ? "#E7E9EB" : "white";
            const userData = {
              from: currentUser.id,
              to: user.id,
              username: user.username,
            };
            return (
              <Box
                key={user.id}
                sx={{
                  backgroundColor: bgColor,
                  padding: "1rem",
                  borderBottom: "1px solid lightgrey",
                  cursor: "pointer",
                }}
                onClick={() => addNewChat(userData)}
              >
                {user.username}
              </Box>
            );
          })}
        </Box>
      </Modal>
    </Box>
  );
}
