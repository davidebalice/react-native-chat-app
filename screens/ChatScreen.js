import React, { useRef, useState, useContext } from "react";
import { StyleSheet, View } from "react-native";
import { Avatar, Button, Card, Text } from "react-native-paper";
import Friends from "../components/Friends";
import ProtectedContents from "../middlewares/ProtectedContents";
import { AuthContext } from "../context/authContext";

const ChatScreen = ({ route }) => {
  const { token, setAuthToken } = useContext(AuthContext);

  return (
    <ProtectedContents style={styles.container}>
      <Text>test</Text>
    </ProtectedContents>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    height: "100%",
    backgroundColor: "#f1f1f1",
  },
});
