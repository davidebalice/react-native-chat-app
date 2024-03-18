import React, { useState, useRef } from "react";
import { View, StyleSheet } from "react-native";
import Comments from "../components/Comments";

const CommentsScreen = () => {
  return (
    <View style={styles.container}>
      <Comments />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f1f1f1",
  },
});

export default CommentsScreen;
