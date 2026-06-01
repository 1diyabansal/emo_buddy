import { useState } from "react";
import axios from "axios";

function App() {

  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  const sendMessage = async () => {

    if (!message) return;

    const userMessage = {
      sender: "You",
      text: message,
    };

    setChat(prev => [...prev, userMessage]);

    const res = await axios.post(
      "http://localhost:5000/api/chat",
      {
        message,
      }
    );

    const aiMessage = {
      sender: "EmoBuddy",
      text: res.data.reply,
    };

    setChat(prev => [...prev, aiMessage]);

    setMessage("");
  };

  return (
    <div style={{
      background: "#121212",
      color: "white",
      minHeight: "100vh",
      padding: "20px",
      fontFamily: "Arial"
    }}>

      <h1>🧠 EmoBuddy</h1>

      <div style={{
        height: "400px",
        overflowY: "auto",
        border: "1px solid gray",
        padding: "10px",
        marginBottom: "20px"
      }}>

        {chat.map((msg, index) => (
          <div key={index}>
            <b>{msg.sender}: </b>
            {msg.text}
          </div>
        ))}

      </div>

      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        style={{
          width: "70%",
          padding: "10px"
        }}
      />

      <button
        onClick={sendMessage}
        style={{
          padding: "10px",
          marginLeft: "10px"
        }}
      >
        Send
      </button>

    </div>
  );
}

export default App;