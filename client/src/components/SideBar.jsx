import React from "react";
import { Container, Stack, Form, Button, Image } from "react-bootstrap";
import { useState, useEffect } from "react";
// have the list of all the groups and friends
import { useSelector } from "react-redux";

import "../css/SideBar.css";
import Chat from "./Chat";

// useEffect to fetch the friends of the user

const SideBar = ({ username, profile, socket }) => {
  //create useEffect function to fetch the list of friends

  const [addFriend, setaddFriend] = useState('')

  const [Friends, setFriends] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/user/getFriends", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": `${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setFriends(data);
      });
  }, []);

  const addFriendHandler = (e) => {
    e.preventDefault();
    fetch("http://localhost:5000/user/addFriend", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": `${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        friendUsername: addFriend,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if(data.msg){
          alert(data.msg)
        }
        else{
          setFriends(data);
        }
      });
  }

  useEffect(() => {
    Friends.forEach((friend) => {
      socket.emit("join_chat", friend.chatId);
    }
    );
  }
  , [Friends, socket]);

  return (
    <Container className="sidebar">
      <Stack>
        <div className="sidebar__header">
          <Image
            roundedCircle
            height={60}
            src={`https://avatars.dicebear.com/api/avataaars/${profile}.svg`}
          />
        </div>
        <div className="sidebar__join">
          <Form onSubmit={addFriendHandler}>
            <Stack direction="horizontal" gap={2}>
              <Form.Control
                type="text"
                placeholder="Add a friend or join a group"
                value={addFriend}
                onChange={(e) => {
                  setaddFriend(e.target.value);
                }}
              ></Form.Control>
              <Button type="submit">Add</Button>
            </Stack>
          </Form>
        </div>
        <Contacts Friends={Friends} />
      </Stack>
    </Container>
  );
};

const Contacts = ({ Friends }) => {
  const selectedFriend = useSelector((state) => state.friend.username);
  return (
    <>
      <div className="sidebar__contacts scrollcss">
        {Friends.map((friend) => (
          <Chat
            profile={friend.profile}
            username={friend.username}
            chatId={friend.chatId}
            selected={selectedFriend === friend.username ? true : false}
          />
        ))}
        <div></div>
      </div>
    </>
  );
};

export default SideBar;
