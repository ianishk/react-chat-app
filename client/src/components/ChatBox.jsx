import React from "react";

import { Image, Form, Button, Stack } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

import "../css/ChatBox.css";
import ChatBubble from "./ChatBubble";
const ChatBox = ({socket}) => {

  const selectedFriend = useSelector((state) => state.friend);
  const user = useSelector((state) => state.user);
  const [Messages, setMessages] = useState([]);
  const [Input, setInput] = useState("");

  
  //useEffect to fetch the list of messages

  //content of the message:
  // {
  //   sender: "anish",
  //   message: "hello",
  //   time: "12:00",
  //}

  // useEffect(() => {
  //   fetch(`http://localhost:5000/user/getFriends`, {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //       "x-auth-token": `${localStorage.getItem("token")}`,
  //     }
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       
  //     });
  // }, []);

  useEffect(() => {
    setMessages([]);
    fetch(`http://localhost:5000/message/getMessages?friendUsername=${selectedFriend.username}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": `${localStorage.getItem("token")}`,
      }
    })
      .then((res) => res.json())
      .then((data) => {
        
        setMessages(data.messages);
      });
  }, [selectedFriend]);

  useEffect(() => {
    socket.on("receive_message", (data) => {
      
      if(data.sent === selectedFriend.username){
        const newData = {
          text: data.text,
          username: selectedFriend.username,
        }
        setMessages([...Messages, newData]);
      }
      else{
        setMessages([]);
      }
    })
  }, [socket, Messages, selectedFriend]);

    

  const postHandler = (e) => {
    e.preventDefault();
    socket.emit("post_message", {text: Input, sent: user.username, to: selectedFriend.username, chatId: selectedFriend.chatId});
    fetch("http://localhost:5000/message/addMessage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": `${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        friendUsername: selectedFriend.username,
        text: Input,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setMessages(data.messages);
      });
    setInput("");
  };

  return (
    <div className="chatBox__main">
      <div className="chatBox__header">
        <Stack direction="horizontal" gap={3}>
          <Image
            roundedCircle
            height={60}
            src={`https://avatars.dicebear.com/api/avataaars/${selectedFriend.profile}.svg`}
          />
          <label>
            <b>{selectedFriend.username}</b>
          </label>
        </Stack>
      </div>
      <div className="chatBox__body scrollcss">
        {Messages.map((message) => (
          <ChatBubble
            message={message.text}
            align={
              message.username === selectedFriend.username ? "left" : "right"
            }
          />
        ))}
      </div>
      <div className="chatBox__footer">
        <Stack className="chatBox__stack" direction="horizontal" gap={2}>
          <Form.Control
            size="lg"
            placeholder="Type a message"
            value={Input}
            onChange={(e) => {
              setInput(e.target.value);
            }}
          />
          <Button size="lg" onClick={postHandler}>
            Post
          </Button>
        </Stack>
      </div>
    </div>
  );
};

export default ChatBox;
