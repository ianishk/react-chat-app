import React from "react";
import {Image } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { changeFriend } from "../features/friendSlice";
import '../css/Chat.css'

const Chat = ({ profile, username, chatId, selected }) => {
  const dispatch = useDispatch();
  const handleClick = () => {
    const selectedFriend = {
      username,
      profile,
      chatId,
    };
    dispatch(changeFriend(selectedFriend));
  }
  return (
    <div className={`user__main ${selected? "selected": ""}`} onClick={handleClick} >
      <Image
        roundedCircle
        height={70}
        src={`https://avatars.dicebear.com/api/avataaars/${profile}.svg`}
      />
      <label>{username}</label>
    </div>
  );
};

export default Chat;
