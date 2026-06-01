import axios from "axios";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";

export default function Home() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    { id: "1", sender: "EmoBuddy", text: "Hi! How are you feeling today?" },
  ]);

  const sendMessage = async () => {
  if (!message.trim()) return;

  const userMsg = {
    id: Date.now().toString(),
    sender: "You",
    text: message,
  };

  setMessages(prev => [...prev, userMsg]);

  try {
    const response = await axios.post(
      "http://192.168.29.30:5000/chat",
      {
        message,
      }
    );

    const aiMsg = {
      id: Date.now().toString() + "ai",
      sender: "EmoBuddy",
      text: response.data.reply,
    };

    setMessages(prev => [...prev, aiMsg]);

  } catch (error) {
    const aiMsg = {
      id: Date.now().toString() + "error",
      sender: "EmoBuddy",
      text: "Cannot connect to backend",
    };

    setMessages(prev => [...prev, aiMsg]);
  }

  setMessage("");
};

  return (
    <View style={styles.container}>
      <Text style={styles.header}>🧠 EmoBuddy</Text>

      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Text style={styles.message}>
            <Text style={{ fontWeight: "bold" }}>
              {item.sender}:
            </Text>{" "}
            {item.text}
          </Text>
        )}
      />

      <TextInput
        value={message}
        onChangeText={setMessage}
        placeholder="Type a message..."
        style={styles.input}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={sendMessage}
      >
        <Text style={styles.buttonText}>Send</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#121212",
  },

  header: {
    color: "white",
    fontSize: 30,
    marginTop: 50,
    marginBottom: 20,
  },

  message: {
    color: "white",
    marginBottom: 10,
  },

  input: {
    backgroundColor: "white",
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
  },

  button: {
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 10,
  },

  buttonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
});