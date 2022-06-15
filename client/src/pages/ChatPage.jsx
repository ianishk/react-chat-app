import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ChatBox from "../components/ChatBox";
import SideBar from "../components/SideBar";
import { useSelector } from "react-redux";
import { changeUser } from "../features/userSlice";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import '../css/ChatPage.css'

const LoginFirst = () => {
  return (
    <div className="login__first">
      <h3>Please <Link to="/login" >Login</Link> first to chat</h3>
    </div>
  )
}

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
      </Row>: <LoginFirst />}
    </Container>
  );
};

export default ChatPage;
