import React, { useRef, useState, useContext } from "react";
import { StyleSheet, View } from "react-native";
import { Avatar, Button, Card, Text } from "react-native-paper";
import Friends from "../components/Friends";
import ProtectedContents from "../middlewares/ProtectedContents";
import { AuthContext } from "../context/authContext";

const HomeScreen = ({ route }) => {
  const { token, setAuthToken } = useContext(AuthContext);

  /*
  return (
    <ProtectedContents style={styles.container}>
      <Friends />
    </ProtectedContents>
  );
*/

  return (
    <>
      <Friends />
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    height: "100%",
    backgroundColor: "#f1f1f1",
  },
});
