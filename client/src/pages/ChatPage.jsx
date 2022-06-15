import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ChatBox from "../components/ChatBox";
import SideBar from "../components/SideBar";
import { useSelector } from "react-redux";
import { changeUser } from "../features/userSlice";
import { useDispatch } from "react-redux";
import '../css/ChatPage.css'

const ChatPage = ({socket}) => {
  
  const dispatch = useDispatch();
  dispatch(changeUser({username: localStorage.getItem('username') , profile: localStorage.getItem('profile')}));
  const activeUser = useSelector((state) => state.user);
  return (
    <Container fluid>
      {activeUser.username ? <Row className="chat__main">
        <Col xs={4}>
          <SideBar username={activeUser.username} profile={activeUser.profile} socket={socket} />
        </Col>
        <Col xs={8}>
          <ChatBox socket = {socket} />
        </Col>
      </Row>: <h1>Please login to chat</h1>}
    </Container>
  );
};

export default ChatPage;
