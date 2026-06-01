import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
} from "react-native";

import axios from "axios";

export default function App() {

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
      "http://YOUR_LOCAL_IP:5000/api/chat",
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
    <View style={{
      flex: 1,
      padding: 20,
      backgroundColor: "#121212"
    }}>

      <Text style={{
        color: "white",
        fontSize: 30,
        marginBottom: 20
      }}>
        🧠 EmoBuddy
      </Text>

      <ScrollView style={{ flex: 1 }}>

        {chat.map((msg, index) => (
          <Text
            key={index}
            style={{
              color: "white",
              marginBottom: 10
            }}
          >
            <Text style={{ fontWeight: "bold" }}>
              {msg.sender}:
            </Text>

            {" "}
            {msg.text}
          </Text>
        ))}

      </ScrollView>

      <TextInput
        value={message}
        onChangeText={setMessage}
        placeholder="Type..."
        placeholderTextColor="gray"
        style={{
          backgroundColor: "#222",
          color: "white",
          padding: 10,
          marginBottom: 10
        }}
      />

      <Button
        title="Send"
        onPress={sendMessage}
      />

    </View>
  );
}