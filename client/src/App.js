import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import ChatPage from "./pages/ChatPage";

import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
const { io } = require("socket.io-client");

const socket = io("http://localhost:5000");

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/chat" element={<ChatPage socket={socket} />} />
      </Routes>
    </Router>
  );
}

export default App;
